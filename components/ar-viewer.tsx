"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, RotateCw, Maximize2, Volume2, VolumeX } from "lucide-react"

interface ARViewerProps {
  config: any
  onClose?: () => void
}

export function ARViewer({ config, onClose }: ARViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasSound, setHasSound] = useState(true)

  const [orbitRadius, setOrbitRadius] = useState(300)
  const [orbitTheta, setOrbitTheta] = useState(0)
  const [orbitPhi, setOrbitPhi] = useState(Math.PI / 4)
  const [zoom, setZoom] = useState(1)
  const [lighting, setLighting] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#f0f4f8")
    gradient.addColorStop(1, "#e8ecf1")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const baseScale = Math.min(canvas.width, canvas.height) / 700

    const cameraX = Math.sin(orbitTheta) * Math.cos(orbitPhi) * orbitRadius
    const cameraY = Math.sin(orbitPhi) * orbitRadius
    const cameraZ = Math.cos(orbitTheta) * Math.cos(orbitPhi) * orbitRadius

    ctx.save()
    ctx.translate(centerX, centerY)

    const perspectiveScale = 800 / (800 + cameraZ)
    const scale = baseScale * zoom * perspectiveScale

    // Shadow
    ctx.fillStyle = `rgba(0, 0, 0, ${0.15 + lighting / 200})`
    ctx.ellipse(0, 280 * scale, 250 * scale, 40 * scale, 0, 0, Math.PI * 2)
    ctx.fill()

    // Frame
    const frameThickness = 18
    const frameColor = getFrameColor()

    ctx.fillStyle = `rgba(0, 0, 0, ${0.2 + Math.abs(cameraZ) / 500})`
    ctx.fillRect(-220 * scale, -260 * scale, 440 * scale, 520 * scale)

    ctx.fillStyle = frameColor
    ctx.fillRect(-220 * scale, -260 * scale, frameThickness * scale, 520 * scale)
    ctx.fillRect(210 * scale - frameThickness * scale, -260 * scale, frameThickness * scale, 520 * scale)
    ctx.fillRect(-220 * scale, -260 * scale, 440 * scale, frameThickness * scale)
    ctx.fillRect(-220 * scale, 260 * scale - frameThickness * scale, 440 * scale, frameThickness * scale)

    // Glass
    const glassColor = getGlassColor()
    ctx.fillStyle = glassColor
    ctx.globalAlpha = 0.75 + lighting / 400
    ctx.fillRect(-210 * scale, -250 * scale, 420 * scale, 500 * scale)
    ctx.globalAlpha = 1

    // Reflections
    const reflectionIntensity = (lighting / 150) * (0.5 + Math.abs(Math.sin(orbitTheta)) * 0.5)
    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * reflectionIntensity})`
    ctx.ellipse(-110 * scale, -160 * scale, 100 * scale, 70 * scale, -Math.PI / 6, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = `rgba(255, 255, 255, ${0.2 * reflectionIntensity})`
    ctx.ellipse(130 * scale, 120 * scale, 80 * scale, 100 * scale, Math.PI / 4, 0, Math.PI * 2)
    ctx.fill()

    // Handle
    ctx.fillStyle = "#d4af37"
    ctx.beginPath()
    ctx.arc(200 * scale, 0, 16 * scale, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#c0a028"
    ctx.beginPath()
    ctx.arc(200 * scale - 3 * scale, -3 * scale, 14 * scale, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = "#888"
    ctx.lineWidth = 2
    ctx.stroke()

    // Hinges
    ctx.fillStyle = "#666"
    ctx.fillRect(-210 * scale, -240 * scale, 12 * scale, 12 * scale)
    ctx.fillRect(-210 * scale, 225 * scale, 12 * scale, 12 * scale)

    // Features
    if (config.features.includes("smart-lock")) {
      ctx.fillStyle = "#ff6b6b"
      ctx.beginPath()
      ctx.arc(200 * scale, -30 * scale, 8 * scale, 0, Math.PI * 2)
      ctx.fill()
      ctx.font = `bold ${14 * scale}px sans-serif`
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText("🔒", 200 * scale, -26 * scale)
    }

    if (config.features.includes("auto-closer")) {
      ctx.fillStyle = "rgba(66, 133, 244, 0.8)"
      ctx.beginPath()
      ctx.arc(-200 * scale, 230 * scale, 7 * scale, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()

    // Info text
    ctx.font = `bold ${14 * scale}px sans-serif`
    ctx.fillStyle = "#1a1a1a"
    ctx.textAlign = "center"
    ctx.fillText(`${config.width}mm`, centerX, canvas.height - 30)
    ctx.fillText(`${config.height}mm`, 40, centerY)

    ctx.font = `12px sans-serif`
    ctx.fillStyle = "#666"
    ctx.textAlign = "left"
    ctx.fillText(
      `θ: ${((orbitTheta * 180) / Math.PI).toFixed(0)}° φ: ${((orbitPhi * 180) / Math.PI).toFixed(0)}° R: ${orbitRadius.toFixed(0)}`,
      10,
      20,
    )
    ctx.fillText(`Zoom: ${zoom.toFixed(1)}x | Lighting: ${lighting}%`, 10, 38)
  }, [orbitTheta, orbitPhi, orbitRadius, zoom, lighting, config])

  const getFrameColor = () => {
    const colors: Record<string, string> = {
      aluminum: "#b0b0b0",
      "stainless-steel": "#e8e8e8",
      wooden: "#8b6f47",
    }
    return colors[config.frame] || "#b0b0b0"
  }

  const getGlassColor = () => {
    const colors: Record<string, string> = {
      "tempered-glass": "rgba(180, 220, 255, 0.55)",
      "laminated-glass": "rgba(160, 200, 255, 0.65)",
      "tinted-glass": "rgba(100, 140, 200, 0.6)",
    }
    return colors[config.material] || "rgba(180, 220, 255, 0.55)"
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    setOrbitTheta((prev) => prev + deltaX * 0.01)
    setOrbitPhi((prev) => {
      const newPhi = prev + deltaY * 0.01
      return Math.max(0.1, Math.min(Math.PI - 0.1, newPhi))
    })

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleReset = () => {
    setOrbitTheta(0)
    setOrbitPhi(Math.PI / 4)
    setOrbitRadius(300)
    setZoom(1)
    setLighting(50)
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.href = canvas.toDataURL("image/png", 0.95)
    link.download = `door-2d-${config.width}x${config.height}-${Date.now()}.png`
    link.click()

    if (hasSound) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = 800
        oscillator.type = "sine"

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (e) {
        console.log("[v0] Audio playback not available")
      }
    }
  }

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-black" : ""}`}>
      <Card className={`bg-white ${isFullscreen ? "absolute inset-0 rounded-none border-0" : ""}`}>
        <canvas
          ref={canvasRef}
          className={`w-full bg-gradient-to-b from-slate-50 to-slate-100 cursor-grab active:cursor-grabbing ${
            isFullscreen ? "h-screen" : "h-96"
          }`}
          style={{ touchAction: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        <div className="p-4 flex flex-col gap-3 bg-background border-t border-border">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold">Orbit Radius</label>
                <span className="text-xs text-muted-foreground">{orbitRadius.toFixed(0)}px</span>
              </div>
              <input
                type="range"
                min="150"
                max="500"
                step="10"
                value={orbitRadius}
                onChange={(e) => setOrbitRadius(Number.parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold">Zoom</label>
                <span className="text-xs text-muted-foreground">{zoom.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number.parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold">Lighting</label>
                <span className="text-xs text-muted-foreground">{lighting}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={lighting}
                onChange={(e) => setLighting(Number.parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Drag canvas to orbit around door | Use radius slider to zoom in/out
          </p>

          <div className="flex flex-wrap gap-2 justify-between">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleReset} className="gap-2 flex-1 bg-transparent">
                <RotateCw className="w-4 h-4" />
                Reset
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setHasSound(!hasSound)}
                className="gap-2"
                title="Toggle sound"
              >
                {hasSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={downloadImage} className="gap-2 flex-1 bg-transparent">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsFullscreen(!isFullscreen)} className="gap-2">
                <Maximize2 className="w-4 h-4" />
              </Button>
              {onClose && (
                <Button size="sm" variant="outline" onClick={onClose}>
                  Close
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 bg-white text-black p-2 rounded-lg z-10 hover:bg-gray-100 font-bold"
        >
          ✕
        </button>
      )}
    </div>
  )
}
