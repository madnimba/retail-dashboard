"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, Target } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ForecastGeneratorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ForecastGeneratorModal({ open, onOpenChange }: ForecastGeneratorModalProps) {
  const [forecastType, setForecastType] = useState("ebitda")
  const [timeHorizon, setTimeHorizon] = useState("12m")
  const [scenario, setScenario] = useState("base")
  const [isGenerating, setIsGenerating] = useState(false)
  const [forecast, setForecast] = useState<any>(null)

  const generateForecast = async () => {
    setIsGenerating(true)
    setForecast(null)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate mock forecast data
    const months = timeHorizon === "6m" ? 6 : timeHorizon === "12m" ? 12 : 24
    const baseValue = forecastType === "ebitda" ? 8 : forecastType === "revenue" ? 45 : 25
    const growth = scenario === "optimistic" ? 0.08 : scenario === "pessimistic" ? 0.02 : 0.05

    const data = Array.from({ length: months }, (_, i) => ({
      month: `M${i + 1}`,
      value: baseValue * Math.pow(1 + growth, i / 12),
      confidence: Math.max(60, 95 - i * 2),
    }))

    setForecast({
      data,
      summary: {
        currentValue: baseValue,
        projectedValue: data[data.length - 1].value,
        growth: ((data[data.length - 1].value - baseValue) / baseValue) * 100,
        confidence: data[data.length - 1].confidence,
      },
    })

    setIsGenerating(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            AI-Powered Forecast Generator
          </DialogTitle>
          <DialogDescription>
            Generate predictive forecasts using machine learning models and historical data
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forecast Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Forecast Type</Label>
                <Select value={forecastType} onValueChange={setForecastType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ebitda">EBITDA</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="inventory">Inventory Levels</SelectItem>
                    <SelectItem value="demand">Customer Demand</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time Horizon</Label>
                <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6m">6 Months</SelectItem>
                    <SelectItem value="12m">12 Months</SelectItem>
                    <SelectItem value="24m">24 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Scenario</Label>
                <Select value={scenario} onValueChange={setScenario}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pessimistic">Pessimistic</SelectItem>
                    <SelectItem value="base">Base Case</SelectItem>
                    <SelectItem value="optimistic">Optimistic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateForecast} disabled={isGenerating} className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Forecast"}
              </Button>

              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={66} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">Analyzing historical patterns...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Forecast Results</CardTitle>
              </CardHeader>
              <CardContent>
                {forecast ? (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-700">Projected Value</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-900">
                          €{forecast.summary.projectedValue.toFixed(1)}M
                        </p>
                        <p className="text-xs text-blue-600">
                          {forecast.summary.growth > 0 ? "+" : ""}
                          {forecast.summary.growth.toFixed(1)}% growth
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">Confidence</span>
                        </div>
                        <p className="text-2xl font-bold text-green-900">{forecast.summary.confidence.toFixed(0)}%</p>
                        <Badge variant={forecast.summary.confidence > 80 ? "default" : "secondary"} className="mt-1">
                          {forecast.summary.confidence > 80
                            ? "High"
                            : forecast.summary.confidence > 60
                              ? "Medium"
                              : "Low"}
                        </Badge>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={forecast.data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value: any) => [`€${value.toFixed(1)}M`, forecastType.toUpperCase()]} />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Key Insights */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Key Insights</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          • Forecast shows {forecast.summary.growth > 0 ? "positive" : "negative"} trend over{" "}
                          {timeHorizon}
                        </p>
                        <p>• Peak performance expected in month {Math.floor(forecast.data.length * 0.8)}</p>
                        <p>• Model confidence decreases over time due to market uncertainty</p>
                        <p>• {scenario} scenario assumptions applied to base model</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Configure parameters and generate forecast to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
