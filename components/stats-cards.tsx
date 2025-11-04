import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package, Users, IndianRupee } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      icon: Package,
      title: "Total Orders",
      value: "156",
      change: "+12% from last month",
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Revenue",
      value: "₹45,23,000",
      change: "+8.2% from last month",
      color: "text-green-500",
    },
    {
      icon: Users,
      title: "Customers",
      value: "842",
      change: "+24% from last month",
      color: "text-purple-500",
    },
    {
      icon: IndianRupee,
      title: "Avg Order Value",
      value: "₹28,980",
      change: "+3.1% from last month",
      color: "text-orange-500",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
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
