const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("dotenv").config();
require("./models/User");
require("./services/passport");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
}));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

//Database Connection
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`);
});
