const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  googleId: String
});

mongoose.model("users", UsersSchema);