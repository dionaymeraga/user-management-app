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
      <div className="mb-3 d-flex gap-2 flex-wrap align-items-center">
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
          className="btn btn-secondary d-flex align-items-center gap-1"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <i className="bi bi-filter"></i>
          <span>{sortOrder === "asc" ? "A-Z" : "Z-A"}</span>
        </button>
      </div>

      <div className="user-cards row">
        {sortedUsers.map((user) => (
          <div key={user.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Company:</strong> {user.company?.name || "-"}
                </p>

                <div className="d-flex gap-2 flex-wrap">
                  <Link to={`/users/${user.id}`} className="btn btn-view">
                    <i className="bi bi-eye"></i> View
                  </Link>

                  <Link to={`/users/edit/${user.id}`} className="btn btn-edit">
                    <i className="bi bi-pencil"></i> Edit
                  </Link>

                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
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
