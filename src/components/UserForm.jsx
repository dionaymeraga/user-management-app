import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = ({ users, addUser, updateUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const editingUser = users?.find((u) => u.id === Number(id));

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" },
    },
    company: { name: "", catchPhrase: "", bs: "" },
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name || "",
        username: editingUser.username || "",
        email: editingUser.email || "",
        phone: editingUser.phone || "",
        website: editingUser.website || "",
        address: {
          street: editingUser.address?.street || "",
          suite: editingUser.address?.suite || "",
          city: editingUser.address?.city || "",
          zipcode: editingUser.address?.zipcode || "",
          geo: {
            lat: editingUser.address?.geo?.lat || "",
            lng: editingUser.address?.geo?.lng || "",
          },
        },
        company: {
          name: editingUser.company?.name || "",
          catchPhrase: editingUser.company?.catchPhrase || "",
          bs: editingUser.company?.bs || "",
        },
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nested fields
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else if (name.startsWith("geo.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          geo: { ...prev.address.geo, [key]: value },
        },
      }));
    } else if (name.startsWith("company.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Name and Email are required");
      return;
    }

    if (editingUser) {
      updateUser(editingUser.id, formData);
    } else {
      addUser(formData);
    }

    navigate("/users");
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "700px" }}>
      <div className="card-body">
        <h4 className="card-title mb-3">
          {editingUser ? "Edit User" : "Add User"}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name*</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Email*</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Website</label>
            <input
              type="text"
              className="form-control"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <h5 className="mt-4">Address</h5>
          <div className="mb-3">
            <label>Street</label>
            <input
              type="text"
              className="form-control"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Suite</label>
            <input
              type="text"
              className="form-control"
              name="address.suite"
              value={formData.address.suite}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Zipcode</label>
            <input
              type="text"
              className="form-control"
              name="address.zipcode"
              value={formData.address.zipcode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Geo Latitude</label>
            <input
              type="text"
              className="form-control"
              name="geo.lat"
              value={formData.address.geo.lat}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Geo Longitude</label>
            <input
              type="text"
              className="form-control"
              name="geo.lng"
              value={formData.address.geo.lng}
              onChange={handleChange}
            />
          </div>

          {/* Company */}
          <h5 className="mt-4">Company</h5>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Catch Phrase</label>
            <input
              type="text"
              className="form-control"
              name="company.catchPhrase"
              value={formData.company.catchPhrase}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>BS</label>
            <input
              type="text"
              className="form-control"
              name="company.bs"
              value={formData.company.bs}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            {editingUser ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
