import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Items must be an array" }, { status: 400 })
    }

    // Calculate totals
    let subtotal = 0
    items.forEach((item: any) => {
      subtotal += item.price * (item.quantity || 1)
    })

    const gst = Math.round(subtotal * 0.18 * 100) / 100 // 18% GST
    const shipping = subtotal > 50000 ? 0 : 1500
    const total = subtotal + gst + shipping

    return NextResponse.json(
      {
        subtotal,
        gst,
        shipping,
        total,
        itemCount: items.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Calculate cart error:", error)
    return NextResponse.json({ error: "Failed to calculate cart" }, { status: 500 })
  }
}
