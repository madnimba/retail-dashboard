"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { NotificationProvider } from "@/components/notification-provider"

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState("home")

  return (
    <NotificationProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-slate-50/50">
          <AppSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
          <main className="flex-1 overflow-auto">
            <DashboardContent activeModule={activeModule} />
          </main>
        </div>
      </SidebarProvider>
    </NotificationProvider>
  )
}
