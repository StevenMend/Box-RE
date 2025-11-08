import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/lib/i18n"
import { WalletProvider } from "@/lib/WalletProvider"

export const metadata: Metadata = {
  title: "BOX ARCHITECTS | Blockchain-Powered Real Estate",
  description:
    "Secure property reservations with smart contract escrow on Avalanche. Transparent. Trustless. Instant.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const originalWarn = console.warn;
              console.warn = function(...args) {
                const message = args.join(' ');
                if (
                  message.includes('Skipping auto-scroll behavior due to') ||
                  message.includes('google.maps.Marker is deprecated') ||
                  message.includes('position: sticky') ||
                  message.includes('position: fixed')
                ) {
                  return;
                }
                originalWarn.apply(console, args);
              };

              const originalError = console.error;
              console.error = function(...args) {
                const message = args.join(' ');
                if (
                  message.includes('google.maps.Marker is deprecated') ||
                  message.includes('At this time, google.maps.Marker is not')
                ) {
                  return;
                }
                originalError.apply(console, args);
              };
            `,
          }}
        />
      </head>
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TranslationProvider>
            <WalletProvider>
              {children}
            </WalletProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
