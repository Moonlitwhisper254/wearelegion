"use client"

import { useState, useEffect } from "react"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { checkTransactionStatus } from "@/lib/mpesa"

interface PaymentStatusCheckerProps {
  checkoutRequestId: string
  onComplete: (status: "COMPLETED" | "FAILED") => void
}

export function PaymentStatusChecker({ checkoutRequestId, onComplete }: PaymentStatusCheckerProps) {
  const { toast } = useToast()
  const [status, setStatus] = useState<"PENDING" | "COMPLETED" | "FAILED">("PENDING")
  const [isChecking, setIsChecking] = useState(false)

  // Function to check payment status
  const checkStatus = async () => {
    if (isChecking) return

    setIsChecking(true)
    try {
      const result = await checkTransactionStatus(checkoutRequestId)

      if (result.success && result.data) {
        setStatus(result.data.status as any)

        if (result.data.status === "COMPLETED") {
          toast({
            title: "Payment successful",
            description: "Your payment has been processed successfully",
          })
          onComplete("COMPLETED")
        } else if (result.data.status === "FAILED") {
          toast({
            variant: "destructive",
            title: "Payment failed",
            description: "Your payment could not be processed",
          })
          onComplete("FAILED")
        }
      }
    } catch (error) {
      console.error("Error checking payment status:", error)
    } finally {
      setIsChecking(false)
    }
  }

  // Check status automatically every 5 seconds
  useEffect(() => {
    if (status === "PENDING") {
      const interval = setInterval(checkStatus, 5000)
      return () => clearInterval(interval)
    }
  }, [status])

  // Initial check
  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <div className="space-y-4 text-center">
      {status === "PENDING" && (
        <div className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h3 className="text-lg font-semibold">Payment in Progress</h3>
          <p className="text-muted-foreground mt-2">Please complete the payment on your phone</p>
          <Button variant="outline" onClick={checkStatus} disabled={isChecking} className="mt-4">
            {isChecking ? "Checking..." : "Check Status"}
          </Button>
        </div>
      )}

      {status === "COMPLETED" && (
        <div className="flex flex-col items-center justify-center p-6">
          <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold">Payment Successful</h3>
          <p className="text-muted-foreground mt-2">Your payment has been processed successfully</p>
        </div>
      )}

      {status === "FAILED" && (
        <div className="flex flex-col items-center justify-center p-6">
          <XCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold">Payment Failed</h3>
          <p className="text-muted-foreground mt-2">Your payment could not be processed</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}

