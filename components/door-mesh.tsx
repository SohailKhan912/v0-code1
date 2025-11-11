"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { DoorConfig } from "./door-configurator"

type Props = { config?: Partial<DoorConfig> }

export function DoorMesh({ config }: Props) {
  const doorRef = useRef<THREE.Group>(null)
  useFrame((state) => { if (doorRef.current) doorRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 })

  // Safe defaults if config is missing
  const widthMm  = Number(config?.width)  || 900
  const heightMm = Number(config?.height) || 2100
  const width  = Math.max(0.4, Math.min(1.5, widthMm / 1000))
  const height = Math.max(1.5, Math.min(2.5, heightMm / 1000))
  const depth = 0.05
  const frameWidth = 0.05

  const glassMaterial = (() => {
    const base = { transparent: true, side: THREE.DoubleSide, envMapIntensity: 1 }
    switch (config?.glassMaterial) {
      case "tempered": return { ...base, color: "#e0f2ff", opacity: 0.3, metalness: 0.1, roughness: 0.1 }
      case "laminated": return { ...base, color: "#f0f9ff", opacity: 0.4, metalness: 0.0, roughness: 0.2 }
      case "tinted": return { ...base, color: "#94a3b8", opacity: 0.5, metalness: 0.2, roughness: 0.3 }
      default: return { ...base, color: "#e7eef6", opacity: 0.35, metalness: 0.1, roughness: 0.15 }
    }
  })()

  const frameMaterial = (() => {
    switch (config?.frameType) {
      case "aluminum":        return { color: "#64748b", metalness: 0.9, roughness: 0.3 }
      case "stainless-steel": return { color: "#94a3b8", metalness: 1.0, roughness: 0.2 }
      case "wooden":          return { color: "#78350f", metalness: 0.0, roughness: 0.8 }
      default:                return { color: "#64748b", metalness: 0.9, roughness: 0.3 }
    }
  })()

  return (
    <group ref={doorRef} position={[0, height / 2, 0]}>
      {/* Glass panel */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width - frameWidth * 2, height - frameWidth * 2, depth]} />
        <meshPhysicalMaterial {...glassMaterial} transmission={0.9} thickness={0.5} ior={1.5} />
      </mesh>

      {/* Frame */}
      <mesh position={[0, height/2 - frameWidth/2, 0]} castShadow>
        <boxGeometry args={[width, frameWidth, depth + 0.01]} />
        <meshStandardMaterial {...frameMaterial} />
      </mesh>
      <mesh position={[0, -height/2 + frameWidth/2, 0]} castShadow>
        <boxGeometry args={[width, frameWidth, depth + 0.01]} />
        <meshStandardMaterial {...frameMaterial} />
      </mesh>
      <mesh position={[-width/2 + frameWidth/2, 0, 0]} castShadow>
        <boxGeometry args={[frameWidth, height, depth + 0.01]} />
        <meshStandardMaterial {...frameMaterial} />
      </mesh>
      <mesh position={[width/2 - frameWidth/2, 0, 0]} castShadow>
        <boxGeometry args={[frameWidth, height, depth + 0.01]} />
        <meshStandardMaterial {...frameMaterial} />
      </mesh>

      {/* Handle */}
      <group position={[width/2 - 0.15, 0, depth/2 + 0.03]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.08, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Smart lock */}
      {config?.addOns?.smartLock && (
        <mesh position={[width/2 - 0.15, 0.2, depth/2 + 0.005]} castShadow>
          <boxGeometry args={[0.06, 0.08, 0.02]} />
          <meshStandardMaterial color="#1e40af" emissive="#3b82f6" emissiveIntensity={0.5} />
        </mesh>
      )}
    </group>
  )
}
