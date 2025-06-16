"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, X, Check, Clock, User, Briefcase } from "lucide-react"

interface NotificationCenterProps {
  count: number
  onNotificationRead: () => void
}

export default function NotificationCenter({ count, onNotificationRead }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications] = useState([
    {
      id: 1,
      type: "application",
      title: "New Application",
      message: "Sarah Johnson applied for Senior Developer position",
      time: "2 min ago",
      unread: true,
      icon: <User className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "interview",
      title: "Interview Reminder",
      message: "Interview with Mike Chen in 30 minutes",
      time: "28 min ago",
      unread: true,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "job",
      title: "Job Posted",
      message: "Data Scientist position has been published",
      time: "1 hour ago",
      unread: true,
      icon: <Briefcase className="h-4 w-4" />,
    },
  ])

  return (
    <div className="relative">
      <Button variant="outline" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {count}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-white font-medium">Notifications</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                  notification.unread ? "bg-purple-500/5" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      notification.type === "application"
                        ? "bg-purple-500/20 text-purple-400"
                        : notification.type === "interview"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {notification.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                      {notification.unread && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={onNotificationRead}
                          className="text-gray-400 hover:text-white"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                    <span className="text-gray-500 text-xs">{notification.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-700">
            <Button variant="outline" className="w-full text-sm">
              View All Notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
