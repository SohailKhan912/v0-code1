const asyncHandler = require("express-async-handler")
const Product = require("../models/Product")

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 })
  res.status(200).json({ success: true, count: products.length, products })
})

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  res.status(200).json({ success: true, product })
})

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, category, stock, features, style } = req.body

  // Validation
  if (!name || !price || !description || !category) {
    res.status(400)
    throw new Error("Please add all required fields")
  }

  const product = await Product.create({
    name,
    price,
    image: image || "/placeholder.jpg",
    description,
    category,
    stock: stock || 0,
    features: features || [],
    style: style || "",
  })

  res.status(201).json({ success: true, product })
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ success: true, product })
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  await product.deleteOne()

  res.status(200).json({ success: true, message: "Product deleted" })
})

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}

