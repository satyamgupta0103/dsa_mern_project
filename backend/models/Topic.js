const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: "Pending" }, // Pending / Done
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", TopicSchema);
