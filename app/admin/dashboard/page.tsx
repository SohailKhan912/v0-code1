"use client";

import { useState, useEffect } from "react";
import { authAPI } from "@/utils/api";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch orders on load
  const fetchOrders = async () => {
    try {
      console.log("📡 Fetching orders...");
      const data = await authAPI.getOrders();
      console.log("✅ Orders fetched:", data);

      if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (err: any) {
      console.error("💥 Error fetching orders:", err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Handle status updates
  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log(`✅ Order ${id} updated to ${status}`);
        fetchOrders(); // refresh orders
      } else {
        alert(data.message || "Failed to update order");
      }
    } catch (err) {
      console.error("💥 Error updating order:", err);
      alert("Server error while updating order");
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading orders...</p>;
  if (error)
    return <p className="p-4 text-red-600 bg-red-100 rounded">{error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">
        🧾 Admin Dashboard – Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">City</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">{order.city}</td>
                  <td className="p-3 font-semibold">₹{order.amount}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        order.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : order.status === "dispatched"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "delivered"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    {order.status === "pending" && (
                      <button
                        onClick={() => updateStatus(order._id, "approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                    )}
                    {order.status === "approved" && (
                      <button
                        onClick={() => updateStatus(order._id, "dispatched")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Dispatch
                      </button>
                    )}
                    {order.status === "dispatched" && (
                      <button
                        onClick={() => updateStatus(order._id, "delivered")}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Deliver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
