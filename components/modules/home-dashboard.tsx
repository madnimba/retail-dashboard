"use client"

import { AlertTriangle, Bell, TrendingUp, TrendingDown, Activity, BarChart3, Zap, Shield, Target, DollarSign, Users, Package, Globe, Clock, Settings, Download, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNotifications } from "@/components/notification-provider"
import { useState } from "react"
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
  const ebitdaProgress = (8 / 14) * 100

  const recentAlerts = notifications.filter((n) => !n.read).slice(0, 3)

  const [showReportModal, setShowReportModal] = useState(false)
  const [showInventoryModal, setShowInventoryModal] = useState(false)
  const [showFxModal, setShowFxModal] = useState(false)
  const [showForecastModal, setShowForecastModal] = useState(false)

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
    <div className="p-4 sm:p-8 space-y-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            <div className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              SmartWear Executive
            </div>
            <div className="text-lg sm:text-xl font-medium text-slate-600 mt-1">
              By{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-semibold">
                Team Arctic Wolves
              </span>
            </div>
          </h1>
          <p className="text-slate-600 mt-2">Real-time business intelligence and KPI monitoring</p>
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
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Current EBITDA</p>
                <p className="text-3xl font-bold text-green-900">€8.0M</p>
                <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Target Progress</p>
                <p className="text-3xl font-bold text-blue-900">57%</p>
                <p className="text-xs text-blue-600 mt-1">€6M to target</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Active Alerts</p>
                <p className="text-3xl font-bold text-purple-900">{unreadCount}</p>
                <p className="text-xs text-purple-600 mt-1">Require attention</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Bell className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Risk Score</p>
                <p className="text-3xl font-bold text-orange-900">Medium</p>
                <p className="text-xs text-orange-600 mt-1">2 high priority</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* EBITDA Tracker */}
      <Card
        className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
        onMouseEnter={() => setHoveredCard("ebitda")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            Real-time EBITDA Performance
          </CardTitle>
          <CardDescription className="text-base">Track progress toward €14M annual target</CardDescription>
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
              <ChartContainer config={chartConfig} className="h-48 sm:h-64">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="h-32 sm:h-40">
                  <ChartContainer config={chartConfig}>
                    <PieChart>
                      <Pie
                        data={channelBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={40}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
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
            </div>
          </CardContent>
        </Card>

        {/* Live Alerts */}
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-white" />
              </div>
              Live Alerts & Notifications
            </CardTitle>
            <CardDescription>Critical business events requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* System Status Overview */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">System Status</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-orange-50 rounded-lg border border-orange-200 gap-2">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">Inventory Turnover</p>
                      <p className="text-xs text-orange-600">Below target (4.2x vs 5.0x)</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-orange-700 w-fit">Medium</Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-green-50 rounded-lg border border-green-200 gap-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Revenue Growth</p>
                      <p className="text-xs text-green-600">Exceeding target (+15.2%)</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-green-300 text-green-700 w-fit">Positive</Badge>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 gap-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Customer Acquisition</p>
                      <p className="text-xs text-blue-600">On track (+8.7% growth)</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-blue-300 text-blue-700 w-fit">On Track</Badge>
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

      {/* Quick Actions */}
      <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            Quick Actions & Tools
          </CardTitle>
          <CardDescription>Execute critical business operations with one click</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => setShowInventoryModal(true)}
            >
              <div className="flex flex-col items-center gap-2">
                <Activity className="h-5 w-5" />
                <span>Run Inventory Simulation</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-16 border-2 hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-200 bg-transparent"
              onClick={() => setShowFxModal(true)}
            >
              <div className="flex flex-col items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                <span>Hedge FX Exposure</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-16 border-2 hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-200 bg-transparent"
              onClick={() => setShowForecastModal(true)}
            >
              <div className="flex flex-col items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <span>Generate Forecast</span>
              </div>
            </Button>
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
