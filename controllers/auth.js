import genToken from "../config/token.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check empty fields
    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Email validation
   const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu)$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    // Username check
    const checkUser = await User.findOne({ userName });

    if (checkUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Email check
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = await genToken(user._id);

    // Save cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(201).json({
      message: "Signup successful",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      message: `Signup error ${error}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    // Password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    // Generate token
    const token = await genToken(user._id);

    // Save cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      message: `Login error ${error}`,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    return res.status(500).json({
      message: `Logout error ${error}`,
    });
  }
};
