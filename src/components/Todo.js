import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

export default function Todo(props) {
  const { todo, setupdateTodosCondition } = props;
  const navigate = useNavigate();

  function handleChange(event) {
    ApiService.updateTodo(todo.id, {
      description: todo.description,
      isCompleted: event.target.checked,
    })
      .then(() => {
        setupdateTodosCondition(true);
        alert("Todo updated successfully");
      })
      .catch(() => {
        alert("Failed to update the todo!");
      });
  }

  function handleClick(e) {
    if (e.currentTarget !== e.target) return;
    navigate(`/todos/${todo.id}`);
  }

  return (
    <li className="todo-container" onClick={handleClick}>
      <div className="todo">
        <input
          className="todo-input"
          name="todo-input"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleChange}
        />
        <span className="todo-label">{todo.description}</span>
      </div>
      <i className="ri-arrow-right-s-line" />
    </li>
  );
}
