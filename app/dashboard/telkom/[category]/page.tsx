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
        name: "600MB Daily",
        description: "600MB data valid for 24 hours",
        price: 20,
        data: "600MB",
        validity: "24 hours",
        popular: true,
      },
      {
        id: "daily-2",
        name: "1.5GB Daily",
        description: "1.5GB data valid for 24 hours",
        price: 50,
        data: "1.5GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "daily-3",
        name: "2.5GB Daily",
        description: "2.5GB data valid for 24 hours",
        price: 100,
        data: "2.5GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "daily-4",
        name: "4GB Daily",
        description: "4GB data valid for 24 hours",
        price: 150,
        data: "4GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "daily-5",
        name: "7GB Daily",
        description: "7GB data valid for 24 hours",
        price: 249,
        data: "7GB",
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
        name: "2GB Weekly",
        description: "2GB data valid for 7 days",
        price: 230,
        data: "2GB",
        validity: "7 days",
        popular: false,
      },
      {
        id: "weekly-2",
        name: "5GB Weekly",
        description: "5GB data valid for 7 days",
        price: 450,
        data: "5GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "weekly-3",
        name: "8GB Weekly",
        description: "8GB data valid for 7 days",
        price: 700,
        data: "8GB",
        validity: "7 days",
        popular: false,
      },
      {
        id: "weekly-4",
        name: "15GB Weekly",
        description: "15GB data valid for 7 days",
        price: 980,
        data: "15GB",
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
        name: "8GB Monthly",
        description: "8GB data valid for 30 days",
        price: 990,
        data: "8GB",
        validity: "30 days",
        popular: false,
      },
      {
        id: "monthly-2",
        name: "15GB Monthly",
        description: "15GB data valid for 30 days",
        price: 1450,
        data: "15GB",
        validity: "30 days",
        popular: true,
      },
      {
        id: "monthly-3",
        name: "30GB Monthly",
        description: "30GB data valid for 30 days",
        price: 1950,
        data: "30GB",
        validity: "30 days",
        popular: false,
      },
      {
        id: "monthly-4",
        name: "75GB Monthly",
        description: "75GB data valid for 30 days",
        price: 3100,
        data: "75GB",
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
        name: "1.5GB YouTube",
        description: "1.5GB data for YouTube only, valid for 24 hours",
        price: 50,
        data: "1.5GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "youtube-2",
        name: "4GB YouTube",
        description: "4GB data for YouTube only, valid for 7 days",
        price: 150,
        data: "4GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "youtube-3",
        name: "15GB YouTube",
        description: "15GB data for YouTube only, valid for 30 days",
        price: 490,
        data: "15GB",
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
        name: "1.5GB TikTok",
        description: "1.5GB data for TikTok only, valid for 24 hours",
        price: 50,
        data: "1.5GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "tiktok-2",
        name: "4GB TikTok",
        description: "4GB data for TikTok only, valid for 7 days",
        price: 150,
        data: "4GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "tiktok-3",
        name: "15GB TikTok",
        description: "15GB data for TikTok only, valid for 30 days",
        price: 480,
        data: "15GB",
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
        name: "3GB Showmax",
        description: "3GB data for Showmax only, valid for 24 hours",
        price: 80,
        data: "3GB",
        validity: "24 hours",
        popular: false,
      },
      {
        id: "showmax-2",
        name: "7GB Showmax",
        description: "7GB data for Showmax only, valid for 7 days",
        price: 290,
        data: "7GB",
        validity: "7 days",
        popular: true,
      },
      {
        id: "showmax-3",
        name: "20GB Showmax",
        description: "20GB data for Showmax only, valid for 30 days",
        price: 700,
        data: "20GB",
        validity: "30 days",
        popular: false,
      },
    ],
  },
}

export default function TelkomCategoryPage({
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
        <h1 className="text-3xl font-bold tracking-tight text-blue-700">{categoryInfo.title}</h1>
        <p className="text-muted-foreground">{categoryInfo.description}</p>
      </div>

      <div className="relative p-6 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden border border-blue-200">
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg
            width="320"
            height="320"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-800"
          >
            <path
              d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative z-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categoryInfo.packages.map((pkg) => (
            <PackageCard key={pkg.id} packageData={pkg} provider="telkom" color="blue" />
          ))}
        </div>
      </div>
    </div>
  )
}

