import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const loginUser = async (req, res) => {
  try {
    const potentialUser = await User.findOne({ username: req.body.username });
    if (!potentialUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      potentialUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ id: potentialUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .cookie("usertoken", token, { httpOnly: true })
      .status(200)
      .json({ message: "Login successful", user: potentialUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

export const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    const token = createToken(savedUser._id);
    res
      .cookie("usertoken", token, { httpOnly: true })
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("usertoken");
  res.status(200).json({ message: "Successfully logged out" });
};
