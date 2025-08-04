"use client"

import { Package, Truck, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function SupplyChain() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Supply Chain Command Center</h1>
          <p className="text-muted-foreground">Live operations monitoring</p>
        </div>
        <Button>
          <Package className="h-4 w-4 mr-2" />
          Find Regional Suppliers
        </Button>
      </div>

      {/* RFID Inventory Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            RFID Inventory Tracker
          </CardTitle>
          <CardDescription>Stock levels by store with lead time warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Store #12</span>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Jeans - Premium</p>
                <Progress value={15} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">15 units remaining</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Store #08</span>
                  <Badge variant="secondary">Low</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Hoodies - Casual</p>
                <Progress value={35} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">87 units remaining</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Store #15</span>
                  <Badge variant="outline">Good</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">T-Shirts - Basic</p>
                <Progress value={78} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">234 units remaining</p>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Asian shipment delayed: +5 days</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">Expected delivery: March 15th → March 20th</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Scorecards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Supplier Scorecards
          </CardTitle>
          <CardDescription>Ethics audits + cost/performance rankings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-medium">Turkish Textile Co.</h4>
                    <p className="text-sm text-muted-foreground">Cotton & Denim</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">Ethics: A+</Badge>
                    <Badge variant="secondary">Cost: €12/unit</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">98% On-time</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-medium">Polish Manufacturing</h4>
                    <p className="text-sm text-muted-foreground">Outerwear & Accessories</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">Ethics: B+</Badge>
                    <Badge variant="secondary">Cost: €18/unit</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">94% On-time</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NRV Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>NRV Calculator</CardTitle>
          <CardDescription>Net Realizable Value for write-down scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800">Slow-Moving Inventory</h4>
              <p className="text-2xl font-bold text-red-600">€125K</p>
              <p className="text-sm text-muted-foreground">Potential write-down</p>
              <p className="text-xs text-muted-foreground mt-1">Winter collection - 45% markdown</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800">Fast-Moving Inventory</h4>
              <p className="text-2xl font-bold text-green-600">€890K</p>
              <p className="text-sm text-muted-foreground">Full value realization</p>
              <p className="text-xs text-muted-foreground mt-1">Spring collection - 98% sell-through</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Supplier Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Supplier Analysis</CardTitle>
          <CardDescription>Turkey/Poland freight cost comparisons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Turkey Route</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Freight Cost</span>
                    <span className="text-sm font-medium">€2.50/unit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Lead Time</span>
                    <span className="text-sm font-medium">12 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Capacity</span>
                    <span className="text-sm font-medium">50K units/month</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Poland Route</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Freight Cost</span>
                    <span className="text-sm font-medium">€1.80/unit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Lead Time</span>
                    <span className="text-sm font-medium">8 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Capacity</span>
                    <span className="text-sm font-medium">35K units/month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
