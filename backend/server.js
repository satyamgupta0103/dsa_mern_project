require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const topicRoutes = require("./routes/topics");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

//Just to test
app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo connected");
    app.use("/api/auth", authRoutes);
    app.use("/api/topics", topicRoutes);

    app.get("/", (req, res) => res.send("DSA Sheet API"));

    app.listen(PORT, () => console.log("Server running on port", PORT));
  })
  .catch((err) => {
    console.error("DB connect err", err);
  });
