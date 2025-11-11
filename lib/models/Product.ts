export interface Product {
  _id?: string
  id: string
  name: string
  description: string
  category: string
  basePrice: number
  image: string
  features: string[]
  specifications: {
    material: string
    thickness: string
    dimensions: string
    finish: string[]
  }
  inStock: boolean
  rating: number
  reviews: number
  createdAt: Date
  updatedAt: Date
}

export const defaultProducts: Omit<Product, "_id">[] = [
  {
    id: "modern-sliding-glass",
    name: "Modern Sliding Glass Door",
    description: "Contemporary sliding door with sleek aluminum frame",
    category: "Sliding Doors",
    basePrice: 45000,
    image: "/modern-sliding-glass-door.jpg",
    features: ["Smooth sliding mechanism", "Energy efficient", "Sound insulation"],
    specifications: {
      material: "Tempered Glass",
      thickness: "10mm",
      dimensions: "2100mm x 900mm",
      finish: ["Clear", "Frosted", "Tinted"],
    },
    inStock: true,
    rating: 4.8,
    reviews: 124,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "frameless-glass-door",
    name: "Frameless Glass Door",
    description: "Elegant frameless design for modern interiors",
    category: "Hinged Doors",
    basePrice: 52000,
    image: "/frameless-glass-door-modern.jpg",
    features: ["Minimalist design", "Premium hardware", "Easy maintenance"],
    specifications: {
      material: "Tempered Glass",
      thickness: "12mm",
      dimensions: "2100mm x 800mm",
      finish: ["Clear", "Frosted"],
    },
    inStock: true,
    rating: 4.9,
    reviews: 98,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
