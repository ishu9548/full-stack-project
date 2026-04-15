import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // 👈 import CSS

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
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

  try {
    const res = await axios.post(
      "http://localhost:5000/login",
      formData
    );

    // ✅ SAVE TOKEN
    localStorage.setItem("token", res.data.token);

    setMessage("Login Successful ✅");
  } catch (error) {
    setMessage("Invalid Credentials ❌");
  }
};

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p className="message">{message}</p>
      </form>
    </div>
  );
}