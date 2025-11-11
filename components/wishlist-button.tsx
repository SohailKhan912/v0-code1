"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { toast } from "sonner"

interface WishlistButtonProps {
  productId: number
  productName: string
}

export function WishlistButton({ productId, productName }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsInWishlist(wishlist.includes(productId))
  }, [productId])

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

    if (isInWishlist) {
      const updated = wishlist.filter((id: number) => id !== productId)
      localStorage.setItem("wishlist", JSON.stringify(updated))
      setIsInWishlist(false)
      toast.success(`Removed from wishlist`)
    } else {
      wishlist.push(productId)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      setIsInWishlist(true)
      toast.success(`${productName} added to wishlist`)
    }
  }

  return (
    <Button size="icon" variant="ghost" onClick={toggleWishlist} className="hover:bg-background/90">
      <Heart
        className={`w-5 h-5 transition-colors ${isInWishlist ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
      />
    </Button>
  )
}
