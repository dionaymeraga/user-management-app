import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import Users from "./components/Users.jsx";
import UserData from "./components/UserData.jsx";
import UserForm from "./components/UserForm.jsx";

import { useSelector, useDispatch } from "react-redux";
import { setUsers, addUser, updateUser, deleteUser } from "./store/usersSlice";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const allUsers = [...localUsers, ...res.data];
        dispatch(setUsers(allUsers));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handleAddUser = (user) => {
    const newUser = { id: Date.now(), ...user };
    dispatch(addUser(newUser));

    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([newUser, ...localUsers]));
  };

  const handleUpdateUser = (id, updatedUser) => {
    dispatch(updateUser({ id, ...updatedUser }));

    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedLocal = localUsers.map((u) =>
      u.id === id ? { ...u, ...updatedUser } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedLocal));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));

    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedLocal = localUsers.filter((u) => u.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedLocal));
  };

  return (
    <BrowserRouter>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <div
          className="bg-dark text-white px-3 pt-3"
          style={{ width: "250px", minHeight: "100vh" }}
        >
          <h3 className="m-0">Dashboard</h3>
          <ul className="nav flex-column mt-4">
            <li className="nav-item mb-3">
              <Link className="nav-link text-white" to="/users">
                Users
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link className="nav-link text-white" to="/users/add">
                Add User
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-grow-1 p-3">
          <h1 className="m-0">User Management App</h1>

          <div className="mt-3">
            <Routes>
              <Route
                path="/users"
                element={<Users users={users} deleteUser={handleDeleteUser} />}
              />
              <Route
                path="/users/add"
                element={<UserForm addUser={handleAddUser} />}
              />
              <Route
                path="/users/:id"
                element={
                  <UserData users={users} deleteUser={handleDeleteUser} />
                }
              />
              <Route
                path="/users/edit/:id"
                element={
                  <UserForm users={users} updateUser={handleUpdateUser} />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
