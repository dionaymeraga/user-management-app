import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const UserData = ({ users, deleteUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = users.find((u) => u.id.toString() === id);

  if (!user) return <p className="m-3">User not found</p>;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(user.id);
      navigate("/users");
    }
  };

  return (
    <div className="container mt-3">
      <h3>{user.name}</h3>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
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
        <>
          <h5>Address</h5>
          <p>
            {user.address.street}, {user.address.suite}, {user.address.city},{" "}
            {user.address.zipcode}
          </p>
          {user.address.geo && (
            <p>
              <strong>Geo:</strong> lat {user.address.geo.lat}, lng{" "}
              {user.address.geo.lng}
            </p>
          )}
        </>
      )}

      {user.company && (
        <>
          <h5>Company</h5>
          <p>
            <strong>Name:</strong> {user.company.name}
          </p>
          <p>
            <strong>Catch Phrase:</strong> {user.company.catchPhrase}
          </p>
          <p>
            <strong>BS:</strong> {user.company.bs}
          </p>
        </>
      )}

      <div className="mt-3">
        <Link to={`/users/edit/${user.id}`} className="btn btn-warning me-2">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger me-2">
          Delete
        </button>
        <Link to="/users" className="btn btn-secondary">
          Back to Users
        </Link>
      </div>
    </div>
  );
};

export default UserData;
