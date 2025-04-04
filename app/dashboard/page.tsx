import { TelecomSelector } from "@/components/dashboard/telecom-selector"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to DataZetu</h1>
        <p className="text-muted-foreground">Select your telecom provider to view available data bundles</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>
          You can refer friends to earn KSh 20 per referral. Check out the Referrals section in your profile!
        </AlertDescription>
      </Alert>

      <TelecomSelector />
    </div>
  )
}

