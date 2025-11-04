import { type NextRequest, NextResponse } from "next/server"
import { getOrders } from "../storage"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const orders = getOrders()
    const order = orders[orderId]

    if (order) {
      console.log("[v0] Retrieved order:", orderId)
      return NextResponse.json({
        success: true,
        order,
      })
    }

    // If not found, return not found error
    console.log("[v0] Order not found:", orderId)
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  } catch (error) {
    console.error("[v0] Get order error:", error)
    return NextResponse.json({ error: "Failed to retrieve order" }, { status: 500 })
  }
}
