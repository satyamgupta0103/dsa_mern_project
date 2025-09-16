const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    name: { type: String, required: true },
    leetLink: String,
    youtubeLink: String,
    articleLink: String,
    level: { type: String, enum: ["EASY", "MEDIUM", "HARD"], default: "EASY" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", ProblemSchema);
