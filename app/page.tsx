"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { NotificationProvider } from "@/components/notification-provider"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mobile Navigation Component
function MobileNavigation({ activeModule, setActiveModule }: { activeModule: string; setActiveModule: (module: string) => void }) {
  const { isMobile } = useSidebar()
  const [isOpen, setIsOpen] = useState(false)

  const modules = [
    { id: "home", title: "Dashboard", icon: "🏠" },
    { id: "consumer", title: "Consumer", icon: "👥" },
    { id: "financial", title: "Financial", icon: "💰" },
    { id: "supply", title: "Supply Chain", icon: "🏭" },
    { id: "ecommerce", title: "E-commerce", icon: "🛒" },
    { id: "sandbox", title: "Sandbox", icon: "🧪" },
  ]

  if (!isMobile) return null

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="px-4 py-6 border-b bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">📈</span>
                  </div>
                  <div>
                    <SheetTitle className="text-xl font-bold text-white">SmartWear</SheetTitle>
                    <p className="text-xs text-slate-300">by Team Arctic Wolves</p>
                  </div>
                </div>
              </SheetHeader>
              <div className="p-4">
                <div className="space-y-2">
                  {modules.map((module) => (
                    <Button
                      key={module.id}
                      variant={activeModule === module.id ? "default" : "ghost"}
                      className="w-full justify-start gap-3 h-12"
                      onClick={() => {
                        setActiveModule(module.id)
                        setIsOpen(false)
                      }}
                    >
                      <span className="text-lg">{module.icon}</span>
                      <span className="font-medium">{module.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              {modules.find(m => m.id === activeModule)?.title || "Dashboard"}
            </h1>
          </div>
        </div>
        <SidebarTrigger className="md:hidden" />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState("home")

  return (
    <NotificationProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-slate-50/50">
          <AppSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
          <main className="flex-1 overflow-auto">
            <MobileNavigation activeModule={activeModule} setActiveModule={setActiveModule} />
            <div className="md:pt-0 pt-16">
              <DashboardContent activeModule={activeModule} />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </NotificationProvider>
  )
}
