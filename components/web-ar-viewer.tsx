"use client"

import { useEffect, useRef, useState } from "react"
import { Camera, X, RotateCw, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface WebARViewerProps {
  width: number
  height: number
  material: string
  frame: string
  finish: string
  features: string[]
}

export function WebARViewer({ width, height, material, frame, finish, features }: WebARViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isARSupported, setIsARSupported] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const animationFrameRef = useRef<number>()
  const doorRotationRef = useRef(0)

  useEffect(() => {
    const checkARSupport = async () => {
      if (typeof navigator !== "undefined") {
        const hasWebGL = !!document.createElement("canvas").getContext("webgl2")
        const hasCamera = (await navigator.mediaDevices?.enumerateDevices) ? true : false
        setIsARSupported(hasWebGL && hasCamera)
      }
    }
    checkARSupport()
  }, [])

  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        drawARFrame()
      }
    } catch (err) {
      setError("Camera access denied. Please enable camera permissions.")
      setCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
    setCameraActive(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }

  const drawARFrame = () => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawFrame = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        drawDoorOnCanvas(ctx, canvas.width, canvas.height)
      }
      animationFrameRef.current = requestAnimationFrame(drawFrame)
    }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    drawFrame()
  }

  const drawDoorOnCanvas = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    doorRotationRef.current = (doorRotationRef.current + 1) % 360

    const doorWidthPx = (width / 1000) * 100
    const doorHeightPx = (height / 1000) * 150

    const doorX = (canvasWidth - doorWidthPx) / 2
    const doorY = (canvasHeight - doorHeightPx) / 2

    // Background
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
    ctx.fillRect(doorX - 20, doorY - 20, doorWidthPx + 40, doorHeightPx + 40)

    // Frame
    const frameColor =
      {
        aluminum: "#a1a1a1",
        "stainless-steel": "#e8e8e8",
        wooden: "#8b6914",
      }[frame] || "#a1a1a1"

    ctx.fillStyle = frameColor
    ctx.fillRect(doorX, doorY, doorWidthPx, doorHeightPx)

    // Glass
    const glassColor =
      {
        "tempered-glass": "rgba(200, 220, 240, 0.7)",
        "laminated-glass": "rgba(180, 210, 240, 0.8)",
        "tinted-glass": "rgba(120, 150, 200, 0.75)",
      }[material] || "rgba(200, 220, 240, 0.7)"

    ctx.fillStyle = glassColor
    ctx.fillRect(doorX + 5, doorY + 5, doorWidthPx - 10, doorHeightPx - 10)

    // Reflection
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
    ctx.beginPath()
    ctx.ellipse(doorX + doorWidthPx / 3, doorY + doorHeightPx / 4, doorWidthPx / 5, doorHeightPx / 8, 0, 0, Math.PI * 2)
    ctx.fill()

    // Handle
    const handleColor = features.includes("smart-lock") ? "#1e40af" : "#c0c0c0"
    ctx.fillStyle = handleColor
    ctx.beginPath()
    ctx.arc(doorX + doorWidthPx - 20, doorY + doorHeightPx / 2, 8, 0, Math.PI * 2)
    ctx.fill()

    // Info labels
    if (features.includes("smart-lock")) {
      ctx.fillStyle = "#3b82f6"
      ctx.font = "bold 12px Arial"
      ctx.fillText("🔒 Smart Lock", doorX + doorWidthPx / 2 - 35, doorY - 10)
    }

    if (features.includes("auto-closer")) {
      ctx.fillStyle = "#10b981"
      ctx.font = "bold 12px Arial"
      ctx.fillText("⚙️ Auto-Closer", doorX + doorWidthPx / 2 - 40, doorY + doorHeightPx + 25)
    }

    // Dimensions
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px Arial"
    ctx.fillText(`${width}mm × ${height}mm`, doorX + doorWidthPx / 2 - 50, doorY + doorHeightPx + 50)

    // Material info
    ctx.font = "12px Arial"
    ctx.fillStyle = "#f0f0f0"
    ctx.fillText(`Material: ${material} | Frame: ${frame} | Finish: ${finish}`, doorX + 10, doorY - 30)

    // AR guides
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
    ctx.lineWidth = 2
    ctx.setLineDash([10, 10])
    ctx.strokeRect(doorX - 20, doorY - 20, doorWidthPx + 40, doorHeightPx + 40)
    ctx.setLineDash([])

    // Corner markers
    const cornerSize = 15
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.strokeRect(doorX - 20, doorY - 20, cornerSize, cornerSize)
    ctx.strokeRect(doorX + doorWidthPx + 5, doorY - 20, cornerSize, cornerSize)
    ctx.strokeRect(doorX - 20, doorY + doorHeightPx + 5, cornerSize, cornerSize)
    ctx.strokeRect(doorX + doorWidthPx + 5, doorY + doorHeightPx + 5, cornerSize, cornerSize)
  }

  const resetView = () => {
    doorRotationRef.current = 0
  }

  return (
    <div ref={containerRef} className="w-full space-y-4">
      {!cameraActive ? (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <div className="p-6 flex items-start gap-4">
              <div className="bg-blue-500 text-white p-3 rounded-lg flex-shrink-0">
                <Camera className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Real-Time AR Preview</h3>
                <p className="text-sm text-gray-700 mb-4">
                  See your custom glass door in augmented reality! Point your camera at a space and visualize exactly
                  how your door will look before ordering.
                </p>
                {isARSupported ? (
                  <Button onClick={startCamera} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Smartphone className="w-4 h-4" />
                    Launch AR Camera
                  </Button>
                ) : (
                  <p className="text-red-600 font-semibold">
                    AR not supported on this device. Please use a modern mobile device with camera.
                  </p>
                )}
              </div>
            </div>
          </Card>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-50 p-4">
              <p className="font-semibold text-sm mb-2">Step 1: Position</p>
              <p className="text-xs text-gray-600">
                Point your camera at the location where you want the door installed.
              </p>
            </Card>
            <Card className="bg-gray-50 p-4">
              <p className="font-semibold text-sm mb-2">Step 2: Visualize</p>
              <p className="text-xs text-gray-600">
                See the exact size, color, and materials in real space with lighting.
              </p>
            </Card>
            <Card className="bg-gray-50 p-4">
              <p className="font-semibold text-sm mb-2">Step 3: Decide</p>
              <p className="text-xs text-gray-600">Confident in your choice? Add to cart and book installation now!</p>
            </Card>
          </div>
        </div>
      ) : (
        <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover hidden"
            onLoadedMetadata={() => {
              if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth
                canvasRef.current.height = window.innerHeight
              }
            }}
          />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />

          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-10">
            <Button onClick={resetView} size="lg" className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
              <RotateCw className="w-4 h-4" />
              Reset
            </Button>
            <Button onClick={stopCamera} size="lg" className="bg-red-500 hover:bg-red-600 text-white gap-2">
              <X className="w-4 h-4" />
              Close AR
            </Button>
          </div>

          <div className="absolute top-6 left-0 right-0 text-center text-white text-sm font-semibold bg-black/50 py-2 rounded">
            Move your device to position the door • Tap Reset to recenter
          </div>
        </div>
      )}
    </div>
  )
}
