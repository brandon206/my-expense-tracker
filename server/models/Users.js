const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("users", UsersSchema);

module.exports = UserModel;