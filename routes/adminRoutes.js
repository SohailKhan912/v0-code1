const express = require("express")
const router = express.Router()
const { protect, admin } = require("../middleware/auth")
const Order = require("../models/Order")
const User = require("../models/User")

// @desc    Get all orders (Admin only)
// @route   GET /api/admin/orders
// @access  Private/Admin
router.get("/orders", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "email name")
      .sort({ createdAt: -1 })

    res.json({ success: true, orders })
  } catch (error) {
    console.error("❌ Error fetching orders:", error)
    res.status(500).json({ success: false, message: "Failed to fetch orders" })
  }
})

// @desc    Get dashboard stats (Admin only)
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get("/stats", protect, admin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments()
    const totalUsers = await User.countDocuments()
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ])

    const recentOrders = await Order.find({})
      .populate("userId", "email name")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-password")

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentOrders,
        recentUsers,
      },
    })
  } catch (error) {
    console.error("❌ Error fetching stats:", error)
    res.status(500).json({ success: false, message: "Failed to fetch stats" })
  }
})

// @desc    Update order status (Admin only)
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
router.put("/orders/:id", protect, admin, async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true })

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" })
    }

    res.json({ success: true, message: "Order updated", order: updatedOrder })
  } catch (error) {
    console.error("❌ Error updating order:", error)
    res.status(500).json({ success: false, message: "Failed to update order" })
  }
})

module.exports = router

