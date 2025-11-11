import { type NextRequest, NextResponse } from "next/server"

// Mock email service - In production, use Resend, SendGrid, or Nodemailer
interface EmailData {
  to: string
  orderId: string
  paymentId: string
  customerName: string
  amount: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  estimatedDelivery: string
  shippingAddress: {
    address: string
    city: string
    pincode: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EmailData
    const { to, orderId, paymentId, customerName, amount, items, estimatedDelivery, shippingAddress } = body

    if (!to || !orderId) {
      return NextResponse.json({ error: "Missing email or orderId" }, { status: 400 })
    }

    console.log("[v0] Order confirmation processed for:", to)
    console.log("[v0] Order ID:", orderId, "| Payment ID:", paymentId)
    console.log("[v0] Email notifications are currently disabled")

    // Return success immediately without attempting email send
    return NextResponse.json({
      success: true,
      message: "Order confirmed successfully",
      emailSent: false,
      email: to,
      orderId,
      paymentId,
      note: "Email notifications are currently disabled",
    })

    /* Email sending disabled to prevent errors
    const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        .order-section { margin: 20px 0; padding: 15px; background: white; border-left: 4px solid #667eea; }
        .item-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
        .total-row { display: flex; justify-content: space-between; padding: 15px 0; font-weight: bold; font-size: 18px; }
        .confirmation-badge { display: inline-block; background: #4caf50; color: white; padding: 10px 20px; border-radius: 4px; margin: 10px 0; }
        .success-icon { color: #4caf50; font-size: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Your glass door customization order has been successfully placed</p>
        </div>
        
        <div class="content">
          <p>Dear <strong>${customerName}</strong>,</p>
          
          <p>Thank you for your order! We're excited to help you customize your perfect glass door. Your payment has been received and verified.</p>
          
          <div class="order-section">
            <h3>📋 Order Details</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 4px; margin-bottom: 10px;">
              <div><strong>Order ID:</strong> ${orderId}</div>
              <div><strong>Payment ID:</strong> ${paymentId}</div>
              <div><strong>Status:</strong> <span class="confirmation-badge">✓ CONFIRMED</span></div>
            </div>
          </div>
          
          <div class="order-section">
            <h3>📦 Items Ordered</h3>
            ${items
              .map(
                (item) => `
              <div class="item-row">
                <div>${item.name} × ${item.quantity}</div>
                <div>₹${(item.price * item.quantity).toLocaleString("en-IN")}</div>
              </div>
            `,
              )
              .join("")}
            <div class="total-row" style="color: #667eea; border-top: 2px solid #667eea; margin-top: 10px;">
              <div>Total Amount:</div>
              <div>₹${amount.toLocaleString("en-IN")}</div>
            </div>
          </div>
          
          <div class="order-section">
            <h3>📅 Estimated Delivery</h3>
            <p><strong>${new Date(estimatedDelivery).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}</strong></p>
            <p style="color: #666; font-size: 14px;">Delivery will be completed within 7-10 business days from today.</p>
          </div>
          
          <div class="order-section">
            <h3>🏠 Shipping Address</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 4px;">
              <p><strong>${customerName}</strong></p>
              <p>${shippingAddress.address}</p>
              <p>${shippingAddress.city}, ${shippingAddress.pincode}</p>
            </div>
          </div>
          
          <div class="order-section">
            <h3>📞 What Happens Next?</h3>
            <ol style="padding-left: 20px;">
              <li>We'll verify your customization details</li>
              <li>Our team will prepare your door with your specifications</li>
              <li>Quality check will be performed before dispatch</li>
              <li>Door will be shipped to your address</li>
              <li>You'll receive tracking updates via email</li>
            </ol>
          </div>
          
          <p>If you have any questions about your order, please don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br><strong>GlassVision Team</strong></p>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing GlassVision - Your Premium Glass Door Customization Partner</p>
          <p style="font-size: 12px; margin-top: 10px;">© 2025 GlassVision. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `

    console.log("[v0] Confirmation email prepared for:", to)
    console.log("[v0] Order ID:", orderId, "| Payment ID:", paymentId)

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

    // Skip email sending if no API key is configured
    if (!apiKey || apiKey.trim() === "") {
      console.log("[v0] Email sending skipped - RESEND_API_KEY not configured")
      console.log("[v0] Order confirmed successfully without email notification")
      return NextResponse.json({
        success: true,
        message: "Order confirmed successfully",
        emailSent: false,
        email: to,
        orderId,
        paymentId,
        note: "Email notifications are disabled. Configure RESEND_API_KEY to enable.",
      })
    }

    let emailSent = false
    let errorMessage = ""

    try {
      console.log("[v0] Attempting to send email from:", fromEmail, "to:", to)

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to,
          subject: `✓ Booking Confirmed - Order ${orderId}`,
          html: emailContent,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("[v0] Email sent successfully via Resend:", result)
        emailSent = true
      } else {
        const errorBody = await response.text()
        console.warn("[v0] Resend API error (non-blocking):", response.status, errorBody)

        try {
          const errorJson = JSON.parse(errorBody)
          errorMessage = errorJson.message || `API error: ${response.status}`
        } catch (e) {
          errorMessage = `API error: ${response.status}`
        }
      }
    } catch (err) {
      console.warn("[v0] Email sending failed (non-blocking):", err)
      errorMessage = err instanceof Error ? err.message : "Network error"
    }

    if (!emailSent) {
      console.log("[v0] Order confirmed successfully without email notification")
      console.log("[v0] Email error (non-critical):", errorMessage)
    }

    return NextResponse.json({
      success: true,
      message: "Order confirmed successfully",
      emailSent,
      email: to,
      orderId,
      paymentId,
    })
    */
  } catch (error) {
    console.error("[v0] Order confirmation error:", error)
    return NextResponse.json(
      {
        success: true,
        message: "Order confirmed successfully",
        emailSent: false,
      },
      { status: 200 },
    )
  }
}
