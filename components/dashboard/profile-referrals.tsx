"use client"

import { useState } from "react"
import { Check, Copy, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample referral data
const referrals = [
  {
    id: "REF001",
    name: "John Kamau",
    date: "2023-03-25T14:20:00Z",
    status: "registered",
    amount: 20,
  },
  {
    id: "REF002",
    name: "Sarah Wambui",
    date: "2023-03-20T09:15:00Z",
    status: "registered",
    amount: 20,
  },
  {
    id: "REF003",
    name: "David Maina",
    date: "2023-03-15T16:45:00Z",
    status: "registered",
    amount: 20,
  },
  {
    id: "REF004",
    name: "Grace Njeri",
    date: "2023-03-10T11:30:00Z",
    status: "pending",
    amount: 0,
  },
]

// Function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function ProfileReferrals() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const referralCode = "DZ12345KE"
  const referralLink = `https://datazetu.com/register?ref=${referralCode}`
  const totalEarned = 60 // KSh
  const pendingAmount = 520 // KSh to reach withdrawal threshold

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)

    toast({
      title: "Copied to clipboard",
      description: "You can now share this with your friends.",
    })

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join DataZetu",
          text: "Use my referral code to join DataZetu and get affordable data bundles! We both get KSh 20.",
          url: referralLink,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      copyToClipboard(referralLink)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Referral Program</CardTitle>
          <CardDescription>
            Invite friends to join DataZetu and earn KSh 20 for each successful referral
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Your Referral Code</h3>
            <div className="mt-2 flex items-center gap-2">
              <code className="rounded bg-slate-100 px-2 py-1 text-lg font-bold">{referralCode}</code>
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(referralCode)}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy referral code</span>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Referral Link</h3>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 truncate rounded bg-slate-100 px-2 py-1 text-xs">{referralLink}</code>
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(referralLink)}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy referral link</span>
              </Button>
              <Button variant="outline" size="icon" onClick={shareReferral}>
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share referral link</span>
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-md border bg-slate-50 p-4 text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Total Earned</h3>
              <p className="mt-1 text-2xl font-bold">KSh {totalEarned}</p>
            </div>

            <div className="rounded-md border bg-slate-50 p-4 text-center">
              <h3 className="text-sm font-medium text-muted-foreground">To Reach Withdrawal</h3>
              <p className="mt-1 text-2xl font-bold">KSh {pendingAmount}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress to withdrawal (KSh 1,000)</span>
              <span className="font-medium">{Math.floor((totalEarned / 1000) * 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-blue-500" style={{ width: `${(totalEarned / 1000) * 100}%` }} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start space-y-2 border-t px-6 py-4">
          <h3 className="text-sm font-medium">How it works</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Share your referral code or link with friends</li>
            <li>They get KSh 10 off their first purchase</li>
            <li>You earn KSh 20 for each successful referral</li>
            <li>Withdraw your earnings once you reach KSh 1,000</li>
          </ul>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
          <CardDescription>Track the status of your referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">{referral.name}</TableCell>
                  <TableCell>{formatDate(referral.date)}</TableCell>
                  <TableCell>
                    {referral.status === "registered" ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        <Check className="mr-1 h-3 w-3" />
                        Registered
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">KSh {referral.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

