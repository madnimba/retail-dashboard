"use client"

import { ShoppingCart, MousePointer, TrendingUp, Smartphone, DollarSign, Target, AlertTriangle, CheckCircle, BarChart3, Zap, Globe, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState, useMemo } from "react"

export function ECommerce() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [overridePrice, setOverridePrice] = useState("")
  const [overrideReason, setOverrideReason] = useState("")

  // Generate dynamic pricing data based on filters
  const pricingData = useMemo(() => {
    const baseData = {
      category: {
        all: [
          { name: "Premium Jeans - Model A", currentPrice: 89.99, suggestedPrice: 84.99, competitorPrice: 87.50, margin: 35, demand: "high", category: "jeans" },
          { name: "Casual Hoodie - Model B", currentPrice: 45.99, suggestedPrice: 47.99, competitorPrice: 49.99, margin: 28, demand: "medium", category: "hoodies" },
          { name: "Basic T-Shirt - Model C", currentPrice: 24.99, suggestedPrice: 22.99, competitorPrice: 25.50, margin: 42, demand: "low", category: "tshirts" },
          { name: "Denim Jacket - Model D", currentPrice: 129.99, suggestedPrice: 134.99, competitorPrice: 139.99, margin: 25, demand: "high", category: "jackets" },
          { name: "Sneakers - Model E", currentPrice: 79.99, suggestedPrice: 74.99, competitorPrice: 82.00, margin: 30, demand: "medium", category: "footwear" }
        ],
        jeans: [
          { name: "Premium Jeans - Model A", currentPrice: 89.99, suggestedPrice: 84.99, competitorPrice: 87.50, margin: 35, demand: "high", category: "jeans" }
        ],
        hoodies: [
          { name: "Casual Hoodie - Model B", currentPrice: 45.99, suggestedPrice: 47.99, competitorPrice: 49.99, margin: 28, demand: "medium", category: "hoodies" }
        ],
        tshirts: [
          { name: "Basic T-Shirt - Model C", currentPrice: 24.99, suggestedPrice: 22.99, competitorPrice: 25.50, margin: 42, demand: "low", category: "tshirts" }
        ]
      },
      region: {
        all: [
          { name: "Premium Jeans - Model A", currentPrice: 89.99, suggestedPrice: 84.99, competitorPrice: 87.50, margin: 35, demand: "high", category: "jeans" },
          { name: "Casual Hoodie - Model B", currentPrice: 45.99, suggestedPrice: 47.99, competitorPrice: 49.99, margin: 28, demand: "medium", category: "hoodies" },
          { name: "Basic T-Shirt - Model C", currentPrice: 24.99, suggestedPrice: 22.99, competitorPrice: 25.50, margin: 42, demand: "low", category: "tshirts" },
          { name: "Denim Jacket - Model D", currentPrice: 129.99, suggestedPrice: 134.99, competitorPrice: 139.99, margin: 25, demand: "high", category: "jackets" },
          { name: "Sneakers - Model E", currentPrice: 79.99, suggestedPrice: 74.99, competitorPrice: 82.00, margin: 30, demand: "medium", category: "footwear" }
        ],
        noria: [
          { name: "Premium Jeans - Model A", currentPrice: 89.99, suggestedPrice: 82.99, competitorPrice: 85.50, margin: 38, demand: "high", category: "jeans" },
          { name: "Casual Hoodie - Model B", currentPrice: 45.99, suggestedPrice: 49.99, competitorPrice: 52.99, margin: 25, demand: "medium", category: "hoodies" }
        ],
        southland: [
          { name: "Basic T-Shirt - Model C", currentPrice: 24.99, suggestedPrice: 21.99, competitorPrice: 23.50, margin: 45, demand: "low", category: "tshirts" },
          { name: "Denim Jacket - Model D", currentPrice: 129.99, suggestedPrice: 139.99, competitorPrice: 144.99, margin: 22, demand: "high", category: "jackets" }
        ]
      }
    }

    // Filter data based on selections
    let filteredData = baseData.category.all

    if (selectedCategory !== "all") {
      filteredData = baseData.category[selectedCategory as keyof typeof baseData.category] || []
    }

    if (selectedRegion !== "all") {
      filteredData = filteredData.filter(item => 
        baseData.region[selectedRegion as keyof typeof baseData.region]?.some(regionItem => 
          regionItem.name === item.name
        )
      )
    }

    return filteredData
  }, [selectedCategory, selectedRegion])

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">E-Commerce & Omnichannel</h1>
          <p className="text-muted-foreground">Digital performance hub</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <TrendingUp className="h-4 w-4 mr-2" />
              Dynamic Pricing Override
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[80vw] max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Dynamic Pricing Override Center
              </DialogTitle>
              <DialogDescription>
                AI-powered price optimization with manual override capabilities
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Product Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="jeans">Jeans</SelectItem>
                      <SelectItem value="hoodies">Hoodies</SelectItem>
                      <SelectItem value="tshirts">T-Shirts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="noria">Noria</SelectItem>
                      <SelectItem value="southland">Southland</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Pricing Analysis */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Pricing Analysis ({pricingData.length} products)</h3>
                  <Badge variant="outline">{selectedCategory !== "all" ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : "All Categories"} - {selectedRegion !== "all" ? selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1) : "All Regions"}</Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {pricingData.map((product, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{product.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{product.category}</Badge>
                            <Badge 
                              variant={product.demand === "high" ? "default" : 
                                      product.demand === "medium" ? "secondary" : "outline"}
                              className={product.demand === "high" ? "bg-green-500" : 
                                       product.demand === "medium" ? "bg-yellow-500" : "bg-gray-500"}
                            >
                              {product.demand} demand
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Margin</p>
                          <p className="text-lg font-bold text-green-600">{product.margin}%</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <p className="text-xs text-muted-foreground">Current</p>
                          <p className="text-sm font-medium">€{product.currentPrice}</p>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <p className="text-xs text-muted-foreground">Suggested</p>
                          <p className="text-sm font-medium">€{product.suggestedPrice}</p>
                        </div>
                        <div className="text-center p-2 bg-orange-50 rounded">
                          <p className="text-xs text-muted-foreground">Competitor</p>
                          <p className="text-sm font-medium">€{product.competitorPrice}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {product.suggestedPrice < product.currentPrice ? (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          )}
                          <span className="text-sm font-medium">
                            {product.suggestedPrice < product.currentPrice ? "Price Drop" : "Price Increase"}
                          </span>
                        </div>
                        <Button size="sm" variant="outline">
                          Override
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Override Form */}
              <div className="p-4 bg-slate-50 rounded-lg border">
                <h4 className="font-medium mb-4">Manual Price Override</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">New Price (€)</label>
                    <Input 
                      type="number" 
                      placeholder="Enter new price"
                      value={overridePrice}
                      onChange={(e) => setOverridePrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Override Reason</label>
                    <Select value={overrideReason} onValueChange={setOverrideReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="competitor">Competitor Price Change</SelectItem>
                        <SelectItem value="demand">Demand Fluctuation</SelectItem>
                        <SelectItem value="inventory">Inventory Management</SelectItem>
                        <SelectItem value="promotion">Promotional Campaign</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Apply Override
                  </Button>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>

              {/* Market Insights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Market Position</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">Competitive</p>
                  <p className="text-sm text-blue-600">vs. 3 major competitors</p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Revenue Impact</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">+€45K</p>
                  <p className="text-sm text-green-600">Monthly potential</p>
                </div>
                
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-orange-800">Risk Level</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">Low</p>
                  <p className="text-sm text-orange-600">Based on elasticity</p>
                </div>
              </div>

              {/* Filter Context */}
              <div className="p-3 bg-slate-50 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  Analysis based on: 
                  <span className="font-medium ml-1">
                    {selectedCategory !== "all" ? selectedCategory : "All Categories"}
                    {selectedRegion !== "all" && `, ${selectedRegion}`}
                  </span>
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
