"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, LayoutDashboard, Package, Users } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export function AdminNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/admin"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            GlassVision Admin
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="ghost" size="sm" className="gap-2">
                <Package className="w-4 h-4" />
                Products
              </Button>
            </Link>
            <Link href="/admin/customers">
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="w-4 h-4" />
                Customers
              </Button>
            </Link>
            <div className="w-px h-6 bg-border mx-2" />
            <Button variant="ghost" size="sm" className="gap-2" onClick={logout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Package className="w-4 h-4" />
                Products
              </Button>
            </Link>
            <Link href="/admin/customers">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="w-4 h-4" />
                Customers
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={logout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
