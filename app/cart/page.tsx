"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CartItem } from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Trash2 } from "lucide-react"
import { useCart } from "@/components/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()

  const subtotal = total
  const gst = subtotal * 0.18
  const shipping = subtotal > 50000 ? 0 : 1500
  const finalTotal = subtotal + gst + shipping

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <Link href="/catalog">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Catalog
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Browse our collection and add glass doors to your cart.</p>
              <Link href="/catalog">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    {items.length} item{items.length !== 1 ? "s" : ""} in cart
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your cart?")) {
                        clearCart()
                      }
                    }}
                    className="gap-2 text-destructive bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </Button>
                </div>

                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => removeItem(item.id)}
                    onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                  />
                ))}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (18% GST)</span>
                        <span className="font-medium">₹{Math.round(gst).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          ₹{Math.round(finalTotal).toLocaleString()}
                        </span>
                      </div>

                      {shipping === 0 && (
                        <p className="text-xs text-center text-primary mb-4">✓ Free shipping on orders above ₹50,000</p>
                      )}

                      <Link href="/checkout">
                        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 mb-3">
                          Proceed to Checkout
                        </Button>
                      </Link>
                      <Link href="/catalog">
                        <Button variant="outline" size="lg" className="w-full bg-transparent">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="mt-6 bg-accent/5 border-accent/20">
                  <CardContent className="pt-6 space-y-3 text-xs">
                    <div>
                      <p className="font-semibold mb-1">Included</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>✓ Professional measurement</li>
                        <li>✓ Expert installation</li>
                        <li>✓ 5-year warranty</li>
                        <li>✓ Maintenance kit</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
