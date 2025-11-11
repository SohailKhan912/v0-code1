"use client"

import { useState, useEffect } from "react"
import { authAPI } from "@/utils/api"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (token) router.push("/")
  }, [router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    try {
      const data = await authAPI.login(email, password)
      if (data?.token && data?.user) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        // Redirect based on role
        if (data.user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/")
        }
      } else {
        setError("Invalid credentials")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err?.message || "Invalid credentials")
    }
  }

  return (
    <main className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white shadow-lg p-6 rounded-xl w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">User Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Sign In</button>
      </form>
    </main>
  )
}
