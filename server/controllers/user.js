import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = async (req, res) => {
  const { email, password } = req.body.form;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ result: existingUser, token });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const register = async (req, res) => {
  const { email, password, confirmPassword } = req.body.form;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('hashed password: ', hashedPassword);
    const result = await User.create({ email, password: hashedPassword });
    console.log('result: ', result);
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ result, token });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const changePassword = async (req, res) => {
  const { token, email, currentPassword, newPassword } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const _id = user.id;
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      hashedNewPassword
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
    await User.updateOne(
      { _id },
      {
        $set: { hashedNewPassword },
      },
    );
    return res.status(200).json({ status: 'Successfully Changed Password!'});
  } catch (err) {
    return res.status(400).json({ message: "Invalid Credentials!" });
  }
};
