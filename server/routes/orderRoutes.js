// ✅ server/routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ GET all orders (admin only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("💥 Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ POST create order (for users)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, city, pincode, amount } = req.body;

    if (!name || !email || !phone || !address || !city || !pincode) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const newOrder = new Order({
      name,
      email,
      phone,
      address,
      city,
      pincode,
      amount: amount || 0,
      status: "pending",
    });

    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    console.error("💥 Error creating order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ PUT update order status
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status || order.status;
    await order.save();

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("💥 Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
