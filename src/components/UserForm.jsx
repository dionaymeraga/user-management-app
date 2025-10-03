import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserForm({ addUser, updateUser, users }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id && updateUser);

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
    if (isEdit && users) {
      const user = users.find((u) => u.id.toString() === id);
      if (user) setFormData(user);
    }
  }, [id, isEdit, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.geo.")) {
      const key = name.split(".")[2];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          geo: { ...formData.address.geo, [key]: value },
        },
      });
    } else if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [key]: value },
      });
    } else if (name.startsWith("company.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        company: { ...formData.company, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and Email are required");
      return;
    }

    if (isEdit) {
      updateUser(parseInt(id), formData);
    } else {
      addUser({ id: Date.now(), ...formData });
    }

    navigate("/users");
  };

  return (
    <form onSubmit={handleSubmit} className="container-fluid py-3">
      <h5 className="mb-4">{isEdit ? "Edit User" : "Add New User"}</h5>

      <div className="row g-3">
        {/* Basic Info */}
        <div className="col-12 col-lg-6">
          <div className="p-3 border rounded shadow-sm bg-white h-100">
            <h6 className="mb-3">Basic Info</h6>
            {["name", "username", "email", "phone", "website"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="form-control mb-2"
                required={field === "name" || field === "email"}
              />
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="col-12 col-lg-6">
          <div className="p-3 border rounded shadow-sm bg-white h-100">
            <h6 className="mb-3">Address</h6>
            <input
              type="text"
              name="address.street"
              placeholder="Street"
              value={formData.address.street || ""}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <input
              type="text"
              name="address.suite"
              placeholder="Suite"
              value={formData.address.suite || ""}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="text"
                  name="address.city"
                  placeholder="City"
                  value={formData.address.city || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  name="address.zipcode"
                  placeholder="Zipcode"
                  value={formData.address.zipcode || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <h6 className="mt-3">Geo</h6>
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="text"
                  name="address.geo.lat"
                  placeholder="Latitude"
                  value={formData.address.geo.lat || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  name="address.geo.lng"
                  placeholder="Longitude"
                  value={formData.address.geo.lng || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company */}
        <div className="col-12 col-lg-6">
          <div className="p-3 border rounded shadow-sm bg-white h-100">
            <h6 className="mb-3">Company</h6>
            {["name", "catchPhrase", "bs"].map((field) => (
              <input
                key={field}
                type="text"
                name={`company.${field}`}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData.company[field] || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary">
          {isEdit ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
