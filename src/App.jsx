import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

// Components
import Users from "./components/Users.jsx";
import UserData from "./components/UserData.jsx";
import UserForm from "./components/UserForm.jsx";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUsers, addUser, updateUser, deleteUser } from "./store/usersSlice";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  // Fetch users from API + localStorage
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

  // Add user
  const handleAddUser = (user) => {
    const newUser = { id: Date.now(), ...user };
    dispatch(addUser(newUser));

    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([newUser, ...localUsers]));
  };

  // Update user
  const handleUpdateUser = (id, updatedUser) => {
    dispatch(updateUser({ id, ...updatedUser }));

    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedLocal = localUsers.map((u) =>
      u.id === id ? { ...u, ...updatedUser } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedLocal));
  };

  // Delete user
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
          <h1 className="mb-3">User Management App</h1>
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
              element={<UserData users={users} deleteUser={handleDeleteUser} />}
            />
            <Route
              path="/users/edit/:id"
              element={<UserForm users={users} updateUser={handleUpdateUser} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
