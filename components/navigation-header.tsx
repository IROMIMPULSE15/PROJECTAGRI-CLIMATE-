"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Home, Users, Briefcase, BarChart3, Video, MessageSquare, User, Bell, Search, Menu, X } from "lucide-react"

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard", color: "text-purple-400" },
    { icon: Users, label: "Candidates", path: "/candidates", color: "text-cyan-400" },
    { icon: Briefcase, label: "Jobs", path: "/jobs", color: "text-green-400" },
    { icon: BarChart3, label: "Analytics", path: "/analytics", color: "text-orange-400" },
    { icon: Video, label: "Interview", path: "/interview", color: "text-pink-400" },
    { icon: MessageSquare, label: "Messages", path: "/messages", color: "text-blue-400" },
  ]

  const handleNavigation = (path: string) => {
    // Create transition effect
    const overlay = document.createElement("div")
    overlay.className = "page-transition-overlay"
    document.body.appendChild(overlay)

    setTimeout(() => {
      router.push(path)
    }, 300)

    setTimeout(() => {
      document.body.removeChild(overlay)
    }, 600)
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-30">
      <nav className="flex justify-between items-center p-6 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        {/* Logo */}
        <div className="flex items-center group cursor-pointer" onClick={() => router.push("/")}>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
            <span className="text-white font-bold text-lg z-10">AI</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full animate-spin-slow opacity-30"></div>
          </div>
          <span className="text-white text-xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
            Recruit AI Nexus
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center space-x-2 text-white hover:text-cyan-300 transition-all duration-300 group relative"
            >
              <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-125 transition-transform duration-300`} />
              <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-900/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300">
            <Bell className="h-5 w-5 text-gray-300" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              3
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={() => handleNavigation("/profile")}
            className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-cyan-500 transition-colors duration-300 group"
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
          </button>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-3">
            <button
              onClick={() => handleNavigation("/auth/login")}
              className="px-4 py-2 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-900/20 hover:scale-105 transition-all duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavigation("/auth/signup")}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 text-white hover:opacity-90 hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-b border-purple-500/20 animate-slide-down">
          <div className="p-6 space-y-4">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  handleNavigation(item.path)
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center space-x-3 w-full text-left text-white hover:text-cyan-300 transition-colors duration-300 p-3 rounded-lg hover:bg-gray-800/50"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span>{item.label}</span>
              </button>
            ))}

            <div className="pt-4 border-t border-gray-700 space-y-3">
              <button
                onClick={() => handleNavigation("/auth/login")}
                className="w-full px-4 py-2 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-900/20 transition-all duration-300"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavigation("/auth/signup")}
                className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 text-white hover:opacity-90 transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
