"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Password validation schema
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")

// Phone number validation schema
const phoneSchema = z
  .string()
  .regex(/^(07|01)[0-9]{8}$/, "Please enter a valid Kenyan phone number (07XXXXXXXX or 01XXXXXXXX)")

// Email validation schema
const emailSchema = z.string().email("Please enter a valid email address")

// Registration schema with two variants
const registerSchema = z
  .object({
    registerType: z.enum(["phone", "email"]),
    fullName: z.string().min(2, "Full name is required"),
    phone: z.string().optional(),
    email: z.string().optional(),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    referralCode: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.registerType === "phone") {
        return phoneSchema.safeParse(data.phone).success
      } else {
        return emailSchema.safeParse(data.email).success
      }
    },
    {
      message: "Please enter a valid email or phone number",
      path: ["phone", "email"],
    },
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      registerType: "phone",
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
  })

  const registerType = form.watch("registerType")

  function onTabChange(value: "phone" | "email") {
    form.setValue("registerType", value)
  }

  // Function to detect telecom provider
  function detectTelecomProvider(phone: string): string {
    if (!phone || phone.length < 10) return "Unknown"

    // Get the first 3 digits (after the leading 0)
    const prefix = phone.substring(1, 4)

    // Safaricom prefixes (examples)
    if (
      [
        "710",
        "711",
        "712",
        "713",
        "714",
        "715",
        "716",
        "717",
        "718",
        "719",
        "720",
        "721",
        "722",
        "723",
        "724",
        "725",
        "726",
        "727",
        "728",
        "729",
        "740",
        "741",
        "742",
        "743",
        "744",
        "745",
        "746",
        "747",
        "748",
        "749",
        "790",
        "791",
        "792",
        "793",
        "794",
        "795",
        "796",
        "797",
        "798",
        "799",
      ].includes(prefix)
    ) {
      return "Safaricom"
    }

    // Airtel prefixes (examples)
    if (
      [
        "730",
        "731",
        "732",
        "733",
        "734",
        "735",
        "736",
        "737",
        "738",
        "739",
        "750",
        "751",
        "752",
        "753",
        "754",
        "755",
        "756",
        "757",
        "758",
        "759",
        "780",
        "781",
        "782",
        "783",
        "784",
        "785",
        "786",
        "787",
        "788",
        "789",
      ].includes(prefix)
    ) {
      return "Airtel"
    }

    // Telkom prefixes (examples)
    if (["770", "771", "772", "773", "774", "775", "776", "777", "778", "779"].includes(prefix)) {
      return "Telkom"
    }

    return "Unknown"
  }

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true)

    try {
      // Detect telecom provider if registering with phone
      if (values.registerType === "phone" && values.phone) {
        const provider = detectTelecomProvider(values.phone)
        console.log(`Detected provider: ${provider}`)
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Registration successful",
        description: "Welcome to DataZetu! Please check your email/phone for verification.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "There was a problem with your registration. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Join DataZetu to access affordable data bundles</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="phone"
            value={registerType}
            onValueChange={(value) => onTabChange(value as "phone" | "email")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="phone">Phone</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <TabsContent value="phone">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="07XXXXXXXX" {...field} />
                        </FormControl>
                        <FormDescription>We'll send a verification code to this number</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="email">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormDescription>We'll send a verification link to this email</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Must contain at least 8 characters, including lowercase, uppercase, and special characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referralCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral Code (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter referral code" {...field} />
                      </FormControl>
                      <FormDescription>Enter a referral code if you were invited by a friend</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

