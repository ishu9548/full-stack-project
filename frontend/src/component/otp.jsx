import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import verifyOtpQuery, { resendOtpQuery } from "../queries/otpQuery";
import "./Login.css";

export default function OtpVerify() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  // redirect if no email
  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  // timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const res = await verifyOtpQuery({ email, otp });

    if (res.success) {
      setMessage("OTP Verified ✅");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setMessage("Invalid OTP ❌");
    }

    setLoading(false);
  };

  const handleResend = async () => {
    if (timer > 0) return;

    const res = await resendOtpQuery(email);

    if (res.success) {
      setMessage("OTP resent 📩");
      setTimer(30);
    } else {
      setMessage("Failed to resend ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Verify OTP</h2>

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

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* 🔁 Resend Button */}
        <button onClick={handleResend} disabled={timer > 0}>
          {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
        </button>

        <p className="msg">{message}</p>
      </div>
    </div>
  );
}