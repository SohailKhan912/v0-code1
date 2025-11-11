import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import mongoose from "mongoose"
import { defaultProducts } from "@/lib/models/Product"

export async function GET() {
  try {
    await connectDB()
    const db = mongoose.connection.db
    if (!db) {
      throw new Error("Database not connected")
    }
    const productsCollection = db.collection("products")

    // Check if products exist, if not seed with default products
    const count = await productsCollection.countDocuments()
    if (count === 0) {
      await productsCollection.insertMany(defaultProducts)
      console.log("✅ Seeded products collection with default products")
    }

    const products = await productsCollection.find({}).toArray()

    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error("❌ Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const db = mongoose.connection.db
    if (!db) {
      throw new Error("Database not connected")
    }
    const product = await request.json()
    const productsCollection = db.collection("products")

    const newProduct = {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await productsCollection.insertOne(newProduct)

    return NextResponse.json({
      success: true,
      productId: result.insertedId,
      product: newProduct,
    })
  } catch (error) {
    console.error("❌ Error creating product:", error)
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}
