import type { Metadata } from "next"
import "./globals.css"
import type React from "react"
import { Montserrat, Open_Sans } from "next/font/google"
import { Suspense } from "react"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "600"],
})

export const metadata: Metadata = {
  title: "Human.exe - A Humanidade Merece Existir",
  description: "Um manifesto sobre a coexistência entre humanos e inteligência artificial",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body className="font-body">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
