"use client"

import { useState, useMemo } from "react"
import { TrendingUp, TrendingDown, DollarSign, Shield, AlertTriangle, BarChart3, Zap, Package, Clock, ChevronRight, Check, ArrowUpRight, ArrowDownRight, Gauge, Target, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts"
import { useNotifications } from "@/components/notification-provider"

type CommodityKey = "aluminum" | "steel" | "plastic" | "copper" | "rubber"

interface Commodity {
  name: string
  symbol: string
  currentPrice: number
  priceUnit: string
  change24h: number
  change30d: number
  yearlyExposure: number
  hedgedPercent: number
  riskLevel: "low" | "medium" | "high"
  priceHistory: { month: string; price: number; hedged: number }[]
  regionalBreakdown: { region: string; usage: number; cost: number }[]
}

export function CommodityHedging() {
  const { addNotification } = useNotifications()
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityKey>("aluminum")
  const [hedgeAmount, setHedgeAmount] = useState([50])
  const [hedgeDuration, setHedgeDuration] = useState("6months")

  const commodities: Record<CommodityKey, Commodity> = {
    aluminum: {
      name: "Aluminum",
      symbol: "ALU",
      currentPrice: 2340,
      priceUnit: "$/ton",
      change24h: 1.2,
      change30d: -3.8,
      yearlyExposure: 142,
      hedgedPercent: 45,
      riskLevel: "medium",
      priceHistory: [
        { month: "Oct", price: 2280, hedged: 2260 },
        { month: "Nov", price: 2350, hedged: 2260 },
        { month: "Dec", price: 2420, hedged: 2260 },
        { month: "Jan", price: 2380, hedged: 2300 },
        { month: "Feb", price: 2310, hedged: 2300 },
        { month: "Mar", price: 2340, hedged: 2300 },
      ],
      regionalBreakdown: [
        { region: "Southeast Asia", usage: 45000, cost: 52.4 },
        { region: "Turkey", usage: 32000, cost: 38.6 },
        { region: "Morocco", usage: 18000, cost: 21.2 },
        { region: "Brazil", usage: 25000, cost: 29.8 },
      ]
    },
    steel: {
      name: "Steel",
      symbol: "STL",
      currentPrice: 780,
      priceUnit: "$/ton",
      change24h: -0.5,
      change30d: 2.4,
      yearlyExposure: 186,
      hedgedPercent: 60,
      riskLevel: "low",
      priceHistory: [
        { month: "Oct", price: 745, hedged: 740 },
        { month: "Nov", price: 760, hedged: 740 },
        { month: "Dec", price: 775, hedged: 740 },
        { month: "Jan", price: 790, hedged: 760 },
        { month: "Feb", price: 785, hedged: 760 },
        { month: "Mar", price: 780, hedged: 760 },
      ],
      regionalBreakdown: [
        { region: "Southeast Asia", usage: 85000, cost: 68.4 },
        { region: "Turkey", usage: 62000, cost: 52.2 },
        { region: "Morocco", usage: 28000, cost: 24.6 },
        { region: "Brazil", usage: 45000, cost: 40.8 },
      ]
    },
    plastic: {
      name: "Plastic Resins",
      symbol: "PLA",
      currentPrice: 1420,
      priceUnit: "$/ton",
      change24h: 2.8,
      change30d: 8.2,
      yearlyExposure: 98,
      hedgedPercent: 30,
      riskLevel: "high",
      priceHistory: [
        { month: "Oct", price: 1280, hedged: 1260 },
        { month: "Nov", price: 1320, hedged: 1260 },
        { month: "Dec", price: 1350, hedged: 1260 },
        { month: "Jan", price: 1380, hedged: 1320 },
        { month: "Feb", price: 1400, hedged: 1320 },
        { month: "Mar", price: 1420, hedged: 1320 },
      ],
      regionalBreakdown: [
        { region: "Southeast Asia", usage: 28000, cost: 38.2 },
        { region: "Turkey", usage: 22000, cost: 30.8 },
        { region: "Morocco", usage: 12000, cost: 16.4 },
        { region: "Brazil", usage: 9000, cost: 12.6 },
      ]
    },
    copper: {
      name: "Copper",
      symbol: "COP",
      currentPrice: 8920,
      priceUnit: "$/ton",
      change24h: 0.8,
      change30d: -1.2,
      yearlyExposure: 64,
      hedgedPercent: 55,
      riskLevel: "medium",
      priceHistory: [
        { month: "Oct", price: 8650, hedged: 8600 },
        { month: "Nov", price: 8780, hedged: 8600 },
        { month: "Dec", price: 8950, hedged: 8600 },
        { month: "Jan", price: 9020, hedged: 8750 },
        { month: "Feb", price: 8980, hedged: 8750 },
        { month: "Mar", price: 8920, hedged: 8750 },
      ],
      regionalBreakdown: [
        { region: "Southeast Asia", usage: 3200, cost: 24.8 },
        { region: "Turkey", usage: 2100, cost: 18.2 },
        { region: "Morocco", usage: 1200, cost: 10.4 },
        { region: "Brazil", usage: 1500, cost: 10.6 },
      ]
    },
    rubber: {
      name: "Natural Rubber",
      symbol: "RUB",
      currentPrice: 1680,
      priceUnit: "$/ton",
      change24h: -1.4,
      change30d: -5.6,
      yearlyExposure: 52,
      hedgedPercent: 40,
      riskLevel: "medium",
      priceHistory: [
        { month: "Oct", price: 1780, hedged: 1750 },
        { month: "Nov", price: 1760, hedged: 1750 },
        { month: "Dec", price: 1740, hedged: 1750 },
        { month: "Jan", price: 1720, hedged: 1700 },
        { month: "Feb", price: 1700, hedged: 1700 },
        { month: "Mar", price: 1680, hedged: 1700 },
      ],
      regionalBreakdown: [
        { region: "Southeast Asia", usage: 15000, cost: 22.4 },
        { region: "Turkey", usage: 8000, cost: 12.8 },
        { region: "Morocco", usage: 5000, cost: 8.2 },
        { region: "Brazil", usage: 6000, cost: 8.6 },
      ]
    }
  }

  const currentCommodity = commodities[selectedCommodity]

  // Calculate hedge impact
  const hedgeImpact = useMemo(() => {
    const exposureToHedge = currentCommodity.yearlyExposure * (hedgeAmount[0] / 100)
    const durationMultiplier = hedgeDuration === "3months" ? 0.25 : hedgeDuration === "6months" ? 0.5 : 1
    const potentialSavings = exposureToHedge * 0.08 * durationMultiplier
    const hedgeCost = exposureToHedge * 0.015 * durationMultiplier
    const netBenefit = potentialSavings - hedgeCost

    return {
      exposureToHedge: exposureToHedge.toFixed(1),
      potentialSavings: potentialSavings.toFixed(1),
      hedgeCost: hedgeCost.toFixed(1),
      netBenefit: netBenefit.toFixed(1),
      riskReduction: Math.min(95, hedgeAmount[0] * 0.9).toFixed(0)
    }
  }, [hedgeAmount, hedgeDuration, currentCommodity])

  const executeHedge = () => {
    addNotification({
      id: `hedge-${selectedCommodity}-${Date.now()}`,
      title: `Hedge Order Placed: ${currentCommodity.name}`,
      message: `${hedgeAmount[0]}% hedge for ${hedgeDuration.replace("months", " months")} covering $${hedgeImpact.exposureToHedge}M exposure.`,
      type: "info",
      read: false,
      timestamp: new Date()
    })
  }

  // Total exposure summary
  const totalExposure = Object.values(commodities).reduce((sum, c) => sum + c.yearlyExposure, 0)
  const totalHedged = Object.values(commodities).reduce((sum, c) => sum + (c.yearlyExposure * c.hedgedPercent / 100), 0)
  const avgHedgePercent = (totalHedged / totalExposure * 100).toFixed(0)

  const chartConfig = {
    price: { label: "Market Price", color: "#3b82f6" },
    hedged: { label: "Hedged Price", color: "#22c55e" },
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Commodity Exposure & Hedging</h1>
          <p className="text-muted-foreground">Monitor raw material costs and manage price risk</p>
        </div>
        <Select value={selectedCommodity} onValueChange={(v) => setSelectedCommodity(v as CommodityKey)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select Commodity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aluminum">Aluminum</SelectItem>
            <SelectItem value="steel">Steel</SelectItem>
            <SelectItem value="plastic">Plastic Resins</SelectItem>
            <SelectItem value="copper">Copper</SelectItem>
            <SelectItem value="rubber">Natural Rubber</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Total Exposure Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Commodity Exposure</p>
                <p className="text-3xl font-bold text-blue-900">${totalExposure}M</p>
                <p className="text-xs text-blue-600 mt-1">Annual spend on raw materials</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Hedged</p>
                <p className="text-3xl font-bold text-green-900">${totalHedged.toFixed(0)}M</p>
                <p className="text-xs text-green-600 mt-1">{avgHedgePercent}% of total exposure</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Unhedged Exposure</p>
                <p className="text-3xl font-bold text-amber-900">${(totalExposure - totalHedged).toFixed(0)}M</p>
                <p className="text-xs text-amber-600 mt-1">At market price risk</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-violet-50 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700">YTD Savings from Hedges</p>
                <p className="text-3xl font-bold text-indigo-900">$18.4M</p>
                <p className="text-xs text-indigo-600 mt-1">vs. spot market prices</p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commodity Price Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Commodity Price Monitor
          </CardTitle>
          <CardDescription>Real-time prices and hedge coverage status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {(Object.entries(commodities) as [CommodityKey, Commodity][]).map(([key, commodity]) => (
              <div 
                key={key}
                onClick={() => setSelectedCommodity(key)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedCommodity === key ? "border-blue-500 bg-blue-50" : "hover:border-blue-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{commodity.name}</span>
                  <Badge 
                    variant="outline" 
                    className={
                      commodity.riskLevel === "high" ? "bg-red-50 text-red-700 border-red-200" :
                      commodity.riskLevel === "medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-green-50 text-green-700 border-green-200"
                    }
                  >
                    {commodity.riskLevel}
                  </Badge>
                </div>
                <p className="text-xl font-bold">${commodity.currentPrice.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{commodity.priceUnit}</p>
                <div className="flex items-center gap-2 mt-2">
                  {commodity.change24h >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 text-red-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-green-500" />
                  )}
                  <span className={`text-xs font-medium ${commodity.change24h >= 0 ? "text-red-600" : "text-green-600"}`}>
                    {commodity.change24h >= 0 ? "+" : ""}{commodity.change24h}% 24h
                  </span>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Hedged</span>
                    <span className="font-medium">{commodity.hedgedPercent}%</span>
                  </div>
                  <Progress value={commodity.hedgedPercent} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price History Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {currentCommodity.name} Price History
            </CardTitle>
            <CardDescription>Market price vs hedged price (6 months)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ChartContainer config={chartConfig} className="h-48">
              <LineChart data={currentCommodity.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" domain={['auto', 'auto']} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  name="Market Price"
                />
                <Line 
                  type="monotone" 
                  dataKey="hedged" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                  name="Hedged Price"
                />
              </LineChart>
            </ChartContainer>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-muted-foreground">30-Day Change</p>
                <p className={`text-lg font-bold ${currentCommodity.change30d >= 0 ? "text-red-600" : "text-green-600"}`}>
                  {currentCommodity.change30d >= 0 ? "+" : ""}{currentCommodity.change30d}%
                </p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Annual Exposure</p>
                <p className="text-lg font-bold">${currentCommodity.yearlyExposure}M</p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Currently Hedged</p>
                <p className="text-lg font-bold text-green-600">{currentCommodity.hedgedPercent}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Usage Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Regional Usage: {currentCommodity.name}
            </CardTitle>
            <CardDescription>Consumption and cost by manufacturing hub</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentCommodity.regionalBreakdown.map((region, index) => (
              <div key={region.region} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{region.region}</span>
                  <Badge variant="outline">${region.cost}M/year</Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>Usage: {region.usage.toLocaleString()} tons/year</span>
                  <span>{((region.cost / currentCommodity.yearlyExposure) * 100).toFixed(0)}% of total</span>
                </div>
                <Progress 
                  value={(region.cost / currentCommodity.yearlyExposure) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Hedging Action Panel */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Create Hedge Position: {currentCommodity.name}
          </CardTitle>
          <CardDescription>Lock in prices to protect against market volatility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Hedge Amount (% of exposure)</label>
                  <span className="text-sm font-semibold text-green-600">{hedgeAmount[0]}%</span>
                </div>
                <Slider
                  value={hedgeAmount}
                  onValueChange={setHedgeAmount}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10% (Minimal)</span>
                  <span>100% (Full Coverage)</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Hedge Duration</label>
                <Select value={hedgeDuration} onValueChange={setHedgeDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="12months">12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-600" />
                Hedge Impact Preview
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-xs text-muted-foreground">Exposure to Hedge</p>
                  <p className="text-lg font-bold text-blue-600">${hedgeImpact.exposureToHedge}M</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-xs text-muted-foreground">Hedge Cost</p>
                  <p className="text-lg font-bold text-amber-600">${hedgeImpact.hedgeCost}M</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-xs text-muted-foreground">Potential Savings</p>
                  <p className="text-lg font-bold text-green-600">${hedgeImpact.potentialSavings}M</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <p className="text-xs text-muted-foreground">Risk Reduction</p>
                  <p className="text-lg font-bold text-green-600">{hedgeImpact.riskReduction}%</p>
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Net Benefit (Est.)</span>
                  <span className={`text-xl font-bold ${parseFloat(hedgeImpact.netBenefit) >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {parseFloat(hedgeImpact.netBenefit) >= 0 ? "+" : ""}${hedgeImpact.netBenefit}M
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Shield className="h-4 w-4 mr-2" />
                Execute Hedge - Lock in ${hedgeImpact.exposureToHedge}M
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Hedge Order</DialogTitle>
                <DialogDescription>Review and confirm your hedge position</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commodity</span>
                    <span className="font-medium">{currentCommodity.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Price</span>
                    <span className="font-medium">${currentCommodity.currentPrice} {currentCommodity.priceUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hedge Amount</span>
                    <span className="font-medium">{hedgeAmount[0]}% (${hedgeImpact.exposureToHedge}M)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{hedgeDuration.replace("months", " Months")}</span>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Hedge will lock in current market price</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="bg-transparent">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={executeHedge} className="bg-green-600 hover:bg-green-700">
                    Confirm Hedge Order
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Active Hedges Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Active Hedge Positions
          </CardTitle>
          <CardDescription>Current hedges and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { commodity: "Aluminum", coverage: 45, expiry: "Jun 2026", lockedPrice: "$2,300/ton", currentValue: "+$2.8M", status: "In the Money" },
              { commodity: "Steel", coverage: 60, expiry: "Sep 2026", lockedPrice: "$760/ton", currentValue: "+$1.4M", status: "In the Money" },
              { commodity: "Plastic", coverage: 30, expiry: "Apr 2026", lockedPrice: "$1,320/ton", currentValue: "+$3.2M", status: "In the Money" },
              { commodity: "Copper", coverage: 55, expiry: "Jul 2026", lockedPrice: "$8,750/ton", currentValue: "-$0.4M", status: "Out of Money" },
            ].map((hedge, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{hedge.commodity}</p>
                    <p className="text-sm text-muted-foreground">{hedge.coverage}% hedged at {hedge.lockedPrice}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-semibold ${hedge.currentValue.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {hedge.currentValue}
                    </p>
                    <p className="text-xs text-muted-foreground">Expires {hedge.expiry}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={hedge.status === "In the Money" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}
                  >
                    {hedge.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
