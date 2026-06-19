import { useEffect, useReducer } from "react";
import TodoForm from "../features/Todos/TodoForm";
import TodoList from "../features/Todos/TodoList/TodoList";
import SortBy from "../shared/SortBy";
import FilterInput from "../shared/FilterInput";
import { useDebounce } from "../utils/useDebounce";
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from "../reducers/todoReducer";
import { useAuth } from "../context/AuthContext";
import StatusFilter from "../shared/StatusFilter";
import { useSearchParams } from "react-router";

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
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";

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
          limit: 100,
          page: 1,
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
    <>
      <main className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col gap-12 bg-surface body-md text-on-surface min-h-screen">
        <div>
          {error && (
            <div className="flex items-center justify-between gap-4 bg-error-container border border-error/20 p-4 rounded-xl soft-elevation transition-all duration-300 animate-fadeIn">
              <p className="body-sm font-semibold text-on-error-container m-0">
                ERROR: {error}
              </p>
              <button
                className="px-3 py-1.5 bg-surface-container-lowest text-error border border-error/20 rounded-lg label-sm font-bold hover:bg-error hover:text-white transition-all duration-150 active:scale-95 ease-in-out shrink-0"
                onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
              >
                Clear Error
              </button>
            </div>
          )}
          {isTodoListLoading ? (
            <p>Loading ...</p>
          ) : (
            <>
              <TodoForm onAddTodo={addTodo} />
              <section className="bg-white p-5 rounded-2xl shadow-ambient border border-slate-100 space-y-4">
                <FilterInput
                  filterTerm={filterTerm}
                  onFilterChange={handleFilterChange}
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  <StatusFilter />
                </div>
              </section>
              <TodoList
                todoList={todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
                dataVersion={dataVersion}
                statusFilter={statusFilter}
              />
            </>
          )}
          {filterError && (
            <div className="mt-8 flex flex-col items-center gap-6">
              <div className="w-full bg-error-container text-on-error-container rounded-2xl p-6 flex items-start gap-4 border border-error/10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-6 h-6 shrink-0"
                  fill="currentColor"
                >
                  {/* Font Awesome Free v7.2.0 */}
                  <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z" />
                </svg>
                <p className="body-md">{filterError}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  className="flex-1 bg-primary-container-light on-primary py-3.5 px-6 rounded-xl hover:bg-primary-container-light active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
                  onClick={() =>
                    dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <title>Baseline Refresh SVG Icon</title>
                    <path
                      fill="currentColor"
                      d="M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"
                    ></path>
                  </svg>
                  Clear Filter Error
                </button>
                <button
                  className="flex-1 bg-surface border border-outline-variant text-on-surface-variant font-semibold py-3.5 px-6 rounded-xl hover:bg-surface-container-low active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <title>Filter Reset SVG Icon</title>
                    <path
                      fill="currentColor"
                      d="M22.5 9a7.45 7.45 0 0 0-6.5 3.792V8h-2v8h8v-2h-4.383a5.494 5.494 0 1 1 4.883 8H22v2h.5a7.5 7.5 0 0 0 0-15"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M26 6H4v3.171l7.414 7.414l.586.586V26h4v-2h2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8l-7.414-7.415A2 2 0 0 1 2 9.171V6a2 2 0 0 1 2-2h22Z"
                    ></path>
                  </svg>
                  Reset Filters
                </button>
              </div>
              <p className="body-sm text-on-surface-variant text-center max-w-100">
                If the problem persists, please check your internet connection
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
