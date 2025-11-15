// controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ message: "Name & role are required" });
  }

  if (role === "parent" && (!email || !password)) {
    return res.status(400).json({ message: "Parent must have email & password" });
  }

  let hashedPassword = undefined;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  const token = signToken(user._id);

  res.status(201).json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      familyId: user.familyId
    }
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = signToken(user._id);

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      familyId: user.familyId
    }
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    familyId: user.familyId
  });
});
