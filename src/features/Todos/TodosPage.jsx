import React, { useCallback, useEffect } from "react";
import TodoForm from "./TodoForm";
import { useState } from "react";
import TodoList from "./TodoList/TodoList";
import SortBy from "../../shared/SortBy";
import FilterInput from "../../shared/FilterInput";
import { useDebounce } from "../../utils/useDebounce";

export default function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [sortBy, setSortBy] = useState("creationDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterTerm, setFilterTerm] = useState("");
  const debouncedFilterTerm = useDebounce(filterTerm, 500);
  const [dataVersion, setDataVersion] = useState(0);
  const [filterError, setFilterError] = useState("");

  function handleFilterChange(newTerm) {
    setFilterTerm(newTerm);
  }

  const invalidateCache = useCallback(() => {
    setDataVersion((prev) => prev + 1);
    console.log(`Invalidating memo cache after todo mutation.`);
  }, []);

  async function addTodo(todoTitle) {
    const todoItem = { id: Date.now(), title: todoTitle, isCompleted: false };
    setError("");

    setTodoList((previous) => [...previous, todoItem]);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
      credentials: "include",
      body: JSON.stringify({
        title: todoItem.title,
        isCompleted: todoItem.isCompleted,
      }),
    };
    try {
      const response = await fetch("/api/tasks", options);
      if (!response.ok) {
        throw new Error("Todo updating error");
      }
      const data = await response.json();
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === todoItem.id ? data : todo)),
      );
      invalidateCache();
    } catch (error) {
      setTodoList((previous) =>
        previous.filter((todo) => todo.id !== todoItem.id),
      );
      setError(`Could not add task. ${error.message}`);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);
    setError("");
    const updatedTodo = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo,
    );
    setTodoList(updatedTodo);
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
      credentials: "include",
      body: JSON.stringify({
        isCompleted: true,
      }),
    };
    try {
      const response = await fetch(`/api/tasks/${id}`, options);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Completed update failed: ${errorText}`);
      }
      const data = await response.json();
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === id ? data : todo)),
      );
      invalidateCache();
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === id ? originalTodo : todo)),
      );
      setError(`Couldn't complite task ${originalTodo.title}.${error.message}`);
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    setError("");
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo,
    );
    setTodoList(updatedTodos);
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
      credentials: "include",
      body: JSON.stringify({
        title: editedTodo.title,
        isCompleted: editedTodo.isCompleted,
      }),
    };
    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, options);
      if (!response.ok) {
        throw new Error("Update failed");
      }
      const data = await response.json();
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === editedTodo.id ? data : todo)),
      );
      invalidateCache();
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo,
        ),
      );
      setError(`Couldn't update task ${originalTodo.title}. ${error.message}`);
    }
  }

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsTodoListLoading(true);
        const options = {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };
        const paramsObject = {
          sortBy,
          sortDirection,
        };
        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }
        const params = new URLSearchParams(paramsObject);
        const response = await fetch(`/api/tasks?${params}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized");
          }
          const errorText = await response.json();
          throw new Error(errorText.message);
        }
        const data = await response.json();
        if (data && data.tasks) {
          const formattedTodos = data.tasks.map((todo) => ({
            id: todo.id,
            title: todo.title,
            isCompleted: todo.isCompleted,
            createdAt: todo.createdAt,
          }));
          setTodoList(formattedTodos);
          setFilterError("");
        }
      } catch (error) {
        if (
          debouncedFilterTerm ||
          sortBy !== "creationDate" ||
          sortDirection !== "desc"
        ) {
          setFilterError(`Error filtering/sorting todos: ${error.message}`);
        } else {
          setError(`Error: ${error.name} | ${error.message}`);
        }
      } finally {
        setIsTodoListLoading(false);
      }
    }
    if (token) {
      fetchTodos();
    }
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  return (
    <div>
      {error && (
        <div>
          <p style={{ color: "red", fontSize: "15px" }}>ERROR: {error}</p>
          <button onClick={() => setError(null)}>Clear Error</button>
        </div>
      )}
      {isTodoListLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <SortBy
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortByChange={setSortBy}
            onSortDirectionChange={setSortDirection}
          />
          <FilterInput
            filterTerm={filterTerm}
            onFilterChange={handleFilterChange}
          />
          <TodoForm onAddTodo={addTodo} />
          <TodoList
            todoList={todoList}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
            dataVersion={dataVersion}
          />
        </>
      )}
      {filterError && (
        <div>
          <p>{filterError}</p>
          <button onClick={() => setFilterError("")}>Clear Filter Error</button>
          <button
            onClick={() => {
              (setFilterTerm(""),
                setSortBy("creationDate"),
                setSortDirection("desc"),
                setFilterError(""));
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
