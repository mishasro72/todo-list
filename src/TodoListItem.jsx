import React from "react";

export default function TodoListItem({ todo, onCompleteTodo }) {
  return (
    <li style={{ listStyleType: "none", padding: 0 }}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onCompleteTodo(todo.id)}
      />
      {todo.title}
    </li>
  );
}
