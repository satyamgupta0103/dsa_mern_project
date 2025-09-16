import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <div className="header">
        <h1>Dashboard</h1>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ alignSelf: "center" }}></span>
        </div>
      </div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
