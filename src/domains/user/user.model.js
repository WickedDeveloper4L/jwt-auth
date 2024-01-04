const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
