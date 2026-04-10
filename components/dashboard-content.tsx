"use client"

import { HomeDashboard } from "@/components/modules/home-dashboard"
import { RegionalPerformance } from "@/components/modules/regional-performance"
import { FinancialForecasting } from "@/components/modules/financial-forecasting"
import { SupplyChain } from "@/components/modules/supply-chain"
import { ScenarioSandbox } from "@/components/modules/scenario-sandbox"
import { AlertsActions } from "@/components/modules/alerts-actions"
import { CommodityHedging } from "@/components/modules/commodity-hedging"

interface DashboardContentProps {
  activeModule: string
}

export function DashboardContent({ activeModule }: DashboardContentProps) {
  switch (activeModule) {
    case "home":
      return <HomeDashboard />
    case "regional":
      return <RegionalPerformance />
    case "commodity":
      return <CommodityHedging />
    case "financial":
      return <FinancialForecasting />
    case "supply":
      return <SupplyChain />
    case "sandbox":
      return <ScenarioSandbox />
    case "alerts":
      return <AlertsActions />
    default:
      return <HomeDashboard />
  }
}
