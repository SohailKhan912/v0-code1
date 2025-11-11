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

export async function GET(request: Request) {
  try {
    await connectDB()
    const Order = await getOrderModel()

    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const order = await Order.findOne({ orderId }).populate("userId", "email name")

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, order })
  } catch (error: any) {
    console.error("❌ Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order", details: error.message }, { status: 500 })
  }
}
