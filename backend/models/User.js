const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema(
  {
    problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
    done: { type: Boolean, default: false },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    progress: [ProgressSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
