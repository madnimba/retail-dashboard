"use client"

import { Building2, Calculator, Home, ShoppingCart, TrendingUp, Users, Zap, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const modules = [
  {
    id: "home",
    title: "Executive Dashboard",
    icon: Home,
    description: "KPIs & Real-time Alerts",
    badge: "Live",
  },
  {
    id: "consumer",
    title: "Consumer Intelligence",
    icon: Users,
    description: "CDMS Analytics & Insights",
    badge: null,
  },
  {
    id: "financial",
    title: "Financial Planning",
    icon: Calculator,
    description: "Forecasting & Scenarios",
    badge: null,
  },
  {
    id: "supply",
    title: "Supply Chain Hub",
    icon: Building2,
    description: "Operations & Logistics",
    badge: "3",
  },
  {
    id: "ecommerce",
    title: "Digital Commerce",
    icon: ShoppingCart,
    description: "Omnichannel Performance",
    badge: null,
  },
  {
    id: "sandbox",
    title: "Strategy Sandbox",
    icon: Zap,
    description: "Scenario Testing",
    badge: null,
  },
]

interface AppSidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
}

export function AppSidebar({ activeModule, setActiveModule }: AppSidebarProps) {
  return (
    <Sidebar className="border-r-0 shadow-xl bg-white/95 backdrop-blur-sm">
      <SidebarHeader className="border-b bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="flex items-center gap-3 px-4 py-6">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">RetailBI Pro</h2>
            <p className="text-xs text-slate-300">Business Intelligence Suite</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Analytics Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {modules.map((module) => (
                <SidebarMenuItem key={module.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveModule(module.id)}
                    isActive={activeModule === module.id}
                    className="h-auto p-3 rounded-xl hover:bg-slate-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-50 data-[active=true]:to-indigo-50 data-[active=true]:border data-[active=true]:border-blue-200 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          activeModule === module.id
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <module.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-900">{module.title}</span>
                          {module.badge && (
                            <Badge variant={module.badge === "Live" ? "default" : "secondary"} className="text-xs h-5">
                              {module.badge}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 block">{module.description}</span>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t bg-slate-50/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border">
              <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <span className="text-sm font-semibold text-slate-900">John Doe</span>
                <p className="text-xs text-slate-500">Chief Financial Officer</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
