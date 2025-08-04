"use client"

import { Zap, Play, RotateCcw, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function ScenarioSandbox() {
  const [capexReduction, setCapexReduction] = useState([20])
  const [cottonPriceIncrease, setCottonPriceIncrease] = useState([15])
  const [turkeyProcurement, setTurkeyProcurement] = useState([70])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Scenario Sandbox</h1>
          <p className="text-muted-foreground">Stress-test strategies</p>
        </div>
        <Button>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All Scenarios
        </Button>
      </div>

      {/* Pre-loaded Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Pre-loaded Scenarios
          </CardTitle>
          <CardDescription>Quick stress tests with immediate results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">Recession in Noria</h4>
                  <p className="text-sm text-muted-foreground">Reduce CAPEX by 20%</p>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Run Scenario
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="destructive">Impact: High</Badge>
                <span className="text-sm">Projected EBITDA: €10M (↓€4M)</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">Cotton Price Surge</h4>
                  <p className="text-sm text-muted-foreground">+15% raw material costs</p>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Run Scenario
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">Impact: Medium</Badge>
                <span className="text-sm">Adjusts COGS and NRV automatically</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">Supply Chain Disruption</h4>
                  <p className="text-sm text-muted-foreground">Asian suppliers +30 days lead time</p>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Run Scenario
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="destructive">Impact: High</Badge>
                <span className="text-sm">Inventory shortage risk: 65%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Simulations */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Simulations</CardTitle>
          <CardDescription>Build your own scenarios with interactive parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>CAPEX Reduction (%)</Label>
              <div className="mt-2">
                <Slider
                  value={capexReduction}
                  onValueChange={setCapexReduction}
                  max={50}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>0%</span>
                  <span className="font-medium">{capexReduction[0]}%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Cotton Price Increase (%)</Label>
              <div className="mt-2">
                <Slider
                  value={cottonPriceIncrease}
                  onValueChange={setCottonPriceIncrease}
                  max={30}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>0%</span>
                  <span className="font-medium">{cottonPriceIncrease[0]}%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Turkey Procurement Shift (%)</Label>
              <div className="mt-2">
                <Slider
                  value={turkeyProcurement}
                  onValueChange={setTurkeyProcurement}
                  max={100}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>0%</span>
                  <span className="font-medium">{turkeyProcurement[0]}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Run Custom Simulation
          </Button>
        </CardContent>
      </Card>

      {/* Scenario Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Scenario Impact Analysis
          </CardTitle>
          <CardDescription>What if we shift 70% of procurement to Turkey?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Cost Impact</h4>
              <p className="text-2xl font-bold text-green-600">-€2.1M</p>
              <p className="text-sm text-muted-foreground">Annual savings</p>
              <p className="text-xs text-muted-foreground mt-1">Lower freight + production costs</p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Lead Time Impact</h4>
              <p className="text-2xl font-bold text-yellow-600">+3 days</p>
              <p className="text-sm text-muted-foreground">Average increase</p>
              <p className="text-xs text-muted-foreground mt-1">Manageable with buffer stock</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Net Impact</h4>
            <p className="text-lg font-bold text-blue-600">Positive: €1.8M annual benefit</p>
            <p className="text-sm text-muted-foreground">After accounting for inventory holding costs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
