import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="header-container">
      <NavLink to="/todos" end className="header-title">
        Todos
      </NavLink>
      <ul className="header-options">
        <NavLink
          to="/todos"
          end
          className={({ isActive }) =>
            `header-option ${isActive ? "header-option-active" : ""}`
          }
        >
          All
        </NavLink>
        <NavLink
          to="/todos/active"
          end
          className={({ isActive }) =>
            `header-option ${isActive ? "header-option-active" : ""}`
          }
        >
          Active
        </NavLink>
        <NavLink
          to="/todos/completed"
          end
          className={({ isActive }) =>
            `header-option ${isActive ? "header-option-active" : ""}`
          }
        >
          Completed
        </NavLink>
      </ul>
      <NavLink
        to="/todos/addtodo"
        end
        className={({ isActive }) =>
          `header-add-option  ${isActive ? "header-add-option-active" : ""}`
        }
      >
        Add a Todo
      </NavLink>
    </div>
  );
}
