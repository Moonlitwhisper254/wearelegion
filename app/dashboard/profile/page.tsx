"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileDetails } from "@/components/dashboard/profile-details"
import { ProfileReferrals } from "@/components/dashboard/profile-referrals"
import { ProfileHistory } from "@/components/dashboard/profile-history"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and view your purchase history</p>
      </div>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Personal Details</TabsTrigger>
          <TabsTrigger value="history">Purchase History</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <ProfileDetails />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <ProfileHistory />
        </TabsContent>

        <TabsContent value="referrals" className="mt-6">
          <ProfileReferrals />
        </TabsContent>
      </Tabs>
    </div>
  )
}

