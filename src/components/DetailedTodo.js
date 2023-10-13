import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

export default function DetailedTodo(props) {
  const { todoId } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    description: "",
    isCompleted: false,
  });

  useEffect(() => {
    ApiService.getTodo(todoId)
      .then((todo) => {
        setTodo(todo);
      })
      .catch(() => {
        alert("Invalid todo");
        setTodo({
          description: "",
          isCompleted: false,
        });
      });
  }, [todoId]);

  const handleChange = (event) => {
    const { type, value, checked } = event.target;

    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        isCompleted: type === "checkbox" ? checked : todo.isCompleted,
        description: type !== "checkbox" ? value : todo.description,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    ApiService.updateTodo(todoId, {
      description: todo.description,
      isCompleted: todo.isCompleted,
    })
      .then((todo) => {
        props.setupdateTodosCondition(true);
        alert("Todo updated successfully");
      })
      .catch(() => {
        alert("Failed to update the todo!");
      });
  };

  function handleDelete() {
    ApiService.deleteTodo(todoId)
      .then(() => {
        props.setupdateTodosCondition(true);
        navigate(`/todos`);
      })
      .catch(() => {
        alert("Failed to delete the todo!");
      });
  }

  return (
    <form className="detailed-todo-form-container" onSubmit={handleSubmit}>
      <input
        className="detailed-todo-form-text-input"
        type="text"
        placeholder="add details"
        name="detailed-todo-form-text-input"
        value={todo.description}
        onChange={handleChange}
      />
      <div className="detailed-todo-form-actions">
        <input
          className="detailed-todo-form-input"
          name="detailed-todo-form-input"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleChange}
        />
        <input
          className="detailed-todo-form-submit"
          type="submit"
          value="Update"
        />
        <i className="ri-delete-bin-6-line" onClick={handleDelete} />
      </div>
    </form>
  );
}
