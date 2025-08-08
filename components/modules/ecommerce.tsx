"use client"

import { ShoppingCart, MousePointer, TrendingUp, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ECommerce() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">E-Commerce & Omnichannel</h1>
          <p className="text-muted-foreground">Digital performance hub</p>
        </div>
        <Button className="w-full sm:w-auto">
          <TrendingUp className="h-4 w-4 mr-2" />
          Dynamic Pricing Override
        </Button>
      </div>

      {/* Channel Attribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Channel Attribution
          </CardTitle>
          <CardDescription>Revenue split across channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-orange-500">Amazon</Badge>
              </div>
              <p className="text-2xl font-bold">€2.1M</p>
              <p className="text-sm text-muted-foreground">Monthly revenue</p>
              <p className="text-xs text-red-600 mt-1">10% platform fee</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-500">Proprietary</Badge>
              </div>
              <p className="text-2xl font-bold">€3.8M</p>
              <p className="text-sm text-muted-foreground">Monthly revenue</p>
              <p className="text-xs text-green-600 mt-1">20% margin</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-purple-500">Marketplaces</Badge>
              </div>
              <p className="text-2xl font-bold">€1.4M</p>
              <p className="text-sm text-muted-foreground">Monthly revenue</p>
              <p className="text-xs text-muted-foreground mt-1">Various fees</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Click and Collect */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="h-5 w-5" />
            Click & Collect Performance
          </CardTitle>
          <CardDescription>Adoption rates by store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                  <span className="font-medium">Store #12 (Noria)</span>
                  <Badge variant="outline">High Traffic</Badge>
                </div>
                <p className="text-2xl font-bold text-green-600">68%</p>
                <p className="text-sm text-muted-foreground">Adoption rate</p>
                <p className="text-xs text-muted-foreground mt-1">142 orders this week</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                  <span className="font-medium">Store #08 (Southland)</span>
                  <Badge variant="secondary">Medium Traffic</Badge>
                </div>
                <p className="text-2xl font-bold text-blue-600">45%</p>
                <p className="text-sm text-muted-foreground">Adoption rate</p>
                <p className="text-xs text-muted-foreground mt-1">89 orders this week</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Pricing Engine */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Dynamic Pricing Engine
          </CardTitle>
          <CardDescription>Competitor price scraping + auto-adjustments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4">
              <div>
                <h4 className="font-medium">Premium Jeans - Model A</h4>
                <p className="text-sm text-muted-foreground">Current: €89.99 → Suggested: €84.99</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-adjust-1" />
                  <Label htmlFor="auto-adjust-1" className="text-sm">
                    Auto-adjust
                  </Label>
                </div>
                <Button size="sm" variant="outline">
                  Override
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4">
              <div>
                <h4 className="font-medium">Casual Hoodie - Model B</h4>
                <p className="text-sm text-muted-foreground">Current: €45.99 → Suggested: €47.99</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-adjust-2" defaultChecked />
                  <Label htmlFor="auto-adjust-2" className="text-sm">
                    Auto-adjust
                  </Label>
                </div>
                <Button size="sm" variant="outline">
                  Override
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile Performance
          </CardTitle>
          <CardDescription>Mobile commerce metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">67%</p>
              <p className="text-sm text-muted-foreground">Mobile Traffic</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">3.2%</p>
              <p className="text-sm text-muted-foreground">Mobile Conversion</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">€78</p>
              <p className="text-sm text-muted-foreground">Avg Mobile Order</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
