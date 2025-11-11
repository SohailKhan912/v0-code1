"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { itemCount } = useCart()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    router.push("/") // redirect after logout
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              GlassVision
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/catalog" className="text-foreground hover:text-primary transition">
              Catalog
            </Link>
            <Link href="/customize" className="text-foreground hover:text-primary transition">
              Customize
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/checkout">
              <Button className="hidden md:flex bg-primary hover:bg-primary/90">Checkout</Button>
            </Link>
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                className="hidden md:flex bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button className="hidden md:flex bg-primary hover:bg-primary/90">Login</Button>
              </Link>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/register">
  <Button className="hidden md:flex bg-primary hover:bg-primary/90">Register</Button>
</Link>

          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/catalog" className="block px-3 py-2 text-foreground hover:text-primary">
              Catalog
            </Link>
            <Link href="/customize" className="block px-3 py-2 text-foreground hover:text-primary">
              Customize
            </Link>
            <Link href="/about" className="block px-3 py-2 text-foreground hover:text-primary">
              About
            </Link>
            <Link href="/wishlist" className="block px-3 py-2 text-foreground hover:text-primary">
              Wishlist
            </Link>
            <Link href="/cart" className="block px-3 py-2 text-foreground hover:text-primary">
              Cart
            </Link>
            <Link href="/checkout">
              <Button className="w-full bg-primary hover:bg-primary/90">Checkout</Button>
            </Link>
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button className="w-full bg-primary hover:bg-primary/90">Login</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
