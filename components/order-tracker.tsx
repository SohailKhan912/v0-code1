"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

interface OrderTrackerProps {
  orderId: string
}

export function OrderTracker({ orderId }: OrderTrackerProps) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(`/api/orders/get-status?orderId=${orderId}`)
        if (response.ok) {
          const data = await response.json()
          setOrder(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch order status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderStatus()
  }, [orderId])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading order status...</p>
        </CardContent>
      </Card>
    )
  }

  if (!order) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-destructive">Failed to load order status</p>
        </CardContent>
      </Card>
    )
  }

  const steps = order.tracking.steps

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {steps.map((step: any, index: number) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                {step.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
                {index < steps.length - 1 && (
                  <div className={`w-1 h-12 mt-2 ${step.completed ? "bg-green-600" : "bg-gray-300"}`} />
                )}
              </div>
              <div className="pt-1">
                <p className={`font-semibold ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.name}
                </p>
                {step.completed && <p className="text-xs text-muted-foreground mt-1">Completed</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
          <p className="font-semibold">
            {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
