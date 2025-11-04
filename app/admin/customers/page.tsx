"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, Eye, Download } from "lucide-react"

export default function CustomersManagement() {
  const [customers] = useState([
    {
      id: 1,
      name: "Raj Kumar",
      email: "raj.kumar@example.com",
      phone: "+91 98765 43210",
      orders: 5,
      totalSpent: 12500,
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya.singh@example.com",
      phone: "+91 98765 43211",
      orders: 3,
      totalSpent: 8900,
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@example.com",
      phone: "+91 98765 43212",
      orders: 8,
      totalSpent: 24500,
      status: "vip",
      joinDate: "2023-11-10",
    },
    {
      id: 4,
      name: "Anaya Sharma",
      email: "anaya.sharma@example.com",
      phone: "+91 98765 43213",
      orders: 2,
      totalSpent: 5600,
      status: "active",
      joinDate: "2024-03-05",
    },
    {
      id: 5,
      name: "Vikram Rao",
      email: "vikram.rao@example.com",
      phone: "+91 98765 43214",
      orders: 12,
      totalSpent: 38900,
      status: "vip",
      joinDate: "2023-09-22",
    },
  ])

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      vip: "bg-purple-100 text-purple-800",
      inactive: "bg-gray-100 text-gray-800",
    }
    return <Badge className={styles[status as keyof typeof styles]}>{status.toUpperCase()}</Badge>
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />

      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Customer Management</h1>
            <p className="text-muted-foreground">View and manage your customer database</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">842</p>
                <p className="text-xs text-green-500 mt-1">+24% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">VIP Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">127</p>
                <p className="text-xs text-purple-500 mt-1">15% of total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">4.2</p>
                <p className="text-xs text-blue-500 mt-1">per customer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Lifetime Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹18.5K</p>
                <p className="text-xs text-orange-500 mt-1">average</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Customers</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search customers..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold">Contact</th>
                      <th className="text-left py-3 px-4 font-semibold">Orders</th>
                      <th className="text-left py-3 px-4 font-semibold">Total Spent</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Join Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-border hover:bg-muted/50 transition">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">ID: #{customer.id}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <Mail className="w-3 h-3" />
                              {customer.email}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {customer.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-semibold">{customer.orders}</td>
                        <td className="py-3 px-4 font-semibold text-green-600">
                          ₹{customer.totalSpent.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(customer.status)}</td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">{customer.joinDate}</td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
