import React from "react";

export default function Profile() {
  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "";
  return (
    <div>
      <h2>Welcome {name}</h2>
      <p>Email: {email}</p>
      <hr />
      <footer style={{ textAlign: "center", marginTop: 20 }}>
        © 2024 Dashboard. All Rights Reserved.
      </footer>
    </div>
  );
}
