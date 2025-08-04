"use client"

import { useState } from "react"
import { TrendingDown, Euro, Calculator, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface FxHedgingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FxHedgingModal({ open, onOpenChange }: FxHedgingModalProps) {
  const [exposure, setExposure] = useState("500000")
  const [hedgeRatio, setHedgeRatio] = useState("75")
  const [instrument, setInstrument] = useState("forward")
  const [maturity, setMaturity] = useState("3m")
  const [isExecuting, setIsExecuting] = useState(false)
  const [executed, setExecuted] = useState(false)

  const currentRate = 1.0847
  const forwardRate = 1.0823
  const hedgeAmount = (Number.parseFloat(exposure) * Number.parseFloat(hedgeRatio)) / 100
  const costBasisPoints = instrument === "forward" ? 0 : instrument === "option" ? 45 : 25

  const executeHedge = async () => {
    setIsExecuting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsExecuting(false)
    setExecuted(true)
  }

  const resetForm = () => {
    setExecuted(false)
    setExposure("500000")
    setHedgeRatio("75")
    setInstrument("forward")
    setMaturity("3m")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            FX Hedging Center
          </DialogTitle>
          <DialogDescription>Manage foreign exchange exposure with hedging instruments</DialogDescription>
        </DialogHeader>

        {executed ? (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                <h3 className="text-lg font-semibold text-green-900">Hedge Executed Successfully</h3>
                <div className="space-y-2">
                  <p className="text-sm text-green-700">
                    <strong>Amount:</strong> ${hedgeAmount.toLocaleString()} USD
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Rate:</strong> {forwardRate} EUR/USD
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Maturity:</strong>{" "}
                    {maturity === "3m" ? "3 months" : maturity === "6m" ? "6 months" : "12 months"}
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Trade ID:</strong> FX{Date.now().toString().slice(-6)}
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button onClick={resetForm} variant="outline">
                    New Hedge
                  </Button>
                  <Button onClick={() => onOpenChange(false)}>Close</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Current Market Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Euro className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">EUR/USD Spot</p>
                      <p className="text-lg font-bold text-blue-900">{currentRate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingDown className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-700">3M Forward</p>
                      <p className="text-lg font-bold text-green-900">{forwardRate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hedge Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hedge Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>USD Exposure</Label>
                    <Input
                      type="number"
                      value={exposure}
                      onChange={(e) => setExposure(e.target.value)}
                      placeholder="500000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hedge Ratio (%)</Label>
                    <Input
                      type="number"
                      value={hedgeRatio}
                      onChange={(e) => setHedgeRatio(e.target.value)}
                      placeholder="75"
                      max="100"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Instrument</Label>
                    <Select value={instrument} onValueChange={setInstrument}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="forward">Forward Contract</SelectItem>
                        <SelectItem value="option">Currency Option</SelectItem>
                        <SelectItem value="swap">Currency Swap</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Maturity</Label>
                    <Select value={maturity} onValueChange={setMaturity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3m">3 Months</SelectItem>
                        <SelectItem value="6m">6 Months</SelectItem>
                        <SelectItem value="12m">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hedge Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Hedge Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium">Hedge Amount</span>
                    <span className="font-bold">${hedgeAmount.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium">Hedge Rate</span>
                    <span className="font-bold">{forwardRate} EUR/USD</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium">Cost (bps)</span>
                    <Badge variant={costBasisPoints === 0 ? "outline" : "secondary"}>{costBasisPoints} bps</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Remaining Exposure</span>
                    <span className="font-bold text-blue-900">
                      ${((Number.parseFloat(exposure) * (100 - Number.parseFloat(hedgeRatio))) / 100).toLocaleString()}{" "}
                      USD
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={executeHedge}
                disabled={isExecuting || !exposure || !hedgeRatio}
                className="bg-gradient-to-r from-green-600 to-green-700"
              >
                {isExecuting ? "Executing..." : "Execute Hedge"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
