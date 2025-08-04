"use client"

import { AlertTriangle, Bell, TrendingUp, TrendingDown, Activity, BarChart3, Zap, Shield } from "lucide-react"
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

export function HomeDashboard() {
  const { notifications, unreadCount } = useNotifications()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const ebitdaProgress = (8 / 14) * 100

  const recentAlerts = notifications.filter((n) => !n.read).slice(0, 3)

  const [showReportModal, setShowReportModal] = useState(false)
  const [showInventoryModal, setShowInventoryModal] = useState(false)
  const [showFxModal, setShowFxModal] = useState(false)
  const [showForecastModal, setShowForecastModal] = useState(false)

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Executive Dashboard
          </h1>
          <p className="text-slate-600 mt-2">Real-time business intelligence and KPI monitoring</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="shadow-sm hover:shadow-md transition-all duration-200 bg-transparent"
            onClick={() => setShowReportModal(true)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button className="shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <Zap className="h-4 w-4 mr-2" />
            Quick Actions
          </Button>
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
        {/* Risk Heatmap */}
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              Risk Assessment Matrix
            </CardTitle>
            <CardDescription>Real-time operational, financial, and market risk monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-red-900">Operational Risk</span>
                  <Badge variant="destructive" className="ml-auto">
                    Critical
                  </Badge>
                </div>
                <p className="text-sm text-red-700 mb-2">Multiple inventory shortages detected across stores</p>
                <div className="flex items-center justify-between text-xs text-red-600">
                  <span>Impact: High</span>
                  <span>Probability: 85%</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold text-yellow-900">FX Risk</span>
                  <Badge variant="secondary" className="ml-auto">
                    Medium
                  </Badge>
                </div>
                <p className="text-sm text-yellow-700 mb-2">USD/EUR volatility +2.3% - hedging recommended</p>
                <div className="flex items-center justify-between text-xs text-yellow-600">
                  <span>Impact: Medium</span>
                  <span>Probability: 60%</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-green-900">Market Risk</span>
                  <Badge variant="outline" className="ml-auto border-green-300 text-green-700">
                    Low
                  </Badge>
                </div>
                <p className="text-sm text-green-700 mb-2">Stable demand patterns across all regions</p>
                <div className="flex items-center justify-between text-xs text-green-600">
                  <span>Impact: Low</span>
                  <span>Probability: 25%</span>
                </div>
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
          <CardContent className="space-y-4">
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
              <div className="text-center py-8 text-slate-500">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No active alerts</p>
              </div>
            )}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
