import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";
import { useEditableTitle } from "../../../hooks/useEditableTitle";

export default function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title);

  function handleCancel() {
    cancelEdit();
  }

  function handleEdit(event) {
    const value = event.target.value;
    updateTitle(value);
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (!isEditing || !isValidTodoTitle(workingTitle)) return;
    const finalTitle = finishEdit();
    onUpdateTodo({ ...todo, title: finalTitle });
  }

  return (
    <li className="group flex items-center justify-between bg-white p-4 rounded-2xl shadow-ambient border border-slate-100 transition-all duration-200 hover:border-slate-200 shadow-ambient-hover">
      <form className="flex items-center gap-4 " onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`edit-todo-${todo.id}`}
              labelText="Edit Todo"
              value={workingTitle}
              onChange={handleEdit}
            />
            <div className="flex items-center gap-2 self-end h-11.5 ml-3">
              <button
                className="h-11.5 p-2 text-outline hover:text-red-900 hover:bg-red-300 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100 align-bottom"
                type="button"
                onClick={handleCancel}
              >
                <svg viewBox="0 0 512 512" className="w-6 h-6">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08 256z"
                  />
                </svg>
              </button>
              <button
                className="h-11.5 p-2 text-outline hover:text-green-800 hover:bg-green-300 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100 item-end"
                type="button"
                onClick={handleUpdate}
                disabled={!isValidTodoTitle(workingTitle)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-on-surface-variant hover:text-primary transition-colors"
                  fill="none"
                >
                  <title>Ai Edit Line SVG Icon</title>
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                    d="m14.829 6.343l2.828 2.829m.566-5.091l1.697 1.697a.8.8 0 0 1 0 1.131L8.464 18.364l-3.535.707l.707-3.535L17.091 4.08a.8.8 0 0 1 1.132 0M4.806 2.776l-.377 1.508a.2.2 0 0 1-.145.145l-1.508.377c-.202.05-.202.338 0 .388l1.508.377a.2.2 0 0 1 .145-.145l.377 1.508c.05.202.338.202.388 0l.377-1.508a.2.2 0 0 1 .145-.145l1.508-.377c.202-.05.202-.338 0-.388l-1.508-.377a.2.2 0 0 1-.145-.145l-.377-1.508c-.05-.202-.338-.202-.388 0M19 17l-.4 1.6l-1.6.4l1.6.4l.4 1.6l.4-1.6L21 19l-1.6-.4z"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center cursor-pointer shrink-0 w-4 h-4 m-2">
              <input
                className="text-center peer absolute opacity-0 w-4 h-4 cursor-pointer z-10"
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
                aria-label={`Mark "${todo.title}" as completed`}
              />
              <div className="checkbox-custom w-4 h-4 border-2 border-outline rounded-full flex items-center justify-center transition-all duration-200 bg-surface-container-lowest peer-checked:bg-primary-light peer-checked:border-primary-light text-on-primary-light">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 scale-0 peer-checked:scale-100 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <span
              onClick={() => startEditing()}
              className={`body-md text-on-surface ml-2 cursor-pointer transition-all duration-200 ${
                todo.isCompleted
                  ? "line-through text-on-surface-variant/50"
                  : ""
              }`}
            >
              {todo.title}
            </span>
          </>
        )}
      </form>
    </li>
  );
}
