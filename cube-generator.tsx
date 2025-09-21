"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"
import { Suspense } from "react"

const CUBE_COLOR = "#006EFE"
const CUBE_SIZE = 3

// Available environment presets
const ENV_PRESETS = [
  "forest", // Default
  "apartment",
  "city",
  "dawn",
  "lobby",
  "night",
  "park",
  "studio",
  "sunset",
  "warehouse",
]

function Cube({ envPreset }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  const cubeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: CUBE_COLOR,
      transparent: true,
      opacity: 0.9, // Slightly more transparent
      transmission: 0.2, // Increased for more transparency
      thickness: CUBE_SIZE,
      roughness: 0.0, // Reduced to 0 for crystal clear reflections
      metalness: 0.3, // Slightly increased for more reflectivity
      clearcoat: 1.5, // Increased for stronger clear coat
      clearcoatRoughness: 0, // Reduced to 0 for perfect clear coat
      envMapIntensity: 2.5, // Increased for stronger reflections
      ior: 1.5, // Index of refraction (glass-like)
      side: THREE.DoubleSide,
    })
  }, [])

  return (
    <group ref={meshRef}>
      <mesh material={cubeMaterial}>
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      </mesh>
      <Environment preset={envPreset} background />
    </group>
  )
}

export default function CubeGenerator() {
  const [envPreset, setEnvPreset] = useState(ENV_PRESETS[0]) // "forest" is default

  return (
    <div className="w-full min-h-screen bg-black p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-wider">EVENTSCAPE</h1>
        </div>
        <p className="text-blue-400 text-lg font-medium tracking-wide">Design Smarter</p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-4"></div>
      </div>

      <div className="w-full max-w-3xl">
        <div className="w-full h-[500px]">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={1.5} />
            <Suspense fallback={null}>
              <Cube envPreset={envPreset} />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {ENV_PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => setEnvPreset(preset)}
              className={`px-3 py-2 rounded text-sm font-mono ${
                preset === envPreset ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
