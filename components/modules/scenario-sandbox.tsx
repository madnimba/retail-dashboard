"use client"

import { Zap, Play, RotateCcw, TrendingDown, TrendingUp, DollarSign, Clock, Shield, Sparkles, ChevronRight, AlertTriangle, Check, Globe, Fuel, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect, useMemo } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"

export function ScenarioSandbox() {
  // New supply chain focused sliders
  const [regionalSourcing, setRegionalSourcing] = useState([45])
  const [oilPrice, setOilPrice] = useState([85])
  const [disruptionIntensity, setDisruptionIntensity] = useState([30])
  const [leadTimeIncrease, setLeadTimeIncrease] = useState([5])
  
  const [isSimulating, setIsSimulating] = useState(false)
  const [showResults, setShowResults] = useState(true)

  // Calculate scenario outputs based on sliders
  const scenarioOutput = useMemo(() => {
    const baselineCost = 847 // millions
    const baselineLeadTime = 28 // days
    const baselineRisk = 65 // percentage
    const baselineNPV = 124 // millions

    // Regional sourcing reduces cost but may increase initial investment
    const regionalizationEffect = (regionalSourcing[0] - 45) / 100
    const costImpact = -baselineCost * 0.12 * regionalizationEffect - (oilPrice[0] - 85) * 2.4
    
    // Oil price increases transportation costs
    const oilEffect = (oilPrice[0] - 85) / 85
    
    // Disruption intensity affects lead time
    const disruptionEffect = disruptionIntensity[0] / 100
    const leadTimeImpact = leadTimeIncrease[0] + (disruptionIntensity[0] * 0.15)
    
    // Risk reduction from regionalization
    const riskReduction = regionalSourcing[0] * 0.8 - disruptionIntensity[0] * 0.4
    
    // NPV calculation
    const npvImpact = (regionalSourcing[0] * 1.8) - (oilPrice[0] - 85) * 0.8 - (disruptionIntensity[0] * 0.5) - (leadTimeIncrease[0] * 2.2)

    return {
      costImpact: costImpact.toFixed(1),
      leadTimeImpact: leadTimeImpact.toFixed(1),
      riskReduction: Math.max(0, Math.min(100, riskReduction)).toFixed(0),
      npvImpact: npvImpact.toFixed(1)
    }
  }, [regionalSourcing, oilPrice, disruptionIntensity, leadTimeIncrease])

  // AI Recommended configuration
  const recommendedConfig = {
    regionalSourcing: 70,
    oilPrice: 90,
    disruptionIntensity: 20,
    leadTimeIncrease: 3,
    reasoning: "Based on current market conditions and geopolitical risks, increasing regional sourcing to 70% while maintaining low disruption exposure provides optimal cost-risk balance.",
    confidence: 87
  }

  // Pre-loaded scenarios
  const preloadedScenarios = [
    {
      name: "Oil Price Spike",
      description: "Simulate $120/barrel oil impact",
      params: { regional: 45, oil: 120, disruption: 40, leadTime: 8 },
      impact: "High",
      expectedCost: "+$84M",
      expectedRisk: "Critical"
    },
    {
      name: "Full Regionalization",
      description: "Shift 80% sourcing to near-shore",
      params: { regional: 80, oil: 85, disruption: 20, leadTime: 3 },
      impact: "Medium",
      expectedCost: "-$42M",
      expectedRisk: "Low"
    },
    {
      name: "Supply Chain Disruption",
      description: "Major Asia route disruption",
      params: { regional: 45, oil: 95, disruption: 75, leadTime: 15 },
      impact: "Critical",
      expectedCost: "+$156M",
      expectedRisk: "Critical"
    },
    {
      name: "Optimized Hybrid Model",
      description: "AI-recommended balanced approach",
      params: { regional: 65, oil: 90, disruption: 25, leadTime: 4 },
      impact: "Low",
      expectedCost: "-$28M",
      expectedRisk: "Low"
    },
  ]

  const applyScenario = (scenario: typeof preloadedScenarios[0]) => {
    setIsSimulating(true)
    setTimeout(() => {
      setRegionalSourcing([scenario.params.regional])
      setOilPrice([scenario.params.oil])
      setDisruptionIntensity([scenario.params.disruption])
      setLeadTimeIncrease([scenario.params.leadTime])
      setIsSimulating(false)
      setShowResults(true)
    }, 800)
  }

  const applyRecommended = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setRegionalSourcing([recommendedConfig.regionalSourcing])
      setOilPrice([recommendedConfig.oilPrice])
      setDisruptionIntensity([recommendedConfig.disruptionIntensity])
      setLeadTimeIncrease([recommendedConfig.leadTimeIncrease])
      setIsSimulating(false)
      setShowResults(true)
    }, 800)
  }

  const resetScenario = () => {
    setRegionalSourcing([45])
    setOilPrice([85])
    setDisruptionIntensity([30])
    setLeadTimeIncrease([5])
    setShowResults(false)
  }

  const chartConfig = {
    cost: { label: "Cost Impact", color: "#3b82f6" },
    time: { label: "Lead Time", color: "#10b981" },
    risk: { label: "Risk", color: "#f59e0b" },
  }

  // Comparison data for visualization
  const comparisonData = [
    { name: "Current", cost: 847, leadTime: 28, risk: 65 },
    { 
      name: "Simulated", 
      cost: Math.max(0, 847 + parseFloat(scenarioOutput.costImpact)), 
      leadTime: Math.max(0, 28 + parseFloat(scenarioOutput.leadTimeImpact) - 5),
      risk: Math.max(0, 65 - parseFloat(scenarioOutput.riskReduction))
    },
  ]

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Scenario Sandbox</h1>
          <p className="text-muted-foreground">Stress-test supply chain strategies and regionalization</p>
        </div>
        <Button onClick={resetScenario} variant="outline" className="w-full sm:w-auto">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All Scenarios
        </Button>
      </div>

      {/* AI Recommended Configuration - NEW */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            AI Recommended Configuration
            <Badge className="bg-blue-600 text-white ml-2">{recommendedConfig.confidence}% Confidence</Badge>
          </CardTitle>
          <CardDescription>{recommendedConfig.reasoning}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="text-xs text-muted-foreground">Regional Sourcing</p>
                <p className="text-xl font-bold text-blue-600">{recommendedConfig.regionalSourcing}%</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="text-xs text-muted-foreground">Oil Price Assumed</p>
                <p className="text-xl font-bold text-amber-600">${recommendedConfig.oilPrice}</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="text-xs text-muted-foreground">Disruption Level</p>
                <p className="text-xl font-bold text-green-600">{recommendedConfig.disruptionIntensity}%</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="text-xs text-muted-foreground">Lead Time Buffer</p>
                <p className="text-xl font-bold text-indigo-600">+{recommendedConfig.leadTimeIncrease}d</p>
              </div>
            </div>
            <Button onClick={applyRecommended} className="bg-blue-600 hover:bg-blue-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Apply Recommended
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pre-loaded Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Pre-loaded Scenarios
          </CardTitle>
          <CardDescription>Quick stress tests with immediate impact analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {preloadedScenarios.map((scenario, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer ${
                  isSimulating ? "opacity-50" : ""
                }`}
                onClick={() => !isSimulating && applyScenario(scenario)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {scenario.impact === "Critical" ? <AlertTriangle className="h-4 w-4 text-red-500" /> :
                     scenario.impact === "High" ? <AlertCircle className="h-4 w-4 text-amber-500" /> :
                     scenario.impact === "Medium" ? <TrendingUp className="h-4 w-4 text-blue-500" /> :
                     <Check className="h-4 w-4 text-green-500" />}
                    <h4 className="font-medium">{scenario.name}</h4>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      scenario.expectedRisk === "Critical" ? "bg-red-50 text-red-700 border-red-200" :
                      scenario.expectedRisk === "High" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-green-50 text-green-700 border-green-200"
                    }
                  >
                    {scenario.expectedRisk} Risk
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${
                    scenario.expectedCost.startsWith("+") ? "text-red-600" : "text-green-600"
                  }`}>
                    {scenario.expectedCost}
                  </span>
                  <Button size="sm" variant="ghost" disabled={isSimulating}>
                    <Play className="h-4 w-4 mr-1" />
                    Run
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Simulations with New Sliders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Custom Simulation Parameters
          </CardTitle>
          <CardDescription>Adjust parameters to model different supply chain scenarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-500" />
                    Regional Sourcing (%)
                  </Label>
                  <span className="text-sm font-semibold text-blue-600">{regionalSourcing[0]}%</span>
                </div>
                <Slider
                  value={regionalSourcing}
                  onValueChange={setRegionalSourcing}
                  max={100}
                  min={20}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>20% (Global)</span>
                  <span>100% (Full Regional)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-amber-500" />
                    Oil Price ($/barrel)
                  </Label>
                  <span className="text-sm font-semibold text-amber-600">${oilPrice[0]}</span>
                </div>
                <Slider
                  value={oilPrice}
                  onValueChange={setOilPrice}
                  max={150}
                  min={60}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$60 (Low)</span>
                  <span>$150 (Crisis)</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Disruption Intensity
                  </Label>
                  <span className="text-sm font-semibold text-red-600">{disruptionIntensity[0]}%</span>
                </div>
                <Slider
                  value={disruptionIntensity}
                  onValueChange={setDisruptionIntensity}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0% (Stable)</span>
                  <span>100% (Severe)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-indigo-500" />
                    Lead Time Increase (days)
                  </Label>
                  <span className="text-sm font-semibold text-indigo-600">+{leadTimeIncrease[0]} days</span>
                </div>
                <Slider
                  value={leadTimeIncrease}
                  onValueChange={setLeadTimeIncrease}
                  max={30}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 days</span>
                  <span>+30 days</span>
                </div>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={() => setShowResults(true)}
          >
            <Play className="h-4 w-4 mr-2" />
            Run Custom Simulation
          </Button>
        </CardContent>
      </Card>

      {/* Scenario Results - ENHANCED */}
      {showResults && (
        <Card className="animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Scenario Impact Analysis
            </CardTitle>
            <CardDescription>Projected outcomes based on current parameter settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Output KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg border ${
                parseFloat(scenarioOutput.costImpact) < 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className={`h-5 w-5 ${parseFloat(scenarioOutput.costImpact) < 0 ? "text-green-600" : "text-red-600"}`} />
                  <h4 className="font-medium">Cost Impact</h4>
                </div>
                <p className={`text-2xl font-bold ${parseFloat(scenarioOutput.costImpact) < 0 ? "text-green-600" : "text-red-600"}`}>
                  {parseFloat(scenarioOutput.costImpact) > 0 ? "+" : ""}${scenarioOutput.costImpact}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">Annual impact</p>
              </div>

              <div className={`p-4 rounded-lg border ${
                parseFloat(scenarioOutput.leadTimeImpact) <= 5 ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className={`h-5 w-5 ${parseFloat(scenarioOutput.leadTimeImpact) <= 5 ? "text-green-600" : "text-amber-600"}`} />
                  <h4 className="font-medium">Lead Time Impact</h4>
                </div>
                <p className={`text-2xl font-bold ${parseFloat(scenarioOutput.leadTimeImpact) <= 5 ? "text-green-600" : "text-amber-600"}`}>
                  +{scenarioOutput.leadTimeImpact} days
                </p>
                <p className="text-xs text-muted-foreground mt-1">Average increase</p>
              </div>

              <div className={`p-4 rounded-lg border ${
                parseFloat(scenarioOutput.riskReduction) >= 50 ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className={`h-5 w-5 ${parseFloat(scenarioOutput.riskReduction) >= 50 ? "text-green-600" : "text-amber-600"}`} />
                  <h4 className="font-medium">Risk Reduction</h4>
                </div>
                <p className={`text-2xl font-bold ${parseFloat(scenarioOutput.riskReduction) >= 50 ? "text-green-600" : "text-amber-600"}`}>
                  {scenarioOutput.riskReduction}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">From baseline</p>
              </div>

              <div className={`p-4 rounded-lg border ${
                parseFloat(scenarioOutput.npvImpact) > 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className={`h-5 w-5 ${parseFloat(scenarioOutput.npvImpact) > 0 ? "text-green-600" : "text-red-600"}`} />
                  <h4 className="font-medium">NPV Impact</h4>
                </div>
                <p className={`text-2xl font-bold ${parseFloat(scenarioOutput.npvImpact) > 0 ? "text-green-600" : "text-red-600"}`}>
                  {parseFloat(scenarioOutput.npvImpact) > 0 ? "+" : ""}${scenarioOutput.npvImpact}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">5-year projection</p>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Current vs Simulated Comparison</h4>
                <ChartContainer config={chartConfig} className="h-48">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="cost" fill="#3b82f6" name="Cost ($M)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Risk & Lead Time Comparison</h4>
                <ChartContainer config={chartConfig} className="h-48">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="leadTime" fill="#10b981" name="Lead Time (days)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="risk" fill="#f59e0b" name="Risk (%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>

            {/* Net Impact Summary */}
            <div className={`p-6 rounded-lg border ${
              parseFloat(scenarioOutput.npvImpact) > 0 && parseFloat(scenarioOutput.riskReduction) > 40 
                ? "bg-green-50 border-green-200" 
                : parseFloat(scenarioOutput.npvImpact) < -20 || parseFloat(scenarioOutput.riskReduction) < 20
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
            }`}>
              <div className="flex items-start gap-4">
                {parseFloat(scenarioOutput.npvImpact) > 0 && parseFloat(scenarioOutput.riskReduction) > 40 ? (
                  <Check className="h-6 w-6 text-green-600 mt-0.5" />
                ) : parseFloat(scenarioOutput.npvImpact) < -20 || parseFloat(scenarioOutput.riskReduction) < 20 ? (
                  <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5" />
                )}
                <div>
                  <h4 className="font-semibold text-lg">
                    {parseFloat(scenarioOutput.npvImpact) > 0 && parseFloat(scenarioOutput.riskReduction) > 40 
                      ? "Positive Outlook" 
                      : parseFloat(scenarioOutput.npvImpact) < -20 || parseFloat(scenarioOutput.riskReduction) < 20
                        ? "Caution Advised"
                        : "Moderate Impact"}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    This scenario projects a net {parseFloat(scenarioOutput.npvImpact) > 0 ? "positive" : "negative"} NPV impact of ${Math.abs(parseFloat(scenarioOutput.npvImpact))}M over 5 years, 
                    with {scenarioOutput.riskReduction}% risk reduction. 
                    {parseFloat(scenarioOutput.leadTimeImpact) > 10 
                      ? " However, significant lead time increases may affect operational flexibility." 
                      : " Lead time impact remains manageable within operational buffers."}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
