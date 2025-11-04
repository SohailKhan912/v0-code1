"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Door3DProps {
  width: number
  height: number
  material: string
  frame: string
  finish: string
  handle: string
  features: string[]
  onFullscreen?: () => void
}

export function Realistic3DDoor({ width, height, material, frame, finish, features }: Door3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const doorGroupRef = useRef<THREE.Group | null>(null)
  const orbitStateRef = useRef({
    theta: Math.PI / 4,
    phi: Math.PI / 6,
    radius: 3,
  })
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width_px = container.clientWidth
    const height_px = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf8f9fa)
    scene.fog = new THREE.Fog(0xf8f9fa, 10, 50)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width_px / height_px, 0.1, 1000)
    camera.position.set(2, 1, 2)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width_px, height_px)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Door group
    const doorGroup = new THREE.Group()
    scene.add(doorGroup)
    doorGroupRef.current = doorGroup

    // Normalize dimensions
    const doorWidth = (width / 1000) * 0.8
    const doorHeight = (height / 1000) * 0.8

    const glassColor =
      {
        "tempered-glass": 0x87ceeb,
        "laminated-glass": 0x6eb5e8,
        "tinted-glass": 0x4a7ba7,
      }[material] || 0x87ceeb

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: glassColor,
      metalness: 0.05,
      roughness: 0.1,
      transparent: true,
      opacity: finish === "matte" ? 0.75 : 0.85,
      transmission: 0.9,
      thickness: 0.5,
      envMapIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })

    const frameColor =
      {
        aluminum: 0xa0a0a0,
        "stainless-steel": 0xcccccc,
        wooden: 0x8b6914,
      }[frame] || 0xa0a0a0

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: frameColor,
      metalness: frame === "aluminum" ? 0.7 : frame === "stainless-steel" ? 0.9 : 0.1,
      roughness: frame === "wooden" ? 0.8 : 0.2,
      envMapIntensity: 1.2,
    })

    // Door glass
    const glassGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, 0.05)
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial)
    glassMesh.castShadow = true
    glassMesh.receiveShadow = true
    doorGroup.add(glassMesh)

    // Frame
    const frameThickness = 0.08
    const frameDepth = 0.05

    // Top frame
    const topFrameGeometry = new THREE.BoxGeometry(doorWidth + frameThickness * 2, frameThickness, frameDepth)
    const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterial)
    topFrame.position.y = doorHeight / 2 + frameThickness / 2
    topFrame.castShadow = true
    topFrame.receiveShadow = true
    doorGroup.add(topFrame)

    // Bottom frame
    const bottomFrame = new THREE.Mesh(topFrameGeometry, frameMaterial)
    bottomFrame.position.y = -doorHeight / 2 - frameThickness / 2
    bottomFrame.castShadow = true
    bottomFrame.receiveShadow = true
    doorGroup.add(bottomFrame)

    // Side frames
    const sideFrameGeometry = new THREE.BoxGeometry(frameThickness, doorHeight, frameDepth)
    const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial)
    leftFrame.position.x = -doorWidth / 2 - frameThickness / 2
    leftFrame.castShadow = true
    leftFrame.receiveShadow = true
    doorGroup.add(leftFrame)

    const rightFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial)
    rightFrame.position.x = doorWidth / 2 + frameThickness / 2
    rightFrame.castShadow = true
    rightFrame.receiveShadow = true
    doorGroup.add(rightFrame)

    const handleColor = features.includes("smart-lock") ? 0x1e40af : 0xc0c0c0
    const handleMaterial = new THREE.MeshStandardMaterial({
      color: handleColor,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 1.5,
    })

    const handleGeometry = new THREE.BoxGeometry(0.08, 0.2, 0.04)
    const handle = new THREE.Mesh(handleGeometry, handleMaterial)
    handle.position.set(doorWidth / 2 + 0.1, 0, 0.1)
    handle.castShadow = true
    handle.receiveShadow = true
    doorGroup.add(handle)

    // Hinges
    const hingeColor = 0x808080
    const hingeMaterial = new THREE.MeshStandardMaterial({
      color: hingeColor,
      metalness: 0.85,
      roughness: 0.15,
    })

    const hingeGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.06)
    const topHinge = new THREE.Mesh(hingeGeometry, hingeMaterial)
    topHinge.position.set(-doorWidth / 2 - 0.05, doorHeight / 2 - 0.15, 0.05)
    topHinge.castShadow = true
    topHinge.receiveShadow = true
    doorGroup.add(topHinge)

    const bottomHinge = new THREE.Mesh(hingeGeometry, hingeMaterial)
    bottomHinge.position.set(-doorWidth / 2 - 0.05, -doorHeight / 2 + 0.15, 0.05)
    bottomHinge.castShadow = true
    bottomHinge.receiveShadow = true
    doorGroup.add(bottomHinge)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.bias = -0.0001
    scene.add(directionalLight)

    // Add fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
    fillLight.position.set(-5, 3, -5)
    scene.add(fillLight)

    // Add rim light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3)
    rimLight.position.set(0, 5, -5)
    scene.add(rimLight)

    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const groundGeometry = new THREE.PlaneGeometry(10, 10)
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.2 })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -doorHeight / 2 - 0.1
    ground.receiveShadow = true
    scene.add(ground)

    // Mouse controls
    let mouseDown = false
    let mouseX = 0
    let mouseY = 0

    renderer.domElement.addEventListener("mousedown", (e) => {
      mouseDown = true
      mouseX = e.clientX
      mouseY = e.clientY
    })

    renderer.domElement.addEventListener("mousemove", (e) => {
      if (mouseDown) {
        const deltaX = (e.clientX - mouseX) * 0.005
        const deltaY = (e.clientY - mouseY) * 0.005

        orbitStateRef.current.theta -= deltaX
        orbitStateRef.current.phi -= deltaY
        orbitStateRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, orbitStateRef.current.phi))

        mouseX = e.clientX
        mouseY = e.clientY
      }
    })

    renderer.domElement.addEventListener("mouseup", () => {
      mouseDown = false
    })

    renderer.domElement.addEventListener("wheel", (e) => {
      e.preventDefault()
      orbitStateRef.current.radius += e.deltaY * 0.001
      orbitStateRef.current.radius = Math.max(1.5, Math.min(8, orbitStateRef.current.radius))
    })

    // Touch controls
    let touchStartX = 0
    let touchStartY = 0

    renderer.domElement.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    })

    renderer.domElement.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1) {
        const deltaX = (e.touches[0].clientX - touchStartX) * 0.005
        const deltaY = (e.touches[0].clientY - touchStartY) * 0.005

        orbitStateRef.current.theta -= deltaX
        orbitStateRef.current.phi -= deltaY
        orbitStateRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, orbitStateRef.current.phi))

        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
      }
    })

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      const state = orbitStateRef.current
      const x = state.radius * Math.sin(state.phi) * Math.cos(state.theta)
      const y = state.radius * Math.cos(state.phi)
      const z = state.radius * Math.sin(state.phi) * Math.sin(state.theta)

      camera.position.set(x, y, z)
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      container.removeChild(renderer.domElement)
      renderer.dispose()
      pmremGenerator.dispose()
    }
  }, [width, height, material, frame, finish, features])

  const resetView = () => {
    orbitStateRef.current = {
      theta: Math.PI / 4,
      phi: Math.PI / 6,
      radius: 3,
    }
  }

  const zoomIn = () => {
    orbitStateRef.current.radius = Math.max(1.5, orbitStateRef.current.radius - 0.5)
  }

  const zoomOut = () => {
    orbitStateRef.current.radius = Math.min(8, orbitStateRef.current.radius + 0.5)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full h-full min-h-[500px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden shadow-inner"
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-border">
        <Button size="sm" variant="ghost" onClick={resetView} title="Reset View">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={zoomIn} title="Zoom In">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={zoomOut} title="Zoom Out">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={toggleFullscreen} title="Fullscreen">
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </div>

      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border max-w-xs">
        <p className="text-xs font-semibold mb-2">3D Controls</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Drag to rotate</li>
          <li>• Scroll to zoom</li>
          <li>• Touch & drag on mobile</li>
        </ul>
      </div>
    </div>
  )
}
