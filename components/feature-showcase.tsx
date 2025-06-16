"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Feature {
  id: number
  title: string
  description: string
  icon: string
  color: string
  particles: number
}

interface FeatureShowcaseProps {
  currentFeature: number
  onFeatureChange: (index: number) => void
}

export default function FeatureShowcase({ currentFeature, onFeatureChange }: FeatureShowcaseProps) {
  const [isVisible, setIsVisible] = useState(false)

  const features: Feature[] = [
    {
      id: 1,
      title: "AI-Powered Matching",
      description: "Advanced algorithms analyze candidate profiles and job requirements for perfect matches",
      icon: "🤖",
      color: "from-purple-500 to-pink-500",
      particles: 50,
    },
    {
      id: 2,
      title: "Smart Analytics",
      description: "Real-time insights and predictive analytics to optimize your recruitment process",
      icon: "📊",
      color: "from-cyan-500 to-blue-500",
      particles: 40,
    },
    {
      id: 3,
      title: "Video Interviews",
      description: "Seamless video interviewing with AI-powered sentiment analysis and scoring",
      icon: "🎥",
      color: "from-green-500 to-teal-500",
      particles: 45,
    },
    {
      id: 4,
      title: "Real-time Collaboration",
      description: "Team collaboration tools with instant messaging and shared candidate evaluations",
      icon: "💬",
      color: "from-orange-500 to-red-500",
      particles: 35,
    },
  ]

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      onFeatureChange((prev) => (prev + 1) % features.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [onFeatureChange, features.length])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 z-25 flex items-center justify-center pointer-events-none">
          <div className="grid grid-cols-2 gap-8 max-w-4xl">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{
                  opacity: currentFeature === index ? 1 : 0.6,
                  scale: currentFeature === index ? 1.1 : 0.9,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                className={`relative p-6 rounded-xl backdrop-blur-md border border-white/20 ${
                  currentFeature === index ? "pointer-events-auto" : ""
                }`}
                style={{
                  background:
                    currentFeature === index
                      ? `linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(6, 182, 212, 0.3))`
                      : "rgba(0, 0, 0, 0.3)",
                }}
              >
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  {Array.from({ length: feature.particles }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0,
                      }}
                      animate={{
                        x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                        y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                        opacity: currentFeature === index ? [0, 1, 0] : 0,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                {/* Feature content */}
                <div className="relative z-10">
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{
                      scale: currentFeature === index ? [1, 1.2, 1] : 1,
                      rotate: currentFeature === index ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {feature.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>

                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>

                  {/* Progress indicator */}
                  {currentFeature === index && (
                    <motion.div
                      className="absolute bottom-2 left-6 right-6 h-1 bg-white/20 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${feature.color} rounded-full`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </div>

                {/* Glow effect for active feature */}
                {currentFeature === index && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color.split(" ")[1]}, ${feature.color.split(" ")[3]})`,
                      filter: "blur(20px)",
                      opacity: 0.3,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Feature navigation dots */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {features.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 pointer-events-auto ${
                  currentFeature === index ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => onFeatureChange(index)}
              />
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
