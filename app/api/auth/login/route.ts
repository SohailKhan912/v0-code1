import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"

let User: any

async function getUserModel() {
  if (!User) {
    const { default: UserModel } = await import("@/models/User")
    User = UserModel
  }
  return User
}

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production"

export async function POST(req: Request) {
  try {
    await connectDB()
    const User = await getUserModel()

    const body = await req.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Please provide email and password" }, { status: 400 })
    }

    // Find user by email (include password field)
    // Since password has select: false, we need to explicitly select it
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password")

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    })

    // Return success response
    return NextResponse.json(
      {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("❌ Login error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

