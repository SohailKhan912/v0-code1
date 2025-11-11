"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package, Users, IndianRupee } from "lucide-react"

export function StatsCards() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    avgOrderValue: 0,
    loading: true,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats")
        const data = await response.json()

        if (data.success) {
          const avgOrderValue =
            data.stats.totalOrders > 0 ? Math.round(data.stats.totalRevenue / data.stats.totalOrders) : 0

          setStats({
            totalOrders: data.stats.totalOrders,
            totalRevenue: data.stats.totalRevenue,
            totalCustomers: data.stats.totalUsers || 0,
            avgOrderValue,
            loading: false,
          })
          console.log("[v0] Admin stats loaded:", data.stats)
        }
      } catch (error) {
        console.error("[v0] Error fetching stats:", error)
        setStats((prev) => ({ ...prev, loading: false }))
      }
    }

    fetchStats()
  }, [])

  const statsData = [
    {
      icon: Package,
      title: "Total Orders",
      value: stats.loading ? "..." : stats.totalOrders.toString(),
      change: "+12% from last month",
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Revenue",
      value: stats.loading ? "..." : `₹${stats.totalRevenue.toLocaleString()}`,
      change: "+8.2% from last month",
      color: "text-green-500",
    },
    {
      icon: Users,
      title: "Customers",
      value: stats.loading ? "..." : stats.totalCustomers.toString(),
      change: "+24% from last month",
      color: "text-purple-500",
    },
    {
      icon: IndianRupee,
      title: "Avg Order Value",
      value: stats.loading ? "..." : `₹${stats.avgOrderValue.toLocaleString()}`,
      change: "+3.1% from last month",
      color: "text-orange-500",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
