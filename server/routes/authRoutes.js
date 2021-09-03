const passport = require("passport");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("users");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  
  app.get("/auth/google/callback", passport.authenticate("google"));
  
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.post('/api/change-password', async (req, res) => {
    const { token, email, currentPassword, newPassword } = req.body;
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(user);
      const _id = user.id;
      const password = await bcrypt.hash(newPassword, 10);
      await User.updateOne(
        { _id },
        {
          $set: { password },
        },
      );
      return res.json({ status: 'success'});
    } catch(err) {
      return res.json({ status: 'error', error: 'Invalid token, email, or password' });
    }
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.json({ status: 'error', error: 'Account does not exist' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
      console.log('token: ', token);
      return res.json({ status: 'success', token: token });
    }
    return res.json({ status: 'error', error: 'Invalid email/password' });
  });

  app.post("/api/register", async (req, res) => {
    console.log('in register: ', req.body);
    const { email, password } = req.body;
    if (!email || typeof email !== 'string') {
      return res.json({ status: 'error', error: 'invalid email'});
    }
    if (!password || typeof password !== 'string') {
      return res.json({ status: 'error', error: 'invalid password'});
    }
    // can add check to see if password is at least 8 chars and contains a special char
    const hashedPw = await bcrypt.hash(password, 10);
    try {
      new User({ email, password: hashedPw }).save();
    } catch(err) {
      if (err.code === 11000) {
        // duplicate key
        return res.json({ status: 'error', error: 'email already in use'});
      } else {
        throw err;
      }
    }
    res.json({ status: 'success' });
  });
};
