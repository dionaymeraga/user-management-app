import React from "react";
import { useParams, Link } from "react-router-dom";

function UserData({ users }) {
  const { id } = useParams();
  const user = users.find((u) => u.id.toString() === id);

  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <Link to="/" className="btn btn-secondary mb-3">
        Back
      </Link>
      <h2>{user.name}</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {user.phone && (
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      )}
      {user.website && (
        <p>
          <strong>Website:</strong> {user.website}
        </p>
      )}
      {user.address && (
        <p>
          <strong>Address:</strong> {user.address.street}, {user.address.city}
        </p>
      )}
      {user.company && (
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
      )}
    </div>
  );
}

export default UserData;
