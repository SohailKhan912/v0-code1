"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface WoodenFrameClassicProps {
  width: number
  height: number
  material: string
  finish: string
  features: string[]
}

export function WoodenFrameClassicModel({ width, height, material, finish, features }: WoodenFrameClassicProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitStateRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 6, radius: 3 })

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
        camera.position.set(2, 1, 2)
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
          metalness: 0.05,
          roughness: 0.25,
          transparent: true,
          opacity: 0.88,
        })

        // Glass panel
        const glassGeometry = new BoxGeometry(doorWidth * 0.85, doorHeight * 0.9, 0.05)
        const glassMesh = new Mesh(glassGeometry, glassMaterial)
        glassMesh.castShadow = true
        glassMesh.receiveShadow = true
        doorGroup.add(glassMesh)

        const frameThickness = 0.1
        const frameDepth = 0.08

        const woodMaterial = new MeshStandardMaterial({
          color: 0x8b6914,
          metalness: 0.0,
          roughness: 0.8,
        })

        // Top frame
        const topFrameGeometry = new BoxGeometry(doorWidth + frameThickness * 2, frameThickness, frameDepth)
        const topFrame = new Mesh(topFrameGeometry, woodMaterial)
        topFrame.position.y = doorHeight / 2 + frameThickness / 2
        topFrame.castShadow = true
        topFrame.receiveShadow = true
        doorGroup.add(topFrame)

        // Bottom frame
        const bottomFrame = new Mesh(topFrameGeometry, woodMaterial)
        bottomFrame.position.y = -doorHeight / 2 - frameThickness / 2
        bottomFrame.castShadow = true
        bottomFrame.receiveShadow = true
        doorGroup.add(bottomFrame)

        // Left frame
        const sideFrameGeometry = new BoxGeometry(frameThickness, doorHeight, frameDepth)
        const leftFrame = new Mesh(sideFrameGeometry, woodMaterial)
        leftFrame.position.x = -doorWidth / 2 - frameThickness / 2
        leftFrame.castShadow = true
        doorGroup.add(leftFrame)

        // Right frame
        const rightFrame = new Mesh(sideFrameGeometry, woodMaterial)
        rightFrame.position.x = doorWidth / 2 + frameThickness / 2
        rightFrame.castShadow = true
        doorGroup.add(rightFrame)

        // Classic wooden handle
        const handleMaterial = new MeshStandardMaterial({
          color: features.includes("smart-lock") ? 0x1e40af : 0xd4a574,
          metalness: 0.6,
          roughness: 0.4,
        })

        const handleGeometry = new BoxGeometry(0.08, 0.2, 0.06)
        const handle = new Mesh(handleGeometry, handleMaterial)
        handle.position.set(doorWidth / 2 + 0.15, 0, 0.1)
        handle.castShadow = true
        doorGroup.add(handle)

        // Lighting
        const ambientLight = new AmbientLight(0xffffff, 0.65)
        scene.add(ambientLight)

        const directionalLight = new DirectionalLight(0xffffff, 0.75)
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
