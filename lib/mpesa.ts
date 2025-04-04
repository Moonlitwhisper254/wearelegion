"use server"

import { z } from "zod"

// Environment variables for M-Pesa Daraja API
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || "wt3PWSrccicAGpIOPpbZs4KXA0xNXPohWeeFtOehcEow9cGB"
const CONSUMER_SECRET =
  process.env.MPESA_CONSUMER_SECRET || "FUkqklnKcbb4nek7GEfN5dcni20VHBZYBwkB3B7P7iZkbGJlDtcJfcVZGIJRnCPN"
const SHORTCODE = process.env.MPESA_SHORTCODE || "174379"
const PASSKEY = process.env.MPESA_PASSKEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL || "https://www.neotech.news"

// Schema for payment validation
const paymentSchema = z.object({
  phoneNumber: z.string().min(10).max(12),
  amount: z.number().min(1),
  email: z.string().email().optional(),
})

type PaymentData = z.infer<typeof paymentSchema>

/**
 * Generate OAuth Access Token for M-Pesa API authentication
 */
async function getAccessToken(): Promise<string> {
  try {
    // For sandbox environment
    const authUrl = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    // For production environment (uncomment when going live)
    // const authUrl = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    const authString = `${CONSUMER_KEY}:${CONSUMER_SECRET}`
    const authBytes = Buffer.from(authString).toString("base64")

    const response = await fetch(authUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authBytes}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error("Error generating OAuth token:", error)
    throw new Error(`Failed to get access token: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Generate password for STK Push based on timestamp
 */
function generatePassword(): { password: string; timestamp: string } {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")

  const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`
  const passwordString = `${SHORTCODE}${PASSKEY}${timestamp}`
  const password = Buffer.from(passwordString).toString("base64")

  return { password, timestamp }
}

/**
 * Format phone number to include country code (254)
 */
function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  let cleanPhone = phone.replace(/\D/g, "")

  // Remove leading zero if present
  if (cleanPhone.startsWith("0")) {
    cleanPhone = cleanPhone.substring(1)
  }

  // Add country code if not present
  if (!cleanPhone.startsWith("254")) {
    cleanPhone = `254${cleanPhone}`
  }

  return cleanPhone
}

/**
 * Initiate STK Push (M-Pesa Express) payment request
 */
export async function initiateStkPush(data: PaymentData) {
  try {
    // Validate input data
    const validatedData = paymentSchema.parse(data)

    // Format phone number
    const phoneNumber = formatPhoneNumber(validatedData.phoneNumber)

    // Get access token
    const token = await getAccessToken()

    // Generate password and timestamp
    const { password, timestamp } = generatePassword()

    // For sandbox environment
    const stkUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    // For production environment (uncomment when going live)
    // const stkUrl = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    // Create actual callback URL
    const callback = process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`
      : CALLBACK_URL

    const payload = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: validatedData.amount,
      PartyA: phoneNumber,
      PartyB: SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: callback,
      AccountReference: "DataZetu",
      TransactionDesc: "Payment for data bundle",
    }

    console.log("STK Push request payload:", payload)

    const response = await fetch(stkUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to initiate payment: ${response.statusText} - ${errorText}`)
    }

    const result = await response.json()
    console.log("STK Push initiated successfully:", result)

    // Store transaction in database (would be implemented here)
    // For now, we'll just return the result

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error("Error initiating STK Push:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * Check transaction status
 */
export async function checkTransactionStatus(checkoutRequestId: string) {
  try {
    // This would typically query your database for the transaction status
    // For demo purposes, we'll simulate a response

    // In a real implementation, you would:
    // 1. Query your database for the transaction with this checkoutRequestId
    // 2. Return the current status

    // Simulate a random status for demo
    const statuses = ["PENDING", "COMPLETED", "FAILED"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return {
      success: true,
      data: {
        status: randomStatus,
        checkoutRequestId,
        timestamp: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Error checking transaction status:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

