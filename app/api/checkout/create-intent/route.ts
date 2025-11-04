import { type NextRequest, NextResponse } from "next/server"

// Mock Stripe integration - replace with actual Stripe SDK when keys are available
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, email, items } = body

    if (!amount || !email) {
      return NextResponse.json({ error: "Missing amount or email" }, { status: 400 })
    }

    // Mock payment intent - in production use actual Stripe SDK
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      amount: Math.round(amount * 100), // Convert to cents
      currency: "inr",
      status: "requires_payment_method",
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      email,
      itemCount: items?.length || 1,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(paymentIntent, { status: 201 })
  } catch (error) {
    console.error("[v0] Create payment intent error:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
