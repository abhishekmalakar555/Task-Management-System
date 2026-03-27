import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { register } from "../services/authService";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleCreate = async () => {
    await register(newUser);
    fetchUsers();
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2>User Management</h2>

        <div className="card p-3 mb-4 shadow">
          <h5>Create User</h5>

          <input className="form-control mb-2"
            placeholder="Name"
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />

          <input className="form-control mb-2"
            placeholder="Email"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />

          <input className="form-control mb-2"
            placeholder="Password"
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />

          <select className="form-select mb-2"
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button className="btn btn-success" onClick={handleCreate}>
            Create User
          </button>
        </div>

        <div className="row">
          {users.map(user => (
            <div className="col-md-4" key={user.id}>
              <div className="card p-3 shadow mb-3">
                <h5>{user.name}</h5>
                <p>{user.email}</p>
                <span className="badge bg-secondary">{user.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;