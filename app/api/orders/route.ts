import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"

// Use dynamic import for CommonJS models
let Order: any
let User: any

async function getModels() {
  if (!Order || !User) {
    const mongoose = await import("mongoose")
    const { default: OrderModel } = await import("@/models/Order")
    const { default: UserModel } = await import("@/models/User")
    Order = OrderModel
    User = UserModel
  }
  return { Order, User }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const { Order, User } = await getModels()

    const body = await req.json()
    const { items, total, customerInfo, shippingAddress, orderId, userId, status } = body

    if (!items || !total) {
      return NextResponse.json({ error: "Missing required fields (items, total)" }, { status: 400 })
    }

    const finalOrderId = orderId || `ORD-${Date.now()}`

    // If userId provided, verify user exists
    if (userId) {
      const userExists = await User.findById(userId)
      if (!userExists) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
    }

    const newOrder = await Order.create({
      orderId: finalOrderId,
      userId: userId || null,
      items,
      total,
      status: status || "Pending",
      customerInfo: customerInfo || {},
      shippingAddress: shippingAddress || {},
    })

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 })
  } catch (error: any) {
    console.error("❌ Error creating order:", error)
    return NextResponse.json({ message: error.message || "Failed to create order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const { Order } = await getModels()
    const orders = await Order.find({})
      .populate("userId", "email name")
      .sort({ createdAt: -1 })
    return NextResponse.json({ success: true, orders })
  } catch (error: any) {
    console.error("❌ Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders", details: error.message }, { status: 500 })
  }
}
