"use client"

import { useState, useEffect } from "react"

export default function RealtimeClock() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    // Format the time
    const formatTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }
      return new Intl.DateTimeFormat("en-US", options).format(now)
    }

    // Update the time immediately
    setCurrentTime(formatTime())

    // Update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(formatTime())
    }, 1000)

    // Clean up interval on unmount
    return () => clearInterval(intervalId)
  }, [])

  return <div className="bg-slate-100 px-3 py-1.5 rounded-md text-sm font-mono tabular-nums">{currentTime}</div>
}

