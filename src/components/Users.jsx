import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/usersSlice";

const Users = ({ users }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = sortKey === "company" ? a.company.name : a[sortKey];
    const valB = sortKey === "company" ? b.company.name : b[sortKey];
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleDelete = (id) => {
    dispatch(deleteUser(id));

    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedLocal = localUsers.filter((u) => u.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedLocal));
  };

  return (
    <div>
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="company">Company</option>
        </select>

        <button
          className="btn btn-secondary"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <div className="row">
        {sortedUsers.map((user) => (
          <div key={user.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Company:</strong> {user.company?.name || "-"}
                </p>
                <Link to={`/users/${user.id}`} className="btn btn-primary me-2">
                  View
                </Link>
                <Link
                  to={`/users/edit/${user.id}`}
                  className="btn btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {sortedUsers.length === 0 && <p className="mt-3">No users found.</p>}
      </div>
    </div>
  );
};

export default Users;
