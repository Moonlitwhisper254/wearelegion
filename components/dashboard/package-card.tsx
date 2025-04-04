"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PackageData {
  id: string
  name: string
  description: string
  price: number
  data: string
  validity: string
  popular?: boolean
}

interface PackageCardProps {
  packageData: PackageData
  provider: "safaricom" | "airtel" | "telkom"
  color: "emerald" | "red" | "blue"
}

export function PackageCard({ packageData, provider, color }: PackageCardProps) {
  const router = useRouter()

  const colorMap = {
    emerald: {
      badge: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
      button: "bg-emerald-600 text-white hover:bg-emerald-700",
      highlight: "text-emerald-600",
      border: packageData.popular ? "border-emerald-300" : "",
    },
    red: {
      badge: "bg-red-100 text-red-800 hover:bg-red-200",
      button: "bg-red-600 text-white hover:bg-red-700",
      highlight: "text-red-600",
      border: packageData.popular ? "border-red-300" : "",
    },
    blue: {
      badge: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      button: "bg-blue-600 text-white hover:bg-blue-700",
      highlight: "text-blue-600",
      border: packageData.popular ? "border-blue-300" : "",
    },
  }

  const handleBuyPackage = () => {
    // Build URL params for the payment page
    const params = new URLSearchParams({
      packageId: packageData.id,
      packageName: packageData.name,
      packageData: packageData.data,
      packagePrice: packageData.price.toString(),
      packageValidity: packageData.validity,
      provider,
    })

    router.push(`/dashboard/payment?${params.toString()}`)
  }

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${colorMap[color].border}`}>
      <div className="relative">
        {packageData.popular && (
          <div
            className={`absolute right-0 top-0 z-10 px-3 py-1 text-xs font-medium ${colorMap[color].badge.replace("hover:bg-", "bg-")}`}
          >
            Popular
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle>{packageData.name}</CardTitle>
        <CardDescription>{packageData.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className={`text-lg font-bold ${colorMap[color].highlight}`}>KSh {packageData.price}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Data</span>
            <span className="font-medium">{packageData.data}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Validity</span>
            <span className="font-medium">{packageData.validity}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={handleBuyPackage} className={`w-full ${colorMap[color].button}`}>
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  )
}

