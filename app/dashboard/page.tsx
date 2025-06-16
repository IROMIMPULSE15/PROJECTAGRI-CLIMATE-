"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Calendar,
  Globe,
  Home,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
  TrendingUp,
  Award,
  Briefcase,
  Clock,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Star,
  MapPin,
  Phone,
  Mail,
  Video,
} from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import StatsOverview from "@/components/stats-overview"
import AdvancedChart from "@/components/advanced-chart"
import CandidateGlobe from "@/components/candidate-globe"
import NotificationCenter from "@/components/notification-center"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [notifications, setNotifications] = useState(3)
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 0,
    newApplications: 0,
    interviewsToday: 0,
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        newApplications: prev.newApplications + Math.floor(Math.random() * 2),
        interviewsToday: prev.interviewsToday + (Math.random() > 0.8 ? 1 : 0),
      }))
    }, 5000)

    const loadingTimer = setTimeout(() => setIsLoading(false), 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(loadingTimer)
    }
  }, [])

  const handleCandidateSelect = (id: number) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((candidateId) => candidateId !== id) : [...prev, id],
    )
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on candidates:`, selectedCandidates)
    setSelectedCandidates([])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <ParticleBackground particleCount={80} colorScheme="purple-cyan" />

      {/* Enhanced Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 md:w-64 bg-black/70 backdrop-blur-md border-r border-purple-500/20 z-30 transition-all duration-300">
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-center md:justify-start border-b border-purple-500/20">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="hidden md:block text-white text-xl font-bold">Recruit AI</span>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-2">
            <SidebarLink
              icon={<Home />}
              label="Dashboard"
              isActive={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <SidebarLink
              icon={<Users />}
              label="Candidates"
              isActive={activeTab === "candidates"}
              onClick={() => setActiveTab("candidates")}
            />
            <SidebarLink
              icon={<Briefcase />}
              label="Jobs"
              isActive={activeTab === "jobs"}
              onClick={() => setActiveTab("jobs")}
            />
            <SidebarLink
              icon={<BarChart />}
              label="Analytics"
              isActive={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
            />
            <SidebarLink icon={<Calendar />} label="Interviews" onClick={() => window.open("/interview", "_blank")} />
            <SidebarLink icon={<Globe />} label="Global View" />
            <SidebarLink icon={<MessageSquare />} label="Messages" badge={5} />
          </nav>

          <div className="p-4 border-t border-purple-500/20">
            <SidebarLink icon={<Settings />} label="Settings" />
            <SidebarLink icon={<User />} label="Profile" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-16 md:ml-64 p-4 md:p-8">
        {/* Enhanced Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
              Welcome back, Alex
              <span className="ml-3 text-sm bg-gradient-to-r from-purple-500 to-cyan-500 px-3 py-1 rounded-full">
                Pro
              </span>
            </h1>
            <p className="text-gray-400 mt-1">
              Here's what's happening with your recruitment today
              <span className="ml-2 text-cyan-400">• {realTimeData.activeUsers} users online</span>
            </p>
          </div>

          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidates, jobs..."
                className="bg-gray-900/50 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            <NotificationCenter
              count={notifications}
              onNotificationRead={() => setNotifications((prev) => Math.max(0, prev - 1))}
            />

            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-purple-500 cursor-pointer hover:border-cyan-500 transition-colors">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Profile"
                width={40}
                height={40}
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
          </div>
        </header>

        {/* Real-time Stats Bar */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg border border-purple-500/20">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-gray-300">Live Updates</span>
              </div>
              <div className="text-white">
                <span className="text-cyan-400">{realTimeData.newApplications}</span> new applications today
              </div>
              <div className="text-white">
                <span className="text-purple-400">{realTimeData.interviewsToday}</span> interviews scheduled
              </div>
            </div>
            <div className="text-gray-400">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>

        {/* Stats Overview */}
        <section className="mb-8">
          <StatsOverview />
        </section>

        {/* Main Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="candidates" className="data-[state=active]:bg-purple-600">
              Candidates
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-purple-600">
              Jobs
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2 bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-purple-400" />
                    Recent Activity
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "New application",
                        candidate: "Sarah Johnson",
                        job: "Senior Developer",
                        time: "2 min ago",
                        type: "application",
                      },
                      {
                        action: "Interview completed",
                        candidate: "Mike Chen",
                        job: "Product Manager",
                        time: "15 min ago",
                        type: "interview",
                      },
                      {
                        action: "Candidate hired",
                        candidate: "Emma Davis",
                        job: "UX Designer",
                        time: "1 hour ago",
                        type: "hire",
                      },
                      { action: "Job posted", candidate: "", job: "Data Scientist", time: "2 hours ago", type: "job" },
                      {
                        action: "Interview scheduled",
                        candidate: "Alex Rodriguez",
                        job: "DevOps Engineer",
                        time: "3 hours ago",
                        type: "interview",
                      },
                    ].map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-3 ${
                              activity.type === "hire"
                                ? "bg-green-500"
                                : activity.type === "interview"
                                  ? "bg-blue-500"
                                  : activity.type === "application"
                                    ? "bg-purple-500"
                                    : "bg-cyan-500"
                            }`}
                          ></div>
                          <div>
                            <p className="text-white font-medium">{activity.action}</p>
                            <p className="text-gray-400 text-sm">
                              {activity.candidate && `${activity.candidate} • `}
                              {activity.job}
                            </p>
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="mr-2 h-5 w-5 text-cyan-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Interview
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                    <Users className="mr-2 h-4 w-4" />
                    Invite Candidate
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AdvancedChart />
              <CandidateGlobe />
            </div>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <CandidatesTab
              selectedCandidates={selectedCandidates}
              onCandidateSelect={handleCandidateSelect}
              onBulkAction={handleBulkAction}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <JobsTab />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Enhanced Sidebar Link Component
interface SidebarLinkProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
  badge?: number
}

function SidebarLink({ icon, label, isActive = false, onClick, badge }: SidebarLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center py-3 px-4 rounded-md transition-all duration-300 group relative ${
        isActive
          ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30"
          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
      }`}
    >
      <div className={`mr-3 transition-transform group-hover:scale-110 ${isActive ? "text-purple-400" : ""}`}>
        {icon}
      </div>
      <span className="hidden md:block font-medium">{label}</span>
      {badge && (
        <span className="hidden md:block ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {badge}
        </span>
      )}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-r"></div>
      )}
    </button>
  )
}

// Candidates Tab Component
function CandidatesTab({
  selectedCandidates,
  onCandidateSelect,
  onBulkAction,
  searchQuery,
}: {
  selectedCandidates: number[]
  onCandidateSelect: (id: number) => void
  onBulkAction: (action: string) => void
  searchQuery: string
}) {
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Developer",
      location: "San Francisco",
      rating: 4.8,
      status: "Active",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Product Manager",
      location: "New York",
      rating: 4.6,
      status: "Interview",
      avatar: "MC",
    },
    { id: 3, name: "Emma Davis", role: "UX Designer", location: "London", rating: 4.9, status: "Hired", avatar: "ED" },
    {
      id: 4,
      name: "Alex Rodriguez",
      role: "DevOps Engineer",
      location: "Berlin",
      rating: 4.7,
      status: "Review",
      avatar: "AR",
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Data Scientist",
      location: "Toronto",
      rating: 4.5,
      status: "Active",
      avatar: "LW",
    },
  ]

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-purple-400" />
          Candidates ({filteredCandidates.length})
        </CardTitle>
        <div className="flex items-center space-x-2">
          {selectedCandidates.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{selectedCandidates.length} selected</span>
              <Button size="sm" variant="outline" onClick={() => onBulkAction("message")}>
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
              <Button size="sm" variant="outline" onClick={() => onBulkAction("interview")}>
                <Video className="h-4 w-4 mr-1" />
                Interview
              </Button>
            </div>
          )}
          <Button size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                selectedCandidates.includes(candidate.id)
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
              }`}
              onClick={() => onCandidateSelect(candidate.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    {candidate.avatar}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{candidate.name}</h3>
                    <p className="text-gray-400 text-sm">{candidate.role}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {candidate.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-white">{candidate.rating}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        candidate.status === "Hired"
                          ? "bg-green-500/20 text-green-300"
                          : candidate.status === "Interview"
                            ? "bg-blue-500/20 text-blue-300"
                            : candidate.status === "Review"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-purple-500/20 text-purple-300"
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Jobs Tab Component
function JobsTab() {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-cyan-400" />
          Job Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                  Senior Developer
                </h3>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3">Tech Department • Full Time</p>
              <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                <span>{20 + i} applicants</span>
                <span>Posted {i} days ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    i % 2 === 0 ? "bg-green-500/20 text-green-300" : "bg-blue-500/20 text-blue-300"
                  }`}
                >
                  {i % 2 === 0 ? "Remote" : "On-site"}
                </span>
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-cyan-600">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Analytics Tab Component
function AnalyticsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
            Hiring Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { metric: "Time to Hire", value: "14 days", change: "-2 days", trend: "down" },
              { metric: "Cost per Hire", value: "$3,200", change: "-$400", trend: "down" },
              { metric: "Offer Acceptance Rate", value: "87%", change: "+5%", trend: "up" },
              { metric: "Quality of Hire", value: "4.2/5", change: "+0.3", trend: "up" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">{item.metric}</span>
                <div className="text-right">
                  <div className="text-white font-medium">{item.value}</div>
                  <div className={`text-xs ${item.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-yellow-400" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Sarah Johnson", hires: 12, rating: 4.9 },
              { name: "Mike Chen", hires: 10, rating: 4.8 },
              { name: "Emma Davis", hires: 8, rating: 4.7 },
              { name: "Alex Rodriguez", hires: 7, rating: 4.6 },
            ].map((recruiter, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                    {recruiter.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-white font-medium">{recruiter.name}</div>
                    <div className="text-gray-400 text-sm">{recruiter.hires} successful hires</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-white">{recruiter.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
