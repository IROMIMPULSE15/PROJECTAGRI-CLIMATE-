"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Settings,
  Users,
  MessageSquare,
  Share,
  MoreVertical,
  Volume2,
  VolumeX,
  Monitor,
  Maximize,
  ArrowLeft,
} from "lucide-react"
import GlobalParticleSystem from "@/components/global-particle-system"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ConversationalAI from "@/components/conversational-ai"

export default function InterviewPage() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [interviewTime, setInterviewTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const questions = [
    "Tell me about yourself and your background in software development.",
    "Describe a challenging project you've worked on and how you overcame obstacles.",
    "How do you stay updated with the latest technology trends?",
    "Explain your experience with team collaboration and leadership.",
    "What are your career goals for the next 5 years?",
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (interviewStarted) {
      interval = setInterval(() => {
        setInterviewTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [interviewStarted])

  useEffect(() => {
    // Initialize camera
    if (isVideoOn && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => console.error("Error accessing camera:", err))
    }
  }, [isVideoOn])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startInterview = () => {
    setInterviewStarted(true)
    setIsRecording(true)
  }

  const endInterview = () => {
    setInterviewStarted(false)
    setIsRecording(false)
    router.push("/dashboard")
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <GlobalParticleSystem isActive={true} blastEffect={false} featureMode={true} page="interview" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-md border-b border-purple-500/20">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="bg-black/50 border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">AI Interview Session</h1>
              <p className="text-gray-400 text-sm">
                {interviewStarted ? `Question ${currentQuestion + 1} of ${questions.length}` : "Ready to start"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {interviewStarted && (
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-gray-500"}`}
                ></div>
                <span className="text-white font-mono">{formatTime(interviewTime)}</span>
              </div>
            )}
            <Button variant="outline" size="sm" className="bg-black/50 border-white/20 text-white hover:bg-white/10">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Video Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Video */}
            <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
              <div className="relative aspect-video bg-gray-800">
                {isVideoOn ? (
                  <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                  </div>
                )}

                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/70 backdrop-blur-md rounded-full px-6 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAudioOn(!isAudioOn)}
                    className={`rounded-full ${isAudioOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}
                  >
                    {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`rounded-full ${isVideoOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}
                  >
                    {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                    className={`rounded-full ${isScreenSharing ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"}`}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-full bg-gray-700 hover:bg-gray-600"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>

                  {interviewStarted ? (
                    <Button onClick={endInterview} className="rounded-full bg-red-600 hover:bg-red-700 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      End Interview
                    </Button>
                  ) : (
                    <Button
                      onClick={startInterview}
                      className="rounded-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Start Interview
                    </Button>
                  )}
                </div>

                {/* AI Interviewer */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-purple-500 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <span className="text-xs font-bold">AI</span>
                      </div>
                      <div className="text-xs">Interviewer</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Conversation Component */}
            {interviewStarted && (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-cyan-400" />
                    AI Conversation Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ConversationalAI />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Current Question */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
                    Current Question
                  </span>
                  <span className="text-sm text-gray-400">
                    {currentQuestion + 1}/{questions.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white leading-relaxed mb-4">{questions[currentQuestion]}</p>
                {interviewStarted && currentQuestion < questions.length - 1 && (
                  <Button onClick={nextQuestion} className="w-full bg-gradient-to-r from-purple-600 to-cyan-400">
                    Next Question
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Interview Progress */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-400" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Questions Completed</span>
                      <span className="text-white">
                        {currentQuestion + 1}/{questions.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="text-lg font-bold text-purple-400">{formatTime(interviewTime)}</div>
                      <div className="text-xs text-gray-400">Duration</div>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="text-lg font-bold text-cyan-400">{interviewStarted ? "Live" : "Ready"}</div>
                      <div className="text-xs text-gray-400">Status</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share className="h-5 w-5 mr-2 text-orange-400" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Confidence</span>
                      <span className="text-green-400 font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div className="bg-green-500 h-1 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Clarity</span>
                      <span className="text-blue-400 font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div className="bg-blue-500 h-1 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Engagement</span>
                      <span className="text-purple-400 font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div className="bg-purple-500 h-1 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MoreVertical className="h-5 w-5 mr-2 text-gray-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Maximize className="h-4 w-4 mr-2" />
                  Fullscreen
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share className="h-4 w-4 mr-2" />
                  Share Screen
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
