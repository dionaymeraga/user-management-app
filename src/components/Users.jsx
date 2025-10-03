import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserForm from "./UserForm.jsx";

function Users({ users, addUser }) {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <UserForm addUser={addUser} />

      <input
        type="text"
        placeholder="Search by name or email"
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="list-group">
        {filteredUsers.map((user) => (
          <Link
            key={user.id}
            to={`/user/${user.id}`}
            className="list-group-item list-group-item-action"
          >
            <strong>{user.name}</strong> - {user.email} ({user.company?.name})
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Users;
