import React, { useEffect, useReducer } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList/TodoList";
import SortBy from "../../shared/SortBy";
import FilterInput from "../../shared/FilterInput";
import { useDebounce } from "../../utils/useDebounce";
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from "../../reducers/todoReducer";
import { useAuth } from "../../context/AuthContext";

export default function TodosPage() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;
  const debouncedFilterTerm = useDebounce(filterTerm, 500);
  const { token } = useAuth();

  function handleFilterChange(newTerm) {
    dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: newTerm });
  }

  async function addTodo(todoTitle) {
    const todoItem = { id: Date.now(), title: todoTitle, isCompleted: false };

    dispatch({ type: TODO_ACTIONS.ADD_TODO_START, payload: { todoItem } });

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
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          id: todoItem.id,
          data: data,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          id: todoItem.id,
          message: `Could not add task. ${error.message}`,
        },
      });
    }
  }

  async function completeTodo(id) {
    const originalTodo = state.todoList.find((todo) => todo.id === id);

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: { id },
    });

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
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
        payload: { id, data },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          id,
          originalTodo,
          message: `Couldn't update task ${originalTodo?.title}. ${error.message}`,
        },
      });
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = state.todoList.find(
      (todo) => todo.id === editedTodo.id,
    );

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: {
        id: editedTodo.id,
        editTodo: editedTodo,
      },
    });
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

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: {
          id: editedTodo.id,
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          id: editedTodo.id,
          originalTodo,
          message: `Couldn't update task ${originalTodo.title}. ${error.message}`,
        },
      });
    }
  }

  useEffect(() => {
    async function fetchTodos() {
      try {
        dispatch({ type: TODO_ACTIONS.FETCH_START });
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

          dispatch({
            type: TODO_ACTIONS.FETCH_SUCCESS,
            payload: formattedTodos,
          });
        }
      } catch (error) {
        const isFilterError =
          debouncedFilterTerm ||
          sortBy !== "createdDate" ||
          sortDirection !== "desc";

        const errorMessage = isFilterError
          ? `Error filtering/sorting todos: ${error.message}`
          : `Error: ${error.name} | ${error.message}`;

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            isFilterError,
            message: errorMessage,
          },
        });
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
          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}>
            Clear Error
          </button>
        </div>
      )}
      {isTodoListLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <SortBy
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortByChange={(newSortBy) =>
              dispatch({
                type: TODO_ACTIONS.SET_SORT,
                payload: {
                  sortBy: newSortBy,
                  sortDirection,
                },
              })
            }
            onSortDirectionChange={(newSortDir) =>
              dispatch({
                type: TODO_ACTIONS.SET_SORT,
                payload: {
                  sortBy,
                  sortDirection: newSortDir,
                },
              })
            }
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
          <button
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })}
          >
            Clear Filter Error
          </button>
          <button
            onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
