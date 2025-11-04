"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Check } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/components/cart-context"

interface CustomizationPanelProps {
  config: any
  onConfigChange: (key: string, value: any) => void
  onFeatureToggle: (feature: string) => void
  totalPrice: number
}

export function CustomizationPanel({ config, onConfigChange, onFeatureToggle, totalPrice }: CustomizationPanelProps) {
  const { addItem } = useCart()
  const [cartAdded, setCartAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: `door-${Date.now()}`,
      width: config.width,
      height: config.height,
      material: config.material,
      frame: config.frame,
      finish: config.finish,
      handle: config.handle,
      features: config.features,
      price: totalPrice,
      quantity: 1,
    })

    setCartAdded(true)
    setTimeout(() => setCartAdded(false), 2000)
  }

  const featureOptions = [
    { id: "auto-closer", label: "Auto Closer", price: 1500 },
    { id: "smart-lock", label: "Smart Lock", price: 3000 },
    { id: "uv-protection", label: "UV Protection", price: 800 },
    { id: "soundproof", label: "Soundproof", price: 1200 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Door Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Width: {config.width}mm</label>
            <input
              type="range"
              min="600"
              max="1200"
              step="50"
              value={config.width}
              onChange={(e) => onConfigChange("width", Number.parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Height: {config.height}mm</label>
            <input
              type="range"
              min="1500"
              max="2400"
              step="50"
              value={config.height}
              onChange={(e) => onConfigChange("height", Number.parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Glass Material</label>
            <div className="space-y-2">
              {["tempered-glass", "laminated-glass", "tinted-glass"].map((material) => (
                <label key={material} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="material"
                    value={material}
                    checked={config.material === material}
                    onChange={(e) => onConfigChange("material", e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{material.replace("-", " ")}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Frame Type</label>
            <div className="space-y-2">
              {["aluminum", "stainless-steel", "wooden"].map((frame) => (
                <label key={frame} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="frame"
                    value={frame}
                    checked={config.frame === frame}
                    onChange={(e) => onConfigChange("frame", e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{frame.replace("-", " ")}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Finish</label>
            <div className="space-y-2">
              {["matte", "glossy", "frosted"].map((finish) => (
                <label key={finish} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="finish"
                    value={finish}
                    checked={config.finish === finish}
                    onChange={(e) => onConfigChange("finish", e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm capitalize">{finish}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add-On Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {featureOptions.map((feature) => (
            <button
              key={feature.id}
              onClick={() => onFeatureToggle(feature.id)}
              className={`w-full flex items-center justify-between p-3 border rounded-lg transition ${
                config.features.includes(feature.id)
                  ? "bg-primary/10 border-primary"
                  : "bg-muted/50 border-border hover:border-primary"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    config.features.includes(feature.id) ? "bg-primary border-primary" : "border-muted-foreground"
                  }`}
                >
                  {config.features.includes(feature.id) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
              <span className="text-sm font-semibold text-primary">+₹{feature.price.toLocaleString()}</span>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Price</p>
            <p className="text-4xl font-bold text-primary">₹{totalPrice.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Including 18% GST</p>
          </div>

          <Button
            onClick={handleAddToCart}
            size="lg"
            className={`w-full gap-2 transition ${
              cartAdded ? "bg-green-600 hover:bg-green-600" : "bg-primary hover:bg-primary/90"
            }`}
          >
            {cartAdded ? (
              <>
                <Check className="w-5 h-5" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </Button>

          <Link href="/cart">
            <Button variant="outline" size="lg" className="w-full bg-transparent">
              View Cart
            </Button>
          </Link>

          <div className="space-y-2 text-xs text-muted-foreground pt-2 border-t">
            <p>✓ Free professional measurement</p>
            <p>✓ Expert installation included</p>
            <p>✓ 5-year warranty</p>
            <p>✓ Maintenance kit provided</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
