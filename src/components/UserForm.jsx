import React, { useState } from "react";

function UserForm({ addUser }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [key]: value },
      });
    } else if (name.startsWith("geo.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          geo: { ...formData.address.geo, [key]: value },
        },
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
    addUser({ id: Date.now(), ...formData });
    setFormData({
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
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>Add New User</h5>

      {/* Basic Info */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
        className="form-control mb-2"
      />

      {/* Address */}
      <h6>Address (optional)</h6>
      <input
        type="text"
        name="address.street"
        placeholder="Street"
        value={formData.address.street}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="address.suite"
        placeholder="Suite"
        value={formData.address.suite}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="address.city"
        placeholder="City"
        value={formData.address.city}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="address.zipcode"
        placeholder="Zipcode"
        value={formData.address.zipcode}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="geo.lat"
        placeholder="Latitude"
        value={formData.address.geo.lat}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="geo.lng"
        placeholder="Longitude"
        value={formData.address.geo.lng}
        onChange={handleChange}
        className="form-control mb-2"
      />

      {/* Company */}
      <h6>Company (optional)</h6>
      <input
        type="text"
        name="company.name"
        placeholder="Company Name"
        value={formData.company.name}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="company.catchPhrase"
        placeholder="Catch Phrase"
        value={formData.company.catchPhrase}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="company.bs"
        placeholder="BS"
        value={formData.company.bs}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <button type="submit" className="btn btn-primary mt-2">
        Add User
      </button>
    </form>
  );
}

export default UserForm;
