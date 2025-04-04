import { PackageCategory } from "@/components/dashboard/package-category"
import { Clock, Calendar, Youtube, Music2, Film, Tv } from "lucide-react"

const categories = [
  {
    id: "daily",
    title: "Daily Data (24 Hours)",
    icon: <Clock className="w-10 h-10" />,
  },
  {
    id: "weekly",
    title: "7 Day Bundles",
    icon: <Calendar className="w-10 h-10" />,
  },
  {
    id: "monthly",
    title: "30 Day Plans",
    icon: <Calendar className="w-10 h-10" />,
  },
  {
    id: "youtube",
    title: "YouTube Streaming",
    icon: <Youtube className="w-10 h-10" />,
  },
  {
    id: "tiktok",
    title: "TikTok Packages",
    icon: <Music2 className="w-10 h-10" />,
  },
  {
    id: "showmax",
    title: "Showmax Streaming",
    icon: <Film className="w-10 h-10" />,
  },
] as const

export default function AirtelPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-red-700">
          Airtel Data Bundles
        </h1>
        <p className="text-lg text-red-600/90">
          Choose from our curated selection of affordable data packages
        </p>
      </header>

      <section 
        className="relative p-8 rounded-2xl bg-gradient-to-br from-red-50 to-red-100/50 
                   border border-red-200/70 shadow-sm"
        aria-labelledby="airtel-packages-heading"
      >
        <div 
          className="absolute right-0 bottom-0 opacity-15 -rotate-12"
          aria-hidden="true"
        >
          <svg
            width="320"
            height="320"
            viewBox="0 0 100 100"
            fill="none"
            className="text-red-300"
          >
            <path
              d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h2 id="airtel-packages-heading" className="sr-only">
          Airtel Data Package Categories
        </h2>

        <div className="relative z-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <PackageCategory
              key={category.id}
              id={category.id}
              title={category.title}
              icon={category.icon}
              color="red"
              provider="airtel"
              className="hover:border-red-300/50 transition-colors"
            />
          ))}
        </div>
      </section>
    </div>
  )
}
