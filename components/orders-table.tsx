"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, RefreshCw } from "lucide-react"
import { format } from "date-fns"

interface OrdersTableProps {
  limit?: number
}

export function OrdersTable({ limit = 10 }: OrdersTableProps) {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [limit])

  async function fetchOrders() {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/orders")
      const data = await response.json()

      if (data.success) {
        setOrders(data.orders.slice(0, limit))
        console.log(`[v0] Loaded ${data.orders.length} orders from database`)
      }
    } catch (error) {
      console.error("[v0] Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      processing: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      shipped: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        console.log(`[v0] Updated order ${orderId} to ${newStatus}`)
        fetchOrders() // Refresh the list
      }
    } catch (error) {
      console.error("[v0] Error updating order:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No orders found</p>
        <p className="text-xs text-muted-foreground mt-2">Orders will appear here once customers place them</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Order ID</th>
            <th className="text-left py-3 px-4 font-semibold">Customer</th>
            <th className="text-left py-3 px-4 font-semibold">Items</th>
            <th className="text-left py-3 px-4 font-semibold">Amount</th>
            <th className="text-left py-3 px-4 font-semibold">Status</th>
            <th className="text-left py-3 px-4 font-semibold">Date</th>
            <th className="text-left py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="border-b border-border hover:bg-muted/50 transition">
              <td className="py-3 px-4 font-medium">{order.orderId}</td>
              <td className="py-3 px-4">
                <div>
                  <p className="font-medium">{order.customerInfo?.name}</p>
                  <p className="text-xs text-muted-foreground">{order.customerInfo?.email}</p>
                </div>
              </td>
              <td className="py-3 px-4 text-muted-foreground">{order.items?.length || 0} item(s)</td>
              <td className="py-3 px-4 font-semibold">₹{order.total?.toLocaleString()}</td>
              <td className="py-3 px-4">
                <Badge className={getStatusColor(order.status)}>
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                </Badge>
              </td>
              <td className="py-3 px-4 text-muted-foreground text-xs">
                {order.createdAt ? format(new Date(order.createdAt), "MMM dd, yyyy") : "N/A"}
              </td>
              <td className="py-3 px-4 flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1"
                  onClick={() => window.open(`/order-confirmation?orderId=${order.orderId}`, "_blank")}
                >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Package = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
)
