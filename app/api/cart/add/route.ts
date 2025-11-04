import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { width, height, material, frame, finish, features, handle, price, modelId, modelName } = body

    // Validate required fields
    if (!width || !height || !material || !frame || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create cart item
    const cartItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      width,
      height,
      material,
      frame,
      finish,
      features: features || [],
      handle,
      price,
      quantity: 1,
      modelId,
      modelName,
      addedAt: new Date().toISOString(),
    }

    return NextResponse.json(cartItem, { status: 201 })
  } catch (error) {
    console.error("[v0] Add to cart error:", error)
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
  }
}
