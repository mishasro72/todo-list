import React from "react";
import { useRef, useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleAddTodo(event) {
    event.preventDefault();

    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
    inputRef.current.focus();
  }

  return (
    <section className="space-y-6">
      <h1 className="headline-lg-mobile md:headline-lg text-on-surface">
        My Tasks
      </h1>
      <div className="relative group">
        <form
          className="flex flex-col sm:flex-row gap-3 bg-surface-container-lowest p-2 rounded-2xl shadow-ambient border border-outline-variant/30 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-4 sm:items-end"
          onSubmit={handleAddTodo}
        >
          <TextInputWithLabel
            elementId="todoTitle"
            labelText="Todo"
            onChange={(e) => setWorkingTodoTitle(e.target.value)}
            value={workingTodoTitle}
            ref={inputRef}
          />
          <button
            className="bg-primary-light h-11.5 hover:bg-primary-container-light text-white px-6 py-3 rounded-xl label-md transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2"
            type="submit"
            disabled={!isValidTodoTitle(workingTodoTitle)}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="square"
              strokeWidth="2"
            >
              <title>Add SVG Icon</title>
              <path d="M12 5v14m7-7H5" />
            </svg>
            Add Todo
          </button>
        </form>
      </div>
    </section>
  );
}

export default TodoForm;
