import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Order } from "@/lib/models/Order"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, subtotal, gst, shipping, total, customerInfo, razorpayOrderId, shippingAddress } = body

    if (!items || !total || !customerInfo) {
      return NextResponse.json({ message: "Missing required order data" }, { status: 400 })
    }

    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7)

    const order: Order = {
      orderId: `ORD-${Date.now()}`,
      items,
      subtotal: subtotal || Math.round(total / 1.18),
      gst: gst || Math.round(total * 0.18),
      shipping: shipping !== undefined ? shipping : 1500,
      total,
      customerInfo,
      razorpayOrderId,
      shippingAddress,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const db = await getDatabase()
    const ordersCollection = db.collection<Order>("orders")
    await ordersCollection.insertOne(order)

    const customersCollection = db.collection("customers")
    await customersCollection.updateOne(
      { email: customerInfo.email },
      {
        $set: {
          name: customerInfo.name,
          phone: customerInfo.phone,
          updatedAt: new Date(),
        },
        $inc: { totalOrders: 1, totalSpent: total },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    )

    return NextResponse.json({ success: true, order }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create order error:", error)
    return NextResponse.json({ message: "Failed to create order" }, { status: 500 })
  }
}
