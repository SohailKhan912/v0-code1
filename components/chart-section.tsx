"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function ChartSection() {
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchChartData() {
      try {
        const response = await fetch("/api/admin/stats")
        const data = await response.json()

        if (data.success && data.stats.monthlyRevenue) {
          const formattedData = data.stats.monthlyRevenue.map((item: any) => ({
            month: `${getMonthName(item._id.month)}`,
            revenue: item.revenue,
            orders: item.orders,
          }))

          setRevenueData(formattedData)
          console.log("[v0] Chart data loaded from MongoDB")
        } else {
          // Fallback to sample data if no real data
          setRevenueData([
            { month: "Jan", revenue: 45000, orders: 12 },
            { month: "Feb", revenue: 52000, orders: 15 },
            { month: "Mar", revenue: 48000, orders: 14 },
            { month: "Apr", revenue: 61000, orders: 18 },
            { month: "May", revenue: 71000, orders: 22 },
            { month: "Jun", revenue: 82000, orders: 26 },
          ])
        }
      } catch (error) {
        console.error("[v0] Error fetching chart data:", error)
        // Use sample data on error
        setRevenueData([
          { month: "Jan", revenue: 45000, orders: 12 },
          { month: "Feb", revenue: 52000, orders: 15 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchChartData()
  }, [])

  function getMonthName(month: number): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[month - 1] || "Unknown"
  }

  const materialData = [
    { name: "Tempered Glass", value: 35 },
    { name: "Laminated Glass", value: 28 },
    { name: "Tinted Glass", value: 23 },
    { name: "Other", value: 14 },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Orders by Material */}
      <Card>
        <CardHeader>
          <CardTitle>Orders by Glass Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={materialData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {materialData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Orders by Month */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
