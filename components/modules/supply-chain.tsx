"use client"

import { Package, Truck, AlertTriangle, CheckCircle, MapPin, Star, Clock, DollarSign, Shield, Users, Globe, Factory, Ship, Plane, ArrowRight, RotateCcw, TrendingUp, TrendingDown, AlertCircle, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

export function SupplyChain() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Shipment delay alerts
  const shipmentAlerts = [
    { 
      id: 1, 
      route: "Shanghai - Rotterdam", 
      delay: "+7 days", 
      reason: "Port congestion",
      impact: "$1.2M",
      severity: "critical",
      eta: "Mar 28",
      originalEta: "Mar 21"
    },
    { 
      id: 2, 
      route: "Vietnam - Los Angeles", 
      delay: "+4 days", 
      reason: "Weather delays",
      impact: "$680K",
      severity: "warning",
      eta: "Mar 25",
      originalEta: "Mar 21"
    },
    { 
      id: 3, 
      route: "Turkey - Hamburg", 
      delay: "On time", 
      reason: "",
      impact: "",
      severity: "good",
      eta: "Mar 22",
      originalEta: "Mar 22"
    },
    { 
      id: 4, 
      route: "Morocco - Barcelona", 
      delay: "+2 days", 
      reason: "Customs processing",
      impact: "$240K",
      severity: "info",
      eta: "Mar 24",
      originalEta: "Mar 22"
    },
  ]

  // Route comparison data
  const routeComparison = [
    { 
      route: "Asia Pacific Route",
      regions: ["Vietnam", "Thailand", "Indonesia"],
      avgCost: 2840,
      avgTime: 28,
      reliability: 91,
      carbonFootprint: "High"
    },
    { 
      route: "Turkey Hub Route",
      regions: ["Istanbul", "Izmir", "Bursa"],
      avgCost: 1860,
      avgTime: 16,
      reliability: 97,
      carbonFootprint: "Medium"
    },
    { 
      route: "Morocco Nearshore",
      regions: ["Casablanca", "Tangier"],
      avgCost: 1420,
      avgTime: 12,
      reliability: 93,
      carbonFootprint: "Low"
    },
    { 
      route: "Brazil Americas",
      regions: ["Sao Paulo", "Minas Gerais"],
      avgCost: 1680,
      avgTime: 8,
      reliability: 88,
      carbonFootprint: "Low"
    },
  ]

  // Rerouting suggestions
  const reroutingSuggestions = [
    {
      id: 1,
      current: "Shanghai - Rotterdam via Suez",
      suggested: "Turkey - Hamburg direct",
      timeSaved: "12 days",
      costImpact: "+$420/container",
      riskReduction: "High",
      recommendation: "Recommended for urgent shipments"
    },
    {
      id: 2,
      current: "Vietnam - Los Angeles",
      suggested: "Brazil - Miami + ground transport",
      timeSaved: "8 days",
      costImpact: "-$180/container",
      riskReduction: "Medium",
      recommendation: "Cost-effective alternative"
    },
    {
      id: 3,
      current: "Indonesia - Europe",
      suggested: "Morocco - Europe nearshore",
      timeSaved: "16 days",
      costImpact: "+$280/container",
      riskReduction: "High",
      recommendation: "Best for supply chain resilience"
    },
  ]

  const chartConfig = {
    cost: { label: "Cost ($)", color: "#3b82f6" },
    time: { label: "Time (days)", color: "#10b981" },
  }

  // Generate supplier data based on filters
  const supplierData = useMemo(() => {
    const baseSuppliers = [
      { name: "Turkish Textile Co.", region: "Turkey", category: "Textiles", rating: 4.8, leadTime: 12, cost: 12, ethics: "A+", reliability: 98, capacity: 50000 },
      { name: "Vietnam Manufacturing", region: "Vietnam", category: "Assembly", rating: 4.6, leadTime: 18, cost: 9, ethics: "A", reliability: 95, capacity: 75000 },
      { name: "Morocco Nearshore", region: "Morocco", category: "Textiles", rating: 4.5, leadTime: 8, cost: 14, ethics: "A", reliability: 93, capacity: 35000 },
      { name: "Brazil Components", region: "Brazil", category: "Components", rating: 4.3, leadTime: 6, cost: 16, ethics: "B+", reliability: 89, capacity: 25000 },
      { name: "Thailand Premium", region: "Thailand", category: "Assembly", rating: 4.7, leadTime: 16, cost: 11, ethics: "A+", reliability: 96, capacity: 45000 },
      { name: "Indonesia Textiles", region: "Indonesia", category: "Textiles", rating: 4.2, leadTime: 22, cost: 8, ethics: "B", reliability: 87, capacity: 60000 }
    ]

    let filtered = baseSuppliers

    if (selectedRegion !== "all") {
      const regionMap: Record<string, string[]> = {
        "asia": ["Vietnam", "Thailand", "Indonesia"],
        "turkey": ["Turkey"],
        "morocco": ["Morocco"],
        "brazil": ["Brazil"]
      }
      filtered = filtered.filter(s => regionMap[selectedRegion]?.includes(s.region))
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(s => s.category.toLowerCase() === selectedCategory)
    }

    return filtered
  }, [selectedRegion, selectedCategory])

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Supply Chain Command Center</h1>
          <p className="text-muted-foreground">Live operations monitoring and route optimization</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Package className="h-4 w-4 mr-2" />
              Find Regional Suppliers
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Regional Supplier Discovery
              </DialogTitle>
              <DialogDescription>
                Find and evaluate suppliers by region and category with detailed analytics
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="asia">Southeast Asia</SelectItem>
                      <SelectItem value="turkey">Turkey</SelectItem>
                      <SelectItem value="morocco">Morocco</SelectItem>
                      <SelectItem value="brazil">Brazil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="assembly">Assembly</SelectItem>
                      <SelectItem value="components">Components</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Found {supplierData.length} Suppliers</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {supplierData.map((supplier, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{supplier.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{supplier.region}</span>
                            <Badge variant="outline">{supplier.category}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{supplier.rating}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">{supplier.leadTime} days</p>
                            <p className="text-xs text-muted-foreground">Lead Time</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">${supplier.cost}/unit</p>
                            <p className="text-xs text-muted-foreground">Cost</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-indigo-500" />
                          <div>
                            <p className="text-sm font-medium">{supplier.reliability}%</p>
                            <p className="text-xs text-muted-foreground">Reliability</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Factory className="h-4 w-4 text-orange-500" />
                          <div>
                            <p className="text-sm font-medium">{supplier.capacity.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Capacity</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge 
                          className={supplier.ethics === "A+" ? "bg-green-600 text-white hover:bg-green-700" : 
                                    supplier.ethics === "A" ? "bg-blue-600 text-white hover:bg-blue-700" :
                                    supplier.ethics === "B+" ? "bg-yellow-600 text-black hover:bg-yellow-700" :
                                    "bg-amber-600 text-white hover:bg-amber-700"}
                        >
                          Ethics: {supplier.ethics}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Contact Supplier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Shipment Delay Alerts - NEW */}
      <Card className="border-l-4 border-l-amber-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Shipment Delay Alerts
            <Badge variant="destructive" className="ml-2">4 Active</Badge>
          </CardTitle>
          <CardDescription>Real-time shipment status and delay notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {shipmentAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  alert.severity === "critical" ? "bg-red-50 border-red-200" :
                  alert.severity === "warning" ? "bg-amber-50 border-amber-200" :
                  alert.severity === "info" ? "bg-blue-50 border-blue-200" :
                  "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${
                    alert.severity === "critical" ? "text-red-600" :
                    alert.severity === "warning" ? "text-amber-600" :
                    alert.severity === "info" ? "text-blue-600" :
                    "text-green-600"
                  }`}>
                    {alert.severity === "good" ? <CheckCircle className="h-5 w-5" /> :
                     alert.severity === "critical" ? <AlertTriangle className="h-5 w-5" /> :
                     <AlertCircle className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">{alert.route}</span>
                    </div>
                    {alert.reason && (
                      <p className="text-sm text-muted-foreground mt-1">{alert.reason}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Original ETA: {alert.originalEta}</span>
                      <span>New ETA: {alert.eta}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={
                      alert.severity === "critical" ? "bg-red-100 text-red-700 border-red-300" :
                      alert.severity === "warning" ? "bg-amber-100 text-amber-700 border-amber-300" :
                      alert.severity === "info" ? "bg-blue-100 text-blue-700 border-blue-300" :
                      "bg-green-100 text-green-700 border-green-300"
                    }
                  >
                    {alert.delay}
                  </Badge>
                  {alert.impact && (
                    <Badge variant="destructive">{alert.impact}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Route Comparison - ENHANCED */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Route Comparison: Cost vs Time
          </CardTitle>
          <CardDescription>Compare routes across regions for optimal logistics decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChartContainer config={chartConfig} className="h-48">
              <BarChart data={routeComparison}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                <XAxis dataKey="route" className="text-xs" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar yAxisId="left" dataKey="avgCost" fill="#3b82f6" name="Avg Cost ($)" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="avgTime" fill="#10b981" name="Avg Time (days)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {routeComparison.map((route, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {route.route.includes("Asia") ? <Ship className="h-4 w-4 text-blue-500" /> :
                       route.route.includes("Turkey") ? <Truck className="h-4 w-4 text-amber-500" /> :
                       <Plane className="h-4 w-4 text-green-500" />}
                      <span className="font-medium">{route.route}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        route.carbonFootprint === "Low" ? "bg-green-50 text-green-700 border-green-200" :
                        route.carbonFootprint === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {route.carbonFootprint} Carbon
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Avg Cost</p>
                      <p className="font-semibold">${route.avgCost}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Avg Time</p>
                      <p className="font-semibold">{route.avgTime}d</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Reliability</p>
                      <p className="font-semibold">{route.reliability}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Regions</p>
                      <p className="font-semibold">{route.regions.length}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Rerouting Insights - NEW */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Suggested Rerouting Insights
          </CardTitle>
          <CardDescription>AI-powered route optimization recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reroutingSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-white">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-slate-100">Current</Badge>
                      <span className="text-sm font-medium">{suggestion.current}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">Suggested</Badge>
                      <span className="text-sm font-medium">{suggestion.suggested}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{suggestion.recommendation}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-center p-2 bg-white rounded border">
                      <p className="text-xs text-muted-foreground">Time Saved</p>
                      <p className="font-semibold text-green-600">{suggestion.timeSaved}</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <p className="text-xs text-muted-foreground">Cost Impact</p>
                      <p className={`font-semibold ${suggestion.costImpact.startsWith("-") ? "text-green-600" : "text-amber-600"}`}>
                        {suggestion.costImpact}
                      </p>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <p className="text-xs text-muted-foreground">Risk Reduction</p>
                      <Badge 
                        className={
                          suggestion.riskReduction === "High" ? "bg-green-600 text-white" :
                          suggestion.riskReduction === "Medium" ? "bg-amber-600 text-white" :
                          "bg-slate-600 text-white"
                        }
                      >
                        {suggestion.riskReduction}
                      </Badge>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RFID Inventory Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Tracker
          </CardTitle>
          <CardDescription>Stock levels by facility with lead time warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Turkey Hub</span>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Engine Components</p>
                <Progress value={15} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">340 units remaining - Reorder triggered</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Vietnam DC</span>
                  <Badge variant="secondary">Low</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Frame Assembly Parts</p>
                <Progress value={35} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">1,240 units remaining</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Morocco Facility</span>
                  <Badge variant="outline">Good</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Electronics Modules</p>
                <Progress value={78} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">4,560 units remaining</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Scorecards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Supplier Scorecards
          </CardTitle>
          <CardDescription>Performance rankings and compliance audits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <h4 className="font-medium">Turkish Textile Co.</h4>
                    <p className="text-sm text-muted-foreground">Primary Supplier - Textiles</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-600 text-white hover:bg-green-700">Ethics: A+</Badge>
                    <Badge variant="secondary">Cost: $12/unit</Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">Lead: 12 days</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">98% On-time</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <h4 className="font-medium">Vietnam Manufacturing Ltd</h4>
                    <p className="text-sm text-muted-foreground">Secondary Supplier - Assembly</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-600 text-white hover:bg-blue-700">Ethics: A</Badge>
                    <Badge variant="secondary">Cost: $9/unit</Badge>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">Lead: 18 days</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">95% On-time</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <h4 className="font-medium">Morocco Nearshore Co.</h4>
                    <p className="text-sm text-muted-foreground">Growing Supplier - Textiles</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-600 text-white hover:bg-blue-700">Ethics: A</Badge>
                    <Badge variant="secondary">Cost: $14/unit</Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Lead: 8 days</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium">93% On-time</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
