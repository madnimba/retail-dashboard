"use client"

import { Calculator, TrendingUp, Sliders } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function FinancialForecasting() {
  const [cdmsInvestment, setCdmsInvestment] = useState([35])
  const [taxRate, setTaxRate] = useState([26])

  const calculateNPV = () => {
    const baseNPV = 45
    const investmentImpact = (cdmsInvestment[0] - 35) * -0.8
    const taxImpact = (30 - taxRate[0]) * 1.2
    return baseNPV + investmentImpact + taxImpact
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Financial Forecasting</h1>
          <p className="text-muted-foreground">Scenario modeling per phase</p>
        </div>
      </div>

      {/* Phase Budget Simulator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sliders className="h-5 w-5" />
            Phase Budget Simulator
          </CardTitle>
          <CardDescription>Adjust sliders to see NPV impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>CDMS Investment (€M)</Label>
              <div className="mt-2">
                <Slider
                  value={cdmsInvestment}
                  onValueChange={setCdmsInvestment}
                  max={50}
                  min={30}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>€30M</span>
                  <span className="font-medium">€{cdmsInvestment[0]}M</span>
                  <span>€50M</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Effective Tax Rate (%)</Label>
              <div className="mt-2">
                <Slider value={taxRate} onValueChange={setTaxRate} max={35} min={20} step={1} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>20% (Southland)</span>
                  <span className="font-medium">{taxRate[0]}%</span>
                  <span>35% (Noria)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="font-medium">Projected NPV</span>
              <span className="text-2xl font-bold text-blue-600">€{calculateNPV().toFixed(1)}M</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Based on current parameter settings</p>
          </div>
        </CardContent>
      </Card>

      {/* EBITDA Waterfall Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            EBITDA Waterfall Chart
          </CardTitle>
          <CardDescription>Breakdown of €31M uplift by phase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-100 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-xl font-bold">€8M</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Phase 1</p>
                <p className="text-xl font-bold text-green-600">+€12M</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Phase 2</p>
                <p className="text-xl font-bold text-blue-600">+€19M</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Target</p>
                <p className="text-xl font-bold text-purple-600">€39M</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Phase 1 Breakdown: CDMS Implementation (+€7M), Store Optimization (+€5M)
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Phase 2 Breakdown: Supply Chain (+€11M), Digital Expansion (+€8M)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tax Optimization Calculator
          </CardTitle>
          <CardDescription>Compare Noria 30% vs. Southland 22%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Noria Operations</h4>
              <p className="text-2xl font-bold text-red-600">30%</p>
              <p className="text-sm text-muted-foreground">Effective tax rate</p>
              <p className="text-xs text-muted-foreground mt-1">Annual tax: €2.4M</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Southland Operations</h4>
              <p className="text-2xl font-bold text-green-600">22%</p>
              <p className="text-sm text-muted-foreground">Effective tax rate</p>
              <p className="text-xs text-muted-foreground mt-1">Annual tax: €1.8M</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-800">
              Potential savings: €600K annually by shifting operations to Southland
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
