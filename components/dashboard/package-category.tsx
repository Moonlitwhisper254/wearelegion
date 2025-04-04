import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

type PackageCategoryProps = {
  id: string
  title: string
  icon: string
  color: "emerald" | "red" | "blue"
  provider: "safaricom" | "airtel" | "telkom"
}

export function PackageCategory({ id, title, icon, color, provider }: PackageCategoryProps) {
  const colorClasses = {
    emerald: {
      bg: "bg-emerald-100",
      border: "border-emerald-200",
      text: "text-emerald-700",
      hover: "hover:border-emerald-300 hover:bg-emerald-50",
    },
    red: {
      bg: "bg-red-100",
      border: "border-red-200",
      text: "text-red-700",
      hover: "hover:border-red-300 hover:bg-red-50",
    },
    blue: {
      bg: "bg-blue-100",
      border: "border-blue-200",
      text: "text-blue-700",
      hover: "hover:border-blue-300 hover:bg-blue-50",
    },
  }

  return (
    <Link href={`/dashboard/${provider}/${id}`}>
      <div
        className={`
          flex cursor-pointer flex-col items-center justify-center rounded-xl border p-4
          transition-all duration-200 ${colorClasses[color].bg} ${colorClasses[color].border} ${colorClasses[color].hover}
        `}
      >
        <Image src={icon || "/placeholder.svg"} alt={title} width={40} height={40} className="mb-3" />

        <h3 className={`text-center text-sm font-semibold ${colorClasses[color].text}`}>{title}</h3>

        <div className={`mt-2 flex items-center gap-1 text-xs ${colorClasses[color].text}`}>
          <span>View Packages</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  )
}

