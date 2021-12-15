const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase(); // ensure email are in lowercase
  next();
});

module.exports = mongoose.model("User", userSchema);
