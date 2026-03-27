import React, { useEffect, useState } from "react";
import { updateTask, getTasks } from "../services/taskService";
import { getUsers } from "../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({});
  const [users, setUsers] = useState([]);
  const [isAllowed, setIsAllowed] = useState(false);

  const token = localStorage.getItem("token");
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const role = decoded?.role;
  const userName = decoded?.name;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const tasksRes = await getTasks();
      const current = tasksRes.data.find(
        (t) => t.id === parseInt(id)
      );

      setTask(current);

      if (role === "USER") {
        if (current?.assignedUserName === userName) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      }

      if (role === "ADMIN") {
        const usersRes = await getUsers();
        setUsers(usersRes.data);
        setIsAllowed(true);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!isAllowed) {
        alert("Not allowed");
        return;
      }

      if (role === "USER") {
        await updateTask(id, { status: task.status });
      } else {
        await updateTask(id, task);
      }

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Error updating");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2>Edit Task</h2>

        {role === "ADMIN" ? (
          <>
            <input
              className="form-control mb-2"
              value={task.title || ""}
              onChange={(e) =>
                setTask({ ...task, title: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              value={task.description || ""}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />

            <select
              className="form-select mb-2"
              value={task.status || "PENDING"}
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
              value={task.priority || "LOW"}
              onChange={(e) =>
                setTask({ ...task, priority: e.target.value })
              }
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>

            <select
              className="form-select mb-2"
              value={task.assignedUserId || ""}
              onChange={(e) =>
                setTask({
                  ...task,
                  assignedUserId: e.target.value
                    ? Number(e.target.value)
                    : null,
                })
              }
            >
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <h5>{task.title}</h5>
            <p>{task.description}</p>

            <p>
              <strong>Assigned To:</strong>{" "}
              {task.assignedUserName || "None"}
            </p>

            {isAllowed ? (
              <select
                className="form-select mb-2"
                value={task.status || "PENDING"}
                onChange={(e) =>
                  setTask({ ...task, status: e.target.value })
                }
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            ) : (
              <p className="text-danger">
                Not assigned to you
              </p>
            )}
          </>
        )}

        <button
          className="btn btn-success"
          onClick={handleUpdate}
          disabled={!isAllowed}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditTask;