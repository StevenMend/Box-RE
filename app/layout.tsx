import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/lib/i18n"
import { WdkProvider } from "@/lib/contexts/WdkContext"

export const metadata: Metadata = {
  title: "BOX ARCHITECTS | Blockchain-Powered Real Estate",
  description: "Secure property reservations with smart contract escrow on Avalanche.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TranslationProvider>
            <WdkProvider>
              {children}
            </WdkProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
