import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"

let Order: any

async function getOrderModel() {
  if (!Order) {
    const { default: OrderModel } = await import("@/models/Order")
    Order = OrderModel
  }
  return Order
}

export async function GET() {
  try {
    await connectDB()
    const Order = await getOrderModel()

    const orders = await Order.find({})
      .populate("userId", "email name")
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, orders })
  } catch (error: any) {
    console.error("❌ Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders", details: error.message }, { status: 500 })
  }
}
