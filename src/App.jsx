import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Users.jsx";
import UserData from "./components/UserData.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addUser = (user) => {
    setUsers([{ id: Date.now(), ...user }, ...users]);
  };

  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">User Management App</h1>
        <Routes>
          <Route path="/" element={<Users users={users} addUser={addUser} />} />
          <Route path="/user/:id" element={<UserData users={users} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
