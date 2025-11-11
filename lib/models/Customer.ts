export interface Customer {
  _id?: string
  email: string
  name: string
  phone: string
  totalOrders: number
  totalSpent: number
  addresses: Array<{
    address: string
    city: string
    state: string
    pincode: string
    landmark?: string
    isDefault: boolean
  }>
  createdAt: Date
  updatedAt: Date
}
