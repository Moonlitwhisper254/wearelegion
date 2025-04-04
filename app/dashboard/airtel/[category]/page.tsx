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
        name: "500MB Daily",
        description: "500MB data valid for 24 hours",
        price: 19,
        data: "500MB",
        validity: "24 hours",
        popular: true,
      },
      {
        id: "daily-2",
        name: "1.2GB Daily",
        description: "1.2GB data valid for 24 hours",
        price: 49,
        data: "1.2GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "daily-3",
        name: "2GB Daily",
        description: "2GB data valid for 24 hours",
        price: 99,
        data: "2GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "daily-4",
        name: "3.5GB Daily",
        description: "3.5GB data valid for 24 hours",
        price: 149,
        data: "3.5GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "daily-5",
        name: "6GB Daily",
        description: "6GB data valid for 24 hours",
        price: 249,
        data: "6GB",
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
        name: "1.5GB Weekly",
        description: "1.5GB data valid for 7 days",
        price: 250,
        data: "1.5GB",
        validity: "7 days",
        popular: false,
      },
      {
        id: "weekly-2",
        name: "4GB Weekly",
        description: "4GB data valid for 7 days",
        price: 450,
        data: "4GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "weekly-3",
        name: "6GB Weekly",
        description: "6GB data valid for 7 days",
        price: 700,
        data: "6GB",
        validity: "7 days",
        popular: false,
      },
      {
        id: "weekly-4",
        name: "12GB Weekly",
        description: "12GB data valid for 7 days",
        price: 990,
        data: "12GB",
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
        name: "6GB Monthly",
        description: "6GB data valid for 30 days",
        price: 1000,
        data: "6GB",
        validity: "30 days",
        popular: false,
      },
      {
        id: "monthly-2",
        name: "12GB Monthly",
        description: "12GB data valid for 30 days",
        price: 1500,
        data: "12GB",
        validity: "30 days",
        popular: true,
      },
      {
        id: "monthly-3",
        name: "25GB Monthly",
        description: "25GB data valid for 30 days",
        price: 2000,
        data: "25GB",
        validity: "30 days",
        popular: false,
      },
      {
        id: "monthly-4",
        name: "60GB Monthly",
        description: "60GB data valid for 30 days",
        price: 3200,
        data: "60GB",
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
        name: "1.2GB YouTube",
        description: "1.2GB data for YouTube only, valid for 24 hours",
        price: 50,
        data: "1.2GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "youtube-2",
        name: "3.5GB YouTube",
        description: "3.5GB data for YouTube only, valid for 7 days",
        price: 150,
        data: "3.5GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "youtube-3",
        name: "12GB YouTube",
        description: "12GB data for YouTube only, valid for 30 days",
        price: 500,
        data: "12GB",
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
        name: "1.2GB TikTok",
        description: "1.2GB data for TikTok only, valid for 24 hours",
        price: 50,
        data: "1.2GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "tiktok-2",
        name: "3.5GB TikTok",
        description: "3.5GB data for TikTok only, valid for 7 days",
        price: 150,
        data: "3.5GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "tiktok-3",
        name: "12GB TikTok",
        description: "12GB data for TikTok only, valid for 30 days",
        price: 480,
        data: "12GB",
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
        name: "2.5GB Showmax",
        description: "2.5GB data for Showmax only, valid for 24 hours",
        price: 80,
        data: "2.5GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "showmax-2",
        name: "6GB Showmax",
        description: "6GB data for Showmax only, valid for 7 days",
        price: 290,
        data: "6GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "showmax-3",
        name: "18GB Showmax",
        description: "18GB data for Showmax only, valid for 30 days",
        price: 720,
        data: "18GB",
        validity: "30 days",
        popular: false,
      },
    ],
  },
}

export default function AirtelCategoryPage({
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
        <h1 className="text-3xl font-bold tracking-tight text-red-700">{categoryInfo.title}</h1>
        <p className="text-muted-foreground">{categoryInfo.description}</p>
      </div>

      <div className="relative p-6 rounded-xl bg-gradient-to-r from-red-50 to-red-100 overflow-hidden border border-red-200">
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg
            width="320"
            height="320"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-red-800"
          >
            <path
              d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative z-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categoryInfo.packages.map((pkg) => (
            <PackageCard key={pkg.id} packageData={pkg} provider="airtel" color="red" />
          ))}
        </div>
      </div>
    </div>
  )
}

