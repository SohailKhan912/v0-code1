const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    items: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    customerInfo: {
      email: String,
      name: String,
      phone: String,
    },
    shippingAddress: {
      address: String,
      city: String,
      pincode: String,
    },
    razorpayOrderId: String,
    paymentId: String,
  },
  { timestamps: true }
)

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema)
