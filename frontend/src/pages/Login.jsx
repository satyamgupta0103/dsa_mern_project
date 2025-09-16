import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      navigate("/topics");
    } catch (err) {
      setErr(err.response?.data?.message || "Error");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      setIsRegister(false);
      setErr("Registered. Please login.");
    } catch (err) {
      setErr(err.response?.data?.message || "Error");
    }
  }

  return (
    <div>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
            <div className="form-group">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <button className="btn btn-primary" type="submit">
              {isRegister ? "Register" : "Login"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setIsRegister(!isRegister)}
              style={{ border: "1px solid #ccc" }}
            >
              {isRegister ? "Have account? Login" : "Register"}
            </button>
          </div>
        </form>
        {err && <p style={{ color: "red" }}>{err}</p>}
      </div>
    </div>
  );
}
