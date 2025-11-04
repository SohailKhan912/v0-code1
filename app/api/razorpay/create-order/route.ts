import { type NextRequest, NextResponse } from "next/server"

// Razorpay Order Creation - Mock implementation for development/testing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, email, items, customerName } = body

    if (!amount || !email) {
      return NextResponse.json({ error: "Missing amount or email" }, { status: 400 })
    }

    const orderId = `order_${Math.random().toString(36).substring(2, 9).toUpperCase()}_${Date.now()}`

    const razorpayOrder = {
      id: orderId,
      entity: "order",
      amount: Math.round(amount * 100), // Convert to paise
      amount_paid: 0,
      amount_due: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      offer_id: null,
      status: "created",
      attempts: 0,
      notes: {
        email,
        customerName,
        itemCount: items?.length || 1,
      },
      created_at: Math.floor(Date.now() / 1000),
      isDummy: true, // Mark as dummy for development
    }

    console.log("[v0] Razorpay order created (dummy):", razorpayOrder)

    return NextResponse.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      isDummy: true,
    })
  } catch (error) {
    console.error("[v0] Create Razorpay order error:", error)
    return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 })
  }
}
