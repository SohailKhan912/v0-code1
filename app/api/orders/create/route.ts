import { type NextRequest, NextResponse } from "next/server"
import { addOrder } from "../storage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, subtotal, gst, shipping, total, customerInfo, razorpayOrderId, shippingAddress } = body

    if (!items || !total || !customerInfo) {
      return NextResponse.json({ error: "Missing required order data" }, { status: 400 })
    }

    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7)

    // Create order
    const order = {
      orderId: `ORD-${Date.now()}`,
      items,
      subtotal: subtotal || Math.round(total / 1.18),
      gst: gst || Math.round(total * 0.18),
      shipping: shipping !== undefined ? shipping : 1500,
      total,
      customerInfo,
      razorpayOrderId,
      shippingAddress,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: estimatedDelivery.toISOString(),
      bookingConfirmed: true,
    }

    addOrder(order.orderId, order)

    console.log("[v0] Order created:", order)

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("[v0] Create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
