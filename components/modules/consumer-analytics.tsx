"use client"

import { MapPin, Star, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ConsumerAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Consumer Analytics</h1>
          <p className="text-muted-foreground">CDMS-driven customer insights</p>
        </div>
        <Button>
          <TrendingUp className="h-4 w-4 mr-2" />
          Predict Churn Risk
        </Button>
      </div>

      {/* Demand Heatmaps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Demand Heatmaps
          </CardTitle>
          <CardDescription>Geographic demand for product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Select defaultValue="region">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="region">All Regions</SelectItem>
                  <SelectItem value="noria">Noria</SelectItem>
                  <SelectItem value="southland">Southland</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="age">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="age">All Ages</SelectItem>
                  <SelectItem value="18-25">18-25</SelectItem>
                  <SelectItem value="26-35">26-35</SelectItem>
                  <SelectItem value="36-50">36-50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border">
                <h4 className="font-medium">Southland - Hoodies</h4>
                <p className="text-2xl font-bold text-green-600">+15%</p>
                <p className="text-sm text-muted-foreground">vs last quarter</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border">
                <h4 className="font-medium">Noria - Jeans</h4>
                <p className="text-2xl font-bold text-red-600">-8%</p>
                <p className="text-sm text-muted-foreground">vs last quarter</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Program Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Loyalty Program Dashboard
          </CardTitle>
          <CardDescription>Tiered customer LTV with revenue deferral tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-yellow-500">Gold</Badge>
              </div>
              <p className="text-2xl font-bold">€2,450</p>
              <p className="text-sm text-muted-foreground">Avg LTV</p>
              <p className="text-xs text-muted-foreground mt-1">1,247 customers</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Silver</Badge>
              </div>
              <p className="text-2xl font-bold">€1,280</p>
              <p className="text-sm text-muted-foreground">Avg LTV</p>
              <p className="text-xs text-muted-foreground mt-1">3,891 customers</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Influencer ROI</Badge>
              </div>
              <p className="text-2xl font-bold">€6.50</p>
              <p className="text-sm text-muted-foreground">Revenue per €1 spent</p>
              <p className="text-xs text-muted-foreground mt-1">+23% vs target</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Benchmarking */}
      <Card>
        <CardHeader>
          <CardTitle>Competitor Benchmarking</CardTitle>
          <CardDescription>Price elasticity models vs. e-retailers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <span className="font-medium">Premium Jeans</span>
                <p className="text-sm text-muted-foreground">vs Competitor A</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">-5%</span>
                <p className="text-sm text-muted-foreground">Price advantage</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <span className="font-medium">Casual Hoodies</span>
                <p className="text-sm text-muted-foreground">vs Competitor B</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-red-600">+12%</span>
                <p className="text-sm text-muted-foreground">Price premium</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
