import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./components/Users.jsx";
import UserData from "./components/UserData.jsx";
import UserForm from "./components/UserForm.jsx";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers([...localUsers, ...res.data]))
      .catch((err) => console.error(err));
  }, []);

  const addUser = (user) => {
    const newUser = { id: Date.now(), ...user };
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([newUser, ...localUsers]));
  };

  const updateUser = (id, updatedUser) => {
    const newUsers = users.map((u) =>
      u.id === id ? { ...u, ...updatedUser } : u
    );
    setUsers(newUsers);

    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedLocal = localUsers.map((u) =>
      u.id === id ? { ...u, ...updatedUser } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedLocal));
  };

  const deleteUser = (id) => {
    const newUsers = users.filter((u) => u.id !== id);
    setUsers(newUsers);

    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedLocal = localUsers.filter((u) => u.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedLocal));
  };

  return (
    <BrowserRouter>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <div
          className="bg-dark text-white p-3"
          style={{ width: "250px", minHeight: "100vh" }}
        >
          <h3 className="mb-4">Dashboard</h3>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/users">
                Users
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/users/add">
                Add User
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-grow-1 p-4">
          <h1 className="mb-4">User Management App </h1>
          <Routes>
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/add" element={<UserForm addUser={addUser} />} />
            <Route
              path="/users/:id"
              element={<UserData users={users} deleteUser={deleteUser} />}
            />
            <Route
              path="/users/edit/:id"
              element={<UserForm users={users} updateUser={updateUser} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
