"use client";

import { useState } from "react";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // 💰 Set your total amount here (dynamic or fixed)
  const totalAmount = 2000; // Example ₹2000

  // ✅ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle payment + order creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      console.log("📤 Creating Razorpay order with amount:", totalAmount);

      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }), // ✅ send amount here
      });

      const data = await res.json();
      console.log("🧾 API Response:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create order");
      }

      setMessage("✅ Order created successfully! Proceeding to payment...");

      // 🧩 Razorpay checkout popup (test mode)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_yourkeyhere",
        amount: data.order.amount,
        currency: "INR",
        name: "GlassVision",
        description: "Glass Door Booking Payment",
        order_id: data.order.id,
        handler: function (response: any) {
          alert("✅ Payment successful!");
          console.log("💳 Payment response:", response);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#0f172a",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (err: any) {
      console.error("💥 Checkout error:", err);
      setError(err.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mt-6">
      <h2 className="text-xl font-semibold mb-4">📦 Booking & Payment</h2>

      {error && (
        <p className="text-red-600 bg-red-100 p-2 mb-3 rounded">
          ❌ {error}
        </p>
      )}
      {message && (
        <p className="text-green-600 bg-green-100 p-2 mb-3 rounded">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full p-2 border rounded"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Street Address"
          className="w-full p-2 border rounded"
          required
          value={formData.address}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full p-2 border rounded"
            required
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            className="w-full p-2 border rounded"
            required
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-medium">
            💰 Total Payable: <span className="font-bold">₹{totalAmount}</span>
          </p>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Processing..." : `Pay ₹${totalAmount}`}
          </button>
        </div>
      </form>
    </div>
  );
}
