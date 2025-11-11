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
    const { name, email, password, role } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Please provide name, email, and password" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "user",
    })

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
      { status: 201 }
    )
  } catch (error: any) {
    console.error("❌ Register error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

