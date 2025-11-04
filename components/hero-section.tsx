"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Play, Shield, Award, TrendingUp, X } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 animate-pulse-subtle">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Next-Gen Glass Solutions</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                Experience Your Perfect Glass Doors
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Visualize, customize, and book premium glass doors with cutting-edge AR/VR technology. Transform your
                space with precision-engineered solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/customize">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                >
                  Start Customizing
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/catalog">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent hover:bg-muted">
                  View Catalog
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">2,500+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">24hrs</p>
                <p className="text-sm text-muted-foreground">Fast Delivery</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">99.8%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>5-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4 text-primary" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Industry Leader</span>
              </div>
            </div>
          </div>

          {/* Right content - Image/Video */}
          <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden group">
            {!isVideoPlaying ? (
              <>
                <img
                  src="/premium-modern-glass-door-entrance-with-ar-visuali.jpg"
                  alt="Glass Door Showcase"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />

                {/* Video play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                  >
                    <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                  </button>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/btYbp8mk9Ho?autoplay=1&rel=0"
                  title="Glass Door Showcase"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* Close button */}
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            )}

            {/* Floating feature cards */}
            {!isVideoPlaying && (
              <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                <div className="flex-1 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-xs text-muted-foreground mb-1">AR Preview</p>
                  <p className="text-sm font-semibold">See in Your Space</p>
                </div>
                <div className="flex-1 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-xs text-muted-foreground mb-1">3D Customize</p>
                  <p className="text-sm font-semibold">Real-Time Design</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
