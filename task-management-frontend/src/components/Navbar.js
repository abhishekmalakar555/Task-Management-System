import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Decode role from token
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Task Manager</span>

      <div>
        <button className="btn btn-light me-2" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button className="btn btn-success me-2" onClick={() => navigate("/create-task")}>
          Create Task
        </button>

        {role === "ADMIN" && (
          <button className="btn btn-warning me-2" onClick={() => navigate("/users")}>
            Users
          </button>
        )}

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;