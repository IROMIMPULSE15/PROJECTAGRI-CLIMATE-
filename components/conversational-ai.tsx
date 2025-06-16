"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Text } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Play, Square } from "lucide-react"
import type * as THREE from "three"

export default function ConversationalAI() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isResponding, setIsResponding] = useState(false)
  const [waveform, setWaveform] = useState<number[]>(Array(50).fill(5))

  // Simulate speech recognition
  const toggleListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate microphone activity with animated waveform
      const interval = setInterval(() => {
        setWaveform((prev) => prev.map(() => Math.floor(Math.random() * 30) + 5))
      }, 100)

      // Simulate speech recognition after 3 seconds
      setTimeout(() => {
        clearInterval(interval)
        setIsListening(false)
        setTranscript("Tell me about your experience with machine learning projects.")
        simulateAIResponse()
      }, 3000)
    }
  }

  // Simulate AI response
  const simulateAIResponse = () => {
    setIsResponding(true)
    const response =
      "I've worked on several machine learning projects including natural language processing, computer vision, and recommendation systems. My most recent project involved developing a sentiment analysis model for customer feedback that achieved 92% accuracy."

    let i = 0
    const interval = setInterval(() => {
      setAiResponse(response.substring(0, i))
      i++
      if (i > response.length) {
        clearInterval(interval)
        setIsResponding(false)
      }
    }, 30)
  }

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* 3D Visualization */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Environment preset="city" />

          <BrainVisualization isActive={isResponding} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />

          {/* Display transcript in 3D space */}
          {transcript && (
            <Text position={[0, 2, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={4}>
              {transcript}
            </Text>
          )}
        </Canvas>
      </div>

      {/* Chat Interface */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-black/80 p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {transcript && (
            <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
              <p className="text-white">{transcript}</p>
            </div>
          )}

          {aiResponse && (
            <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/30">
              <p className="text-white">{aiResponse}</p>
            </div>
          )}
        </div>

        {/* Voice Waveform */}
        <div className="h-20 mb-4 flex items-center justify-center">
          <div className="flex items-end h-16 space-x-1">
            {waveform.map((height, i) => (
              <div
                key={i}
                className={`w-1 rounded-full ${isListening ? "bg-cyan-400" : "bg-gray-600"}`}
                style={{
                  height: `${height}px`,
                  transition: "height 0.1s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            className={`rounded-full ${isListening ? "bg-red-500/20 border-red-500" : "bg-cyan-500/20 border-cyan-500"}`}
            onClick={toggleListening}
          >
            {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
            {isListening ? "Stop" : "Speak"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full bg-purple-500/20 border-purple-500"
            onClick={simulateAIResponse}
            disabled={isResponding}
          >
            {isResponding ? <Square className="mr-2" /> : <Play className="mr-2" />}
            {isResponding ? "Responding..." : "Sample Response"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function BrainVisualization({ isActive }: { isActive: boolean }) {
  const brainRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!brainRef.current) return

    // Animate brain when AI is responding
    if (isActive) {
      brainRef.current.scale.set(1.2, 1.2, 1.2)
    } else {
      brainRef.current.scale.set(1, 1, 1)
    }
  }, [isActive])

  return (
    <group ref={brainRef} position={[0, 0, 0]}>
      {/* Brain core */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={isActive ? "#00ffff" : "#7b68ee"}
          emissive={isActive ? "#00ffff" : "#2a0080"}
          emissiveIntensity={isActive ? 1 : 0.5}
          metalness={0.3}
          roughness={0.4}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* Neural connections */}
      {Array.from({ length: 20 }).map((_, i) => (
        <NeuralConnection key={i} index={i} isActive={isActive} />
      ))}

      {/* Particles */}
      <Particles count={1000} isActive={isActive} />
    </group>
  )
}

function NeuralConnection({ index, isActive }: { index: number; isActive: boolean }) {
  const angle = (index / 20) * Math.PI * 2
  const radius = 1

  const x1 = Math.cos(angle) * radius
  const y1 = Math.sin(angle) * radius
  const z1 = 0

  const x2 = x1 * 2
  const y2 = y1 * 2
  const z2 = (Math.random() - 0.5) * 2

  return (
    <group>
      <mesh position={[x2, y2, z2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={isActive ? "#00ffff" : "#7b68ee"} transparent={true} opacity={0.8} />
      </mesh>

      <mesh>
        <cylinderGeometry args={[0.01, 0.01, Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2), 8, 1]} />
        <meshBasicMaterial color={isActive ? "#00ffff" : "#7b68ee"} transparent={true} opacity={0.6} />
        <group position={[(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2]}>
          <mesh rotation={[Math.PI / 2, Math.atan2(y2 - y1, x2 - x1), 0]}>
            {/* This empty mesh is positioned to help with the rotation */}
          </mesh>
        </group>
      </mesh>
    </group>
  )
}

function Particles({ count, isActive }: { count: number; isActive: boolean }) {
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={isActive ? "#00ffff" : "#ffffff"}
        transparent={true}
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  )
}
