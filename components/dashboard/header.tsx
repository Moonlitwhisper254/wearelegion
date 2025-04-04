"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Menu, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardSidebar } from "./sidebar"
import RealtimeClock from "@/components/realtime-clock"

export function DashboardHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">DataZetu</span>
        </Link>
      </div>

      <div className="flex-1">
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-4 text-sm font-medium">
            <li>
              <Link
                href="/dashboard"
                className={`${pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"} transition-colors hover:text-primary`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/safaricom"
                className={`${pathname.includes("/dashboard/safaricom") ? "text-primary" : "text-muted-foreground"} transition-colors hover:text-primary`}
              >
                Safaricom
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/airtel"
                className={`${pathname.includes("/dashboard/airtel") ? "text-primary" : "text-muted-foreground"} transition-colors hover:text-primary`}
              >
                Airtel
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/telkom"
                className={`${pathname.includes("/dashboard/telkom") ? "text-primary" : "text-muted-foreground"} transition-colors hover:text-primary`}
              >
                Telkom
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="hidden md:block">
        <RealtimeClock />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

