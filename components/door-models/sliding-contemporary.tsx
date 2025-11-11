"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface SlidingContemporaryProps {
  width: number
  height: number
  material: string
  finish: string
  features: string[]
}

export function SlidingContemporaryModel({ width, height, material, finish, features }: SlidingContemporaryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitStateRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 6, radius: 3.5 })

  useEffect(() => {
    if (!containerRef.current) return

    import("three").then(
      ({
        Scene,
        PerspectiveCamera,
        WebGLRenderer,
        Group,
        BoxGeometry,
        MeshStandardMaterial,
        Mesh,
        DirectionalLight,
        AmbientLight,
      }) => {
        const container = containerRef.current!
        const width_px = container.clientWidth
        const height_px = container.clientHeight

        const scene = new Scene()
        scene.background = new THREE.Color(0xf5f5f5)

        const camera = new PerspectiveCamera(75, width_px / height_px, 0.1, 1000)
        camera.position.set(2.5, 1, 2.5)
        camera.lookAt(0, 0, 0)

        const renderer = new WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(width_px, height_px)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.shadowMap.enabled = true
        container.appendChild(renderer.domElement)

        const doorGroup = new Group()
        scene.add(doorGroup)

        const doorWidth = (width / 1000) * 0.8
        const doorHeight = (height / 1000) * 0.8

        const glassColor =
          {
            "tempered-glass": 0x87ceeb,
            "laminated-glass": 0x6eb5e8,
            "tinted-glass": 0x4a7ba7,
          }[material] || 0x87ceeb

        const glassMaterial = new MeshStandardMaterial({
          color: glassColor,
          metalness: 0.08,
          roughness: 0.18,
          transparent: true,
          opacity: 0.92,
        })

        const panelWidth = doorWidth / 2 - 0.05

        const leftPanelGeometry = new BoxGeometry(panelWidth, doorHeight, 0.05)
        const leftPanel = new Mesh(leftPanelGeometry, glassMaterial)
        leftPanel.position.x = -panelWidth / 2 - 0.025
        leftPanel.castShadow = true
        leftPanel.receiveShadow = true
        doorGroup.add(leftPanel)

        const rightPanel = new Mesh(leftPanelGeometry, glassMaterial)
        rightPanel.position.x = panelWidth / 2 + 0.025
        rightPanel.castShadow = true
        rightPanel.receiveShadow = true
        doorGroup.add(rightPanel)

        // Minimal aluminum frame
        const frameThickness = 0.06
        const frameDepth = 0.06

        const aluminumMaterial = new MeshStandardMaterial({
          color: 0xa8a8a8,
          metalness: 0.75,
          roughness: 0.2,
        })

        // Top track
        const topTrackGeometry = new BoxGeometry(doorWidth + frameThickness * 2, frameThickness, frameDepth)
        const topTrack = new Mesh(topTrackGeometry, aluminumMaterial)
        topTrack.position.y = doorHeight / 2 + frameThickness / 2
        topTrack.castShadow = true
        doorGroup.add(topTrack)

        // Bottom track
        const bottomTrack = new Mesh(topTrackGeometry, aluminumMaterial)
        bottomTrack.position.y = -doorHeight / 2 - frameThickness / 2
        bottomTrack.castShadow = true
        doorGroup.add(bottomTrack)

        // Side frames
        const sideFrameGeometry = new BoxGeometry(frameThickness, doorHeight, frameDepth)
        const leftSide = new Mesh(sideFrameGeometry, aluminumMaterial)
        leftSide.position.x = -doorWidth / 2 - frameThickness / 2
        leftSide.castShadow = true
        doorGroup.add(leftSide)

        const rightSide = new Mesh(sideFrameGeometry, aluminumMaterial)
        rightSide.position.x = doorWidth / 2 + frameThickness / 2
        rightSide.castShadow = true
        doorGroup.add(rightSide)

        // Sleek handles for sliding doors
        const handleMaterial = new MeshStandardMaterial({
          color: features.includes("smart-lock") ? 0x1e40af : 0xb5b5b5,
          metalness: 0.9,
          roughness: 0.1,
        })

        const handleGeometry = new BoxGeometry(0.05, 0.2, 0.03)
        const leftHandle = new Mesh(handleGeometry, handleMaterial)
        leftHandle.position.set(-panelWidth / 2, 0, 0.08)
        leftHandle.castShadow = true
        doorGroup.add(leftHandle)

        const rightHandle = new Mesh(handleGeometry, handleMaterial)
        rightHandle.position.set(panelWidth / 2, 0, 0.08)
        rightHandle.castShadow = true
        doorGroup.add(rightHandle)

        // Lighting
        const ambientLight = new AmbientLight(0xffffff, 0.7)
        scene.add(ambientLight)

        const directionalLight = new DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(5, 5, 5)
        directionalLight.castShadow = true
        scene.add(directionalLight)

        // Mouse controls
        let mouseDown = false
        let mouseX = 0,
          mouseY = 0

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
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement)
          }
          renderer.dispose()
        }
      },
    )
  }, [width, height, material, finish, features])

  return <div ref={containerRef} className="w-full h-full min-h-96 bg-gray-100 rounded-lg overflow-hidden" />
}
