"use client"

import { useState } from "react"
import { AlertTriangle, Bell, Shield, RotateCcw, Truck, Factory, Package, Users, Clock, DollarSign, ChevronRight, Check, X, Zap, ArrowRight, AlertCircle, Play, RefreshCw, TrendingUp, TrendingDown, MapPin, Ship, Building } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { useNotifications } from "@/components/notification-provider"

interface Action {
  id: number
  type: "reroute" | "supplier" | "production" | "inventory"
  title: string
  description: string
  severity: "critical" | "warning" | "info"
  trigger: string
  impactPreview: {
    costImpact: string
    timeImpact: string
    riskChange: string
  }
  status: "pending" | "approved" | "executed"
  relatedAlert: string
}

export function AlertsActions() {
  const { addNotification } = useNotifications()
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const [executedActions, setExecutedActions] = useState<number[]>([])

  // Active alerts requiring action
  const activeAlerts = [
    {
      id: 1,
      severity: "critical",
      title: "Port Congestion - Shanghai Hub",
      description: "Severe delays affecting 12 shipments with $4.2M in transit value",
      time: "Active for 3 days",
      affectedRoutes: 4,
      suggestedActions: ["Reroute to Turkey Hub", "Activate backup supplier"]
    },
    {
      id: 2,
      severity: "warning",
      title: "Supplier Capacity Warning - Vietnam Manufacturing",
      description: "Capacity utilization at 94%, risk of fulfillment delays",
      time: "Detected 6 hours ago",
      affectedRoutes: 2,
      suggestedActions: ["Shift production to Morocco", "Increase inventory buffer"]
    },
    {
      id: 3,
      severity: "warning",
      title: "Currency Volatility - Brazil Operations",
      description: "BRL/USD fluctuation impacting cost projections by 8%",
      time: "Active for 5 days",
      affectedRoutes: 1,
      suggestedActions: ["Hedge FX exposure", "Shift sourcing temporarily"]
    },
    {
      id: 4,
      severity: "info",
      title: "Optimization Opportunity - Turkey Route",
      description: "New direct shipping lane available, potential 3-day lead time reduction",
      time: "New opportunity",
      affectedRoutes: 3,
      suggestedActions: ["Activate new route", "Review cost impact"]
    },
  ]

  // Available action buttons with impact previews
  const availableActions: Action[] = [
    {
      id: 1,
      type: "reroute",
      title: "Reroute Shipments",
      description: "Redirect Shanghai-bound shipments to Turkey Hub via Mediterranean route",
      severity: "critical",
      trigger: "Port Congestion - Shanghai",
      impactPreview: {
        costImpact: "+$180K one-time",
        timeImpact: "-8 days lead time",
        riskChange: "High to Low"
      },
      status: "pending",
      relatedAlert: "Port Congestion - Shanghai Hub"
    },
    {
      id: 2,
      type: "supplier",
      title: "Activate Backup Supplier",
      description: "Engage Morocco Nearshore Co. for overflow capacity (pre-qualified)",
      severity: "warning",
      trigger: "Capacity Warning - Vietnam",
      impactPreview: {
        costImpact: "+$45K/month",
        timeImpact: "Faster by 6 days",
        riskChange: "Medium to Low"
      },
      status: "pending",
      relatedAlert: "Supplier Capacity Warning"
    },
    {
      id: 3,
      type: "production",
      title: "Shift Production",
      description: "Transfer 30% of Vietnam production volume to Turkey facilities",
      severity: "warning",
      trigger: "Load Balancing Optimization",
      impactPreview: {
        costImpact: "+$120K transition",
        timeImpact: "-4 days avg lead time",
        riskChange: "Concentration risk reduced"
      },
      status: "pending",
      relatedAlert: "Supplier Capacity Warning"
    },
    {
      id: 4,
      type: "inventory",
      title: "Increase Inventory Buffer",
      description: "Raise safety stock levels by 15% for critical components",
      severity: "info",
      trigger: "Supply Chain Volatility",
      impactPreview: {
        costImpact: "+$280K holding cost",
        timeImpact: "48hr response buffer",
        riskChange: "Stockout risk -60%"
      },
      status: "pending",
      relatedAlert: "Multiple risk factors"
    },
  ]

  const executeAction = (action: Action) => {
    setExecutedActions([...executedActions, action.id])
    addNotification({
      id: `action-${action.id}-${Date.now()}`,
      title: `Action Executed: ${action.title}`,
      message: `Successfully initiated ${action.title.toLowerCase()}. Impact tracking enabled.`,
      type: action.severity === "critical" ? "warning" : "info",
      read: false,
      timestamp: new Date()
    })
    setSelectedAction(null)
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case "reroute": return <RotateCcw className="h-5 w-5" />
      case "supplier": return <Users className="h-5 w-5" />
      case "production": return <Factory className="h-5 w-5" />
      case "inventory": return <Package className="h-5 w-5" />
      default: return <Zap className="h-5 w-5" />
    }
  }

  const getActionColor = (type: string) => {
    switch (type) {
      case "reroute": return "text-blue-600 bg-blue-100"
      case "supplier": return "text-green-600 bg-green-100"
      case "production": return "text-amber-600 bg-amber-100"
      case "inventory": return "text-indigo-600 bg-indigo-100"
      default: return "text-slate-600 bg-slate-100"
    }
  }

  // Recent action history
  const actionHistory = [
    { action: "Rerouted Asia shipments", date: "Mar 8, 2024", status: "Completed", impact: "-$340K saved" },
    { action: "Activated Turkey backup", date: "Mar 5, 2024", status: "Active", impact: "On track" },
    { action: "Increased buffer stock", date: "Mar 2, 2024", status: "Completed", impact: "2 stockouts prevented" },
    { action: "FX Hedge executed", date: "Feb 28, 2024", status: "Completed", impact: "-$180K exposure" },
  ]

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Alerts & Action System</h1>
          <p className="text-muted-foreground">Real-time alerts with one-click response actions</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive" className="text-sm py-1 px-3">
            {activeAlerts.filter(a => a.severity === "critical").length} Critical
          </Badge>
          <Badge variant="secondary" className="text-sm py-1 px-3 bg-amber-100 text-amber-700">
            {activeAlerts.filter(a => a.severity === "warning").length} Warnings
          </Badge>
        </div>
      </div>

      {/* Active Alerts Panel */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-red-500" />
            Active Alerts Requiring Response
          </CardTitle>
          <CardDescription>Prioritized by severity and business impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                alert.severity === "critical" ? "bg-red-50 border-red-200" :
                alert.severity === "warning" ? "bg-amber-50 border-amber-200" :
                "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${
                    alert.severity === "critical" ? "text-red-600" :
                    alert.severity === "warning" ? "text-amber-600" :
                    "text-blue-600"
                  }`}>
                    {alert.severity === "critical" ? <AlertTriangle className="h-5 w-5" /> :
                     alert.severity === "warning" ? <AlertCircle className="h-5 w-5" /> :
                     <Bell className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`font-semibold ${
                        alert.severity === "critical" ? "text-red-900" :
                        alert.severity === "warning" ? "text-amber-900" :
                        "text-blue-900"
                      }`}>{alert.title}</h4>
                      <Badge 
                        variant="outline"
                        className={
                          alert.severity === "critical" ? "bg-red-100 text-red-700 border-red-300" :
                          alert.severity === "warning" ? "bg-amber-100 text-amber-700 border-amber-300" :
                          "bg-blue-100 text-blue-700 border-blue-300"
                        }
                      >
                        {alert.affectedRoutes} routes affected
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {alert.suggestedActions.map((action, i) => (
                    <Button 
                      key={i} 
                      size="sm" 
                      variant={i === 0 ? "default" : "outline"}
                      className={i === 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-transparent"}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {availableActions.map((action) => (
          <Dialog key={action.id}>
            <DialogTrigger asChild>
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  executedActions.includes(action.id) ? "opacity-60" : ""
                } ${
                  action.severity === "critical" ? "border-red-200 hover:border-red-400" :
                  action.severity === "warning" ? "border-amber-200 hover:border-amber-400" :
                  "border-blue-200 hover:border-blue-400"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${getActionColor(action.type)}`}>
                      {getActionIcon(action.type)}
                    </div>
                    {executedActions.includes(action.id) && (
                      <Badge className="bg-green-600 text-white">Executed</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline"
                      className={
                        action.severity === "critical" ? "bg-red-50 text-red-700 border-red-200" :
                        action.severity === "warning" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-blue-50 text-blue-700 border-blue-200"
                      }
                    >
                      {action.severity.charAt(0).toUpperCase() + action.severity.slice(1)}
                    </Badge>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getActionColor(action.type)}`}>
                    {getActionIcon(action.type)}
                  </div>
                  <div>
                    <DialogTitle>{action.title}</DialogTitle>
                    <DialogDescription>Impact preview before execution</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Action Description</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Triggered By</h4>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    {action.relatedAlert}
                  </Badge>
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    Impact Preview
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 bg-slate-50 rounded">
                      <p className="text-xs text-muted-foreground">Cost Impact</p>
                      <p className={`text-sm font-semibold ${
                        action.impactPreview.costImpact.startsWith("+") ? "text-amber-600" : "text-green-600"
                      }`}>{action.impactPreview.costImpact}</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded">
                      <p className="text-xs text-muted-foreground">Time Impact</p>
                      <p className="text-sm font-semibold text-green-600">{action.impactPreview.timeImpact}</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded">
                      <p className="text-xs text-muted-foreground">Risk Change</p>
                      <p className="text-sm font-semibold text-green-600">{action.impactPreview.riskChange}</p>
                    </div>
                  </div>
                </div>

                {executedActions.includes(action.id) ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Action Already Executed</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">This action is currently being tracked.</p>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Confirmation Required</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">This action will be logged and tracked. You can reverse it within 24 hours.</p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="bg-transparent">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={() => executeAction(action)}
                  disabled={executedActions.includes(action.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Execute Action
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Action History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Recent Action History
          </CardTitle>
          <CardDescription>Track executed actions and their outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {actionHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    item.status === "Completed" ? "bg-green-100" : "bg-blue-100"
                  }`}>
                    {item.status === "Completed" ? 
                      <Check className="h-5 w-5 text-green-600" /> : 
                      <Clock className="h-5 w-5 text-blue-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline"
                    className={
                      item.status === "Completed" ? "bg-green-50 text-green-700 border-green-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }
                  >
                    {item.status}
                  </Badge>
                  <span className="text-sm font-medium text-green-600">{item.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="bg-gradient-to-r from-slate-50 to-white">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Action Engine Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Risk Monitoring Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Auto-Response Enabled</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Last scan: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
