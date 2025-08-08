"use client"

import { Package, Truck, AlertTriangle, CheckCircle, MapPin, Star, Clock, DollarSign, Shield, Users, Globe, Factory } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"

export function SupplyChain() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Generate supplier data based on filters
  const supplierData = useMemo(() => {
    const baseSuppliers = {
      region: {
        all: [
          { name: "Turkish Textile Co.", region: "Turkey", category: "Textiles", rating: 4.8, leadTime: 12, cost: 12, ethics: "A+", reliability: 98, capacity: 50000 },
          { name: "Italian Denim Works", region: "Italy", category: "Denim", rating: 4.6, leadTime: 15, cost: 18, ethics: "B+", reliability: 95, capacity: 35000 },
          { name: "German Cotton Mills", region: "Germany", category: "Cotton", rating: 4.9, leadTime: 8, cost: 15, ethics: "A+", reliability: 99, capacity: 40000 },
          { name: "Spanish Wool Co.", region: "Spain", category: "Wool", rating: 4.4, leadTime: 14, cost: 22, ethics: "B+", reliability: 92, capacity: 25000 },
          { name: "Polish Knitwear Ltd", region: "Poland", category: "Knitwear", rating: 4.7, leadTime: 10, cost: 14, ethics: "A", reliability: 96, capacity: 30000 },
          { name: "Romanian Textiles", region: "Romania", category: "Textiles", rating: 4.3, leadTime: 16, cost: 11, ethics: "B", reliability: 89, capacity: 45000 }
        ],
        europe: [
          { name: "German Cotton Mills", region: "Germany", category: "Cotton", rating: 4.9, leadTime: 8, cost: 15, ethics: "A+", reliability: 99, capacity: 40000 },
          { name: "Italian Denim Works", region: "Italy", category: "Denim", rating: 4.6, leadTime: 15, cost: 18, ethics: "B+", reliability: 95, capacity: 35000 },
          { name: "Spanish Wool Co.", region: "Spain", category: "Wool", rating: 4.4, leadTime: 14, cost: 22, ethics: "B+", reliability: 92, capacity: 25000 },
          { name: "Polish Knitwear Ltd", region: "Poland", category: "Knitwear", rating: 4.7, leadTime: 10, cost: 14, ethics: "A", reliability: 96, capacity: 30000 }
        ],
        asia: [
          { name: "Turkish Textile Co.", region: "Turkey", category: "Textiles", rating: 4.8, leadTime: 12, cost: 12, ethics: "A+", reliability: 98, capacity: 50000 },
          { name: "Romanian Textiles", region: "Romania", category: "Textiles", rating: 4.3, leadTime: 16, cost: 11, ethics: "B", reliability: 89, capacity: 45000 }
        ]
      },
      category: {
        all: [
          { name: "Turkish Textile Co.", region: "Turkey", category: "Textiles", rating: 4.8, leadTime: 12, cost: 12, ethics: "A+", reliability: 98, capacity: 50000 },
          { name: "Italian Denim Works", region: "Italy", category: "Denim", rating: 4.6, leadTime: 15, cost: 18, ethics: "B+", reliability: 95, capacity: 35000 },
          { name: "German Cotton Mills", region: "Germany", category: "Cotton", rating: 4.9, leadTime: 8, cost: 15, ethics: "A+", reliability: 99, capacity: 40000 },
          { name: "Spanish Wool Co.", region: "Spain", category: "Wool", rating: 4.4, leadTime: 14, cost: 22, ethics: "B+", reliability: 92, capacity: 25000 },
          { name: "Polish Knitwear Ltd", region: "Poland", category: "Knitwear", rating: 4.7, leadTime: 10, cost: 14, ethics: "A", reliability: 96, capacity: 30000 },
          { name: "Romanian Textiles", region: "Romania", category: "Textiles", rating: 4.3, leadTime: 16, cost: 11, ethics: "B", reliability: 89, capacity: 45000 }
        ],
        textiles: [
          { name: "Turkish Textile Co.", region: "Turkey", category: "Textiles", rating: 4.8, leadTime: 12, cost: 12, ethics: "A+", reliability: 98, capacity: 50000 },
          { name: "Romanian Textiles", region: "Romania", category: "Textiles", rating: 4.3, leadTime: 16, cost: 11, ethics: "B", reliability: 89, capacity: 45000 }
        ],
        denim: [
          { name: "Italian Denim Works", region: "Italy", category: "Denim", rating: 4.6, leadTime: 15, cost: 18, ethics: "B+", reliability: 95, capacity: 35000 }
        ],
        cotton: [
          { name: "German Cotton Mills", region: "Germany", category: "Cotton", rating: 4.9, leadTime: 8, cost: 15, ethics: "A+", reliability: 99, capacity: 40000 }
        ]
      }
    }

    // Filter suppliers based on selections
    let filteredSuppliers = baseSuppliers.region.all

    if (selectedRegion !== "all") {
      filteredSuppliers = baseSuppliers.region[selectedRegion as keyof typeof baseSuppliers.region] || []
    }

    if (selectedCategory !== "all") {
      filteredSuppliers = filteredSuppliers.filter(supplier => 
        supplier.category.toLowerCase() === selectedCategory
      )
    }

    return filteredSuppliers
  }, [selectedRegion, selectedCategory])

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Supply Chain Command Center</h1>
          <p className="text-muted-foreground">Live operations monitoring</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Package className="h-4 w-4 mr-2" />
              Find Regional Suppliers
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Regional Supplier Discovery
              </DialogTitle>
              <DialogDescription>
                Find and evaluate suppliers by region and category with detailed analytics
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="denim">Denim</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Supplier Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Found {supplierData.length} Suppliers</h3>
                  <Badge variant="outline">{selectedRegion !== "all" ? selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1) : "All"} - {selectedCategory !== "all" ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : "All Categories"}</Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {supplierData.map((supplier, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{supplier.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{supplier.region}</span>
                            <Badge variant="outline">{supplier.category}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{supplier.rating}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">{supplier.leadTime} days</p>
                            <p className="text-xs text-muted-foreground">Lead Time</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">€{supplier.cost}/unit</p>
                            <p className="text-xs text-muted-foreground">Cost</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-purple-500" />
                          <div>
                            <p className="text-sm font-medium">{supplier.reliability}%</p>
                            <p className="text-xs text-muted-foreground">Reliability</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Factory className="h-4 w-4 text-orange-500" />
                          <div>
                            <p className="text-sm font-medium">{supplier.capacity.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Capacity</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge 
                          className={supplier.ethics === "A+" ? "bg-green-600 text-white hover:bg-green-700" : 
                                    supplier.ethics === "A" ? "bg-blue-600 text-white hover:bg-blue-700" :
                                    supplier.ethics === "B+" ? "bg-yellow-600 text-black hover:bg-yellow-700" :
                                    "bg-red-600 text-white hover:bg-red-700"}
                        >
                          Ethics: {supplier.ethics}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Contact Supplier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {supplierData.length > 0 ? (supplierData.reduce((sum, s) => sum + s.rating, 0) / supplierData.length).toFixed(1) : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {supplierData.length > 0 ? (supplierData.reduce((sum, s) => sum + s.leadTime, 0) / supplierData.length).toFixed(0) : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Lead Time (days)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {supplierData.length > 0 ? (supplierData.reduce((sum, s) => sum + s.cost, 0) / supplierData.length).toFixed(0) : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Cost (€/unit)</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <h4 className="font-medium">Turkish Textile Co.</h4>
                    <p className="text-sm text-muted-foreground">Cotton & Denim</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-600 text-white hover:bg-green-700">Ethics: A+</Badge>
                    <Badge variant="secondary">Cost: €12/unit</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">98% On-time</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <h4 className="font-medium">Polish Manufacturing</h4>
                    <p className="text-sm text-muted-foreground">Outerwear & Accessories</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-yellow-600 text-black hover:bg-yellow-700">Ethics: B+</Badge>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
