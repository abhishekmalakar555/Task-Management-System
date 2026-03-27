import React, { useEffect, useState, useMemo } from "react";
import { getTasks, deleteTask, updateTaskStatus } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const navigate = useNavigate();

  const role = useMemo(() => {
    const token = localStorage.getItem("token");
    const decoded = token ? JSON.parse(atob(token.split(".")[1])) : null;
    return decoded?.role;
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleStatusUpdate = async (id) => {
    if (!newStatus) return;
    await updateTaskStatus(id, newStatus);
    setEditingTaskId(null);
    setNewStatus("");
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter && task.status !== filter) return false;
    return true;
  });

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2>Tasks</h2>

        {/* FILTER */}
        <select
          className="form-select w-25 mb-3"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <div className="row">
          {filteredTasks.map((task) => (
            <div className="col-md-4" key={task.id}>
              <div className="card mb-3 shadow">
                <div className="card-body">

                  <h5>{task.title}</h5>
                  <p>{task.description}</p>
                  <p>Status: {task.status}</p>
                  <p>Priority: {task.priority}</p>
                  <p>
                    <strong>Assigned To: </strong>
                    {task.assignedUserName || "None"}
                  </p>

                  {/* ADMIN CONTROLS */}
                  {role === "ADMIN" && (
                    <>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => navigate(`/edit-task/${task.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {/* USER CONTROLS — only for tasks assigned to them, not unassigned */}
                  {role === "USER" && task.assignedUserName !== null && (
                    <>
                      {editingTaskId === task.id ? (
                        <div className="mt-2">
                          <select
                            className="form-select form-select-sm mb-2"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                          >
                            <option value="">Select Status</option>
                            <option value="PENDING">PENDING</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleStatusUpdate(task.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              setEditingTaskId(null);
                              setNewStatus("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-warning btn-sm mt-2"
                          onClick={() => {
                            setEditingTaskId(task.id);
                            setNewStatus(task.status);
                          }}
                        >
                          Update Status
                        </button>
                      )}
                    </>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;