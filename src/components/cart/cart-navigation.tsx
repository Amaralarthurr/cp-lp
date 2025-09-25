import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface CartNavigationProps {
  step: "cart" | "checkout" | "success"
}

export default function CartNavigation({ step }: CartNavigationProps) {
  return (
    <nav className="fixed top-0 w-full bg-cyber-darker/90 backdrop-blur-sm border-b border-cyber-green/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5 text-cyber-green" />
            <span className="text-2xl font-cyber font-black text-cyber-green ">Human.exe</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div
              className={`px-3 py-1 rounded-full text-xs font-mono ${
                step === "cart" ? "bg-cyber-green/20 text-cyber-green" : "bg-cyber-gray/50 text-gray-400"
              }`}
            >
              CARRINHO
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-mono ${
                step === "checkout" ? "bg-cyber-green/20 text-cyber-green" : "bg-cyber-gray/50 text-gray-400"
              }`}
            >
              CHECKOUT
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-mono ${
                step === "success" ? "bg-cyber-green/20 text-cyber-green" : "bg-cyber-gray/50 text-gray-400"
              }`}
            >
              SUCESSO
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
