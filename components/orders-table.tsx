"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download } from "lucide-react"

interface OrdersTableProps {
  limit?: number
}

export function OrdersTable({ limit = 10 }: OrdersTableProps) {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    // Generate mock orders
    const mockOrders = Array.from({ length: 20 }, (_, i) => ({
      id: `ORD-${1000 + i}`,
      customer: ["Raj Kumar", "Priya Singh", "Amit Patel", "Anaya Sharma", "Vikram Rao"][i % 5],
      dimensions: ["800×2000mm", "1200×2000mm", "900×2000mm", "1600×2200mm", "1000×1900mm"][i % 5],
      material: ["Tempered Glass", "Laminated Glass", "Tinted Glass", "Tempered Glass", "Laminated Glass"][i % 5],
      amount: [1500, 2200, 1800, 2800, 3500][i % 5],
      status: ["pending", "confirmed", "processing", "shipped", "delivered"][i % 5],
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
    }))
    setOrders(mockOrders.slice(0, limit))
  }, [limit])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-orange-100 text-orange-800",
      delivered: "bg-green-100 text-green-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Order ID</th>
            <th className="text-left py-3 px-4 font-semibold">Customer</th>
            <th className="text-left py-3 px-4 font-semibold">Dimensions</th>
            <th className="text-left py-3 px-4 font-semibold">Amount</th>
            <th className="text-left py-3 px-4 font-semibold">Status</th>
            <th className="text-left py-3 px-4 font-semibold">Date</th>
            <th className="text-left py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition">
              <td className="py-3 px-4 font-medium">{order.id}</td>
              <td className="py-3 px-4">{order.customer}</td>
              <td className="py-3 px-4 text-muted-foreground">{order.dimensions}</td>
              <td className="py-3 px-4 font-semibold">₹{order.amount.toLocaleString()}</td>
              <td className="py-3 px-4">
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </td>
              <td className="py-3 px-4 text-muted-foreground text-xs">{order.date}</td>
              <td className="py-3 px-4 flex gap-2">
                <Button size="sm" variant="ghost" className="gap-1">
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                <Button size="sm" variant="ghost" className="gap-1">
                  <Download className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
