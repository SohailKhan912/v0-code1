"use client"

import dynamic from "next/dynamic"

const DoorModel3D = dynamic(() => import("@/components/door-model-3d"), { ssr: false })

// Minimal mock config so you can verify rendering instantly
const mock = {
  width: 900,
  height: 2100,
  glassMaterial: "tempered",
  frameType: "aluminum",
  addOns: { smartLock: true }
}

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">3D Door Test</h1>
      <DoorModel3D config={mock as any} />
      <p className="mt-4 text-sm text-gray-600">If you can see the rotating door here, the 3D logic is installed correctly. Next, wire it into your existing preview tab.</p>
    </main>
  )
}
