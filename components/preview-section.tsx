"use client"

import dynamic from "next/dynamic"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Smartphone, Maximize2, Camera, Eye, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// ⬇️ client-only import so Three.js runs only in the browser
const DoorModel3D = dynamic(() => import("./door-model-3d"), { ssr: false })

interface PreviewSectionProps {
  config: any
  productId?: number
  onAddToCart?: () => void
}

export function PreviewSection({ config, onAddToCart }: PreviewSectionProps) {
  const [viewMode, setViewMode] = useState<"2d" | "3d" | "ar">("3d")

  // Map UI config -> 3D component config
  const mapConfigTo3D = (cfg: any) => {
    const glassMaterial =
      cfg?.material === "laminated-glass"
        ? "laminated"
        : cfg?.material === "tinted-glass"
        ? "tinted"
        : "tempered"

    const frameType =
      cfg?.frame === "stainless-steel"
        ? "stainless-steel"
        : cfg?.frame === "wooden"
        ? "wooden"
        : "aluminum"

    return {
      width: Number(cfg?.width) || 900,
      height: Number(cfg?.height) || 2100,
      glassMaterial,
      frameType,
      addOns: {
        smartLock: Array.isArray(cfg?.features) && cfg.features.includes("smart-lock"),
      },
    } as any
  }

  const getColorByMaterial = () => {
    const colors: Record<string, string> = {
      "tempered-glass": "rgba(200, 220, 240, 0.6)",
      "laminated-glass": "rgba(180, 210, 240, 0.7)",
      "tinted-glass": "rgba(120, 150, 200, 0.6)",
    }
    return colors[config.material] || "rgba(200, 220, 240, 0.6)"
  }

  const getFrameColor = () => {
    const colors: Record<string, string> = {
      aluminum: "#9ca3af",
      "stainless-steel": "#d1d5db",
      wooden: "#92400e",
    }
    return colors[config.frame] || "#9ca3af"
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setViewMode("2d")}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            viewMode === "2d"
              ? "bg-primary text-primary-foreground shadow-lg scale-105"
              : "bg-muted text-foreground hover:bg-muted/80 hover:scale-105"
          }`}
        >
          <Eye className="w-4 h-4" />
          2D Preview
        </button>

        <button
          onClick={() => setViewMode("3d")}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            viewMode === "3d"
              ? "bg-primary text-primary-foreground shadow-lg scale-105"
              : "bg-muted text-foreground hover:bg-muted/80 hover:scale-105"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          3D Model
          <Badge variant="secondary" className="ml-1 bg-accent/20 text-accent-foreground">
            Enhanced
          </Badge>
        </button>

        <button
          onClick={() => setViewMode("ar")}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            viewMode === "ar"
              ? "bg-primary text-primary-foreground shadow-lg scale-105"
              : "bg-muted text-foreground hover:bg-muted/80 hover:scale-105"
          }`}
        >
          <Camera className="w-4 h-4" />
          AR Camera
          <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700">
            Live
          </Badge>
        </button>
      </div>

      {/* Preview Canvas */}
      <Card className="p-8 flex items-center justify-center min-h-[600px] bg-gradient-to-br from-muted/20 to-muted/5 border-2">
        {viewMode === "2d" ? (
          <div
            className="relative transition-all duration-300"
            style={{
              width: `${Math.min(400, Math.max(200, config.width / 4))}px`,
              height: `${Math.min(500, Math.max(250, config.height / 4))}px`,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${config.width} ${config.height}`}
              className="w-full h-full drop-shadow-2xl"
            >
              {/* Frame */}
              <rect
                x="20"
                y="20"
                width={config.width - 40}
                height={config.height - 40}
                fill={getFrameColor()}
                stroke="#000"
                strokeWidth="2"
              />
              {/* Glass */}
              <rect
                x="30"
                y="30"
                width={config.width - 60}
                height={config.height - 60}
                fill={getColorByMaterial()}
                stroke="rgba(100, 100, 100, 0.3)"
                strokeWidth="1"
              />
              {/* Reflection */}
              <ellipse
                cx={config.width / 3}
                cy={config.height / 4}
                rx={(config.width - 60) / 4}
                ry={(config.height - 60) / 6}
                fill="white"
                opacity="0.3"
              />
              {/* Handle */}
              <circle
                cx={config.width - 50}
                cy={config.height / 2}
                r="15"
                fill="#c0c0c0"
                stroke="#888"
                strokeWidth="1"
              />
              {/* Hinges */}
              <rect x="35" y="40" width="8" height="8" fill="#888" opacity="0.5" />
              <rect x="35" y={config.height - 50} width="8" height="8" fill="#888" opacity="0.5" />
            </svg>
          </div>
        ) : viewMode === "3d" ? (
          <div className="w-full">
            {/* ⬇️ Actual 3D canvas */}
            <DoorModel3D key="door-3d" config={mapConfigTo3D(config)} />

            {/* Info cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-lg flex gap-3 border border-primary/20">
                <Smartphone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm mb-1">Photorealistic 3D</p>
                  <p className="text-xs text-muted-foreground">
                    Drag to rotate, scroll to zoom. See your exact door design with real materials, lighting, and
                    reflections.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-5 rounded-lg flex gap-3 border border-accent/20">
                <Maximize2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm mb-1">Full Control</p>
                  <p className="text-xs text-muted-foreground">
                    View from any angle, zoom in for details. Fullscreen mode available for immersive experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">{/* AR placeholder */}</div>
        )}
      </Card>

      {/* Info Section */}
      <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Pro Tips for Customization
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Consider the door's purpose - residential, commercial, or office</li>
          <li>• Wider doors may require stronger frame materials</li>
          <li>• Tinted glass is ideal for UV-sensitive areas</li>
          <li>• Smart locks require professional installation</li>
          <li>• All customizations come with a 5-year warranty</li>
        </ul>
      </Card>
    </div>
  )
}
