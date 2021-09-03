const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  // googleId: String,
});

mongoose.model("users", UsersSchema);