const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const User = require("./models/User")
const bcrypt = require("bcryptjs")

dotenv.config()
const app = express()

app.use(cors({ 
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true 
}))
app.use(express.json())

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/glassvision", {
    dbName: "glassvision",
  })
  .then(async () => {
    console.log("✅ MongoDB connected")

    // Seed default admin user if not exists
    const adminEmail = "admin@glassvision.com"
    const adminPassword = "admin123"
    
    let admin = await User.findOne({ email: adminEmail })
    if (!admin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10)
      admin = await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      })
      console.log("👑 Default admin user created:", adminEmail, "/", adminPassword)
    } else {
      // Always update admin password to ensure it's correct
      const hashedPassword = await bcrypt.hash(adminPassword, 10)
      admin.password = hashedPassword
      admin.role = "admin" // Ensure role is admin
      await admin.save()
      console.log("🔐 Admin user updated:", adminEmail, "/", adminPassword)
      
      // Verify password works
      const testMatch = await bcrypt.compare(adminPassword, admin.password)
      console.log("🧪 Password verification test:", testMatch ? "✅ Pass" : "❌ Fail")
    }
  })
  .catch((err) => console.error("❌ MongoDB error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
