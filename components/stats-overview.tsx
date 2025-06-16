"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, Award, TrendingUp } from "lucide-react"
import AnimatedCounter from "@/components/animated-counter"

interface StatsData {
  candidates: number
  jobs: number
  placements: number
  growthRate: number
}

export default function StatsOverview() {
  const [stats, setStats] = useState<StatsData>({
    candidates: 0,
    jobs: 0,
    placements: 0,
    growthRate: 0,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats({
        candidates: 15782,
        jobs: 2453,
        placements: 1289,
        growthRate: 27.8,
      })
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Candidates"
        value={stats.candidates}
        icon={<Users className="h-5 w-5 text-purple-400" />}
        description="Total registered candidates"
        isVisible={isVisible}
        color="purple"
      />

      <StatCard
        title="Jobs"
        value={stats.jobs}
        icon={<Briefcase className="h-5 w-5 text-cyan-400" />}
        description="Active job listings"
        isVisible={isVisible}
        color="cyan"
      />

      <StatCard
        title="Placements"
        value={stats.placements}
        icon={<Award className="h-5 w-5 text-purple-400" />}
        description="Successful placements"
        isVisible={isVisible}
        color="purple"
      />

      <StatCard
        title="Growth"
        value={stats.growthRate}
        icon={<TrendingUp className="h-5 w-5 text-cyan-400" />}
        description="Monthly growth rate"
        isVisible={isVisible}
        suffix="%"
        decimals={1}
        color="cyan"
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  description: string
  isVisible: boolean
  suffix?: string
  prefix?: string
  decimals?: number
  color?: "purple" | "cyan"
}

function StatCard({
  title,
  value,
  icon,
  description,
  isVisible,
  suffix = "",
  prefix = "",
  decimals = 0,
  color = "purple",
}: StatCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
      }`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${color === "purple" ? "bg-purple-500" : "bg-cyan-500"}`} />

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">
          {isVisible ? <AnimatedCounter end={value} prefix={prefix} suffix={suffix} decimals={decimals} /> : "0"}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}
