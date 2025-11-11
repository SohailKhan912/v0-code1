import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"

let Order, User

async function getModels() {
  if (!Order || !User) {
    const OrderModel = (await import("@/models/Order")).default
    const UserModel = (await import("@/models/User")).default
    Order = OrderModel
    User = UserModel
  }
  return { Order, User }
}

export async function POST(req) {
  try {
    await connectDB()
    const { Order, User } = await getModels()

    const body = await req.json()
    const { email, fullName, items, total, phone, address, city, pincode } = body

    // Validate required fields
    if (!email || !items || !total) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (email, items, total)" },
        { status: 400 }
      )
    }

    // Find or create user
    let user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      user = await User.create({
        name: fullName || "Guest",
        email: email.toLowerCase(),
        password: `Temp@${Date.now()}`,
        role: "user",
      })
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}`

    // Create order in MongoDB
    const newOrder = await Order.create({
      orderId,
      userId: user._id,
      items,
      total,
      status: "Pending",
      customerInfo: {
        email,
        name: fullName || "Guest",
        phone: phone || "",
      },
      shippingAddress: {
        address: address || "",
        city: city || "",
        pincode: pincode || "",
      },
    })

    console.log("✅ Order saved to MongoDB:", newOrder.orderId)

    // Return dummy Razorpay-style response
    return NextResponse.json({
      success: true,
      id: orderId,
      razorpayOrderId: orderId,
      amount: total * 100, // Razorpay expects amount in paise
      currency: "INR",
      status: "created",
      isDummy: true,
      order: newOrder,
    })
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create order" },
      { status: 500 }
    )
  }
}
