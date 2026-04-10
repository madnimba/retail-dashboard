"use client"

import { useState } from "react"
import { Globe, MapPin, TrendingUp, TrendingDown, Clock, DollarSign, Factory, Users, ChevronRight, ArrowUpRight, ArrowDownRight, Building, Truck, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"

type RegionKey = "southeast-asia" | "turkey" | "morocco" | "brazil"
type CountryKey = string

interface CountryData {
  name: string
  costPerUnit: number
  leadTime: number
  capacityUtil: number
  supplierReliability: number
  facilities: number
  employees: number
  yearlyVolume: string
  status: string
}

interface RegionData {
  name: string
  totalCost: number
  avgLeadTime: number
  capacityUtil: number
  supplierReliability: number
  countries: CountryData[]
  trends: { month: string; cost: number; leadTime: number }[]
}

export function RegionalPerformance() {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>("southeast-asia")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const regionData: Record<RegionKey, RegionData> = {
    "southeast-asia": {
      name: "Southeast Asia",
      totalCost: 312,
      avgLeadTime: 28,
      capacityUtil: 82,
      supplierReliability: 94,
      countries: [
        { name: "Vietnam", costPerUnit: 12.40, leadTime: 26, capacityUtil: 88, supplierReliability: 96, facilities: 8, employees: 12400, yearlyVolume: "$124M", status: "Expanding" },
        { name: "Thailand", costPerUnit: 14.20, leadTime: 24, capacityUtil: 79, supplierReliability: 93, facilities: 5, employees: 8200, yearlyVolume: "$98M", status: "Stable" },
        { name: "Indonesia", costPerUnit: 11.80, leadTime: 32, capacityUtil: 71, supplierReliability: 89, facilities: 6, employees: 9800, yearlyVolume: "$78M", status: "At Risk" },
        { name: "Malaysia", costPerUnit: 15.60, leadTime: 22, capacityUtil: 85, supplierReliability: 97, facilities: 3, employees: 4200, yearlyVolume: "$56M", status: "Premium" },
      ],
      trends: [
        { month: "Jan", cost: 13.2, leadTime: 29 },
        { month: "Feb", cost: 12.8, leadTime: 28 },
        { month: "Mar", cost: 13.5, leadTime: 30 },
        { month: "Apr", cost: 12.4, leadTime: 27 },
        { month: "May", cost: 12.1, leadTime: 26 },
        { month: "Jun", cost: 12.6, leadTime: 28 },
      ]
    },
    "turkey": {
      name: "Turkey",
      totalCost: 245,
      avgLeadTime: 18,
      capacityUtil: 91,
      supplierReliability: 97,
      countries: [
        { name: "Istanbul Region", costPerUnit: 16.80, leadTime: 16, capacityUtil: 94, supplierReliability: 98, facilities: 12, employees: 18600, yearlyVolume: "$156M", status: "Premium" },
        { name: "Izmir Region", costPerUnit: 15.20, leadTime: 18, capacityUtil: 89, supplierReliability: 96, facilities: 8, employees: 11200, yearlyVolume: "$89M", status: "Expanding" },
        { name: "Bursa Region", costPerUnit: 14.60, leadTime: 20, capacityUtil: 86, supplierReliability: 95, facilities: 5, employees: 7400, yearlyVolume: "$64M", status: "Stable" },
      ],
      trends: [
        { month: "Jan", cost: 16.2, leadTime: 19 },
        { month: "Feb", cost: 15.8, leadTime: 18 },
        { month: "Mar", cost: 15.4, leadTime: 17 },
        { month: "Apr", cost: 15.9, leadTime: 18 },
        { month: "May", cost: 15.6, leadTime: 17 },
        { month: "Jun", cost: 15.2, leadTime: 16 },
      ]
    },
    "morocco": {
      name: "Morocco",
      totalCost: 178,
      avgLeadTime: 14,
      capacityUtil: 68,
      supplierReliability: 91,
      countries: [
        { name: "Casablanca Region", costPerUnit: 13.40, leadTime: 12, capacityUtil: 74, supplierReliability: 93, facilities: 6, employees: 8900, yearlyVolume: "$98M", status: "Expanding" },
        { name: "Tangier Region", costPerUnit: 12.80, leadTime: 14, capacityUtil: 71, supplierReliability: 90, facilities: 4, employees: 5600, yearlyVolume: "$62M", status: "Developing" },
        { name: "Marrakech Region", costPerUnit: 14.20, leadTime: 18, capacityUtil: 58, supplierReliability: 88, facilities: 2, employees: 2800, yearlyVolume: "$28M", status: "Pilot" },
      ],
      trends: [
        { month: "Jan", cost: 14.8, leadTime: 16 },
        { month: "Feb", cost: 14.2, leadTime: 15 },
        { month: "Mar", cost: 13.8, leadTime: 14 },
        { month: "Apr", cost: 13.4, leadTime: 14 },
        { month: "May", cost: 13.2, leadTime: 13 },
        { month: "Jun", cost: 13.0, leadTime: 12 },
      ]
    },
    "brazil": {
      name: "Brazil",
      totalCost: 112,
      avgLeadTime: 8,
      capacityUtil: 45,
      supplierReliability: 86,
      countries: [
        { name: "Sao Paulo Region", costPerUnit: 18.60, leadTime: 6, capacityUtil: 52, supplierReliability: 89, facilities: 3, employees: 4200, yearlyVolume: "$68M", status: "Expanding" },
        { name: "Minas Gerais", costPerUnit: 17.20, leadTime: 8, capacityUtil: 44, supplierReliability: 85, facilities: 2, employees: 2400, yearlyVolume: "$34M", status: "Developing" },
        { name: "Rio Grande do Sul", costPerUnit: 19.40, leadTime: 10, capacityUtil: 38, supplierReliability: 82, facilities: 1, employees: 1200, yearlyVolume: "$18M", status: "Pilot" },
      ],
      trends: [
        { month: "Jan", cost: 19.8, leadTime: 10 },
        { month: "Feb", cost: 19.2, leadTime: 9 },
        { month: "Mar", cost: 18.6, leadTime: 9 },
        { month: "Apr", cost: 18.2, leadTime: 8 },
        { month: "May", cost: 17.8, leadTime: 8 },
        { month: "Jun", cost: 17.4, leadTime: 7 },
      ]
    }
  }

  const currentRegion = regionData[selectedRegion]
  const currentCountry = selectedCountry 
    ? currentRegion.countries.find((c: CountryData) => c.name === selectedCountry) 
    : null

  const chartConfig = {
    cost: { label: "Cost ($/unit)", color: "#3b82f6" },
    leadTime: { label: "Lead Time (days)", color: "#10b981" },
  }

  const radarData = currentRegion.countries.map((country: CountryData) => ({
    name: country.name.split(" ")[0],
    cost: 100 - (country.costPerUnit / 20 * 100),
    leadTime: 100 - (country.leadTime / 35 * 100),
    capacity: country.capacityUtil,
    reliability: country.supplierReliability,
  }))

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Regional Performance</h1>
          <p className="text-muted-foreground">Manufacturing hub analytics and drill-down</p>
        </div>
        <Select value={selectedRegion} onValueChange={(v) => { setSelectedRegion(v as RegionKey); setSelectedCountry(null); }}>
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="southeast-asia">Southeast Asia</SelectItem>
            <SelectItem value="turkey">Turkey</SelectItem>
            <SelectItem value="morocco">Morocco</SelectItem>
            <SelectItem value="brazil">Brazil</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Region Overview KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost per Unit</p>
                <p className="text-2xl font-bold">${(currentRegion.totalCost / 20).toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowDownRight className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">-4.2% vs target</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lead Time</p>
                <p className="text-2xl font-bold">{currentRegion.avgLeadTime} days</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowDownRight className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">-2 days vs Q1</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Capacity Utilization</p>
                <p className="text-2xl font-bold">{currentRegion.capacityUtil}%</p>
                <Progress value={currentRegion.capacityUtil} className="h-2 mt-2" />
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Factory className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Supplier Reliability</p>
                <p className="text-2xl font-bold">{currentRegion.supplierReliability}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">+1.2% vs target</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country/Sub-region Drill-down */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {currentRegion.name} - Sub-regions
            </CardTitle>
            <CardDescription>Click to view detailed performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentRegion.countries.map((country: CountryData) => (
                <div 
                  key={country.name}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedCountry === country.name ? "border-blue-500 bg-blue-50" : "hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedCountry(selectedCountry === country.name ? null : country.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">{country.name}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        country.status === "Premium" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                        country.status === "Expanding" ? "bg-green-50 text-green-700 border-green-200" :
                        country.status === "Stable" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        country.status === "At Risk" ? "bg-red-50 text-red-700 border-red-200" :
                        country.status === "Developing" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-50 text-slate-700 border-slate-200"
                      }
                    >
                      {country.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Cost</span>
                      <p className="font-medium">${country.costPerUnit}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lead Time</span>
                      <p className="font-medium">{country.leadTime}d</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capacity</span>
                      <p className="font-medium">{country.capacityUtil}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reliability</span>
                      <p className="font-medium">{country.supplierReliability}%</p>
                    </div>
                  </div>
                  
                  {selectedCountry === country.name && (
                    <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 animate-in fade-in duration-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-1">
                          <Building className="h-4 w-4 text-blue-600" />
                        </div>
                        <p className="text-xs text-muted-foreground">Facilities</p>
                        <p className="font-semibold">{country.facilities}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-1">
                          <Users className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-xs text-muted-foreground">Employees</p>
                        <p className="font-semibold">{country.employees.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full mx-auto mb-1">
                          <Truck className="h-4 w-4 text-amber-600" />
                        </div>
                        <p className="text-xs text-muted-foreground">Volume</p>
                        <p className="font-semibold">{country.yearlyVolume}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trend Charts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Trends
            </CardTitle>
            <CardDescription>6-month cost and lead time trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Cost per Unit Trend</h4>
              <ChartContainer config={chartConfig} className="h-40">
                <LineChart data={currentRegion.trends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" domain={['auto', 'auto']} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Lead Time Trend</h4>
              <ChartContainer config={chartConfig} className="h-40">
                <BarChart data={currentRegion.trends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="leadTime" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparative Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Regional Comparison Matrix
          </CardTitle>
          <CardDescription>Cross-regional performance benchmarking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Region</th>
                  <th className="text-center py-3 px-4 font-medium">Cost/Unit</th>
                  <th className="text-center py-3 px-4 font-medium">Lead Time</th>
                  <th className="text-center py-3 px-4 font-medium">Capacity</th>
                  <th className="text-center py-3 px-4 font-medium">Reliability</th>
                  <th className="text-center py-3 px-4 font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {(Object.entries(regionData) as [RegionKey, RegionData][]).map(([key, region]) => {
                  const score = Math.round((100 - (region.totalCost / 20) / 20 * 100) * 0.3 + 
                                          (100 - region.avgLeadTime / 35 * 100) * 0.25 + 
                                          region.capacityUtil * 0.25 + 
                                          region.supplierReliability * 0.2)
                  return (
                    <tr 
                      key={key} 
                      className={`border-b hover:bg-slate-50 cursor-pointer transition-colors ${
                        selectedRegion === key ? "bg-blue-50" : ""
                      }`}
                      onClick={() => { setSelectedRegion(key); setSelectedCountry(null); }}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="font-medium">{region.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="font-mono">${(region.totalCost / 20).toFixed(2)}</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="font-mono">{region.avgLeadTime} days</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Progress value={region.capacityUtil} className="h-2 w-16" />
                          <span className="text-xs text-muted-foreground">{region.capacityUtil}%</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge 
                          variant="outline" 
                          className={
                            region.supplierReliability >= 95 ? "bg-green-50 text-green-700 border-green-200" :
                            region.supplierReliability >= 90 ? "bg-blue-50 text-blue-700 border-blue-200" :
                            "bg-amber-50 text-amber-700 border-amber-200"
                          }
                        >
                          {region.supplierReliability}%
                        </Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge 
                          className={
                            score >= 80 ? "bg-green-600 text-white hover:bg-green-700" :
                            score >= 70 ? "bg-blue-600 text-white hover:bg-blue-700" :
                            "bg-amber-600 text-white hover:bg-amber-700"
                          }
                        >
                          {score}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
