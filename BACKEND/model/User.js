const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: String,
  ename: String,
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" }
});

// FIX: Prevent OverwriteModelError
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
