const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

//Database Connection
mongoose.connect(
  process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.get("/insert", async (req, res) => {
  const user = new UserModel({
    name: 'brandon',
    status: 'active',
    role: 'admin',
  });
  await user.save();
  res.send('inserted data');
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