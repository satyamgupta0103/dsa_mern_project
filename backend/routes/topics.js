const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Topic = require("../models/Topic");
const Problem = require("../models/Problem");
const User = require("../models/User");

// get all topics with problems
router.get("/", auth, async (req, res) => {
  try {
    const topics = await Topic.find().lean();
    const problems = await Problem.find().lean();
    // attach problems to topic
    const map = topics.map((t) => ({
      ...t,
      problems: problems.filter((p) => p.topic.toString() === t._id.toString()),
    }));
    res.json({ topics: map });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// toggle progress for user: mark problem done/undone
router.post("/toggle", auth, async (req, res) => {
  const { problemId, done } = req.body;
  if (!problemId) return res.status(400).json({ message: "Missing problemId" });
  try {
    const user = await User.findById(req.user._id);
    const idx = user.progress.findIndex(
      (p) => p.problem.toString() === problemId
    );
    if (idx === -1) {
      user.progress.push({ problem: problemId, done: !!done });
    } else {
      user.progress[idx].done = !!done;
    }
    await user.save();
    res.json({ message: "ok", progress: user.progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get user's progress
router.get("/progress", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "progress.problem",
      model: "Problem",
    });
    res.json({ progress: user.progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
