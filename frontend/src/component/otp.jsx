import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Login.css";

export default function OtpVerify() {
  const location = useLocation();
  const email = location.state?.email; // 👈 received email

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/verify-otp/",
        {
          email,
          otp,
        }
      );

      setMessage("OTP Verified ✅");
    } catch (err) {
      setMessage("Invalid OTP ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Verify OTP</h2>

        {/* 👇 Show email */}
        <p className="msg">
          OTP sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              type="text"
              required
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <span>Enter OTP</span>
          </div>

          <button type="submit">Verify</button>
        </form>

        <p className="msg">{message}</p>
      </div>
    </div>
  );
}