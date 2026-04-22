import React, { useState } from "react";
import signupUser from "../queries/signupQuery";
import "./Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
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

    const res = await signupUser(formData);

    if (res.success) {
      setMessage("Signup successful ✅");
    } else {
      setMessage("Signup Failed ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Account</h2>

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
            type="email"
            name="email"
            required
            onChange={handleChange}
          />
          <span>Email</span>
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

        <button>Sign Up</button>

        <p className="msg">{message}</p>
      </div>
    </div>
  );
}