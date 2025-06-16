"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"
import ThreeScene from "@/components/three-scene"
import GlobalParticleSystem from "@/components/global-particle-system"
import FeatureShowcase from "@/components/feature-showcase"
import NavigationHeader from "@/components/navigation-header"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showHomepage, setShowHomepage] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleMainIconClick = () => {
    setShowHomepage(true)
    setTimeout(() => {
      setShowFeatures(true)
    }, 1000)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <GlobalParticleSystem
        isActive={showHomepage}
        blastEffect={showHomepage}
        featureMode={showFeatures}
        page="landing"
      />

      {!showHomepage ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div
            className="cursor-pointer transform transition-all duration-500 hover:scale-110 group"
            onClick={handleMainIconClick}
          >
            <div className="relative w-40 h-40 md:w-56 md:h-56">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-full opacity-70 animate-pulse group-hover:animate-ping"></div>
              <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors overflow-hidden">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full flex items-center justify-center relative">
                  <span className="text-white text-4xl md:text-6xl font-bold z-10">AI</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full animate-spin-slow opacity-30"></div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-spin-slow"></div>
            </div>
          </div>

          <h1 className="mt-8 text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 animate-gradient">
            Recruit AI Nexus
          </h1>

          <p className="mt-4 text-gray-400 text-center max-w-md px-4 animate-fade-in-up">
            Click the icon to enter the next generation of AI-powered recruitment
          </p>

          <div className="mt-8 flex space-x-4 animate-fade-in-up">
            <button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              onClick={() => router.push("/auth/login")}
            >
              Sign In
            </button>
            <button
              className="px-6 py-3 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-900/20 hover:scale-105 transition-all duration-300"
              onClick={() => router.push("/auth/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-20">
          <ThreeScene />
          <NavigationHeader />

          {showFeatures && <FeatureShowcase currentFeature={currentFeature} onFeatureChange={setCurrentFeature} />}

          {/* Enhanced Bottom Panel */}
          <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center">
            <div className="bg-black/50 backdrop-blur-md p-8 rounded-2xl max-w-5xl border border-purple-500/20 hover:border-cyan-500/40 transition-all duration-500 glass-morphism">
              <h2 className="text-4xl font-bold text-white mb-6 animate-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered Recruitment Revolution
              </h2>

              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Experience the future of hiring with our advanced AI algorithms that analyze skills, experience, and
                cultural fit to provide perfect candidate matches in real-time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-3xl font-bold text-purple-400">98%</div>
                  <div className="text-gray-300">Match Accuracy</div>
                </div>
                <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <div className="text-3xl font-bold text-cyan-400">50%</div>
                  <div className="text-gray-300">Faster Hiring</div>
                </div>
                <div className="text-center p-4 bg-pink-500/10 rounded-lg border border-pink-500/20">
                  <div className="text-3xl font-bold text-pink-400">24/7</div>
                  <div className="text-gray-300">AI Support</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-400 text-white hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-semibold"
                  onClick={() => router.push("/dashboard")}
                >
                  Enter Dashboard
                </button>
                <button
                  className="px-8 py-4 rounded-full bg-transparent border border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                  onClick={() => setShowFeatures(!showFeatures)}
                >
                  {showFeatures ? "Hide Features" : "Explore Features"}
                </button>
                <button
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-400 text-white hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 font-semibold"
                  onClick={() => router.push("/interview")}
                >
                  Try AI Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
