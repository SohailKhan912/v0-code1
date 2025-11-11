"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const allProducts = [
  {
    id: 1,
    name: "Frameless Minimalist",
    style: "Minimalist",
    price: 1500,
    image: "/frameless-minimalist-glass-door-modern-interior.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Steel Frame Modern",
    style: "Modern",
    price: 2200,
    image: "/modern-steel-frame-glass-door-black-metal.jpg",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Industrial Double Glass",
    style: "Industrial",
    price: 2800,
    image: "/industrial-double-glass-door-heavy-duty-metal-fram.jpg",
    rating: 4.9,
  },
]

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<number[]>([])
  const [wishlistProducts, setWishlistProducts] = useState<typeof allProducts>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlistIds(stored)
    setWishlistProducts(allProducts.filter((p) => stored.includes(p.id)))
  }, [])

  const removeFromWishlist = (productId: number) => {
    const updated = wishlistIds.filter((id) => id !== productId)
    localStorage.setItem("wishlist", JSON.stringify(updated))
    setWishlistIds(updated)
    setWishlistProducts(allProducts.filter((p) => updated.includes(p.id)))
    toast.success("Removed from wishlist")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Heart className="w-10 h-10 text-red-500 fill-red-500" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved
            </p>
          </div>

          {wishlistProducts.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-6">Start adding products you love to your wishlist</p>
                <Link href="/catalog">
                  <Button className="bg-primary hover:bg-primary/90">Browse Products</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all">
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.style}</p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Starting at</p>
                        <p className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">⭐ {product.rating}</Badge>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/customize/${product.id}`} className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Customize
                        </Button>
                      </Link>
                      <Link href={`/catalog`}>
                        <Button variant="outline" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
