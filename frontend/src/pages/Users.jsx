import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", age: "", membershipType: "basic" });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = () => {
    fetch("http://localhost:3000/api/users/getUsers")
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingId 
      ? `http://localhost:3000/api/users/updateUser/${editingId}`
      : "http://localhost:3000/api/users/createUser";
    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setFormData({ name: "", email: "", age: "", membershipType: "basic" });
        setEditingId(null);
        fetchUsers();
      });
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({ name: user.name, email: user.email, age: user.age, membershipType: user.membershipType });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:3000/api/users/deleteUser/${id}`, { method: "DELETE" })
        .then(() => fetchUsers());
    }
  };

  return (
    <div className="users-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <h2>Users</h2>

      <form onSubmit={handleSubmit} className="user-form">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <select name="membershipType" value={formData.membershipType} onChange={handleChange}>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="elite">Elite</option>
        </select>
        <button type="submit">{editingId ? "Update" : "Add"} User</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: "", email: "", age: "", membershipType: "basic" }); }}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Membership</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.membershipType}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;