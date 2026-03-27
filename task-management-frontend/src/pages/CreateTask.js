import React, { useEffect, useState } from "react";
import { createTask } from "../services/taskService";
import { getUsers } from "../services/userService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "PENDING",
    priority: "LOW",
    assignedUserId: null,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = token
        ? JSON.parse(atob(token.split('.')[1])).role
        : null;

      // Only ADMIN fetch users
      if (role === "ADMIN") {
        const res = await getUsers();
        setUsers(res.data);
      }

    } catch (err) {
      console.log("User fetch skipped");
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...task };

      if (!payload.assignedUserId) {
        delete payload.assignedUserId;
      }

      console.log("PAYLOAD:", payload);

      await createTask(payload);
      navigate("/dashboard");

    } catch (err) {
      console.error("CREATE ERROR:", err.response?.data || err);
      alert("Error creating task");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2>Create Task</h2>

        <input
          className="form-control mb-2"
          placeholder="Title"
          onChange={(e) =>
            setTask({ ...task, title: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Description"
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
        />

        <select
          className="form-select mb-2"
          onChange={(e) =>
            setTask({ ...task, status: e.target.value })
          }
        >
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <select
          className="form-select mb-2"
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value })
          }
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        {/* Only ADMIN */}
        {users.length > 0 && (
          <select
            className="form-select mb-3"
            onChange={(e) =>
              setTask({
                ...task,
                assignedUserId: Number(e.target.value),
              })
            }
          >
            <option value="">Assign User (Optional)</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        )}

        <button className="btn btn-success" onClick={handleSubmit}>
          Create Task
        </button>
      </div>
    </div>
  );
}

export default CreateTask;