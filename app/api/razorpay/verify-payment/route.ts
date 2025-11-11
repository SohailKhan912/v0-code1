import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Verify Razorpay Payment Signature - Supports both real and dummy payments
export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Verify payment endpoint called")

    const body = await request.json()
    console.log("[v0] Payment verification data received")

    const { razorpay_order_id, razorpay_payment_id, isDummy } = body

    if (isDummy) {
      console.log("[v0] Processing dummy payment")
      return NextResponse.json(
        {
          success: true,
          verified: true,
          message: "Dummy payment verified successfully",
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          isDummy: true,
        },
        { status: 200 },
      )
    }

    // Real payment verification
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "test_secret_key"
    const { razorpay_signature } = body

    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    const isSignatureValid = generatedSignature === razorpay_signature

    if (!isSignatureValid) {
      console.error("[v0] Invalid Razorpay signature")
      return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 })
    }

    return NextResponse.json(
      {
        success: true,
        verified: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        isDummy: false,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Verify payment error:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to verify payment",
      },
      { status: 500 },
    )
  }
}
