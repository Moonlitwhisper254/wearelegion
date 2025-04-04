import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample transaction history data
const transactions = [
  {
    id: "TX123456",
    date: "2023-04-01T08:30:00Z",
    package: "1GB Daily",
    amount: 50,
    status: "completed",
    provider: "safaricom",
  },
  {
    id: "TX123457",
    date: "2023-03-25T14:20:00Z",
    package: "5GB Weekly",
    amount: 500,
    status: "completed",
    provider: "safaricom",
  },
  {
    id: "TX123458",
    date: "2023-03-15T10:05:00Z",
    package: "10GB Monthly",
    amount: 1500,
    status: "completed",
    provider: "airtel",
  },
  {
    id: "TX123459",
    date: "2023-03-05T16:45:00Z",
    package: "400MB Daily",
    amount: 15,
    status: "completed",
    provider: "safaricom",
  },
  {
    id: "TX123460",
    date: "2023-02-20T09:30:00Z",
    package: "2GB YouTube",
    amount: 150,
    status: "completed",
    provider: "telkom",
  },
]

// Function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function ProfileHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
        <CardDescription>View your recent data bundle purchases</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.package}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`
                      ${
                        transaction.provider === "safaricom"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : transaction.provider === "airtel"
                            ? "border-red-200 bg-red-50 text-red-700"
                            : "border-blue-200 bg-blue-50 text-blue-700"
                      }
                    `}
                  >
                    {transaction.provider.charAt(0).toUpperCase() + transaction.provider.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">KSh {transaction.amount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

