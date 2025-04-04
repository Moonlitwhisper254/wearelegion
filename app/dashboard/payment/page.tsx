"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MpesaPaymentForm } from "@/components/mpesa-payment-form"
import { PaymentStatusChecker } from "@/components/payment-status-checker"

const formSchema = z.object({
  phoneNumber: z.string().regex(/^(07|01)[0-9]{8}$/, "Please enter a valid Kenyan phone number"),
  paymentMethod: z.enum(["mpesa", "card", "paypal"]),
  isSelfPurchase: z.boolean().default(true),
  recipientNumber: z.string().optional(),
})

type Provider = "safaricom" | "airtel" | "telkom"

const providerColors = {
  safaricom: "emerald",
  airtel: "red",
  telkom: "blue",
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"form" | "mpesa" | "status">("form")
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null)

  // Get package data from URL params
  const packageId = searchParams.get("packageId") || ""
  const packageName = searchParams.get("packageName") || "Unknown Package"
  const packageData = searchParams.get("packageData") || "Unknown Data"
  const packagePrice = Number(searchParams.get("packagePrice")) || 0
  const packageValidity = searchParams.get("packageValidity") || "Unknown Validity"
  const provider = (searchParams.get("provider") || "safaricom") as Provider

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      paymentMethod: "mpesa",
      isSelfPurchase: true,
      recipientNumber: "",
    },
  })

  const isSelfPurchase = form.watch("isSelfPurchase")
  const paymentMethod = form.watch("paymentMethod")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      if (values.paymentMethod === "mpesa") {
        // Switch to M-Pesa payment form
        setPaymentStep("mpesa")
      } else {
        // Simulate payment processing for other methods
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsComplete(true)

        toast({
          title: "Payment Successful",
          description: `You have successfully purchased ${packageName}`,
        })

        // Redirect after a delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 3000)
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: "There was a problem processing your payment. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle M-Pesa payment success
  const handleMpesaSuccess = (transactionId: string) => {
    setCheckoutRequestId(transactionId)
    setPaymentStep("status")
  }

  // Handle M-Pesa payment error
  const handleMpesaError = (error: string) => {
    toast({
      variant: "destructive",
      title: "Payment failed",
      description: error,
    })
  }

  // Handle payment status completion
  const handlePaymentComplete = (status: "COMPLETED" | "FAILED") => {
    if (status === "COMPLETED") {
      setIsComplete(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    }
  }

  // Determine the color class based on provider
  const colorClass = providerColors[provider] || "emerald"

  return (
    <div className="container mx-auto max-w-2xl py-6">
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {isComplete ? (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-center text-2xl">Payment Successful!</CardTitle>
            <CardDescription className="text-center">Your data package has been activated successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Package</p>
                  <p className="font-medium">{packageName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">KSh {packagePrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data</p>
                  <p className="font-medium">{packageData}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Validity</p>
                  <p className="font-medium">{packageValidity}</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-500">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your purchase of {packageName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`mb-6 rounded-lg border border-${colorClass}-200 bg-${colorClass}-50 p-4`}>
              <h3 className={`text-lg font-semibold text-${colorClass}-700`}>{packageName}</h3>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-medium">KSh {packagePrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Data</p>
                  <p className="font-medium">{packageData}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Validity</p>
                  <p className="font-medium">{packageValidity}</p>
                </div>
              </div>
            </div>

            {paymentStep === "form" && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="isSelfPurchase"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Purchase for</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "self")}
                            defaultValue={field.value ? "self" : "other"}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="self" id="self" />
                              <label
                                htmlFor="self"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Myself
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <label
                                htmlFor="other"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Someone else
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!isSelfPurchase && (
                    <FormField
                      control={form.control}
                      name="recipientNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient's Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="07XXXXXXXX" {...field} />
                          </FormControl>
                          <FormDescription>Enter the phone number to purchase data for</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="07XXXXXXXX" {...field} />
                        </FormControl>
                        <FormDescription>Your contact number for payment confirmation</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mpesa">M-Pesa</SelectItem>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Choose your preferred payment method</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Continue to Payment`
                    )}
                  </Button>
                </form>
              </Form>
            )}

            {paymentStep === "mpesa" && (
              <MpesaPaymentForm
                amount={packagePrice}
                packageName={packageName}
                onSuccess={handleMpesaSuccess}
                onError={handleMpesaError}
              />
            )}

            {paymentStep === "status" && checkoutRequestId && (
              <PaymentStatusChecker checkoutRequestId={checkoutRequestId} onComplete={handlePaymentComplete} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

