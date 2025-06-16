"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Briefcase, Calendar } from "lucide-react"

export default function AdvancedChart() {
  const [chartData, setChartData] = useState<number[]>([])
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    // Generate sample data
    const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 20)
    setChartData(data)

    // Animate chart
    const timer = setInterval(() => {
      setAnimationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const maxValue = Math.max(...chartData)

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
          Recruitment Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t transition-all duration-1000 ease-out"
                  style={{
                    height: `${(value / maxValue) * 200 * (animationProgress / 100)}px`,
                    opacity: animationProgress / 100,
                  }}
                />
                <span className="text-xs text-gray-400 mt-2">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                </span>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <Users className="h-5 w-5 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-bold">1,247</div>
              <div className="text-gray-400 text-xs">Total Candidates</div>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <Briefcase className="h-5 w-5 text-cyan-400 mx-auto mb-2" />
              <div className="text-white font-bold">89</div>
              <div className="text-gray-400 text-xs">Active Jobs</div>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <Calendar className="h-5 w-5 text-green-400 mx-auto mb-2" />
              <div className="text-white font-bold">156</div>
              <div className="text-gray-400 text-xs">Interviews</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
