const express = require("express")
const router = express.Router()
const Order = require("../models/Order")

router.post("/", async (req, res) => {
  try {
    const body = req.body || {}

    // Accept either nested customerInfo or flat fields
    const email = body?.customerInfo?.email || body.email
    const fullName = body?.customerInfo?.name || body.fullName
    const streetAddress = body?.shippingAddress?.address || body.streetAddress

    if (!email || !fullName || !streetAddress) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const order = await Order.create(body)
    return res.status(201).json({ success: true, order })
  } catch (err) {
    console.error("Order creation failed:", err)
    return res.status(500).json({ message: err?.message || "Order creation failed" })
  }
})

module.exports = router
