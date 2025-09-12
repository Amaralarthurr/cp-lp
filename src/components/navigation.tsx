"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation" // Added useRouter for programmatic navigation

interface NavigationProps {
  activeSection: string
}

export default function Navigation({ activeSection }: NavigationProps) {
  const router = useRouter() // Added router instance

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    console.log("[v0] Navigation click:", href)
    e.preventDefault()
    router.push(href)
  }

  return (
    <nav className="fixed top-0 w-full bg-cyber-darker/90 backdrop-blur-sm border-b border-cyber-green/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-cyber font-black text-cyber-green neon-text">Human.exe</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {[
              { href: "/", label: "> Início" },
              { href: "/experience/1", label: "> Experiência" },
              { href: "/cart", label: "> Carrinho" },
            ].map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className="nav-link text-white hover:text-cyber-green transition-colors duration-300 relative group neon-text cursor-pointer pointer-events-auto"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-green transition-all duration-300 group-hover:w-full shadow-sm shadow-cyber-green"></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
