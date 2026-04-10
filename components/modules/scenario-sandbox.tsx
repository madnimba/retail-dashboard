"use client"

import { Zap, Play, RotateCcw, TrendingDown, TrendingUp, DollarSign, Clock, Shield, Sparkles, AlertTriangle, Check, Globe, Fuel, Package, Factory, Ship } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useState, useMemo } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

export function ScenarioSandbox() {
  // Commodity Price Scenarios
  const [aluminumPrice, setAluminumPrice] = useState([2340])
  const [steelPrice, setSteelPrice] = useState([780])
  const [plasticPrice, setPlasticPrice] = useState([1420])
  const [oilPrice, setOilPrice] = useState([85])
  
  // Operational Scenarios
  const [regionalSourcing, setRegionalSourcing] = useState([45])
  const [demandChange, setDemandChange] = useState([0])
  
  const [isSimulating, setIsSimulating] = useState(false)
  const [showResults, setShowResults] = useState(true)

  // Baseline values
  const baseline = {
    aluminum: 2340,
    steel: 780,
    plastic: 1420,
    oil: 85,
    totalCost: 847, // $M
    materialCost: 542, // $M
    logisticsCost: 186, // $M
    margin: 18.4 // %
  }

  // Calculate scenario outputs based on commodity prices and operational changes
  const scenarioOutput = useMemo(() => {
    // Material cost impact from commodity prices
    const aluminumImpact = (aluminumPrice[0] - baseline.aluminum) / baseline.aluminum * 142 // $142M aluminum spend
    const steelImpact = (steelPrice[0] - baseline.steel) / baseline.steel * 186 // $186M steel spend
    const plasticImpact = (plasticPrice[0] - baseline.plastic) / baseline.plastic * 98 // $98M plastic spend
    
    // Oil price affects logistics costs
    const oilImpact = (oilPrice[0] - baseline.oil) / baseline.oil * baseline.logisticsCost * 0.6
    
    // Regionalization reduces logistics but has transition cost
    const regionalizationSavings = (regionalSourcing[0] - 45) / 100 * 82 // up to $82M savings at full regional
    const regionalizationCost = (regionalSourcing[0] - 45) > 0 ? (regionalSourcing[0] - 45) * 0.8 : 0 // transition costs
    
    // Demand change affects revenue and costs proportionally
    const demandImpact = demandChange[0] / 100 * baseline.totalCost * 0.3

    const totalMaterialImpact = aluminumImpact + steelImpact + plasticImpact
    const totalCostImpact = totalMaterialImpact + oilImpact - regionalizationSavings + regionalizationCost + demandImpact
    
    // Margin impact
    const newMargin = baseline.margin - (totalCostImpact / baseline.totalCost * 100)
    
    // Risk assessment
    const commodityVolatility = Math.abs(aluminumPrice[0] - baseline.aluminum) / baseline.aluminum * 100 +
                               Math.abs(steelPrice[0] - baseline.steel) / baseline.steel * 100 +
                               Math.abs(plasticPrice[0] - baseline.plastic) / baseline.plastic * 100

    return {
      materialCostImpact: totalMaterialImpact.toFixed(1),
      logisticsCostImpact: oilImpact.toFixed(1),
      regionalizationImpact: (regionalizationSavings - regionalizationCost).toFixed(1),
      totalCostImpact: totalCostImpact.toFixed(1),
      newTotalCost: (baseline.totalCost + totalCostImpact).toFixed(0),
      marginImpact: (newMargin - baseline.margin).toFixed(2),
      newMargin: newMargin.toFixed(1),
      riskLevel: commodityVolatility > 20 ? "High" : commodityVolatility > 10 ? "Medium" : "Low"
    }
  }, [aluminumPrice, steelPrice, plasticPrice, oilPrice, regionalSourcing, demandChange])

  // Pre-loaded scenarios
  const preloadedScenarios = [
    {
      name: "Commodity Price Surge",
      description: "All materials +20%, oil +30%",
      params: { aluminum: 2808, steel: 936, plastic: 1704, oil: 110, regional: 45, demand: 0 },
      impact: "Critical",
      expectedCost: "+$124M",
      expectedMargin: "-2.3%"
    },
    {
      name: "Full Regionalization",
      description: "80% regional sourcing, stable prices",
      params: { aluminum: 2340, steel: 780, plastic: 1420, oil: 85, regional: 80, demand: 0 },
      impact: "Positive",
      expectedCost: "-$28M",
      expectedMargin: "+0.5%"
    },
    {
      name: "Demand Shock +15%",
      description: "Strong demand with stable inputs",
      params: { aluminum: 2340, steel: 780, plastic: 1420, oil: 85, regional: 45, demand: 15 },
      impact: "Moderate",
      expectedCost: "+$38M",
      expectedMargin: "Neutral"
    },
    {
      name: "Optimal Hedged Position",
      description: "Hedged commodities, 65% regional",
      params: { aluminum: 2100, steel: 720, plastic: 1280, oil: 80, regional: 65, demand: 5 },
      impact: "Positive",
      expectedCost: "-$52M",
      expectedMargin: "+1.1%"
    },
  ]

  const applyScenario = (scenario: typeof preloadedScenarios[0]) => {
    setIsSimulating(true)
    setTimeout(() => {
      setAluminumPrice([scenario.params.aluminum])
      setSteelPrice([scenario.params.steel])
      setPlasticPrice([scenario.params.plastic])
      setOilPrice([scenario.params.oil])
      setRegionalSourcing([scenario.params.regional])
      setDemandChange([scenario.params.demand])
      setIsSimulating(false)
      setShowResults(true)
    }, 600)
  }

  const resetScenario = () => {
    setAluminumPrice([baseline.aluminum])
    setSteelPrice([baseline.steel])
    setPlasticPrice([baseline.plastic])
    setOilPrice([baseline.oil])
    setRegionalSourcing([45])
    setDemandChange([0])
    setShowResults(false)
  }

  const chartConfig = {
    baseline: { label: "Baseline", color: "#94a3b8" },
    scenario: { label: "Scenario", color: "#3b82f6" },
  }

  // Comparison data for visualization
  const comparisonData = [
    { name: "Material Cost", baseline: baseline.materialCost, scenario: baseline.materialCost + parseFloat(scenarioOutput.materialCostImpact) },
    { name: "Logistics", baseline: baseline.logisticsCost, scenario: baseline.logisticsCost + parseFloat(scenarioOutput.logisticsCostImpact) },
    { name: "Regional Adj.", baseline: 0, scenario: -parseFloat(scenarioOutput.regionalizationImpact) },
  ]

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Scenario Planning</h1>
          <p className="text-muted-foreground">Model commodity price changes and operational shifts</p>
        </div>
        <Button onClick={resetScenario} variant="outline" className="w-full sm:w-auto bg-transparent">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Baseline
        </Button>
      </div>

      {/* Quick Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Scenarios
          </CardTitle>
          <CardDescription>Pre-configured scenarios for rapid analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {preloadedScenarios.map((scenario, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer ${
                  isSimulating ? "opacity-50" : ""
                }`}
                onClick={() => !isSimulating && applyScenario(scenario)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{scenario.name}</h4>
                  <Badge 
                    variant="outline"
                    className={
                      scenario.impact === "Critical" ? "bg-red-50 text-red-700 border-red-200" :
                      scenario.impact === "Moderate" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-green-50 text-green-700 border-green-200"
                    }
                  >
                    {scenario.impact}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{scenario.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className={scenario.expectedCost.startsWith("+") ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                    {scenario.expectedCost}
                  </span>
                  <Button size="sm" variant="ghost" disabled={isSimulating}>
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commodity Price Sliders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Commodity Price Inputs
            </CardTitle>
            <CardDescription>Adjust raw material prices to see cost impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="flex items-center gap-2">
                  Aluminum Price ($/ton)
                </Label>
                <span className={`text-sm font-semibold ${aluminumPrice[0] > baseline.aluminum ? "text-red-600" : aluminumPrice[0] < baseline.aluminum ? "text-green-600" : ""}`}>
                  ${aluminumPrice[0].toLocaleString()}
                </span>
              </div>
              <Slider
                value={aluminumPrice}
                onValueChange={setAluminumPrice}
                max={3500}
                min={1500}
                step={20}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$1,500 (-36%)</span>
                <span className="text-blue-600">Baseline: $2,340</span>
                <span>$3,500 (+50%)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="flex items-center gap-2">
                  Steel Price ($/ton)
                </Label>
                <span className={`text-sm font-semibold ${steelPrice[0] > baseline.steel ? "text-red-600" : steelPrice[0] < baseline.steel ? "text-green-600" : ""}`}>
                  ${steelPrice[0].toLocaleString()}
                </span>
              </div>
              <Slider
                value={steelPrice}
                onValueChange={setSteelPrice}
                max={1200}
                min={500}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$500 (-36%)</span>
                <span className="text-blue-600">Baseline: $780</span>
                <span>$1,200 (+54%)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="flex items-center gap-2">
                  Plastic Resins ($/ton)
                </Label>
                <span className={`text-sm font-semibold ${plasticPrice[0] > baseline.plastic ? "text-red-600" : plasticPrice[0] < baseline.plastic ? "text-green-600" : ""}`}>
                  ${plasticPrice[0].toLocaleString()}
                </span>
              </div>
              <Slider
                value={plasticPrice}
                onValueChange={setPlasticPrice}
                max={2200}
                min={900}
                step={20}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$900 (-37%)</span>
                <span className="text-blue-600">Baseline: $1,420</span>
                <span>$2,200 (+55%)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-amber-500" />
                  Oil Price ($/barrel)
                </Label>
                <span className={`text-sm font-semibold ${oilPrice[0] > baseline.oil ? "text-red-600" : oilPrice[0] < baseline.oil ? "text-green-600" : ""}`}>
                  ${oilPrice[0]}
                </span>
              </div>
              <Slider
                value={oilPrice}
                onValueChange={setOilPrice}
                max={150}
                min={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$50 (-41%)</span>
                <span className="text-blue-600">Baseline: $85</span>
                <span>$150 (+76%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operational Sliders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Operational Parameters
            </CardTitle>
            <CardDescription>Model regionalization and demand changes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
                max={90}
                min={30}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>30% (Current global)</span>
                <span>90% (Full regional)</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Higher regional sourcing reduces logistics costs and lead times, with initial transition investment.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Demand Change (%)
                </Label>
                <span className={`text-sm font-semibold ${demandChange[0] > 0 ? "text-green-600" : demandChange[0] < 0 ? "text-red-600" : ""}`}>
                  {demandChange[0] > 0 ? "+" : ""}{demandChange[0]}%
                </span>
              </div>
              <Slider
                value={demandChange}
                onValueChange={setDemandChange}
                max={30}
                min={-30}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>-30% (Recession)</span>
                <span>0% (Baseline)</span>
                <span>+30% (Boom)</span>
              </div>
            </div>

            {/* Cost Comparison Chart */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Cost Component Comparison</h4>
              <ChartContainer config={chartConfig} className="h-36">
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" className="text-xs" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="baseline" fill="#94a3b8" name="Baseline ($M)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="scenario" fill="#3b82f6" name="Scenario ($M)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Panel */}
      {showResults && (
        <Card className="border-l-4 border-l-blue-500 animate-in fade-in duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Scenario Impact Summary
            </CardTitle>
            <CardDescription>Financial impact of current parameter settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg border ${
                parseFloat(scenarioOutput.totalCostImpact) > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className={`h-5 w-5 ${parseFloat(scenarioOutput.totalCostImpact) > 0 ? "text-red-600" : "text-green-600"}`} />
                  <h4 className="font-medium">Total Cost Impact</h4>
                </div>
                <p className={`text-2xl font-bold ${parseFloat(scenarioOutput.totalCostImpact) > 0 ? "text-red-600" : "text-green-600"}`}>
                  {parseFloat(scenarioOutput.totalCostImpact) > 0 ? "+" : ""}${scenarioOutput.totalCostImpact}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  New total: ${scenarioOutput.newTotalCost}M
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${
                parseFloat(scenarioOutput.marginImpact) < 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className={`h-5 w-5 ${parseFloat(scenarioOutput.marginImpact) < 0 ? "text-red-600" : "text-green-600"}`} />
                  <h4 className="font-medium">Margin Impact</h4>
                </div>
                <p className={`text-2xl font-bold ${parseFloat(scenarioOutput.marginImpact) < 0 ? "text-red-600" : "text-green-600"}`}>
                  {parseFloat(scenarioOutput.marginImpact) > 0 ? "+" : ""}{scenarioOutput.marginImpact}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  New margin: {scenarioOutput.newMargin}%
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${
                parseFloat(scenarioOutput.materialCostImpact) > 0 ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Package className={`h-5 w-5 ${parseFloat(scenarioOutput.materialCostImpact) > 0 ? "text-amber-600" : "text-green-600"}`} />
                  <h4 className="font-medium">Material Costs</h4>
                </div>
                <p className={`text-2xl font-bold ${parseFloat(scenarioOutput.materialCostImpact) > 0 ? "text-amber-600" : "text-green-600"}`}>
                  {parseFloat(scenarioOutput.materialCostImpact) > 0 ? "+" : ""}${scenarioOutput.materialCostImpact}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">From commodity prices</p>
              </div>

              <div className={`p-4 rounded-lg border ${
                scenarioOutput.riskLevel === "High" ? "bg-red-50 border-red-200" :
                scenarioOutput.riskLevel === "Medium" ? "bg-amber-50 border-amber-200" :
                "bg-green-50 border-green-200"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className={`h-5 w-5 ${
                    scenarioOutput.riskLevel === "High" ? "text-red-600" :
                    scenarioOutput.riskLevel === "Medium" ? "text-amber-600" :
                    "text-green-600"
                  }`} />
                  <h4 className="font-medium">Risk Level</h4>
                </div>
                <p className={`text-2xl font-bold ${
                  scenarioOutput.riskLevel === "High" ? "text-red-600" :
                  scenarioOutput.riskLevel === "Medium" ? "text-amber-600" :
                  "text-green-600"
                }`}>
                  {scenarioOutput.riskLevel}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Commodity volatility</p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Material Cost Breakdown
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Aluminum impact</span>
                    <span className={((aluminumPrice[0] - baseline.aluminum) / baseline.aluminum * 142) > 0 ? "text-red-600" : "text-green-600"}>
                      {((aluminumPrice[0] - baseline.aluminum) / baseline.aluminum * 142) > 0 ? "+" : ""}
                      ${((aluminumPrice[0] - baseline.aluminum) / baseline.aluminum * 142).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Steel impact</span>
                    <span className={((steelPrice[0] - baseline.steel) / baseline.steel * 186) > 0 ? "text-red-600" : "text-green-600"}>
                      {((steelPrice[0] - baseline.steel) / baseline.steel * 186) > 0 ? "+" : ""}
                      ${((steelPrice[0] - baseline.steel) / baseline.steel * 186).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plastic impact</span>
                    <span className={((plasticPrice[0] - baseline.plastic) / baseline.plastic * 98) > 0 ? "text-red-600" : "text-green-600"}>
                      {((plasticPrice[0] - baseline.plastic) / baseline.plastic * 98) > 0 ? "+" : ""}
                      ${((plasticPrice[0] - baseline.plastic) / baseline.plastic * 98).toFixed(1)}M
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Ship className="h-4 w-4" />
                  Logistics Impact
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Oil price impact</span>
                    <span className={parseFloat(scenarioOutput.logisticsCostImpact) > 0 ? "text-red-600" : "text-green-600"}>
                      {parseFloat(scenarioOutput.logisticsCostImpact) > 0 ? "+" : ""}${scenarioOutput.logisticsCostImpact}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Regionalization benefit</span>
                    <span className={parseFloat(scenarioOutput.regionalizationImpact) >= 0 ? "text-green-600" : "text-red-600"}>
                      {parseFloat(scenarioOutput.regionalizationImpact) >= 0 ? "-" : "+"}${Math.abs(parseFloat(scenarioOutput.regionalizationImpact)).toFixed(1)}M
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Recommendation
                </h4>
                <p className="text-sm text-muted-foreground">
                  {parseFloat(scenarioOutput.totalCostImpact) > 50 ? 
                    "Consider increasing commodity hedges and accelerating regionalization to mitigate cost increases." :
                    parseFloat(scenarioOutput.totalCostImpact) > 0 ?
                    "Moderate cost increase. Monitor commodity markets and review hedge positions." :
                    "Favorable scenario. Consider locking in current commodity prices through forward contracts."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
