import { useEffect, useState } from "react";
import "./Workouts.css";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/workouts/")
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);

  return (
    <div className="workouts-container">
      <h2>Workouts</h2>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map(workout => (
            <tr key={workout._id}>
              <td>{workout.workoutType}</td>
              <td>{workout.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;