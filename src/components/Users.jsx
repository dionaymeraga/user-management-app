import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers([...localUsers, ...res.data]))
      .catch((err) => console.log(err));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-3">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {filteredUsers.map((user) => (
          <div key={user.id} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                {user.company && (
                  <p className="card-text">
                    <small>{user.company.name}</small>
                  </p>
                )}
                <Link
                  to={`/users/${user.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
