"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productsAPI } from "@/lib/api"
import { useAuth } from "@/components/auth-provider"

interface Product {
  _id: string
  name: string
  style?: string
  price: number
  stock: number
  status: string
  description?: string
  category?: string
  image?: string
  features?: string[]
}

export default function ProductsManagement() {
  const router = useRouter()
  const { isAdmin, loading: authLoading } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    style: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    image: "",
    features: "",
  })

  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin) {
        router.push("/admin/login")
        return
      }
      fetchProducts()
    }
  }, [isAdmin, authLoading, router])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getAll()
      setProducts(response.products || [])
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      const productData = {
        name: formData.name,
        style: formData.style,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description,
        category: formData.category || "Glass Doors",
        image: formData.image || "/placeholder.jpg",
        features: formData.features ? formData.features.split(",").map((f) => f.trim()) : [],
      }

      await productsAPI.create(productData)
      toast.success("Product created successfully!")
      setIsAddDialogOpen(false)
      resetForm()
      fetchProducts()
    } catch (error: any) {
      toast.error(error.message || "Failed to create product")
    }
  }

  const handleUpdate = async () => {
    if (!editingProduct) return

    try {
      const productData = {
        name: formData.name,
        style: formData.style,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description,
        category: formData.category || "Glass Doors",
        image: formData.image || "/placeholder.jpg",
        features: formData.features ? formData.features.split(",").map((f) => f.trim()) : [],
      }

      await productsAPI.update(editingProduct._id, productData)
      toast.success("Product updated successfully!")
      setIsEditDialogOpen(false)
      setEditingProduct(null)
      resetForm()
      fetchProducts()
    } catch (error: any) {
      toast.error(error.message || "Failed to update product")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      await productsAPI.delete(id)
      toast.success("Product deleted successfully!")
      fetchProducts()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product")
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      style: product.style || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || "",
      category: product.category || "",
      image: product.image || "",
      features: product.features?.join(", ") || "",
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      style: "",
      price: "",
      stock: "",
      description: "",
      category: "",
      image: "",
      features: "",
    })
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      low_stock: "bg-yellow-100 text-yellow-800",
      out_of_stock: "bg-red-100 text-red-800",
    }
    const labels = {
      active: "Active",
      low_stock: "Low Stock",
      out_of_stock: "Out of Stock",
    }
    return <Badge className={styles[status as keyof typeof styles]}>{labels[status as keyof typeof labels]}</Badge>
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />

      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Product Management</h1>
              <p className="text-muted-foreground">Manage your glass door inventory</p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>Create a new glass door product</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="style">Style</Label>
                      <Select value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Minimalist">Minimalist</SelectItem>
                          <SelectItem value="Modern">Modern</SelectItem>
                          <SelectItem value="Classic">Classic</SelectItem>
                          <SelectItem value="Industrial">Industrial</SelectItem>
                          <SelectItem value="Contemporary">Contemporary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="Glass Doors"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Product description"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      placeholder="/placeholder.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">Features (comma separated)</Label>
                    <Input
                      id="features"
                      placeholder="Feature 1, Feature 2, Feature 3"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm() }}>
                    Cancel
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={handleCreate}>
                    Save Product
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                  <DialogDescription>Update product information</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Product Name</Label>
                      <Input
                        id="edit-name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-style">Style</Label>
                      <Select value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Minimalist">Minimalist</SelectItem>
                          <SelectItem value="Modern">Modern</SelectItem>
                          <SelectItem value="Classic">Classic</SelectItem>
                          <SelectItem value="Industrial">Industrial</SelectItem>
                          <SelectItem value="Contemporary">Contemporary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price (₹)</Label>
                      <Input
                        id="edit-price"
                        type="number"
                        placeholder="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-stock">Stock Quantity</Label>
                      <Input
                        id="edit-stock"
                        type="number"
                        placeholder="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Input
                      id="edit-category"
                      placeholder="Glass Doors"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      placeholder="Product description"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-image">Image URL</Label>
                    <Input
                      id="edit-image"
                      placeholder="/placeholder.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-features">Features (comma separated)</Label>
                    <Input
                      id="edit-features"
                      placeholder="Feature 1, Feature 2, Feature 3"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); resetForm(); setEditingProduct(null) }}>
                    Cancel
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={handleUpdate}>
                    Update Product
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Products</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">ID</th>
                      <th className="text-left py-3 px-4 font-semibold">Product Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Style</th>
                      <th className="text-left py-3 px-4 font-semibold">Price</th>
                      <th className="text-left py-3 px-4 font-semibold">Stock</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter((product) =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.style?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((product) => (
                        <tr key={product._id} className="border-b border-border hover:bg-muted/50 transition">
                          <td className="py-3 px-4 font-medium">#{product._id.slice(-6)}</td>
                          <td className="py-3 px-4 font-medium">{product.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{product.style || "N/A"}</td>
                          <td className="py-3 px-4 font-semibold">₹{product.price.toLocaleString()}</td>
                          <td className="py-3 px-4">{product.stock} units</td>
                          <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
                          <td className="py-3 px-4 flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleEdit(product)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleDelete(product._id)}
                            >
                              <Trash2 className="w-4 h-4" />
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
