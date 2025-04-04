export interface MpesaTransaction {
  id: string
  checkoutRequestId: string
  merchantRequestId: string
  phoneNumber: string
  amount: number
  status: "PENDING" | "COMPLETED" | "FAILED"
  resultCode?: number
  resultDescription?: string
  mpesaReceiptNumber?: string
  transactionDate?: string
  createdAt: Date
  updatedAt?: Date
}

// In a real application, this would be stored in a database
// For this demo, we'll use an in-memory store
export const transactions: MpesaTransaction[] = []

export function createTransaction(data: Omit<MpesaTransaction, "id" | "createdAt">): MpesaTransaction {
  const transaction: MpesaTransaction = {
    id: Math.random().toString(36).substring(2, 15),
    ...data,
    createdAt: new Date(),
  }

  transactions.push(transaction)
  return transaction
}

export function getTransactionByCheckoutRequestId(checkoutRequestId: string): MpesaTransaction | undefined {
  return transactions.find((t) => t.checkoutRequestId === checkoutRequestId)
}

export function updateTransaction(
  checkoutRequestId: string,
  updates: Partial<MpesaTransaction>,
): MpesaTransaction | undefined {
  const index = transactions.findIndex((t) => t.checkoutRequestId === checkoutRequestId)

  if (index === -1) return undefined

  const transaction = transactions[index]
  const updatedTransaction = {
    ...transaction,
    ...updates,
    updatedAt: new Date(),
  }

  transactions[index] = updatedTransaction
  return updatedTransaction
}

