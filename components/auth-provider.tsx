"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email?: string
  phone?: string
  referralCode: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("datazetu-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user data")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const userData = {
      id: "123456",
      name: "John Doe",
      email: email,
      referralCode: "JOHN123",
    }

    setUser(userData)
    localStorage.setItem("datazetu-user", JSON.stringify(userData))
  }

  const register = async (userData: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data with generated referral code
    const newUser = {
      id: Math.random().toString(36).substring(2, 10),
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      referralCode: "DZ" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    }

    setUser(newUser)
    localStorage.setItem("datazetu-user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("datazetu-user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

