import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/glassvision";

if (!MONGODB_URI) {
  throw new Error("❌ Missing MongoDB connection string");
}

let isConnected = false

export default async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: "glassvision",
    })
    isConnected = !!db.connections[0].readyState
    console.log("✅ MongoDB connected:", db.connection.name)
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error)
    throw error
  }
}
