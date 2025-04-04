"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { initiateStkPush } from "@/lib/mpesa"

// Schema for payment form validation
const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(12, "Phone number must not exceed 12 digits")
    .regex(/^(0|254|\+254)7[0-9]{8}$/, "Please enter a valid Kenyan phone number"),
})

interface MpesaPaymentFormProps {
  amount: number
  packageName: string
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

export function MpesaPaymentForm({ amount, packageName, onSuccess, onError }: MpesaPaymentFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await initiateStkPush({
        phoneNumber: values.phoneNumber,
        amount: amount,
        email: undefined, // Optional email
      })

      if (result.success && result.data) {
        toast({
          title: "Payment initiated",
          description: "Please check your phone to complete the payment",
        })

        // Pass the checkout request ID to the parent component
        onSuccess(result.data.CheckoutRequestID)
      } else {
        setError(result.error || "Failed to initiate payment. Please try again.")
        onError(result.error || "Unknown error")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      setError(errorMessage)
      onError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>M-Pesa Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="07XXXXXXXX" {...field} />
                </FormControl>
                <FormDescription>Enter the phone number registered with M-Pesa</FormDescription>
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
              `Pay KSh ${amount} via M-Pesa`
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

