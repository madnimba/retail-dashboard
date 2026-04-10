"use client"

import { AlertTriangle, Bell, TrendingUp, TrendingDown, Activity, BarChart3, Zap, Shield, Target, DollarSign, Users, Package, Globe, Clock, Settings, Download, ChevronDown, AlertCircle, MapPin, Ship, Factory } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNotifications } from "@/components/notification-provider"
import { useState, useEffect } from "react"
import { ReportGeneratorModal } from "@/components/modals/report-generator-modal"
import { InventorySimulationModal } from "@/components/modals/inventory-simulation-modal"
import { FxHedgingModal } from "@/components/modals/fx-hedging-modal"
import { ForecastGeneratorModal } from "@/components/modals/forecast-generator-modal"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function HomeDashboard() {
  const { notifications, unreadCount } = useNotifications()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Real-time clock for live feel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const recentAlerts = notifications.filter((n) => !n.read).slice(0, 3)

  const [showReportModal, setShowReportModal] = useState(false)
  const [showInventoryModal, setShowInventoryModal] = useState(false)
  const [showFxModal, setShowFxModal] = useState(false)
  const [showForecastModal, setShowForecastModal] = useState(false)

  // Supply Chain Metrics
  const supplyChainCost = { current: 847, target: 800, unit: "M" }
  const costVariance = ((supplyChainCost.current - supplyChainCost.target) / supplyChainCost.target * 100).toFixed(1)

  // Monthly Supply Chain Performance
  const monthlyPerformance = [
    { month: "Jan", cost: 72.1, disruptions: 3, leadTime: 28, savings: 2.1 },
    { month: "Feb", cost: 70.8, disruptions: 2, leadTime: 26, savings: 2.4 },
    { month: "Mar", cost: 71.5, disruptions: 4, leadTime: 29, savings: 2.2 },
    { month: "Apr", cost: 69.2, disruptions: 1, leadTime: 24, savings: 2.8 },
    { month: "May", cost: 68.4, disruptions: 2, leadTime: 23, savings: 3.1 },
    { month: "Jun", cost: 70.1, disruptions: 5, leadTime: 31, savings: 2.5 },
    { month: "Jul", cost: 69.8, disruptions: 3, leadTime: 27, savings: 2.9 },
    { month: "Aug", cost: 68.9, disruptions: 2, leadTime: 25, savings: 3.2 },
  ]

  // Regional breakdown
  const regionalPerformance = [
    { region: "Southeast Asia", cost: 312, progress: 42, status: "On Track" },
    { region: "Turkey", cost: 245, progress: 68, status: "Ahead" },
    { region: "Morocco", cost: 178, progress: 35, status: "At Risk" },
    { region: "Brazil", cost: 112, progress: 22, status: "Planning" },
  ]

  // Risk distribution
  const riskDistribution = [
    { name: "Geopolitical", value: 35, color: "#ef4444" },
    { name: "Logistics", value: 28, color: "#f97316" },
    { name: "Supplier", value: 22, color: "#eab308" },
    { name: "Currency", value: 15, color: "#22c55e" },
  ]

  // Real-time alerts data
  const liveAlerts = [
    { 
      id: 1, 
      severity: "critical", 
      title: "Port Congestion - Shanghai", 
      description: "Estimated +7 days delay on Asia-Europe routes",
      time: "12 min ago",
      impact: "$2.4M"
    },
    { 
      id: 2, 
      severity: "warning", 
      title: "Supplier Capacity Alert", 
      description: "Turkish Textile Co. at 94% capacity utilization",
      time: "45 min ago",
      impact: "$890K"
    },
    { 
      id: 3, 
      severity: "info", 
      title: "Route Optimization Available", 
      description: "Morocco hub can reduce lead time by 3 days",
      time: "2 hrs ago",
      impact: "+$340K savings"
    },
    { 
      id: 4, 
      severity: "warning", 
      title: "FX Exposure Spike", 
      description: "USD/EUR volatility affecting Brazil operations",
      time: "3 hrs ago",
      impact: "$560K"
    },
  ]

  const chartConfig = {
    cost: {
      label: "Cost ($M)",
      color: "#3b82f6",
    },
    savings: {
      label: "Savings ($M)",
      color: "#10b981",
    },
    leadTime: {
      label: "Lead Time",
      color: "#f59e0b",
    },
  }

  // Calculate overall risk score
  const calculateRiskScore = () => {
    const criticalAlerts = liveAlerts.filter(a => a.severity === "critical").length
    const warningAlerts = liveAlerts.filter(a => a.severity === "warning").length
    if (criticalAlerts >= 2) return { level: "High", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
    if (criticalAlerts >= 1 || warningAlerts >= 2) return { level: "Medium", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" }
    return { level: "Low", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" }
  }

  const riskScore = calculateRiskScore()

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            <div className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Yamaha Global Supply Chain
            </div>
            <div className="text-lg sm:text-xl font-medium text-slate-600 mt-1">
              Operating System
            </div>
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-slate-600">Real-time operations monitoring</p>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live
            </Badge>
            <span className="text-sm text-slate-500 font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="shadow-sm hover:shadow-md transition-all duration-200 bg-transparent w-full sm:w-auto"
            onClick={() => setShowReportModal(true)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700 w-full sm:w-auto">
                <Zap className="h-4 w-4 mr-2" />
                Quick Actions
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setShowInventoryModal(true)}>
                <Activity className="h-4 w-4 mr-2" />
                Run Inventory Simulation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowFxModal(true)}>
                <TrendingDown className="h-4 w-4 mr-2" />
                Hedge FX Exposure
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowForecastModal(true)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Forecast
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Global Supply Chain Cost</p>
                <p className="text-3xl font-bold text-blue-900">${supplyChainCost.current}M</p>
                <p className="text-xs text-blue-600 mt-1">
                  {Number(costVariance) > 0 ? "+" : ""}{costVariance}% vs ${supplyChainCost.target}M target
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-red-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Disruption Risk Exposure</p>
                <p className="text-3xl font-bold text-red-900">$12.4M</p>
                <p className="text-xs text-red-600 mt-1">4 active risk events</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Regionalization Progress</p>
                <p className="text-3xl font-bold text-green-900">42%</p>
                <p className="text-xs text-green-600 mt-1">On track for 2026 target</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`hover:shadow-lg transition-all duration-300 border-0 shadow-sm ${riskScore.bg}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${riskScore.color}`}>Risk Score</p>
                <p className={`text-3xl font-bold ${riskScore.color}`}>{riskScore.level}</p>
                <p className={`text-xs ${riskScore.color} mt-1`}>{unreadCount + liveAlerts.length} active alerts</p>
              </div>
              <div className={`h-12 w-12 ${riskScore.bg} ${riskScore.border} border rounded-full flex items-center justify-center`}>
                <Shield className={`h-6 w-6 ${riskScore.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Progress Overview */}
      <Card
        className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
        onMouseEnter={() => setHoveredCard("regional")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            Regionalization Progress by Hub
          </CardTitle>
          <CardDescription className="text-base">Track progress across global manufacturing hubs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regionalPerformance.map((region, index) => (
              <div key={region.region} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="font-medium text-sm">{region.region}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      region.status === "Ahead" ? "bg-green-50 text-green-700 border-green-200" :
                      region.status === "On Track" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      region.status === "At Risk" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-slate-50 text-slate-700 border-slate-200"
                    }
                  >
                    {region.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-semibold">{region.progress}%</span>
                  </div>
                  <Progress value={region.progress} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Annual Cost</span>
                    <span className="font-semibold">${region.cost}M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {hoveredCard === "regional" && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t animate-in fade-in duration-200">
              <div className="text-center">
                <p className="text-sm text-slate-600">Total Investment</p>
                <p className="text-lg font-semibold">$1.2B</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600">Expected Savings</p>
                <p className="text-lg font-semibold text-green-600">$340M/yr</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600">Completion Target</p>
                <p className="text-lg font-semibold">Q4 2028</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Supply Chain Performance Chart */}
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              Supply Chain Performance
            </CardTitle>
            <CardDescription>Monthly cost and savings trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">Cost vs Savings Trends</h4>
              <ChartContainer config={chartConfig} className="h-48 sm:h-64">
                <AreaChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>

            {/* Risk Distribution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-700">Risk Distribution</h4>
                {riskDistribution.map((risk, index) => (
                  <div key={risk.name} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.color }}></div>
                      <span className="text-sm">{risk.name}</span>
                    </div>
                    <span className="text-sm font-medium">{risk.value}%</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-700">Key Metrics</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Avg Lead Time</span>
                    </div>
                    <span className="text-sm font-medium">26 days</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Factory className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Capacity Util.</span>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">On-Time Delivery</span>
                    </div>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Alerts Panel */}
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-white" />
              </div>
              Real-time Alerts
              <Badge variant="destructive" className="ml-2">{liveAlerts.length} Active</Badge>
            </CardTitle>
            <CardDescription>Critical supply chain events requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {liveAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  alert.severity === "critical" ? "bg-red-50 border-red-200" :
                  alert.severity === "warning" ? "bg-amber-50 border-amber-200" :
                  "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${
                      alert.severity === "critical" ? "text-red-600" :
                      alert.severity === "warning" ? "text-amber-600" :
                      "text-blue-600"
                    }`}>
                      {alert.severity === "critical" ? <AlertTriangle className="h-5 w-5" /> :
                       alert.severity === "warning" ? <AlertCircle className="h-5 w-5" /> :
                       <Activity className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className={`font-medium ${
                        alert.severity === "critical" ? "text-red-900" :
                        alert.severity === "warning" ? "text-amber-900" :
                        "text-blue-900"
                      }`}>{alert.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
                      <p className="text-xs text-slate-500 mt-2">{alert.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="outline" 
                      className={
                        alert.severity === "critical" ? "bg-red-100 text-red-700 border-red-300" :
                        alert.severity === "warning" ? "bg-amber-100 text-amber-700 border-amber-300" :
                        "bg-green-100 text-green-700 border-green-300"
                      }
                    >
                      {alert.impact}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">ERP Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">TMS Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">Supplier Portal Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">Risk Engine Processing</span>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              Last sync: {new Date().toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ReportGeneratorModal open={showReportModal} onOpenChange={setShowReportModal} />
      <InventorySimulationModal open={showInventoryModal} onOpenChange={setShowInventoryModal} />
      <FxHedgingModal open={showFxModal} onOpenChange={setShowFxModal} />
      <ForecastGeneratorModal open={showForecastModal} onOpenChange={setShowForecastModal} />
    </div>
  )
}
