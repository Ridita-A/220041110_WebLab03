import { useEffect, useState } from "react";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getUsers")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="users-container">
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Membership</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.membershipType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;