import { type ReactNode, Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleTagManager } from "@next/third-parties/google"
import { Partytown } from "@builder.io/partytown/react"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "next-themes"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "react-hot-toast"
import { SecurityHeaders } from "next-safe"

// Custom Components
import { AuthProvider } from "@/components/auth-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { MaintenanceBanner } from "@/components/maintenance-banner"
import { CookieConsent } from "@/components/cookie-consent"
import { DevTools } from "@/components/dev-tools"
import { config } from "@/config"

// Styles
import "./globals.css"
import "@/styles/mdx.css"
import "@/styles/animations.css"

// Dynamic Imports
const FeedbackWidget = dynamic(() => import("@/components/feedback-widget"))
const LiveChat = dynamic(() => import("@/components/live-chat"))

// Font Optimizations
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

// Metadata Configuration
export const metadata: Metadata = {
  title: {
    default: "DataZetu | Kenya's #1 Mobile Data Marketplace",
    template: "%s | DataZetu"
  },
  description: "Instant data bundles for Safaricom, Airtel & Telkom Kenya. Buy cheap internet packages & pay via M-Pesa. 24/7 Support & Best Rates Guaranteed!",
  keywords: [
    "buy data bundles Kenya",
    "cheap Safaricom data",
    "Airtel internet packages",
    "Telkom Kenya data deals",
    "school fees payment platform",
    "student internet solutions"
  ],
  metadataBase: new URL(config.siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-KE": "/en",
      "sw-KE": "/sw",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: config.siteUrl,
    siteName: "DataZetu",
    title: "DataZetu | Affordable Mobile Data for Students",
    description: "Get instant data bundles to support your education. Cheap rates, fast delivery, M-Pesa payments.",
    images: [
      {
        url: `${config.siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "DataZetu Mobile Data Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataZetu | Study Without Limits",
    description: "Student-friendly data bundles for uninterrupted learning. Best prices in Kenya!",
    images: [`${config.siteUrl}/og-image.jpg`],
    creator: "@data_zetu",
  },
  verification: {
    google: config.googleSiteVerification,
    yandex: config.yandexVerification,
  },
  category: "education technology",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

// Security Headers
export const headers = SecurityHeaders({
  contentSecurityPolicy: {
    directives: {
      "default-src": ["'self'"],
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "https://www.googletagmanager.com",
      ],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:", "https://*.google-analytics.com"],
      "connect-src": ["'self'", "https://api.datazetu.com"],
    },
  },
  permissionsPolicy: {
    features: {
      accelerometer: "'none'",
      camera: "'none'",
      geolocation: "'none'",
      microphone: "'none'",
      payment: "'self'",
    },
  },
})

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const messages = await import(`@/locales/${locale}.json`)
  const cookieStore = cookies()
  const sessionToken = cookieStore.get("sessionToken")

  return (
    <html 
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <Partytown
          forward={["dataLayer.push"]}
          debug={process.env.NODE_ENV === "development"}
        />
        {process.env.NODE_ENV === "production" && (
          <GoogleTagManager gtmId={config.gtmId} />
        )}
      </head>
      
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextTopLoader
          color="#E11D48"
          height={3}
          shadow="0 0 10px #E11D48,0 0 5px #E11D48"
          showSpinner={false}
        />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider sessionToken={sessionToken?.value}>
              <SecurityHeaders />

              <MaintenanceBanner />
              
              <div className="flex flex-col min-h-screen">
                <SiteHeader />
                
                <ScrollProgress />
                
                <main className="flex-1 container py-8">
                  <Suspense fallback={<div className="loading-indicator" />}>
                    {children}
                  </Suspense>
                </main>

                <SiteFooter />
              </div>

              <CookieConsent />
              <FeedbackWidget />
              <LiveChat />

              {process.env.NODE_ENV === "development" && <DevTools />}
              <Toaster position="bottom-right" reverseOrder={false} />
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>

        {process.env.NODE_ENV === "production" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
