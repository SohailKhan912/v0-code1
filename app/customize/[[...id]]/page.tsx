"use client"

import { use } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CustomizationPanel } from "@/components/customization-panel"
import { PreviewSection } from "@/components/preview-section"
import { useState, useEffect } from "react"

export default function CustomizePage({ params }: { params: Promise<{ id?: string[] }> }) {
  // ✅ unwrap params safely (Next.js 15+)
  const resolvedParams = use(params)
  const productId = resolvedParams?.id?.[0] ? Number.parseInt(resolvedParams.id[0]) : 1

  const [doorConfig, setDoorConfig] = useState({
    width: 800,
    height: 2000,
    material: "tempered-glass",
    frame: "aluminum",
    finish: "matte",
    handle: "stainless-steel",
    hinges: "top-bottom",
    glass_type: "clear",
    tint: "none",
    features: [] as string[],
  })

  const [totalPrice, setTotalPrice] = useState(2500)

  useEffect(() => {
    let price = 2000
    if (doorConfig.width > 1200) price += 300
    if (doorConfig.width > 1600) price += 400
    if (doorConfig.height > 2100) price += 200

    const materialPremium: Record<string, number> = {
      "tempered-glass": 0,
      "laminated-glass": 500,
      "tinted-glass": 400,
    }
    price += materialPremium[doorConfig.material] || 0

    const framePremium: Record<string, number> = {
      aluminum: 0,
      "stainless-steel": 300,
      wooden: 400,
    }
    price += framePremium[doorConfig.frame] || 0

    doorConfig.features.forEach((feature) => {
      if (feature === "auto-closer") price += 1500
      if (feature === "smart-lock") price += 3000
      if (feature === "uv-protection") price += 800
      if (feature === "soundproof") price += 1200
    })

    setTotalPrice(price)
  }, [doorConfig])

  const handleConfigChange = (key: string, value: any) => {
    setDoorConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleFeatureToggle = (feature: string) => {
    setDoorConfig((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Customize Your Glass Door</h1>
            <p className="text-muted-foreground text-lg">
              Design your perfect door with our interactive customization tool.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <CustomizationPanel
                config={doorConfig}
                onConfigChange={handleConfigChange}
                onFeatureToggle={handleFeatureToggle}
                totalPrice={totalPrice}
              />
            </div>

            <div className="lg:col-span-2">
              {/* Passing productId is fine; PreviewSection accepts it optionally */}
              <PreviewSection config={doorConfig} productId={productId} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
              