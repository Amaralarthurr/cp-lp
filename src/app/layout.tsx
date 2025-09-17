import type { Metadata } from "next"
import "./globals.css"
import type React from "react"
import { Montserrat, Open_Sans } from "next/font/google"
import { Suspense } from "react"

/* eslint-disable @typescript-eslint/no-unused-vars */
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
})
/* eslint-enable @typescript-eslint/no-unused-vars */

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
    <html lang="pt-BR" className="antialiased">
      <body className="font-body">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
