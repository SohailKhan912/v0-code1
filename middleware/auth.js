const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key-change-in-production")

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password")

      if (!req.user) {
        res.status(401)
        throw new Error("User not found")
      }

      next()
    } catch (error) {
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

// Admin only
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403)
    throw new Error("Not authorized as an admin")
  }
})

module.exports = { protect, admin }

