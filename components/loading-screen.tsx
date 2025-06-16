"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 relative mb-8">
        <div className="absolute inset-0 border-4 border-purple-600/30 rounded-full"></div>
        <div
          className="absolute inset-0 border-4 border-t-cyan-400 border-r-cyan-400 border-b-transparent border-l-transparent rounded-full animate-spin"
          style={{ animationDuration: "1.5s" }}
        ></div>
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">Recruit AI Nexus</h2>
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-400 mt-2">Loading {progress}%</p>
    </div>
  )
}
