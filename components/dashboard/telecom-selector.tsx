import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function TelecomSelector() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Safaricom Card */}
      <Link href="/dashboard/safaricom" className="block">
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <div className="h-2 w-full bg-emerald-500" />
          <CardHeader>
            <CardTitle className="text-emerald-700">Safaricom</CardTitle>
            <CardDescription>Wide coverage with a variety of data bundles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100">
              <div className="absolute inset-0 flex items-center justify-center opacity-15">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-emerald-600"
                >
                  <path
                    d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-lg font-bold text-emerald-800">400MB</span>
                <span className="text-sm font-medium text-emerald-700">Only KSh 15</span>
                <span className="mt-1 text-xs text-emerald-600">Valid for 24 hours</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">View Bundles</Button>
          </CardFooter>
        </Card>
      </Link>

      {/* Airtel Card */}
      <Link href="/dashboard/airtel" className="block">
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <div className="h-2 w-full bg-red-500" />
          <CardHeader>
            <CardTitle className="text-red-700">Airtel</CardTitle>
            <CardDescription>Affordable data bundles with great connectivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gradient-to-r from-red-50 to-red-100">
              <div className="absolute inset-0 flex items-center justify-center opacity-15">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-red-600"
                >
                  <path
                    d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-lg font-bold text-red-800">500MB</span>
                <span className="text-sm font-medium text-red-700">Only KSh 19</span>
                <span className="mt-1 text-xs text-red-600">Valid for 24 hours</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-red-600 hover:bg-red-700">View Bundles</Button>
          </CardFooter>
        </Card>
      </Link>

      {/* Telkom Card */}
      <Link href="/dashboard/telkom" className="block">
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <div className="h-2 w-full bg-blue-500" />
          <CardHeader>
            <CardTitle className="text-blue-700">Telkom</CardTitle>
            <CardDescription>High-speed data with excellent value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="absolute inset-0 flex items-center justify-center opacity-15">
                <svg
                  width="200"
                  height="200"
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
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-lg font-bold text-blue-800">600MB</span>
                <span className="text-sm font-medium text-blue-700">Only KSh 20</span>
                <span className="mt-1 text-xs text-blue-600">Valid for 24 hours</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">View Bundles</Button>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}

