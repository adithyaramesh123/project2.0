const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  ename: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  dob: { type: Date },
  mobile: { type: String },
  address: { type: String },
  pincode: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String, default: 'INDIA' },
  role: { type: String, enum: ["admin", "user"], default: "user" }
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// FIX: Prevent OverwriteModelError
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
