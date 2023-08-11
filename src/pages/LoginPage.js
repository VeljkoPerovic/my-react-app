import React, { useState } from "react";
import "../styles/login.scss";
import Swal from "sweetalert2";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const allowedUsers = [
    {
      email: "user1@user.com",
      password: "user1",
      name: "User 1",
      roles: ["user"],
    },
    {
      email: "user2@user.com",
      password: "user2",
      name: "User 2",
      roles: ["user"],
    },
    {
      email: "user3@user.com",
      password: "user3",
      name: "User 3",
      roles: ["user"],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    let user;
    for (let i = 0; i < allowedUsers.length; i++) {
      if (
        allowedUsers[i].email === email &&
        allowedUsers[i].password === password
      ) {
        user = allowedUsers[i];

        break;
      }
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation error",
        text: "Wrong email or password, try again.",
      });
    }
  };

  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <h3>Email:</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <h3>Password:</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Log in</button>
      </div>
    </form>
  );
}

export default LoginPage;
