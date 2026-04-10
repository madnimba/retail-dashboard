"use client"

import { useState } from "react"
import { Globe, MapPin, TrendingUp, TrendingDown, Clock, DollarSign, Factory, Users, ChevronRight, ArrowUpRight, ArrowDownRight, Shield, Truck, AlertTriangle, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

type RegionKey = "southeast-asia" | "turkey" | "morocco" | "brazil"

export function RegionalPerformance() {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | null>(null)

  // 4 Key Regional Hubs
  const regions: Record<RegionKey, {
    name: string
    status: string
    statusColor: string
    annualCost: number
    costPerUnit: number
    leadTime: number
    capacity: number
    reliability: number
    facilities: number
    employees: number
    keyProducts: string[]
    strengths: string[]
    challenges: string[]
    trend: { metric: string; change: number; direction: "up" | "down" }[]
  }> = {
    "southeast-asia": {
      name: "Southeast Asia",
      status: "Operational",
      statusColor: "green",
      annualCost: 312,
      costPerUnit: 12.80,
      leadTime: 28,
      capacity: 82,
      reliability: 94,
      facilities: 22,
      employees: 34600,
      keyProducts: ["Motorcycles", "Marine Engines", "Electronic Components"],
      strengths: ["Low labor cost", "Established supplier network", "High volume capacity"],
      challenges: ["Long lead times to EU/US", "Port congestion risk", "Typhoon season disruptions"],
      trend: [
        { metric: "Cost/Unit", change: -4.2, direction: "down" },
        { metric: "Lead Time", change: -2, direction: "down" },
        { metric: "Capacity", change: 5, direction: "up" },
      ]
    },
    "turkey": {
      name: "Turkey",
      status: "Expanding",
      statusColor: "blue",
      annualCost: 245,
      costPerUnit: 15.60,
      leadTime: 16,
      capacity: 91,
      reliability: 97,
      facilities: 25,
      employees: 37200,
      keyProducts: ["Musical Instruments", "Audio Equipment", "Textiles"],
      strengths: ["EU proximity (12 days)", "High quality standards", "Skilled workforce"],
      challenges: ["Currency volatility (TRY)", "Higher labor costs", "Capacity constraints"],
      trend: [
        { metric: "Cost/Unit", change: -2.8, direction: "down" },
        { metric: "Lead Time", change: -3, direction: "down" },
        { metric: "Capacity", change: 8, direction: "up" },
      ]
    },
    "morocco": {
      name: "Morocco",
      status: "Developing",
      statusColor: "amber",
      annualCost: 178,
      costPerUnit: 13.40,
      leadTime: 12,
      capacity: 68,
      reliability: 91,
      facilities: 12,
      employees: 17300,
      keyProducts: ["Auto Parts", "Cables & Wiring", "Small Engines"],
      strengths: ["EU free trade zone", "Lowest lead time to EU", "Competitive costs"],
      challenges: ["Limited capacity", "Developing supplier base", "Infrastructure gaps"],
      trend: [
        { metric: "Cost/Unit", change: -6.1, direction: "down" },
        { metric: "Lead Time", change: -4, direction: "down" },
        { metric: "Capacity", change: 12, direction: "up" },
      ]
    },
    "brazil": {
      name: "Brazil",
      status: "Pilot",
      statusColor: "slate",
      annualCost: 112,
      costPerUnit: 18.20,
      leadTime: 8,
      capacity: 45,
      reliability: 86,
      facilities: 6,
      employees: 7800,
      keyProducts: ["Outboard Motors", "Generators", "Motorcycles (Americas)"],
      strengths: ["Americas market access", "Lowest lead time", "Growing domestic market"],
      challenges: ["Highest cost/unit", "Developing operations", "Currency risk (BRL)"],
      trend: [
        { metric: "Cost/Unit", change: -3.4, direction: "down" },
        { metric: "Lead Time", change: -1, direction: "down" },
        { metric: "Capacity", change: 15, direction: "up" },
      ]
    }
  }

  // Comparison data for chart
  const comparisonData = Object.entries(regions).map(([key, region]) => ({
    name: region.name.split(" ")[0],
    costPerUnit: region.costPerUnit,
    leadTime: region.leadTime,
    capacity: region.capacity,
    reliability: region.reliability,
  }))

  const chartConfig = {
    costPerUnit: { label: "Cost/Unit ($)", color: "#3b82f6" },
    leadTime: { label: "Lead Time (days)", color: "#f59e0b" },
  }

  const selectedRegionData = selectedRegion ? regions[selectedRegion] : null

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Regional Performance</h1>
          <p className="text-muted-foreground">Compare and analyze 4 manufacturing hubs</p>
        </div>
        {selectedRegion && (
          <Button variant="outline" onClick={() => setSelectedRegion(null)} className="bg-transparent">
            View All Regions
          </Button>
        )}
      </div>

      {/* Regional Comparison Grid */}
      {!selectedRegion && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.entries(regions) as [RegionKey, typeof regions[RegionKey]][]).map(([key, region]) => (
              <Card 
                key={key}
                className="cursor-pointer hover:shadow-lg transition-all hover:border-blue-300"
                onClick={() => setSelectedRegion(key)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span className="font-semibold">{region.name}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        region.statusColor === "green" ? "bg-green-50 text-green-700 border-green-200" :
                        region.statusColor === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        region.statusColor === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-50 text-slate-700 border-slate-200"
                      }
                    >
                      {region.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Annual Cost</span>
                      <span className="font-bold text-lg">${region.annualCost}M</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Cost/Unit</p>
                        <p className="font-medium">${region.costPerUnit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Lead Time</p>
                        <p className="font-medium">{region.leadTime} days</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Capacity</p>
                        <p className="font-medium">{region.capacity}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reliability</p>
                        <p className="font-medium">{region.reliability}%</p>
                      </div>
                    </div>

                    <Progress value={region.capacity} className="h-1.5" />

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingDown className="h-3 w-3 text-green-500" />
                        <span className="text-green-600">Cost improving</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Regional Comparison
              </CardTitle>
              <CardDescription>Cost per unit and lead time across hubs</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-56">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar yAxisId="left" dataKey="costPerUnit" fill="#3b82f6" name="Cost/Unit ($)" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="leadTime" fill="#f59e0b" name="Lead Time (days)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>

              <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t">
                {comparisonData.map((region) => (
                  <div key={region.name} className="text-center">
                    <p className="text-sm font-medium">{region.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ${region.costPerUnit}/unit | {region.leadTime}d
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-blue-700">Total Annual Cost</p>
                <p className="text-2xl font-bold text-blue-900">$847M</p>
                <p className="text-xs text-blue-600 mt-1">Across all 4 regions</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-green-700">Avg Cost/Unit</p>
                <p className="text-2xl font-bold text-green-900">$15.00</p>
                <p className="text-xs text-green-600 mt-1">-3.8% vs last year</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-amber-700">Avg Lead Time</p>
                <p className="text-2xl font-bold text-amber-900">16 days</p>
                <p className="text-xs text-amber-600 mt-1">-2.5 days vs last year</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-indigo-50 to-violet-50 border-0">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-indigo-700">Total Facilities</p>
                <p className="text-2xl font-bold text-indigo-900">65</p>
                <p className="text-xs text-indigo-600 mt-1">96,900 employees</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Selected Region Detail View */}
      {selectedRegionData && selectedRegion && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Region Header */}
          <Card className="bg-gradient-to-r from-slate-50 to-white">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{selectedRegionData.name}</h2>
                    <Badge 
                      variant="outline" 
                      className={
                        selectedRegionData.statusColor === "green" ? "bg-green-50 text-green-700 border-green-200" :
                        selectedRegionData.statusColor === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        selectedRegionData.statusColor === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-50 text-slate-700 border-slate-200"
                      }
                    >
                      {selectedRegionData.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{selectedRegionData.facilities} facilities | {selectedRegionData.employees.toLocaleString()} employees</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Annual Cost</p>
                    <p className="text-2xl font-bold">${selectedRegionData.annualCost}M</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Cost/Unit</p>
                    <p className="text-2xl font-bold">${selectedRegionData.costPerUnit}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Lead Time</p>
                    <p className="text-2xl font-bold">{selectedRegionData.leadTime}d</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity Utilization</p>
                    <p className="text-2xl font-bold">{selectedRegionData.capacity}%</p>
                    <Progress value={selectedRegionData.capacity} className="h-1.5 mt-2" />
                  </div>
                  <Factory className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Supplier Reliability</p>
                    <p className="text-2xl font-bold">{selectedRegionData.reliability}%</p>
                    <Progress value={selectedRegionData.reliability} className="h-1.5 mt-2" />
                  </div>
                  <Shield className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Facilities</p>
                    <p className="text-2xl font-bold">{selectedRegionData.facilities}</p>
                    <p className="text-xs text-muted-foreground mt-1">Manufacturing sites</p>
                  </div>
                  <Factory className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Workforce</p>
                    <p className="text-2xl font-bold">{(selectedRegionData.employees / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-muted-foreground mt-1">Employees</p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trends & Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Trends (vs Last Year)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedRegionData.trend.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      {item.direction === "down" ? (
                        <ArrowDownRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      )}
                      <span className="font-semibold text-green-600">
                        {item.change > 0 ? "+" : ""}{item.change}{item.metric.includes("Time") || item.metric.includes("Capacity") ? "" : "%"}
                        {item.metric.includes("Time") ? " days" : ""}
                        {item.metric.includes("Capacity") ? "%" : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Key Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedRegionData.keyProducts.map((product, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                      {product}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strengths & Challenges */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Check className="h-5 w-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedRegionData.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="h-5 w-5" />
                  Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedRegionData.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span className="text-sm">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
