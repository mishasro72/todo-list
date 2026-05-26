import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";
import { useEditableTitle } from "../../../hooks/useEditableTitle";

export default function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  // const [isEditing, setIsEditing] = useState(false);
  // const [workingTitle, setWorkingTitle] = useState(todo.title);

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
    <li style={{ listStyleType: "none", padding: 0 }}>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`edit-todo-${todo.id}`}
              labelText="Edit Todo"
              value={workingTitle}
              onChange={handleEdit}
            />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => startEditing()}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}
