const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/auth")
const Product = require("../models/Product")

// @desc    Get all products (user view)
// @route   GET /api/users/products
// @access  Private
router.get("/products", protect, async (req, res) => {
  try {
    const products = await Product.find({ status: "active" }).sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: products.length, products })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router

