import { notFound } from "next/navigation"
import { PackageCard } from "@/components/dashboard/package-card"

// Define category data
const categoryData = {
  daily: {
    title: "DAILY DATA (24 HOURS)",
    description: "Short-term data bundles valid for 24 hours",
    packages: [
      {
        id: "daily-1",
        name: "400MB Daily",
        description: "400MB data valid for 24 hours",
        price: 15,
        data: "400MB",
        validity: "24 hours",
        popular: true,
      },
      {
        id: "daily-2",
        name: "1GB Daily",
        description: "1GB data valid for 24 hours",
        price: 50,
        data: "1GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "daily-3",
        name: "1.5GB Daily",
        description: "1.5GB data valid for 24 hours",
        price: 99,
        data: "1.5GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "daily-4",
        name: "3GB Daily",
        description: "3GB data valid for 24 hours",
        price: 150,
        data: "3GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "daily-5",
        name: "5GB Daily",
        description: "5GB data valid for 24 hours",
        price: 250,
        data: "5GB",
        validity: "24 hours",
        popular: false,
      },
    ],
  },
  weekly: {
    title: "7 DAYS",
    description: "Weekly data bundles valid for 7 days",
    packages: [
      {
        id: "weekly-1",
        name: "1GB Weekly",
        description: "1GB data valid for 7 days",
        price: 250,
        data: "1GB",
        validity: "7 days",
        popular: false,
      },
      {
        id: "weekly-2",
        name: "3GB Weekly",
        description: "3GB data valid for 7 days",
        price: 500,
        data: "3GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "weekly-3",
        name: "5GB Weekly",
        description: "5GB data valid for 7 days",
        price: 750,
        data: "5GB",
        validity: "7 days",
        popular: false,
      },
      {
        id: "weekly-4",
        name: "10GB Weekly",
        description: "10GB data valid for 7 days",
        price: 1000,
        data: "10GB",
        validity: "7 days",
        popular: false,
      },
    ],
  },
  monthly: {
    title: "30 DAYS",
    description: "Monthly data bundles valid for 30 days",
    packages: [
      {
        id: "monthly-1",
        name: "5GB Monthly",
        description: "5GB data valid for 30 days",
        price: 1000,
        data: "5GB",
        validity: "30 days",
        popular: false,
      },
      {
        id: "monthly-2",
        name: "10GB Monthly",
        description: "10GB data valid for 30 days",
        price: 1500,
        data: "10GB",
        validity: "30 days",
        popular: true,
      },
      {
        id: "monthly-3",
        name: "20GB Monthly",
        description: "20GB data valid for 30 days",
        price: 2000,
        data: "20GB",
        validity: "30 days",
        popular: false,
      },
      {
        id: "monthly-4",
        name: "50GB Monthly",
        description: "50GB data valid for 30 days",
        price: 3500,
        data: "50GB",
        validity: "30 days",
        popular: false,
      },
    ],
  },
  youtube: {
    title: "YOUTUBE DATA",
    description: "Specialized bundles for YouTube streaming",
    packages: [
      {
        id: "youtube-1",
        name: "1GB YouTube",
        description: "1GB data for YouTube only, valid for 24 hours",
        price: 50,
        data: "1GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "youtube-2",
        name: "3GB YouTube",
        description: "3GB data for YouTube only, valid for 7 days",
        price: 150,
        data: "3GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "youtube-3",
        name: "10GB YouTube",
        description: "10GB data for YouTube only, valid for 30 days",
        price: 500,
        data: "10GB",
        validity: "30 days",
        popular: false,
      },
    ],
  },
  tiktok: {
    title: "TIKTOK DATA",
    description: "Specialized bundles for TikTok",
    packages: [
      {
        id: "tiktok-1",
        name: "1GB TikTok",
        description: "1GB data for TikTok only, valid for 24 hours",
        price: 50,
        data: "1GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "tiktok-2",
        name: "3GB TikTok",
        description: "3GB data for TikTok only, valid for 7 days",
        price: 150,
        data: "3GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "tiktok-3",
        name: "10GB TikTok",
        description: "10GB data for TikTok only, valid for 30 days",
        price: 500,
        data: "10GB",
        validity: "30 days",
        popular: false,
      },
    ],
  },
  showmax: {
    title: "SHOWMAX DATA",
    description: "Specialized bundles for Showmax",
    packages: [
      {
        id: "showmax-1",
        name: "2GB Showmax",
        description: "2GB data for Showmax only, valid for 24 hours",
        price: 80,
        data: "2GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "showmax-2",
        name: "5GB Showmax",
        description: "5GB data for Showmax only, valid for 7 days",
        price: 300,
        data: "5GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "showmax-3",
        name: "15GB Showmax",
        description: "15GB data for Showmax only, valid for 30 days",
        price: 750,
        data: "15GB",
        validity: "30 days",
        popular: false,
      },
    ],
  },
}

export default function SafaricomCategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category } = params

  // Check if the category exists
  if (!categoryData[category as keyof typeof categoryData]) {
    notFound()
  }

  const categoryInfo = categoryData[category as keyof typeof categoryData]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-emerald-700">{categoryInfo.title}</h1>
        <p className="text-muted-foreground">{categoryInfo.description}</p>
      </div>

      <div className="relative p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 overflow-hidden border border-emerald-200">
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg
            width="320"
            height="320"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-emerald-800"
          >
            <path
              d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative z-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categoryInfo.packages.map((pkg) => (
            <PackageCard key={pkg.id} packageData={pkg} provider="safaricom" color="emerald" />
          ))}
        </div>
      </div>
    </div>
  )
}

