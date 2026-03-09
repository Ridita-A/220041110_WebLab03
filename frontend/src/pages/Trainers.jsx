import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Trainers.css";

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    experienceYears: "",
    hourlyRate: "",
    available: true,
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTrainers = () => {
    fetch("http://localhost:3000/api/trainers/getTrainers")
      .then((res) => res.json())
      .then((data) => setTrainers(data));
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:3000/api/trainers/updateTrainer/${editingId}`
      : "http://localhost:3000/api/trainers/createTrainer";
    const method = editingId ? "PUT" : "POST";

    const payload = {
      ...formData,
      specialization: formData.specialization.split(",").map(s => s.trim()),
    };

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      setFormData({
        name: "",
        email: "",
        specialization: "",
        experienceYears: "",
        hourlyRate: "",
        available: true,
      });
      setEditingId(null);
      fetchTrainers();
    });
  };

  const handleEdit = (trainer) => {
    setEditingId(trainer._id);
    setFormData({
      name: trainer.name,
      email: trainer.email,
      specialization: trainer.specialization.join(", "),
      experienceYears: trainer.experienceYears,
      hourlyRate: trainer.hourlyRate,
      available: trainer.available,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:3000/api/trainers/deleteTrainer/${id}`, {
        method: "DELETE",
      }).then(() => fetchTrainers());
    }
  };

  return (
    <div className="trainers-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <h2>Trainers</h2>

      <form onSubmit={handleSubmit} className="trainer-form">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="specialization" placeholder="Specialization (yoga, cardio...)" value={formData.specialization} onChange={handleChange} required />
        <input name="experienceYears" type="number" placeholder="Experience Years" value={formData.experienceYears} onChange={handleChange} required />
        <input name="hourlyRate" type="number" placeholder="Hourly Rate" value={formData.hourlyRate} onChange={handleChange} required />
        <label>
          Available:
          <input name="available" type="checkbox" checked={formData.available} onChange={handleChange} />
        </label>
        <button type="submit">{editingId ? "Update" : "Add"} Trainer</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: "", email: "", specialization: "", experienceYears: "", hourlyRate: "", available: true }); }}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Years</th>
            <th>Hourly Rate</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id}>
              <td>{trainer.name}</td>
              <td>{trainer.email}</td>
              <td>{trainer.specialization.join(", ")}</td>
              <td>{trainer.experienceYears}</td>
              <td>{trainer.hourlyRate}</td>
              <td>{trainer.available ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleEdit(trainer)}>Edit</button>
                <button onClick={() => handleDelete(trainer._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trainers;