import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div style={{ background: "#0d6efd", padding: "10px 24px", color: "#fff" }}>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 600 }}>Welcome to Apna College</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {token ? (
            <>
              <Link
                to="/profile"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Profile
              </Link>
              <Link
                to="/topics"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Topics
              </Link>
              <Link
                to="/progress"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Progress
              </Link>
              <button
                className="btn"
                onClick={logout}
                style={{
                  border: "1px solid #fff",
                  color: "#fff",
                  background: "transparent",
                  padding: "6px 10px",
                  borderRadius: 6,
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
