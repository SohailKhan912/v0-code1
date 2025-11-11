"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authAPI } from "@/utils/api"

interface User {
  _id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored auth
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")

      if (storedToken && storedUser) {
        setToken(storedToken)
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          // Verify token is still valid
          authAPI
            .getMe()
            .then((response) => {
              const userData = response.user || response
              setUser(userData)
              // Update localStorage with fresh user data
              localStorage.setItem("user", JSON.stringify(userData))
            })
            .catch(() => {
              // Token invalid, clear storage
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              setToken(null)
              setUser(null)
            })
            .finally(() => setLoading(false))
        } catch {
          // Invalid user data, clear storage
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          setToken(null)
          setUser(null)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password)
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user || response))
    }
    setToken(response.token)
    setUser(response.user || response)
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
    setToken(null)
    setUser(null)
    router.push("/admin/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

