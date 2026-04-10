"use client"

import { AlertTriangle, Bell, TrendingUp, TrendingDown, Activity, BarChart3, Zap, Shield, Target, DollarSign, Users, Package, Globe, Clock, Settings, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useNotifications } from "@/components/notification-provider"
import { useState } from "react"
import { ReportGeneratorModal } from "@/components/modals/report-generator-modal"
import { InventorySimulationModal } from "@/components/modals/inventory-simulation-modal"
import { FxHedgingModal } from "@/components/modals/fx-hedging-modal"
import { ForecastGeneratorModal } from "@/components/modals/forecast-generator-modal"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

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

  // Performance data for charts
  const monthlyPerformance = [
    { month: "Jan", revenue: 6.2, ebitda: 1.8, orders: 12400, customers: 8900 },
    { month: "Feb", revenue: 6.8, ebitda: 2.1, orders: 13100, customers: 9200 },
    { month: "Mar", revenue: 7.1, ebitda: 2.3, orders: 13800, customers: 9500 },
    { month: "Apr", revenue: 7.5, ebitda: 2.5, orders: 14500, customers: 9800 },
    { month: "May", revenue: 7.9, ebitda: 2.7, orders: 15200, customers: 10100 },
    { month: "Jun", revenue: 8.2, ebitda: 2.9, orders: 15900, customers: 10400 },
    { month: "Jul", revenue: 8.6, ebitda: 3.1, orders: 16600, customers: 10700 },
    { month: "Aug", revenue: 8.0, ebitda: 2.8, orders: 15900, customers: 10400 },
  ]

  const regionalPerformance = [
    { region: "Noria", revenue: 4.2, growth: 12.5, stores: 8, avgOrder: 145 },
    { region: "Southland", revenue: 3.8, growth: 8.3, stores: 6, avgOrder: 132 },
  ]

  const channelBreakdown = [
    { name: "Proprietary", value: 52, color: "#3b82f6" },
    { name: "Amazon", value: 29, color: "#f97316" },
    { name: "Marketplaces", value: 19, color: "#8b5cf6" },
  ]

  const kpiTrends = [
    { metric: "Revenue Growth", current: 15.2, target: 12.0, trend: "up" },
    { metric: "Customer Acquisition", current: 8.7, target: 7.5, trend: "up" },
    { metric: "Inventory Turnover", current: 4.2, target: 5.0, trend: "down" },
    { metric: "Customer Satisfaction", current: 92.1, target: 90.0, trend: "up" },
  ]

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#3b82f6",
    },
    ebitda: {
      label: "EBITDA",
      color: "#10b981",
    },
    orders: {
      label: "Orders",
      color: "#f59e0b",
    },
    customers: {
      label: "Customers",
      color: "#8b5cf6",
    },
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Yamaha Global Supply Chain OS
          </h1>
          <div className="flex items-center gap-3 mt-1">
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
        <CardContent className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                €8.0M
              </span>
              <span className="text-lg text-slate-500 ml-2">/ €14.0M</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Monthly Run Rate</p>
              <p className="text-2xl font-semibold text-green-600">€2.1M</p>
            </div>
          </div>
          <div className="space-y-3">
            <Progress value={ebitdaProgress} className="h-4 bg-slate-100" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">57% achieved</span>
              <span className="font-medium text-slate-900">€6.0M remaining</span>
            </div>
          </div>
          {hoveredCard === "ebitda" && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t animate-in fade-in duration-200">
              <div className="text-center">
                <p className="text-sm text-slate-600">Q1 Actual</p>
                <p className="text-lg font-semibold">€2.1M</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600">Q2 Forecast</p>
                <p className="text-lg font-semibold">€2.8M</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600">H2 Target</p>
                <p className="text-lg font-semibold">€9.1M</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Comprehensive Performance Graph */}
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              Comprehensive Performance Metrics
            </CardTitle>
            <CardDescription>Multi-dimensional business performance analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Monthly Performance Chart */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">Monthly Performance Trends</h4>
              <ChartContainer config={chartConfig} className="h-64">
                <LineChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ebitda" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>

            {/* Regional Performance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-700">Regional Revenue</h4>
                {regionalPerformance.map((region, index) => (
                  <div key={region.region} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium">{region.region}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">€{region.revenue}M</p>
                      <p className={`text-xs ${region.growth > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                        +{region.growth}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-700">Channel Distribution</h4>
                <div className="h-32">
                  <ChartContainer config={chartConfig}>
                    <PieChart>
                      <Pie
                        data={channelBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {channelBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </div>
              </div>
            </div>

            {/* KPI Performance Grid */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">KPI Performance vs Targets</h4>
              <div className="grid grid-cols-2 gap-3">
                {kpiTrends.map((kpi, index) => (
                  <div key={kpi.metric} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-600">{kpi.metric}</span>
                      <div className="flex items-center gap-1">
                        {kpi.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">{kpi.current}</span>
                      <span className="text-xs text-slate-500">/ {kpi.target}</span>
                    </div>
                    <div className="mt-1">
                      <Progress 
                        value={(kpi.current / kpi.target) * 100} 
                        className="h-1.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Summary */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-xs text-slate-600">Revenue Growth</p>
                <p className="text-sm font-semibold text-green-600">+15.2%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-xs text-slate-600">Customer Growth</p>
                <p className="text-sm font-semibold text-green-600">+8.7%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mx-auto mb-2">
                  <Package className="h-4 w-4 text-orange-600" />
                </div>
                <p className="text-xs text-slate-600">Inventory Turn</p>
                <p className="text-sm font-semibold text-orange-600">4.2x</p>
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
          <CardContent className="space-y-6">
            {/* System Status Overview */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">System Status</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">CDMS Online</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">Inventory Sync</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs font-medium text-yellow-700">FX Feed</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">Analytics</span>
                </div>
              </div>
            </div>

            {/* Critical Alerts */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Critical Alerts</h4>
              {recentAlerts.map((alert, index) => (
                <Alert key={alert.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-start justify-between">
                      <div>
                        <strong className="text-slate-900">{alert.title}:</strong>
                        <p className="text-slate-700 mt-1">{alert.message}</p>
                      </div>
                      <Badge variant={alert.priority === "high" ? "destructive" : "secondary"} className="ml-2">
                        {alert.priority}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
              {recentAlerts.length === 0 && (
                <div className="text-center py-4 text-slate-500 bg-slate-50 rounded-lg">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No critical alerts</p>
                </div>
              )}
            </div>

            {/* Performance Alerts */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Performance Alerts</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">Inventory Turnover</p>
                      <p className="text-xs text-orange-600">Below target (4.2x vs 5.0x)</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-orange-700">Medium</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Revenue Growth</p>
                      <p className="text-xs text-green-600">Exceeding target (+15.2%)</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-green-300 text-green-700">Positive</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Customer Acquisition</p>
                      <p className="text-xs text-blue-600">On track (+8.7% growth)</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-blue-300 text-blue-700">On Track</Badge>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Recent Activities</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-900">Forecast generated</p>
                    <p className="text-xs text-slate-500">2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-900">Inventory updated</p>
                    <p className="text-xs text-slate-500">5 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-900">New customer data</p>
                    <p className="text-xs text-slate-500">12 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-900">FX rate updated</p>
                    <p className="text-xs text-slate-500">18 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>

            
            {/* Notification Summary */}
            <div className="pt-3 border-t">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Last updated: 2 minutes ago</span>
                <span>{unreadCount} unread</span>
              </div>
            </div>
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
