"use client"

import Image from "next/image"
import { AlertTriangle, Bell, TrendingUp, TrendingDown, Activity, BarChart3, Zap, Shield, DollarSign, Globe, Clock, ChevronRight, MapPin, Ship, Factory, Package, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useNotifications } from "@/components/notification-provider"
import { useState, useEffect } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

export function HomeDashboard() {
  const { notifications, unreadCount } = useNotifications()
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Key Financial Metrics
  const metrics = {
    totalSupplyChainCost: 847,
    targetCost: 800,
    ytdSavings: 42,
    commodityExposure: 542,
    hedgedPercent: 48,
    regionalizationProgress: 42,
  }

  // Regional Hub Status - The 4 key regions
  const regionalHubs = [
    { 
      name: "Southeast Asia", 
      status: "Operational",
      statusColor: "green",
      cost: "$312M", 
      capacity: 82,
      activeAlerts: 2,
      leadTime: 28,
      trend: "stable"
    },
    { 
      name: "Turkey", 
      status: "Expanding",
      statusColor: "blue",
      cost: "$245M", 
      capacity: 91,
      activeAlerts: 0,
      leadTime: 16,
      trend: "improving"
    },
    { 
      name: "Morocco", 
      status: "Developing",
      statusColor: "amber",
      cost: "$178M", 
      capacity: 68,
      activeAlerts: 1,
      leadTime: 12,
      trend: "improving"
    },
    { 
      name: "Brazil", 
      status: "Pilot",
      statusColor: "slate",
      cost: "$112M", 
      capacity: 45,
      activeAlerts: 1,
      leadTime: 8,
      trend: "stable"
    },
  ]

  // Critical Alerts requiring attention
  const criticalAlerts = [
    { 
      id: 1, 
      severity: "critical", 
      region: "Southeast Asia",
      title: "Port Congestion - Shanghai Route", 
      impact: "$2.4M at risk",
      action: "Reroute to Turkey Hub"
    },
    { 
      id: 2, 
      severity: "warning", 
      region: "Southeast Asia",
      title: "Aluminum Price Spike +8%", 
      impact: "$11.4M exposure",
      action: "Review hedge position"
    },
    { 
      id: 3, 
      severity: "warning", 
      region: "Morocco",
      title: "Supplier Capacity at 94%", 
      impact: "Fulfillment risk",
      action: "Activate backup"
    },
    { 
      id: 4, 
      severity: "info", 
      region: "Brazil",
      title: "New Supplier Qualified", 
      impact: "Cost reduction opportunity",
      action: "Onboard supplier"
    },
  ]

  // Commodity Price Trends (simplified)
  const commodityStatus = [
    { name: "Aluminum", price: "$2,340", change: +1.2, trend: "up", exposure: "$142M", hedged: 45 },
    { name: "Steel", price: "$780", change: -0.5, trend: "down", exposure: "$186M", hedged: 60 },
    { name: "Plastic", price: "$1,420", change: +2.8, trend: "up", exposure: "$98M", hedged: 30 },
    { name: "Copper", price: "$8,920", change: +0.8, trend: "up", exposure: "$64M", hedged: 55 },
  ]

  // Monthly cost trend
  const costTrend = [
    { month: "Oct", cost: 72.1, target: 70 },
    { month: "Nov", cost: 70.8, target: 70 },
    { month: "Dec", cost: 71.5, target: 69 },
    { month: "Jan", cost: 69.2, target: 68 },
    { month: "Feb", cost: 68.4, target: 67 },
    { month: "Mar", cost: 70.1, target: 66 },
  ]

  const chartConfig = {
    cost: { label: "Actual ($M)", color: "#3b82f6" },
    target: { label: "Target ($M)", color: "#22c55e" },
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="max-[420px]:text-[0.9375rem] max-[420px]:tracking-tighter text-lg font-bold leading-tight tracking-tight text-slate-900 sm:text-xl md:text-2xl lg:text-3xl">
            <div className="flex min-w-0 items-center gap-2 sm:gap-2.5 md:gap-3">
              <Image
                src="/yamaha.jpeg"
                alt="Yamaha"
                width={320}
                height={96}
                className="h-[1.12em] w-auto shrink-0 object-contain object-left"
                priority
              />
              <h1 className="min-w-0 text-balance">
                Yamaha Global Executive Control System
              </h1>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2.5">
            <span className="inline-flex items-center rounded-lg bg-gradient-to-r from-slate-100/95 via-sky-50/90 to-indigo-50/95 px-3 py-1.5 ring-1 ring-slate-200/80 shadow-sm">
              <span className="text-base sm:text-lg font-semibold tracking-[0.055em] text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-blue-800 to-indigo-700">
                by Arctic Wolves
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-slate-600">Executive Dashboard</p>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live
            </Badge>
            <span className="text-sm text-slate-500 font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive" className="py-1 px-3">
            {criticalAlerts.filter(a => a.severity === "critical").length} Critical
          </Badge>
          <Badge variant="secondary" className="py-1 px-3 bg-amber-100 text-amber-700">
            {criticalAlerts.filter(a => a.severity === "warning").length} Warnings
          </Badge>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Supply Chain Cost</p>
                <p className="text-2xl font-bold text-blue-900">${metrics.totalSupplyChainCost}M</p>
                <p className="text-xs text-blue-600 mt-1">
                  +{((metrics.totalSupplyChainCost - metrics.targetCost) / metrics.targetCost * 100).toFixed(1)}% vs ${metrics.targetCost}M target
                </p>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">YTD Cost Savings</p>
                <p className="text-2xl font-bold text-green-900">${metrics.ytdSavings}M</p>
                <p className="text-xs text-green-600 mt-1">From regionalization</p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Commodity Exposure</p>
                <p className="text-2xl font-bold text-amber-900">${metrics.commodityExposure}M</p>
                <p className="text-xs text-amber-600 mt-1">{metrics.hedgedPercent}% hedged</p>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-violet-50 border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700">Regionalization</p>
                <p className="text-2xl font-bold text-indigo-900">{metrics.regionalizationProgress}%</p>
                <p className="text-xs text-indigo-600 mt-1">Target: 70% by 2027</p>
              </div>
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Globe className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Hub Status - Central Control View */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="h-5 w-5" />
            Regional Hub Status
          </CardTitle>
          <CardDescription>Real-time status of 4 manufacturing hubs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regionalHubs.map((hub) => (
              <div 
                key={hub.name} 
                className={`p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer ${
                  hub.activeAlerts > 0 ? "border-amber-200" : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">{hub.name}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      hub.statusColor === "green" ? "bg-green-50 text-green-700 border-green-200" :
                      hub.statusColor === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      hub.statusColor === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-slate-50 text-slate-700 border-slate-200"
                    }
                  >
                    {hub.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Cost</span>
                    <span className="font-medium">{hub.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">{hub.capacity}%</span>
                  </div>
                  <Progress value={hub.capacity} className="h-1.5" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lead Time</span>
                    <span className="font-medium">{hub.leadTime} days</span>
                  </div>
                </div>

                {hub.activeAlerts > 0 && (
                  <div className="mt-3 pt-3 border-t flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-600">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">{hub.activeAlerts} alert{hub.activeAlerts > 1 ? "s" : ""}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Alerts */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5" />
              Action Required
              <Badge variant="destructive" className="ml-2">{criticalAlerts.length}</Badge>
            </CardTitle>
            <CardDescription>Alerts requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {criticalAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-3 rounded-lg border flex items-start justify-between gap-3 ${
                  alert.severity === "critical" ? "bg-red-50 border-red-200" :
                  alert.severity === "warning" ? "bg-amber-50 border-amber-200" :
                  "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`mt-0.5 ${
                    alert.severity === "critical" ? "text-red-600" :
                    alert.severity === "warning" ? "text-amber-600" :
                    "text-blue-600"
                  }`}>
                    {alert.severity === "critical" ? <AlertTriangle className="h-4 w-4" /> :
                     <Bell className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.region} - {alert.impact}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs h-7 bg-white">
                  {alert.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Commodity Watch */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5" />
              Commodity Watch
            </CardTitle>
            <CardDescription>Key material prices and hedge status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {commodityStatus.map((commodity) => (
              <div key={commodity.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-sm">{commodity.name}</p>
                    <p className="text-xs text-muted-foreground">Exposure: {commodity.exposure}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-sm">{commodity.price}</p>
                    <div className="flex items-center gap-1">
                      {commodity.change >= 0 ? (
                        <ArrowUpRight className="h-3 w-3 text-red-500" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-green-500" />
                      )}
                      <span className={`text-xs ${commodity.change >= 0 ? "text-red-600" : "text-green-600"}`}>
                        {commodity.change >= 0 ? "+" : ""}{commodity.change}%
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={commodity.hedged >= 50 ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}
                  >
                    {commodity.hedged}% hedged
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Cost Trend Chart */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5" />
            Monthly Cost vs Target
          </CardTitle>
          <CardDescription>Supply chain cost performance (6-month trend)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-48">
            <AreaChart data={costTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" domain={[60, 75]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="cost" 
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
                name="Actual ($M)"
              />
              <Area 
                type="monotone" 
                dataKey="target" 
                stroke="#22c55e" 
                fill="#22c55e"
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target ($M)"
              />
            </AreaChart>
          </ChartContainer>
          
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Avg Monthly Cost</p>
              <p className="text-lg font-semibold">$70.4M</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">vs Target</p>
              <p className="text-lg font-semibold text-amber-600">+$2.1M</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Trend</p>
              <p className="text-lg font-semibold text-green-600">Improving</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
