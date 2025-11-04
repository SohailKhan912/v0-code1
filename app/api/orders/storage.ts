interface Order {
  [orderId: string]: any
}

// Simple in-memory storage for orders (will be lost on server restart)
let ordersStorage: Order = {}

export function getOrders() {
  return ordersStorage
}

export function setOrders(newOrders: Order) {
  ordersStorage = newOrders
}

export function addOrder(orderId: string, orderData: any) {
  ordersStorage[orderId] = orderData
  return ordersStorage
}
