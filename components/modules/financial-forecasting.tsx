"use client"

import { Calculator, TrendingUp, TrendingDown, Sliders, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight, PieChart, Target, Clock, Zap, ChevronRight, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useState, useMemo } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area, Cell } from "recharts"

export function FinancialForecasting() {
  const [regionalSourcing, setRegionalSourcing] = useState([45])
  const [investmentLevel, setInvestmentLevel] = useState([350])

  // Calculate financial metrics based on scenario inputs
  const financialOutput = useMemo(() => {
    const baseInvestment = 350 // millions
    const basePayback = 4.2 // years
    const baseNPV = 124 // millions
    const baseSavings = 82 // millions per year
    
    const regionalizationEffect = (regionalSourcing[0] - 45) / 100
    const investmentEffect = (investmentLevel[0] - 350) / 350

    const adjustedSavings = baseSavings * (1 + regionalizationEffect * 0.8)
    const adjustedNPV = baseNPV * (1 + regionalizationEffect * 0.6) - (investmentLevel[0] - 350) * 0.3
    const adjustedPayback = basePayback * (1 + investmentEffect * 0.5) / (1 + regionalizationEffect * 0.3)

    return {
      costSavings: adjustedSavings.toFixed(0),
      npv: adjustedNPV.toFixed(0),
      paybackPeriod: Math.max(2, adjustedPayback).toFixed(1),
      investment: investmentLevel[0]
    }
  }, [regionalSourcing, investmentLevel])

  // EBITDA Waterfall data
  const ebitdaWaterfall = [
    { phase: "Current", value: 124, fill: "#94a3b8" },
    { phase: "Phase 1", value: 42, fill: "#22c55e" },
    { phase: "Phase 2", value: 68, fill: "#3b82f6" },
    { phase: "Phase 3", value: 86, fill: "#8b5cf6" },
    { phase: "Target", value: 320, fill: "#0f172a" },
  ]

  // Phase breakdown
  const phaseBreakdown = [
    {
      phase: "Phase 1: Foundation",
      timeline: "2024 - 2025",
      investment: "$120M",
      ebitdaImpact: "+$42M",
      status: "In Progress",
      completion: 65,
      initiatives: [
        { name: "Turkey Hub Expansion", impact: "+$18M", status: "On Track" },
        { name: "Morocco Nearshore Setup", impact: "+$14M", status: "On Track" },
        { name: "Digital Integration", impact: "+$10M", status: "Ahead" },
      ]
    },
    {
      phase: "Phase 2: Optimization",
      timeline: "2025 - 2026",
      investment: "$145M",
      ebitdaImpact: "+$68M",
      status: "Planning",
      completion: 15,
      initiatives: [
        { name: "Full Regional Network", impact: "+$32M", status: "Planned" },
        { name: "Supplier Consolidation", impact: "+$22M", status: "Planned" },
        { name: "Automation Rollout", impact: "+$14M", status: "Planned" },
      ]
    },
    {
      phase: "Phase 3: Scale",
      timeline: "2026 - 2028",
      investment: "$185M",
      ebitdaImpact: "+$86M",
      status: "Future",
      completion: 0,
      initiatives: [
        { name: "Brazil Americas Hub", impact: "+$38M", status: "Future" },
        { name: "AI-Driven Planning", impact: "+$28M", status: "Future" },
        { name: "Carbon Reduction", impact: "+$20M", status: "Future" },
      ]
    },
  ]

  // Cost savings breakdown
  const savingsBreakdown = [
    { category: "Logistics & Freight", current: 245, optimized: 178, saving: 67 },
    { category: "Labor & Production", current: 312, optimized: 268, saving: 44 },
    { category: "Inventory Holding", current: 89, optimized: 62, saving: 27 },
    { category: "Customs & Tariffs", current: 124, optimized: 98, saving: 26 },
    { category: "Lead Time Costs", current: 77, optimized: 52, saving: 25 },
  ]

  // NPV projection over time
  const npvProjection = [
    { year: "2024", npv: -120, cumulative: -120 },
    { year: "2025", npv: -45, cumulative: -165 },
    { year: "2026", npv: 42, cumulative: -123 },
    { year: "2027", npv: 86, cumulative: -37 },
    { year: "2028", npv: 124, cumulative: 87 },
    { year: "2029", npv: 142, cumulative: 229 },
  ]

  const chartConfig = {
    value: { label: "EBITDA ($M)", color: "#3b82f6" },
    npv: { label: "NPV ($M)", color: "#22c55e" },
    cumulative: { label: "Cumulative ($M)", color: "#8b5cf6" },
    current: { label: "Current ($M)", color: "#ef4444" },
    optimized: { label: "Optimized ($M)", color: "#22c55e" },
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Financial Impact Engine</h1>
          <p className="text-muted-foreground">EBITDA modeling and NPV analysis by phase</p>
        </div>
      </div>

      {/* Key Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Cost Savings vs Global</p>
                <p className="text-3xl font-bold text-green-900">${financialOutput.costSavings}M</p>
                <p className="text-xs text-green-600 mt-1">Annual savings projection</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">NPV (5-Year)</p>
                <p className="text-3xl font-bold text-blue-900">${financialOutput.npv}M</p>
                <p className="text-xs text-blue-600 mt-1">Net Present Value</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Payback Period</p>
                <p className="text-3xl font-bold text-amber-900">{financialOutput.paybackPeriod} yrs</p>
                <p className="text-xs text-amber-600 mt-1">Investment recovery</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-violet-50 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700">Total Investment</p>
                <p className="text-3xl font-bold text-indigo-900">${financialOutput.investment}M</p>
                <p className="text-xs text-indigo-600 mt-1">3-phase program</p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Adjustment Sliders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sliders className="h-5 w-5" />
            Financial Scenario Modeling
          </CardTitle>
          <CardDescription>Adjust parameters to see financial impact in real-time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Regional Sourcing Target (%)</Label>
                <span className="text-sm font-semibold text-blue-600">{regionalSourcing[0]}%</span>
              </div>
              <Slider
                value={regionalSourcing}
                onValueChange={setRegionalSourcing}
                max={90}
                min={30}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>30% (Current)</span>
                <span>90% (Full Regional)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Investment Level ($M)</Label>
                <span className="text-sm font-semibold text-blue-600">${investmentLevel[0]}M</span>
              </div>
              <Slider
                value={investmentLevel}
                onValueChange={setInvestmentLevel}
                max={500}
                min={250}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$250M (Conservative)</span>
                <span>$500M (Aggressive)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EBITDA Waterfall Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            EBITDA Impact by Phase
          </CardTitle>
          <CardDescription>Breakdown of projected $196M EBITDA uplift</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={ebitdaWaterfall}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                <XAxis dataKey="phase" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {ebitdaWaterfall.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {ebitdaWaterfall.map((item, index) => (
                <div 
                  key={item.phase} 
                  className="text-center p-3 rounded-lg"
                  style={{ backgroundColor: `${item.fill}10`, borderColor: item.fill, borderWidth: 1 }}
                >
                  <p className="text-xs text-muted-foreground">{item.phase}</p>
                  <p className="text-lg font-bold" style={{ color: item.fill }}>
                    {index === 0 ? "" : index === 4 ? "" : "+"}${item.value}M
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Breakdown Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Phase Investment Details</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {phaseBreakdown.map((phase, index) => (
            <Card key={index} className={`${
              phase.status === "In Progress" ? "border-l-4 border-l-green-500" :
              phase.status === "Planning" ? "border-l-4 border-l-blue-500" :
              "border-l-4 border-l-slate-300"
            }`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{phase.phase}</CardTitle>
                  <Badge 
                    variant="outline"
                    className={
                      phase.status === "In Progress" ? "bg-green-50 text-green-700 border-green-200" :
                      phase.status === "Planning" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      "bg-slate-50 text-slate-700 border-slate-200"
                    }
                  >
                    {phase.status}
                  </Badge>
                </div>
                <CardDescription>{phase.timeline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Investment</span>
                  <span className="font-semibold">{phase.investment}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">EBITDA Impact</span>
                  <span className="font-semibold text-green-600">{phase.ebitdaImpact}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{phase.completion}%</span>
                  </div>
                  <Progress value={phase.completion} className="h-2" />
                </div>
                <div className="space-y-2 pt-2 border-t">
                  {phase.initiatives.map((initiative, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{initiative.name}</span>
                      <Badge 
                        variant="outline" 
                        className={
                          initiative.status === "On Track" || initiative.status === "Ahead" 
                            ? "bg-green-50 text-green-700 border-green-200 text-xs" 
                            : "text-xs"
                        }
                      >
                        {initiative.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cost Savings vs Global Model */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Cost Savings vs Global Model
          </CardTitle>
          <CardDescription>Annual savings breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChartContainer config={chartConfig} className="h-48">
              <BarChart data={savingsBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="category" type="category" className="text-xs" width={120} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="current" fill="#ef4444" name="Current ($M)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="optimized" fill="#22c55e" name="Optimized ($M)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {savingsBreakdown.map((item, index) => (
                <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground truncate">{item.category}</p>
                  <p className="text-lg font-bold text-green-600">-${item.saving}M</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">Total Annual Savings</span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  -${savingsBreakdown.reduce((sum, item) => sum + item.saving, 0)}M
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NPV Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            NPV & Payback Timeline
          </CardTitle>
          <CardDescription>Investment recovery projection (5-year horizon)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ChartContainer config={chartConfig} className="h-64">
              <AreaChart data={npvProjection}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                <XAxis dataKey="year" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  name="Cumulative NPV ($M)"
                />
                <Line 
                  type="monotone" 
                  dataKey="npv" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                  name="Annual NPV ($M)"
                />
              </AreaChart>
            </ChartContainer>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
                <p className="text-sm text-amber-700">Breakeven Point</p>
                <p className="text-xl font-bold text-amber-600">Q3 2027</p>
                <p className="text-xs text-muted-foreground">3.5 years from start</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-sm text-green-700">5-Year NPV</p>
                <p className="text-xl font-bold text-green-600">$229M</p>
                <p className="text-xs text-muted-foreground">At 10% discount rate</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <p className="text-sm text-blue-700">IRR</p>
                <p className="text-xl font-bold text-blue-600">24.8%</p>
                <p className="text-xs text-muted-foreground">Internal Rate of Return</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
