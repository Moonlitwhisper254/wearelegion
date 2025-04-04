import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const callbackData = await request.json()
    console.log("Received M-Pesa callback data:", callbackData)

    // Extract body from callback data
    const body = callbackData.Body || {}

    // Get stkCallback data
    const stkCallback = body.stkCallback || {}
    const checkoutRequestId = stkCallback.CheckoutRequestID
    const resultCode = stkCallback.ResultCode
    const resultDesc = stkCallback.ResultDesc

    // In a real implementation, you would:
    // 1. Find the transaction in your database
    // 2. Update its status based on the result code
    // 3. Store additional details from the callback

    console.log(`Processing transaction ${checkoutRequestId} with result: ${resultDesc}`)

    // Return success response to M-Pesa
    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: "Callback processed successfully",
    })
  } catch (error) {
    console.error("Error processing M-Pesa callback:", error)
    return NextResponse.json(
      {
        ResultCode: 1,
        ResultDesc: `Error: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}

