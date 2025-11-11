import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
