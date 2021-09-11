import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);

// //Database Connection
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`);
});
