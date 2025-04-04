import { notFound } from "next/navigation"
import { PackageCard } from "@/components/dashboard/package-card"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import { Clock, Flame, Calendar, Youtube, Music2, Film } from "lucide-react"
import { cn } from "@/lib/utils"

// Type definitions
interface Package {
  id: string
  name: string
  description: string
  price: number
  data: string
  validity: string
  popular: boolean
  bestValue?: boolean
}

interface CategoryData {
  title: string
  description: string
  icon: React.ReactNode
  packages: Package[]
}

// Category configuration
const categoryConfig: Record<string, CategoryData> = {
  daily: {
    title: "Daily Data Plans",
    description: "24-hour data bundles for short-term needs",
    icon: <Clock className="w-5 h-5" />,
    packages: [
      createPackage("daily-1", "500MB Daily", 19, "500MB", "24 hours", true),
      createPackage("daily-2", "1.2GB Daily", 49, "1.2GB", "24 hours"),
      createPackage("daily-3", "2GB Daily", 99, "2GB", "24 hours"),
      createPackage("daily-4", "3.5GB Daily", 149, "3.5GB", "24 hours", false, true),
      createPackage("daily-5", "6GB Daily", 249, "6GB", "24 hours")
    ]
  },
  weekly: {
    title: "Weekly Plans",
    description: "7-day data bundles for moderate usage",
    icon: <Flame className="w-5 h-5" />,
    packages: [
      createPackage("weekly-1", "1.5GB Weekly", 250, "1.5GB", "7 days"),
      createPackage("weekly-2", "4GB Weekly", 450, "4GB", "7 days", true, true),
      createPackage("weekly-3", "6GB Weekly", 700, "6GB", "7 days"),
      createPackage("weekly-4", "12GB Weekly", 990, "12GB", "7 days")
    ]
  },
  monthly: {
    title: "Monthly Packages",
    description: "30-day data plans for heavy users",
    icon: <Calendar className="w-5 h-5" />,
    packages: [
      createPackage("monthly-1", "6GB Monthly", 1000, "6GB", "30 days"),
      createPackage("monthly-2", "12GB Monthly", 1500, "12GB", "30 days", true, true),
      createPackage("monthly-3", "25GB Monthly", 2000, "25GB", "30 days"),
      createPackage("monthly-4", "60GB Monthly", 3200, "60GB", "30 days")
    ]
  },
  youtube: {
    title: "YouTube Streaming",
    description: "Specialized bundles for YouTube enthusiasts",
    icon: <Youtube className="w-5 h-5" />,
    packages: [
      createPackage("youtube-1", "1.2GB YouTube", 50, "1.2GB", "24 hours"),
      createPackage("youtube-2", "3.5GB YouTube", 150, "3.5GB", "7 days", true, true),
      createPackage("youtube-3", "12GB YouTube", 500, "12GB", "30 days")
    ]
  },
  tiktok: {
    title: "TikTok Packages",
    description: "Data plans optimized for TikTok usage",
    icon: <Music2 className="w-5 h-5" />,
    packages: [
      createPackage("tiktok-1", "1.2GB TikTok", 50, "1.2GB", "24 hours"),
      createPackage("tiktok-2", "3.5GB TikTok", 150, "3.5GB", "7 days", true, true),
      createPackage("tiktok-3", "12GB TikTok", 480, "12GB", "30 days")
    ]
  },
  showmax: {
    title: "Showmax Streaming",
    description: "Dedicated data for Showmax content",
    icon: <Film className="w-5 h-5" />,
    packages: [
      createPackage("showmax-1", "2.5GB Showmax", 80, "2.5GB", "24 hours"),
      createPackage("showmax-2", "6GB Showmax", 290, "6GB", "7 days", true, true),
      createPackage("showmax-3", "18GB Showmax", 720, "18GB", "30 days")
    ]
  }
}

// Package factory function
function createPackage(
  id: string,
  name: string,
  price: number,
  data: string,
  validity: string,
  popular: boolean = false,
  bestValue: boolean = false
): Package {
  return {
    id,
    name,
    description: `${data} Airtel data package valid for ${validity}`,
    price,
    data,
    validity,
    popular,
    bestValue
  }
}

export default function AirtelCategoryPage({
  params
}: {
  params: { category: string }
}) {
  const category = params.category
  const currentCategory = categoryConfig[category]

  if (!currentCategory) notFound()

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-100 text-red-600">
            {currentCategory.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-red-700">
              {currentCategory.title}
            </h1>
            <p className="text-lg text-red-600/90 mt-2">
              {currentCategory.description}
            </p>
          </div>
        </div>
      </header>

      <section 
        className="relative bg-gradient-to-br from-red-50 to-red-100/30 rounded-2xl p-8 
                   border border-red-200/50 shadow-sm"
        aria-labelledby="package-category-heading"
      >
        <h2 id="package-category-heading" className="sr-only">
          {currentCategory.title} Packages
        </h2>

        <div className="relative z-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentCategory.packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              packageData={pkg}
              provider="airtel"
              color="red"
              className={cn(
                "hover:shadow-lg transition-all duration-200",
                pkg.bestValue && "ring-2 ring-red-500/20"
              )}
              badge={
                pkg.popular && (
                  <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-700">
                    Popular
                  </Badge>
                )
              }
              ribbon={
                pkg.bestValue && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white px-4 py-1 text-sm 
                                rounded-tr-lg rounded-bl-lg">
                    Best Value
                  </div>
                )
              }
            />
          ))}
        </div>

        <div 
          className="absolute inset-0 bg-gradient-to-r from-red-50/20 to-red-100/10 
                    pointer-events-none"
          aria-hidden="true"
        />
      </section>
    </div>
  )
}
