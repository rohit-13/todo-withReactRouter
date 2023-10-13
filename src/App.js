import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiService from "./services/ApiService";

import "./App.css";
import Header from "./components/Header";
import Todos from "./components/Todos";
import TodoForm from "./components/TodoForm";
import DetailedTodo from "./components/DetailedTodo";

function App() {
  const [todos, setTodos] = useState([]);
  const [updateTodosCondition, setupdateTodosCondition] = useState(true);

  useEffect(() => {
    if (updateTodosCondition) {
      ApiService.getTodos()
        .then((todos) => {
          setTodos(todos);
          setupdateTodosCondition(false);
        })
        .catch(() => {
          setTodos([]);
        });
    }
  }, [updateTodosCondition]);

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/*"
            element={
              <TodoForm setupdateTodosCondition={setupdateTodosCondition} />
            }
          />
          <Route
            exact
            path="todos/*"
            element={
              <Todos
                todos={todos}
                setupdateTodosCondition={setupdateTodosCondition}
              />
            }
          >
            <Route
              path="active/*"
              element={
                <Todos
                  todos={todos.filter((todo) => !todo.isCompleted)}
                  setupdateTodosCondition={setupdateTodosCondition}
                />
              }
            />
            <Route
              path="completed/*"
              element={
                <Todos
                  todos={todos.filter((todo) => todo.isCompleted)}
                  setupdateTodosCondition={setupdateTodosCondition}
                />
              }
            />
            <Route
              path="addtodo"
              element={
                <TodoForm setupdateTodosCondition={setupdateTodosCondition} />
              }
            />
            <Route
              path=":todoId"
              element={
                <DetailedTodo
                  setupdateTodosCondition={setupdateTodosCondition}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
