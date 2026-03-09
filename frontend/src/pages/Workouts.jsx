import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Workouts.css";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [formData, setFormData] = useState({
    workoutType: "",
    load: "",
    reps: "",
    difficulty: "medium",
    user: "",
    trainer: "",
    scheduledAt: "",
    status: "scheduled",
    notes: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:3000/api/workouts/")
      .then(res => res.json())
      .then(data => setWorkouts(data));
    
    fetch("http://localhost:3000/api/users/getUsers")
      .then(res => res.json())
      .then(data => setUsers(data));

    fetch("http://localhost:3000/api/trainers/getTrainers")
      .then(res => res.json())
      .then(data => setTrainers(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingId 
      ? `http://localhost:3000/api/workouts/${editingId}`
      : "http://localhost:3000/api/workouts/";
    const method = editingId ? "PATCH" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setFormData({
          workoutType: "",
          load: "",
          reps: "",
          difficulty: "medium",
          user: "",
          trainer: "",
          scheduledAt: "",
          status: "scheduled",
          notes: ""
        });
        setEditingId(null);
        fetchData();
      });
  };

  const handleEdit = (workout) => {
    setEditingId(workout._id);
    setFormData({
      workoutType: workout.workoutType,
      load: workout.load,
      reps: workout.reps,
      difficulty: workout.difficulty,
      user: workout.user._id,
      trainer: workout.trainer._id,
      scheduledAt: workout.scheduledAt.substring(0, 16),
      status: workout.status,
      notes: workout.notes || ""
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:3000/api/workouts/${id}`, { method: "DELETE" })
        .then(() => fetchData());
    }
  };

  return (
    <div className="workouts-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <h2>Workouts</h2>

      <form onSubmit={handleSubmit} className="workout-form">
        <input name="workoutType" placeholder="Workout Type" value={formData.workoutType} onChange={handleChange} required />
        <input name="load" type="number" placeholder="Load" value={formData.load} onChange={handleChange} required />
        <input name="reps" type="number" placeholder="Reps" value={formData.reps} onChange={handleChange} required />
        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select name="user" value={formData.user} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
        <select name="trainer" value={formData.trainer} onChange={handleChange} required>
          <option value="">Select Trainer</option>
          {trainers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>
        <input name="scheduledAt" type="datetime-local" value={formData.scheduledAt} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">{editingId ? "Update" : "Add"} Workout</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ workoutType: "", load: "", reps: "", difficulty: "medium", user: "", trainer: "", scheduledAt: "", status: "scheduled", notes: "" }); }}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Load</th>
            <th>Reps</th>
            <th>Difficulty</th>
            <th>User</th>
            <th>Trainer</th>
            <th>Scheduled</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map(workout => (
            <tr key={workout._id}>
              <td>{workout.workoutType}</td>
              <td>{workout.load}</td>
              <td>{workout.reps}</td>
              <td>{workout.difficulty}</td>
              <td>{workout.user?.name || "N/A"}</td>
              <td>{workout.trainer?.name || "N/A"}</td>
              <td>{new Date(workout.scheduledAt).toLocaleString()}</td>
              <td>{workout.status}</td>
              <td>
                <button onClick={() => handleEdit(workout)}>Edit</button>
                <button onClick={() => handleDelete(workout._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;