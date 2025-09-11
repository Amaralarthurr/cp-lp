"use client"

import Link from "next/link"
import { Trash2, Plus, Minus } from "lucide-react"

interface CartItem {
  id: string
  title: string
  type: "experiência" | "assinatura"
  price: number
  quantity: number
  image: string
  creator: string
}

interface CartItemsProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}

export default function CartItems({ items, onUpdateQuantity, onRemoveItem }: CartItemsProps) {
  if (items.length === 0) {
    return (
      <div className="bg-cyber-gray/80 border border-cyber-cyan/50 rounded-lg p-8 text-center hologram-effect backdrop-blur-sm">
        <h3 className="text-xl font-bold text-cyber-cyan mb-4 font-mono">[CARRINHO_VAZIO]</h3>
        <p className="text-gray-300 font-mono mb-6">Nenhuma experiência selecionada ainda.</p>
        <Link
          href="/"
          className="bg-gradient-to-r from-cyber-cyan to-cyber-green hover:from-cyber-pink hover:to-cyber-purple font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 neon-text font-mono"
        >
          {">>> EXPLORAR_EXPERIÊNCIAS"}
        </Link>
      </div>
    )
  }

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-cyber-gray/80 border border-cyber-green/50 rounded-lg p-6 hologram-effect backdrop-blur-sm"
        >
          <div className="flex items-start space-x-4">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-24 h-24 rounded-lg object-cover border border-cyber-green/30"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">{item.title}</h3>
                  <p className="text-cyber-cyan font-mono text-sm">por {item.creator}</p>
                  <span className="inline-block px-2 py-1 bg-cyber-pink/20 border border-cyber-pink/50 rounded text-cyber-pink font-mono text-xs mt-1">
                    {item.type}
                  </span>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-cyber-gray border border-cyber-cyan/30 rounded flex items-center justify-center hover:border-cyber-cyan transition-colors"
                  >
                    <Minus className="w-4 h-4 text-cyber-cyan" />
                  </button>
                  <span className="text-white font-mono font-bold">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-cyber-gray border border-cyber-cyan/30 rounded flex items-center justify-center hover:border-cyber-cyan transition-colors"
                  >
                    <Plus className="w-4 h-4 text-cyber-cyan" />
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyber-green font-mono">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </div>
                  {item.quantity > 1 && (
                    <div className="text-gray-400 font-mono text-sm">R$ {item.price.toFixed(2)} cada</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
