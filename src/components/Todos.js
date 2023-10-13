import { Routes, Route, Outlet } from "react-router-dom";
import Todo from "./Todo";

export default function Todos(props) {
  const todos = props.todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        setupdateTodosCondition={props.setupdateTodosCondition}
      />
    );
  });

  return (
    <>
      <Routes>
        <Route path="" element={<ul className="todos-container">{todos}</ul>} />
      </Routes>
      <Outlet />
    </>
  );
}
