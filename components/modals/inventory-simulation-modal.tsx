"use client"

import { useState } from "react"
import { Package, Play, RotateCcw, AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface InventorySimulationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InventorySimulationModal({ open, onOpenChange }: InventorySimulationModalProps) {
  const [demandIncrease, setDemandIncrease] = useState([10])
  const [leadTimeDelay, setLeadTimeDelay] = useState([5])
  const [safetyStock, setSafetyStock] = useState([20])
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<any>(null)

  const runSimulation = async () => {
    setIsRunning(true)
    setResults(null)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock results
    const mockResults = {
      stockoutRisk: Math.max(5, Math.min(95, 25 + demandIncrease[0] + leadTimeDelay[0] - safetyStock[0])),
      reorderPoints: {
        jeans: Math.floor(150 + demandIncrease[0] * 2 + leadTimeDelay[0] * 1.5),
        hoodies: Math.floor(120 + demandIncrease[0] * 1.8 + leadTimeDelay[0] * 1.2),
        tshirts: Math.floor(200 + demandIncrease[0] * 2.2 + leadTimeDelay[0] * 1.8),
      },
      inventoryValue: 2450000 + safetyStock[0] * 5000 - demandIncrease[0] * 8000,
      turnoverRate: Math.max(2, 6.2 - safetyStock[0] * 0.05 + demandIncrease[0] * 0.1),
    }

    setResults(mockResults)
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setDemandIncrease([10])
    setLeadTimeDelay([5])
    setSafetyStock([20])
    setResults(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Simulation Engine
          </DialogTitle>
          <DialogDescription>
            Model different scenarios to optimize inventory levels and reduce stockout risk
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Simulation Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Demand Increase (%)</Label>
                <div className="mt-2">
                  <Slider
                    value={demandIncrease}
                    onValueChange={setDemandIncrease}
                    max={50}
                    min={-20}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>-20%</span>
                    <span className="font-medium">{demandIncrease[0]}%</span>
                    <span>+50%</span>
                  </div>
                </div>
              </div>

              <div>
                <Label>Lead Time Delay (days)</Label>
                <div className="mt-2">
                  <Slider
                    value={leadTimeDelay}
                    onValueChange={setLeadTimeDelay}
                    max={30}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>0 days</span>
                    <span className="font-medium">{leadTimeDelay[0]} days</span>
                    <span>30 days</span>
                  </div>
                </div>
              </div>

              <div>
                <Label>Safety Stock Level (%)</Label>
                <div className="mt-2">
                  <Slider
                    value={safetyStock}
                    onValueChange={setSafetyStock}
                    max={50}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>5%</span>
                    <span className="font-medium">{safetyStock[0]}%</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={runSimulation} disabled={isRunning} className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? "Running..." : "Run Simulation"}
                </Button>
                <Button variant="outline" onClick={resetSimulation}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Simulation Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isRunning && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-sm text-muted-foreground">Running inventory simulation...</p>
                  </div>
                </div>
              )}

              {results && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="font-medium">Stockout Risk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={results.stockoutRisk} className="flex-1 h-3" />
                      <Badge
                        variant={
                          results.stockoutRisk > 50
                            ? "destructive"
                            : results.stockoutRisk > 25
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {results.stockoutRisk}%
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Recommended Reorder Points</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span className="text-sm">Premium Jeans</span>
                        <span className="font-medium">{results.reorderPoints.jeans} units</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span className="text-sm">Casual Hoodies</span>
                        <span className="font-medium">{results.reorderPoints.hoodies} units</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span className="text-sm">Basic T-Shirts</span>
                        <span className="font-medium">{results.reorderPoints.tshirts} units</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">Inventory Value</p>
                      <p className="text-lg font-bold text-blue-900">€{(results.inventoryValue / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">Turnover Rate</p>
                      <p className="text-lg font-bold text-green-900">{results.turnoverRate.toFixed(1)}x</p>
                    </div>
                  </div>
                </div>
              )}

              {!results && !isRunning && (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Configure parameters and run simulation to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
