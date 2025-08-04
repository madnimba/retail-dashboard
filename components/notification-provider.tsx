"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { Bell, X, AlertTriangle, TrendingUp, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "alert" | "warning" | "info" | "success"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "high" | "medium" | "low"
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  showNotifications: boolean
  setShowNotifications: (show: boolean) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider")
  }
  return context
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Critical Stock Alert",
    message: "Store #12 - Premium Jeans: Only 15 units remaining (RFID triggered)",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "warning",
    title: "FX Volatility Alert",
    message: "USD/EUR exchange rate increased by +2.3% this week - Consider hedging",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "info",
    title: "Supply Chain Update",
    message: "Asian shipment delayed: Expected delivery March 20th (+5 days)",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    priority: "medium",
  },
  {
    id: "4",
    type: "success",
    title: "EBITDA Milestone",
    message: "Monthly EBITDA target exceeded by 12% - €8.96M achieved",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    priority: "low",
  },
  {
    id: "5",
    type: "alert",
    title: "Pricing Alert",
    message: "Competitor A reduced Premium Jeans price by 8% - Auto-adjustment triggered",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: false,
    priority: "high",
  },
]

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          id: Date.now().toString(),
          type: "warning" as const,
          title: "Inventory Low",
          message: `Store #${Math.floor(Math.random() * 20 + 1)} - ${["Hoodies", "Jeans", "T-Shirts"][Math.floor(Math.random() * 3)]}: Stock below threshold`,
          timestamp: new Date(),
          read: false,
          priority: "medium" as const,
        },
        {
          id: Date.now().toString(),
          type: "info" as const,
          title: "Sales Update",
          message: `Daily sales target ${Math.random() > 0.5 ? "exceeded" : "approaching"} - Current: €${(Math.random() * 50 + 20).toFixed(1)}K`,
          timestamp: new Date(),
          read: false,
          priority: "low" as const,
        },
      ]

      if (Math.random() > 0.7) {
        // 30% chance every 30 seconds
        const newNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)]
        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 notifications
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "info":
        return <Package className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        showNotifications,
        setShowNotifications,
      }}
    >
      {children}

      {/* Notification Bell */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="relative bg-white shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-96 max-h-96 z-50 animate-in slide-in-from-top-2 duration-200">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all read
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-b last:border-b-0 cursor-pointer hover:bg-slate-50 transition-colors",
                      !notification.read && "bg-blue-50/50",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{formatTime(notification.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </NotificationContext.Provider>
  )
}
