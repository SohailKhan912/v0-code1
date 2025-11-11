import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDatabase()
    const customersCollection = db.collection("customers")

    const customers = await customersCollection.find({}).sort({ createdAt: -1 }).toArray()

    console.log(`[v0] Fetched ${customers.length} customers from database`)

    return NextResponse.json({ success: true, customers })
  } catch (error) {
    console.error("[v0] Error fetching customers:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch customers" }, { status: 500 })
  }
}
