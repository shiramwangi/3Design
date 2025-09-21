"use client"

import { useRef, useEffect } from "react"

export default function EnvMapGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Colors for different faces
  const colors = {
    px: "#4287f5", // right - blue
    nx: "#42f5a7", // left - teal
    py: "#f542a1", // up - pink
    ny: "#f5d442", // down - yellow
    pz: "#f54242", // front - red
    nz: "#a142f5", // back - purple
  }

  useEffect(() => {
    const generateEnvMap = (name: string, color: string) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add some gradient for visual interest
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, adjustColor(color, -30))
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add text label
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 48px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(name, canvas.width / 2, canvas.height / 2)

      // Convert to data URL
      const dataUrl = canvas.toDataURL("image/png")

      // Create download link
      const link = document.createElement("a")
      link.download = `${name}.png`
      link.href = dataUrl
      link.click()
    }

    // Helper to darken/lighten colors
    const adjustColor = (color: string, amount: number) => {
      const clamp = (val: number) => Math.min(255, Math.max(0, val))

      // Convert hex to rgb
      const hex = color.replace("#", "")
      const r = Number.parseInt(hex.substring(0, 2), 16)
      const g = Number.parseInt(hex.substring(2, 4), 16)
      const b = Number.parseInt(hex.substring(4, 6), 16)

      // Adjust and convert back to hex
      return `#${clamp(r + amount)
        .toString(16)
        .padStart(2, "0")}${clamp(g + amount)
        .toString(16)
        .padStart(2, "0")}${clamp(b + amount)
        .toString(16)
        .padStart(2, "0")}`
    }

    // Generate button click handlers
    document.getElementById("generate-all")?.addEventListener("click", () => {
      Object.entries(colors).forEach(([name, color]) => {
        generateEnvMap(name, color)
      })
    })

    Object.entries(colors).forEach(([name, color]) => {
      document.getElementById(`generate-${name}`)?.addEventListener("click", () => {
        generateEnvMap(name, color)
      })
    })
  }, [])

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Environment Map Generator</h1>
      <p className="mb-4">
        Click the buttons below to generate environment map images. Save these files to your project's
        <code className="bg-gray-200 px-1 rounded mx-1">public/env/</code> directory.
      </p>

      <div className="mb-4">
        <button id="generate-all" className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
          Generate All Files
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(colors).map(([name, color]) => (
          <button
            key={name}
            id={`generate-${name}`}
            className="p-4 rounded text-white flex flex-col items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="text-lg font-bold">{name}.png</span>
            <span className="text-sm">Click to generate</span>
          </button>
        ))}
      </div>

      <canvas ref={canvasRef} width="512" height="512" className="hidden" />

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">Instructions:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Click "Generate All Files" or individual buttons to create environment map images</li>
          <li>
            Save all 6 files to your project's <code className="bg-gray-200 px-1 rounded">public/env/</code> directory
          </li>
          <li>Make sure the filenames match exactly: px.png, nx.png, py.png, ny.png, pz.png, nz.png</li>
          <li>Refresh your cube project to see the custom environment maps applied</li>
        </ol>
      </div>
    </div>
  )
}
