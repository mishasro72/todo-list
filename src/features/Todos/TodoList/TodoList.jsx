import React from "react";
import { useMemo } from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, dataVersion }) {
  
  const filteredTodoList = useMemo(() => {
    const activeTodos = todoList.filter((todo) => !todo.isCompleted);
    console.log(`Recalculating filtered todos (v${dataVersion})`);
    return {
      version: dataVersion,
      todos: activeTodos,
    };
  }, [todoList, dataVersion]);

  return (
    <>
      {filteredTodoList.todos.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.todos.map((todo) => {
            return (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

export default TodoList;
