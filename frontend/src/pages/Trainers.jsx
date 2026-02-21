import { useEffect, useState } from "react";
import "./Trainers.css";

function Trainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/trainers/getTrainers")
      .then(res => res.json())
      .then(data => setTrainers(data));
  }, []);

  return (
    <div className="trainers-container">
      <h2>Trainers</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Hourly Rate</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map(trainer => (
            <tr key={trainer._id}>
              <td>{trainer.name}</td>
              <td>{trainer.email}</td>
              <td>{trainer.hourlyRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trainers;