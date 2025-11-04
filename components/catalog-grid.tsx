"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Zap, Star, TrendingUp } from "lucide-react"
import { WishlistButton } from "@/components/wishlist-button"
import { useState } from "react"

const catalogItems = [
  {
    id: 1,
    name: "Frameless Minimalist",
    style: "Minimalist",
    size: "Medium (800-1200mm)",
    price: 1500,
    material: "Tempered Glass",
    image: "/frameless-minimalist-glass-door-modern-interior.jpg",
    features: ["Frameless Design", "Easy Cleaning", "Modern Look"],
    rating: 4.8,
    reviews: 124,
    bestseller: true,
  },
  {
    id: 2,
    name: "Steel Frame Modern",
    style: "Modern",
    size: "Large (1200-1600mm)",
    price: 2200,
    material: "Glass + Steel",
    image: "/modern-steel-frame-glass-door-black-metal.jpg",
    features: ["Durable Frame", "Contemporary", "Strong Support"],
    rating: 4.9,
    reviews: 98,
    bestseller: false,
  },
  {
    id: 3,
    name: "Classic Wooden Frame",
    style: "Classic",
    size: "Medium (800-1200mm)",
    price: 1800,
    material: "Glass + Wood",
    image: "/classic-wooden-frame-glass-door-elegant-traditiona.jpg",
    features: ["Elegant Design", "Warm Aesthetic", "Traditional"],
    rating: 4.7,
    reviews: 156,
    bestseller: false,
  },
  {
    id: 4,
    name: "Industrial Double Glass",
    style: "Industrial",
    size: "Large (1200-1600mm)",
    price: 2800,
    material: "Double Tempered Glass",
    image: "/industrial-double-glass-door-heavy-duty-metal-fram.jpg",
    features: ["Soundproof", "Insulated", "Heavy Duty"],
    rating: 4.9,
    reviews: 87,
    bestseller: true,
  },
  {
    id: 5,
    name: "Sliding Contemporary",
    style: "Contemporary",
    size: "Extra Large (1600mm+)",
    price: 3500,
    material: "Aluminum + Glass",
    image: "/sliding-contemporary-glass-door-aluminum-track-sys.jpg",
    features: ["Space Saving", "Smooth Operation", "Premium"],
    rating: 4.8,
    reviews: 72,
    bestseller: false,
  },
  {
    id: 6,
    name: "Pivot Frame System",
    style: "Modern",
    size: "Large (1200-1600mm)",
    price: 2900,
    material: "Glass + Aluminum",
    image: "/pivot-glass-door-system-luxury-modern-entrance.jpg",
    features: ["360 Rotation", "Luxury Feel", "Modern Tech"],
    rating: 4.9,
    reviews: 63,
    bestseller: false,
  },
  {
    id: 7,
    name: "Frosted Privacy Glass",
    style: "Contemporary",
    size: "Medium (800-1200mm)",
    price: 1900,
    material: "Frosted Tempered Glass",
    image: "/frosted-privacy-glass-door-bathroom-office.jpg",
    features: ["Privacy", "Light Diffusion", "Elegant"],
    rating: 4.6,
    reviews: 145,
    bestseller: false,
  },
  {
    id: 8,
    name: "Smart Lock Premium",
    style: "Modern",
    size: "Large (1200-1600mm)",
    price: 3200,
    material: "Glass + Smart Tech",
    image: "/smart-lock-glass-door-biometric-security.jpg",
    features: ["Biometric Lock", "App Control", "Security"],
    rating: 4.9,
    reviews: 91,
    bestseller: true,
  },
  {
    id: 9,
    name: "Tinted UV Protection",
    style: "Modern",
    size: "Large (1200-1600mm)",
    price: 2400,
    material: "Tinted Tempered Glass",
    image: "/tinted-uv-protection-glass-door-solar-control.jpg",
    features: ["UV Block", "Heat Reduction", "Energy Efficient"],
    rating: 4.7,
    reviews: 108,
    bestseller: false,
  },
  {
    id: 10,
    name: "Barn Style Sliding",
    style: "Rustic",
    size: "Extra Large (1600mm+)",
    price: 3100,
    material: "Glass + Wood",
    image: "/barn-style-sliding-glass-door-rustic-modern.jpg",
    features: ["Rustic Charm", "Space Saving", "Unique Design"],
    rating: 4.8,
    reviews: 79,
    bestseller: false,
  },
  {
    id: 11,
    name: "Acoustic Soundproof",
    style: "Modern",
    size: "Large (1200-1600mm)",
    price: 3400,
    material: "Laminated Acoustic Glass",
    image: "/acoustic-soundproof-glass-door-studio-office.jpg",
    features: ["Noise Reduction", "Double Layer", "Studio Grade"],
    rating: 4.9,
    reviews: 54,
    bestseller: false,
  },
  {
    id: 12,
    name: "French Door Pair",
    style: "Classic",
    size: "Extra Large (1600mm+)",
    price: 4200,
    material: "Glass + Wood",
    image: "/french-door-pair-glass-panels-elegant-entrance.jpg",
    features: ["Double Door", "Classic Style", "Wide Opening"],
    rating: 4.8,
    reviews: 67,
    bestseller: false,
  },
  {
    id: 13,
    name: "Pocket Door System",
    style: "Contemporary",
    size: "Medium (800-1200mm)",
    price: 2700,
    material: "Glass + Aluminum",
    image: "/pocket-door-system-glass-space-saving-modern.jpg",
    features: ["Hidden Track", "Space Maximizer", "Sleek"],
    rating: 4.7,
    reviews: 82,
    bestseller: false,
  },
  {
    id: 14,
    name: "Bi-Fold Glass Wall",
    style: "Contemporary",
    size: "Extra Large (1600mm+)",
    price: 5500,
    material: "Multi-Panel Glass",
    image: "/bi-fold-glass-wall-patio-door-system.jpg",
    features: ["Multi-Panel", "Indoor-Outdoor", "Premium"],
    rating: 4.9,
    reviews: 43,
    bestseller: true,
  },
  {
    id: 15,
    name: "Art Deco Etched",
    style: "Classic",
    size: "Medium (800-1200mm)",
    price: 2600,
    material: "Etched Glass",
    image: "/art-deco-etched-glass-door-decorative-pattern.jpg",
    features: ["Custom Etching", "Artistic", "Unique"],
    rating: 4.8,
    reviews: 71,
    bestseller: false,
  },
]

interface CatalogGridProps {
  style: string | null
  size: string | null
  priceRange: [number, number]
}

export function CatalogGrid({ style, size, priceRange }: CatalogGridProps) {
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredItems = catalogItems.filter((item) => {
    const matchesStyle = !style || item.style === style
    const matchesSize = !size || item.size === size
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
    return matchesStyle && matchesSize && matchesPrice
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredItems.length} of {catalogItems.length} doors
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            Sort: Popular
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50"
          >
            <div className="relative h-64 overflow-hidden bg-muted">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {item.bestseller && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Bestseller
                </Badge>
              )}

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                <WishlistButton productId={item.id} productName={item.name} />
                <Link href={`/preview/${item.id}`}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-background/90 backdrop-blur-sm hover:bg-background"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm">{item.rating}</span>
                <span className="text-xs text-muted-foreground">({item.reviews})</span>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">{item.name}</CardTitle>
              <CardDescription className="text-sm">{item.material}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Style</p>
                  <p className="font-semibold">{item.style}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-semibold">{item.size.split("(")[0].trim()}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {item.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Starting at</p>
                  <p className="text-2xl font-bold text-primary">₹{item.price.toLocaleString()}</p>
                </div>
                <Link href={`/customize/${item.id}`}>
                  <Button size="sm" className="bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all">
                    <Zap className="w-4 h-4 mr-1" />
                    Customize
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg mb-2">No doors found matching your filters.</p>
          <p className="text-sm text-muted-foreground mb-4">Try adjusting your search criteria</p>
          <Button variant="outline" className="bg-transparent">
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
