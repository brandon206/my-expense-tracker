const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

app.use(cors());
app.use(express.json());

//Database Connection
mongoose.connect(
  process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.post("/register", async (req, res) => {
  const username = req.body.name;
  const status = req.body.status;
  const role = req.body.role;

  const user = new UserModel({
    name: username,
    status: status,
    role: role,
  });
  await user.save();
  res.send('Success');
});

app.get("/read", async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`);
});