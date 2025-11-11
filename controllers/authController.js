const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your-secret-key-change-in-production", {
    expiresIn: "30d",
  })
}

// Helper to shape user payload
const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
})

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please add all fields" })
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ message: "User already exists" })
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "user",
  })

  const safeUser = sanitizeUser(user)
  return res.status(201).json({
    token: generateToken(user._id),
    user: safeUser,
  })
})

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  console.log("📥 Login request received:", { email: req.body?.email, hasPassword: !!req.body?.password })
  
  const { email, password } = req.body

  if (!email || !password) {
    console.log("❌ Missing email or password")
    return res.status(400).json({ message: "Please add email and password" })
  }

  // Find user by email (case-insensitive) and include password
  const normalizedEmail = email.toLowerCase().trim()
  const user = await User.findOne({ email: normalizedEmail }).select("+password")
  
  if (!user) {
    console.log("❌ User not found:", normalizedEmail)
    return res.status(401).json({ message: "Invalid credentials" })
  }

  // Compare password using bcrypt directly (more reliable)
  const bcrypt = require("bcryptjs")
  
  // Check if password is already hashed (starts with $2)
  if (!user.password || !user.password.startsWith("$2")) {
    console.log("❌ Password not properly hashed for:", normalizedEmail)
    return res.status(401).json({ message: "Invalid credentials" })
  }
  
  const isMatch = await bcrypt.compare(password.trim(), user.password)
  
  if (!isMatch) {
    console.log("❌ Password mismatch for:", normalizedEmail)
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const safeUser = sanitizeUser(user)
  const token = generateToken(user._id)
  
  console.log("✅ Login successful for:", user.email, "Role:", user.role)
  console.log("🔑 Token generated:", token ? "Yes" : "No")
  
  const response = {
    token,
    user: safeUser,
  }
  
  console.log("📤 Sending response:", JSON.stringify(response, null, 2))
  
  return res.status(200).json(response)
})

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: sanitizeUser(req.user),
  })
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
}

