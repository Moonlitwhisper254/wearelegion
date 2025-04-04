"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Settings, Smartphone, User, CircuitBoard } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Safaricom",
      icon: CircuitBoard,
      href: "/dashboard/safaricom",
      active: pathname.includes("/dashboard/safaricom"),
      color: "text-emerald-600",
    },
    {
      label: "Airtel",
      icon: CircuitBoard,
      href: "/dashboard/airtel",
      active: pathname.includes("/dashboard/airtel"),
      color: "text-red-600",
    },
    {
      label: "Telkom",
      icon: CircuitBoard,
      href: "/dashboard/telkom",
      active: pathname.includes("/dashboard/telkom"),
      color: "text-blue-600",
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard/profile",
      active: pathname === "/dashboard/profile",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className="flex h-full w-full flex-col border-r bg-slate-50">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Smartphone className="h-6 w-6" />
          <span className="font-bold">DataZetu</span>
        </Link>
      </div>

      <div className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              size="sm"
              asChild
              className={cn("w-full justify-start", route.color)}
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-md bg-slate-100 px-3 py-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Referrals:</span>
            <span className="font-medium">KSh 480</span>
          </div>
          <div className="mt-2">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-6/12 rounded-full bg-blue-500" />
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              <span className="font-medium">KSh 520</span> more to withdrawal
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

