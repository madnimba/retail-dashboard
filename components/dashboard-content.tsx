"use client"

import { HomeDashboard } from "@/components/modules/home-dashboard"
import { ConsumerAnalytics } from "@/components/modules/consumer-analytics"
import { FinancialForecasting } from "@/components/modules/financial-forecasting"
import { SupplyChain } from "@/components/modules/supply-chain"
import { ECommerce } from "@/components/modules/ecommerce"
import { ScenarioSandbox } from "@/components/modules/scenario-sandbox"

interface DashboardContentProps {
  activeModule: string
}

export function DashboardContent({ activeModule }: DashboardContentProps) {
  switch (activeModule) {
    case "home":
      return <HomeDashboard />
    case "consumer":
      return <ConsumerAnalytics />
    case "financial":
      return <FinancialForecasting />
    case "supply":
      return <SupplyChain />
    case "ecommerce":
      return <ECommerce />
    case "sandbox":
      return <ScenarioSandbox />
    default:
      return <HomeDashboard />
  }
}
