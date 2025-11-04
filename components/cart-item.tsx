"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: any
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const quantity = item.quantity || 1

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-4 gap-6 items-start">
          {/* Thumbnail */}
          <div className="md:col-span-1">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 200 200" className="w-full h-full">
                <rect x="20" y="20" width="160" height="160" fill="#d1d5db" />
                <rect x="30" y="30" width="140" height="140" fill="rgba(200, 220, 240, 0.6)" />
                <circle cx="70" cy="70" r="15" fill="white" opacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-2">
            <h3 className="font-semibold">Custom Glass Door</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <p className="text-foreground font-medium">
                  {item.width}×{item.height}mm
                </p>
              </div>
              <div>
                <p className="capitalize">{item.material.replace("-", " ")}</p>
              </div>
              <div>
                <p className="capitalize">Frame: {item.frame}</p>
              </div>
              <div>
                <p className="capitalize">Finish: {item.finish}</p>
              </div>
            </div>

            {/* Features */}
            {item.features && item.features.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {item.features.map((feature: string) => (
                  <span key={feature} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {feature.replace("-", " ")}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quantity & Price */}
          <div className="md:col-span-1 space-y-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">₹{item.price.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">per unit</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between bg-muted rounded-lg p-2">
              <Button variant="ghost" size="sm" onClick={() => onUpdateQuantity(quantity - 1)} className="h-8 w-8 p-0">
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-semibold min-w-8 text-center">{quantity}</span>
              <Button variant="ghost" size="sm" onClick={() => onUpdateQuantity(quantity + 1)} className="h-8 w-8 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Remove Button */}
            <Button variant="destructive" size="sm" onClick={onRemove} className="w-full gap-2">
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
