"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, X, MinusSquare, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  sender: "user" | "support"
  timestamp: Date
}

export function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen(!isOpen)
    }
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const sendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate support agent typing
    setIsTyping(true)

    // Simulate response after a delay
    setTimeout(() => {
      setIsTyping(false)

      const responses = [
        "Thank you for your message. How can I help you today?",
        "I'll look into this for you right away.",
        "Could you please provide more details about your issue?",
        "We appreciate your patience. Let me check that for you.",
        "Have you tried refreshing the page or clearing your browser cache?",
        "I understand your concern. Let me help you with that.",
      ]

      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "support",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, supportMessage])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={toggleChat} className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg">
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Open support chat</span>
      </Button>
    )
  }

  if (isMinimized) {
    return (
      <Button onClick={toggleChat} className="fixed bottom-6 right-6 z-50 shadow-lg" variant="outline">
        <MessageSquare className="mr-2 h-4 w-4" />
        Chat with Customer Support
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between py-3 border-b">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg?height=30&width=30" alt="Support Agent" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Customer Support</span>
        </div>
        <div className="flex items-center gap-1">
          <Button onClick={minimizeChat} size="icon" variant="ghost" className="h-7 w-7">
            <MinusSquare className="h-4 w-4" />
            <span className="sr-only">Minimize</span>
          </Button>
          <Button onClick={toggleChat} size="icon" variant="ghost" className="h-7 w-7">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-3 h-80 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center p-4">
            <MessageSquare className="mb-2 h-8 w-8 text-muted-foreground" />
            <h3 className="text-sm font-medium">Welcome to DataZetu Support</h3>
            <p className="text-xs text-muted-foreground mt-1">How can we help you today?</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-muted">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-75" />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-150" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex w-full items-center gap-2"
        >
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-9 flex-1 resize-none"
          />
          <Button type="submit" size="icon" disabled={!message.trim() || isTyping}>
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

