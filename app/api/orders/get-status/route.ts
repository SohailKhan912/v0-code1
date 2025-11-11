import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const orderId = request.nextUrl.searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Mock order status - in production, fetch from database
    const order = {
      orderId,
      status: "processing",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      tracking: {
        step: 2,
        steps: [
          { name: "Order Confirmed", completed: true },
          { name: "Processing", completed: true },
          { name: "Shipped", completed: false },
          { name: "Delivered", completed: false },
        ],
      },
    }

    return NextResponse.json(order, { status: 200 })
  } catch (error) {
    console.error("[v0] Get order status error:", error)
    return NextResponse.json({ error: "Failed to fetch order status" }, { status: 500 })
  }
}
