import React, { useState } from "react";
import loginUser from "../queries/loginQuery";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loginUser(formData);

    if (res.success) {
      setMessage("Login successful ✅");
    } else {
      setMessage("Invalid credentials ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome Back</h2>

        <div className="inputBox">
          <input
            type="text"
            name="username"
            required
            onChange={handleChange}
          />
          <span>Username</span>
        </div>

        <div className="inputBox">
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
          />
          <span>Password</span>
        </div>

        <button>Login</button>

        <p className="msg">{message}</p>

        <p className="switch">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}