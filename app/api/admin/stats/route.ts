import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"

let Order: any
let User: any

async function getModels() {
  if (!Order || !User) {
    const { default: OrderModel } = await import("@/models/Order")
    const { default: UserModel } = await import("@/models/User")
    Order = OrderModel
    User = UserModel
  }
  return { Order, User }
}

export async function GET() {
  try {
    await connectDB()
    const { Order, User } = await getModels()

    const totalOrders = await Order.countDocuments()
    const totalUsers = await User.countDocuments()
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ])

    const recentOrders = await Order.find({})
      .populate("userId", "email name")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    const recentUsers = await User.find({}).sort({ createdAt: -1 }).limit(5).select("-password")

    return NextResponse.json({
      success: true,
      stats: {
        totalOrders,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentOrders,
        recentUsers,
      },
    })
  } catch (error: any) {
    console.error("❌ Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats", details: error.message }, { status: 500 })
  }
}
