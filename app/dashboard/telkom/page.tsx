import { PackageCategory } from "@/components/dashboard/package-category"

const categories = [
  {
    id: "daily",
    title: "DAILY DATA (24 HOURS)",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "weekly",
    title: "7 DAYS",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "monthly",
    title: "30 DAYS",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "youtube",
    title: "YOUTUBE DATA",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "tiktok",
    title: "TIKTOK",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "showmax",
    title: "SHOWMAX",
    icon: "/placeholder.svg?height=40&width=40",
  },
]

export default function TelkomPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-700">Telkom Data Bundles</h1>
        <p className="text-muted-foreground">Choose from a variety of affordable data packages</p>
      </div>

      <div className="relative p-6 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden border border-blue-200">
        <div className="absolute right-0 bottom-0 opacity-20">
          <svg
            width="320"
            height="320"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-600"
          >
            <path
              d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative z-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <PackageCategory
              key={category.id}
              id={category.id}
              title={category.title}
              icon={category.icon}
              color="blue"
              provider="telkom"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

