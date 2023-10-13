import { useState } from "react";
import ApiService from "../services/ApiService";

export default function TodoForm(props) {
  const [formData, setFormData] = useState({
    description: "",
    isCompleted: false,
  });

  function handleChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, description: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (formData.description.length) {
      ApiService.createTodo(formData)
        .then(() => {
          props.setupdateTodosCondition(true);
          alert("Todo added successfully");
        })
        .catch(() => {
          alert("Failed to add the todo!");
        });
    }
    setFormData({
      description: "",
      isCompleted: false,
    });
  }

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          className="todo-form-input"
          type="text"
          placeholder="add details"
          name="todo-form-input"
          value={formData.description}
          onChange={handleChange}
        />
        <input className="todo-form-submit" type="submit" value="Add" />
      </form>
    </>
  );
}
