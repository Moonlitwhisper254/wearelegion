import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="DataZetu Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-white p-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">DataZetu</h1>

          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-medium">"Connect Faster, Browse Longer"</p>
            <p className="text-xl opacity-90">Kenya's premier destination for affordable mobile data bundles</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild size="lg" className="text-lg">
              <Link href="/auth/register">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg border-white text-white hover:bg-white hover:text-black"
            >
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>

          <div className="pt-12 flex items-center justify-center gap-8">
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt="Safaricom"
              width={60}
              height={60}
              className="rounded-full border-2 border-white"
            />
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt="Airtel"
              width={60}
              height={60}
              className="rounded-full border-2 border-white"
            />
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt="Telkom"
              width={60}
              height={60}
              className="rounded-full border-2 border-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

