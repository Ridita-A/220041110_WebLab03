import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Gym Management System</h1>

      <div className="button-group">
        <button onClick={() => navigate("/users")}>Users</button>
        <button onClick={() => navigate("/trainers")}>Trainers</button>
        <button onClick={() => navigate("/workouts")}>Workouts</button>
      </div>
    </div>
  );
}

export default Home;