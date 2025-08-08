"use client"

import { MapPin, Star, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"

export function ConsumerAnalytics() {
  const [selectedRegion, setSelectedRegion] = useState("region")
  const [selectedAge, setSelectedAge] = useState("age")

  // Generate dynamic data based on filters
  const analyticsData = useMemo(() => {
    const baseData = {
      region: {
        all: {
          hoodies: { growth: 15, trend: "positive" },
          jeans: { growth: -8, trend: "negative" },
          tshirts: { growth: 22, trend: "positive" },
          accessories: { growth: 5, trend: "positive" }
        },
        noria: {
          hoodies: { growth: 8, trend: "positive" },
          jeans: { growth: -12, trend: "negative" },
          tshirts: { growth: 18, trend: "positive" },
          accessories: { growth: 3, trend: "positive" }
        },
        southland: {
          hoodies: { growth: 25, trend: "positive" },
          jeans: { growth: -3, trend: "negative" },
          tshirts: { growth: 28, trend: "positive" },
          accessories: { growth: 8, trend: "positive" }
        }
      },
      age: {
        all: {
          hoodies: { growth: 15, trend: "positive" },
          jeans: { growth: -8, trend: "negative" },
          tshirts: { growth: 22, trend: "positive" },
          accessories: { growth: 5, trend: "positive" }
        },
        "18-25": {
          hoodies: { growth: 28, trend: "positive" },
          jeans: { growth: -5, trend: "negative" },
          tshirts: { growth: 35, trend: "positive" },
          accessories: { growth: 12, trend: "positive" }
        },
        "26-35": {
          hoodies: { growth: 18, trend: "positive" },
          jeans: { growth: -10, trend: "negative" },
          tshirts: { growth: 25, trend: "positive" },
          accessories: { growth: 7, trend: "positive" }
        },
        "36-50": {
          hoodies: { growth: 8, trend: "positive" },
          jeans: { growth: -12, trend: "negative" },
          tshirts: { growth: 15, trend: "positive" },
          accessories: { growth: 2, trend: "positive" }
        }
      }
    }

    // Determine which data to use based on filters
    const regionData = selectedRegion === "region" ? baseData.region.all : baseData.region[selectedRegion as keyof typeof baseData.region]
    const ageData = selectedAge === "age" ? baseData.age.all : baseData.age[selectedAge as keyof typeof baseData.age]

    // Combine region and age data with weighted averages
    const combinedData = {
      hoodies: {
        growth: Math.round((regionData.hoodies.growth + ageData.hoodies.growth) / 2),
        trend: regionData.hoodies.growth > 0 && ageData.hoodies.growth > 0 ? "positive" : "negative"
      },
      jeans: {
        growth: Math.round((regionData.jeans.growth + ageData.jeans.growth) / 2),
        trend: regionData.jeans.growth > 0 && ageData.jeans.growth > 0 ? "positive" : "negative"
      },
      tshirts: {
        growth: Math.round((regionData.tshirts.growth + ageData.tshirts.growth) / 2),
        trend: regionData.tshirts.growth > 0 && ageData.tshirts.growth > 0 ? "positive" : "negative"
      },
      accessories: {
        growth: Math.round((regionData.accessories.growth + ageData.accessories.growth) / 2),
        trend: regionData.accessories.growth > 0 && ageData.accessories.growth > 0 ? "positive" : "negative"
      }
    }

    return combinedData
  }, [selectedRegion, selectedAge])

  // Generate loyalty program data based on filters
  const loyaltyData = useMemo(() => {
    const baseLTV = {
      region: {
        all: { gold: 2450, silver: 1280, influencer: 6.50 },
        noria: { gold: 2200, silver: 1150, influencer: 5.80 },
        southland: { gold: 2800, silver: 1450, influencer: 7.20 }
      },
      age: {
        all: { gold: 2450, silver: 1280, influencer: 6.50 },
        "18-25": { gold: 1800, silver: 950, influencer: 8.20 },
        "26-35": { gold: 2800, silver: 1500, influencer: 6.80 },
        "36-50": { gold: 3200, silver: 1800, influencer: 4.90 }
      }
    }

    const regionLTV = selectedRegion === "region" ? baseLTV.region.all : baseLTV.region[selectedRegion as keyof typeof baseLTV.region]
    const ageLTV = selectedAge === "age" ? baseLTV.age.all : baseLTV.age[selectedAge as keyof typeof baseLTV.age]

    return {
      gold: Math.round((regionLTV.gold + ageLTV.gold) / 2),
      silver: Math.round((regionLTV.silver + ageLTV.silver) / 2),
      influencer: Number(((regionLTV.influencer + ageLTV.influencer) / 2).toFixed(2))
    }
  }, [selectedRegion, selectedAge])

  // Generate competitor benchmarking data
  const competitorData = useMemo(() => {
    const baseData = {
      region: {
        all: { premiumJeans: -5, casualHoodies: 12 },
        noria: { premiumJeans: -8, casualHoodies: 8 },
        southland: { premiumJeans: -2, casualHoodies: 18 }
      },
      age: {
        all: { premiumJeans: -5, casualHoodies: 12 },
        "18-25": { premiumJeans: -3, casualHoodies: 15 },
        "26-35": { premiumJeans: -6, casualHoodies: 10 },
        "36-50": { premiumJeans: -8, casualHoodies: 8 }
      }
    }

    const regionComp = selectedRegion === "region" ? baseData.region.all : baseData.region[selectedRegion as keyof typeof baseData.region]
    const ageComp = selectedAge === "age" ? baseData.age.all : baseData.age[selectedAge as keyof typeof baseData.age]

    return {
      premiumJeans: Math.round((regionComp.premiumJeans + ageComp.premiumJeans) / 2),
      casualHoodies: Math.round((regionComp.casualHoodies + ageComp.casualHoodies) / 2)
    }
  }, [selectedRegion, selectedAge])

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Consumer Analytics</h1>
          <p className="text-muted-foreground">CDMS-driven customer insights</p>
        </div>
        <Button className="w-full sm:w-auto">
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
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="region">All Regions</SelectItem>
                  <SelectItem value="noria">Noria</SelectItem>
                  <SelectItem value="southland">Southland</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select Age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="age">All Ages</SelectItem>
                  <SelectItem value="18-25">18-25</SelectItem>
                  <SelectItem value="26-35">26-35</SelectItem>
                  <SelectItem value="36-50">36-50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border">
                <h4 className="font-medium">Hoodies</h4>
                <p className={`text-2xl font-bold ${analyticsData.hoodies.trend === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {analyticsData.hoodies.growth > 0 ? "+" : ""}{analyticsData.hoodies.growth}%
                </p>
                <p className="text-sm text-muted-foreground">vs last quarter</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  {selectedRegion !== "region" && `Region: ${selectedRegion}`}
                  {selectedAge !== "age" && ` | Age: ${selectedAge}`}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border">
                <h4 className="font-medium">Jeans</h4>
                <p className={`text-2xl font-bold ${analyticsData.jeans.trend === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {analyticsData.jeans.growth > 0 ? "+" : ""}{analyticsData.jeans.growth}%
                </p>
                <p className="text-sm text-muted-foreground">vs last quarter</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  {selectedRegion !== "region" && `Region: ${selectedRegion}`}
                  {selectedAge !== "age" && ` | Age: ${selectedAge}`}
                </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-yellow-500">Gold</Badge>
              </div>
              <p className="text-2xl font-bold">€{loyaltyData.gold.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Avg LTV</p>
              <p className="text-xs text-muted-foreground mt-1">1,247 customers</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Silver</Badge>
              </div>
              <p className="text-2xl font-bold">€{loyaltyData.silver.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Avg LTV</p>
              <p className="text-xs text-muted-foreground mt-1">3,891 customers</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Influencer ROI</Badge>
              </div>
              <p className="text-2xl font-bold">€{loyaltyData.influencer}</p>
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border rounded-lg gap-2">
              <div>
                <span className="font-medium">Premium Jeans</span>
                <p className="text-sm text-muted-foreground">vs Competitor A</p>
              </div>
              <div className="text-right">
                <span className={`text-lg font-bold ${competitorData.premiumJeans > 0 ? "text-red-600" : "text-green-600"}`}>
                  {competitorData.premiumJeans > 0 ? "+" : ""}{competitorData.premiumJeans}%
                </span>
                <p className="text-sm text-muted-foreground">Price advantage</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border rounded-lg gap-2">
              <div>
                <span className="font-medium">Casual Hoodies</span>
                <p className="text-sm text-muted-foreground">vs Competitor B</p>
              </div>
              <div className="text-right">
                <span className={`text-lg font-bold ${competitorData.casualHoodies > 0 ? "text-red-600" : "text-green-600"}`}>
                  {competitorData.casualHoodies > 0 ? "+" : ""}{competitorData.casualHoodies}%
                </span>
                <p className="text-sm text-muted-foreground">Price premium</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
