import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function PATCH(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const { status } = await request.json()
    const db = await getDatabase()
    const ordersCollection = db.collection("orders")

    const result = await ordersCollection.updateOne(
      { orderId: params.orderId },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    console.log(`[v0] Updated order ${params.orderId} status to ${status}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating order:", error)
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 })
  }
}
