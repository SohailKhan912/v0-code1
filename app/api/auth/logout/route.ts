import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Logout is handled client-side by clearing localStorage
    // This endpoint can be used for server-side session invalidation if needed
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 })
  } catch (error: any) {
    console.error("❌ Logout error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

