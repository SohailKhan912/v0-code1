"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PreviewSection } from "@/components/preview-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/components/cart-context"

const doorModels = {
  1: {
    name: "Frameless Minimalist",
    width: 800,
    height: 2000,
    material: "tempered-glass",
    frame: "aluminum",
    features: [],
    price: 1500,
  },
  2: {
    name: "Steel Frame Modern",
    width: 1200,
    height: 2000,
    material: "tempered-glass",
    frame: "stainless-steel",
    features: [],
    price: 2200,
  },
  3: {
    name: "Classic Wooden Frame",
    width: 900,
    height: 2000,
    material: "tempered-glass",
    frame: "wooden",
    features: [],
    price: 1800,
  },
}

export default function PreviewPage({ params }: { params: { id?: string[] } }) {
  const modelId = params.id?.[0] || "1"
  const model = (doorModels as any)[modelId] || (doorModels as any)[1]
  const [config, setConfig] = useState({
    ...model,
    finish: "matte",
    handle: "stainless-steel",
  })
  const { addItem } = useCart()

  const handleAddToCart = () => {
    const cartItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...config,
      price: config.price,
      quantity: 1,
      modelName: config.name,
      timestamp: new Date().toISOString(),
    }
    addItem(cartItem)
    alert("Added to cart successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{config.name}</h1>
            <p className="text-muted-foreground">Interactive 3D preview with AR capabilities</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <PreviewSection config={config} onAddToCart={handleAddToCart} />
              </Card>

              <Card className="mt-6 bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">AR Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Use your device camera to place the door in your space</p>
                  <p>• Rotate the model to see from different angles</p>
                  <p>• Download the visualization for sharing</p>
                  <p>• Compatible with iOS 12+ and Android 7+</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Dimensions</p>
                    <p className="font-semibold">
                      {config.width}mm × {config.height}mm
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Material</p>
                    <p className="font-semibold capitalize">{config.material.replace("-", " ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frame</p>
                    <p className="font-semibold capitalize">{config.frame}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Finish</p>
                    <p className="font-semibold capitalize">{config.finish}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Price */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-2">Starting Price</p>
                  <p className="text-3xl font-bold text-primary mb-4">₹{config.price.toLocaleString()}</p>
                  <div className="space-y-3">
                    <Link href={`/customize/${modelId}`}>
                      <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                        Customize This Model
                      </Button>
                    </Link>
                    <Button onClick={handleAddToCart} variant="outline" size="lg" className="w-full bg-transparent">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>Premium quality glass</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>Professional installation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>5-year warranty</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span>Free maintenance kit</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
