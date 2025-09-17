"use client"

import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"

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
      <div className="bg-cyber-gray/80 border border-cyber-green/50 rounded-lg p-8 text-center hologram-effect backdrop-blur-sm">
        <p className="text-gray-300 font-mono">Seu carrinho está vazio</p>
      </div>
    )
  }

  return (
    <div className="bg-cyber-gray/80 border border-cyber-green/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
      <h2 className="text-xl font-bold text-cyber-green mb-4 font-mono neon-text">[ITENS_SELECIONADOS]</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-4 bg-cyber-darker/50 rounded-lg border border-cyber-green/30"
          >
            <div className="relative w-16 h-16">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                sizes="64px"
                className="rounded-lg object-cover border border-cyber-green/50"
                priority={false}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white font-mono">{item.title}</h3>
              <p className="text-cyber-cyan text-sm font-mono">{item.creator}</p>
              <p className="text-cyber-green font-mono">R$ {item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 bg-cyber-gray border border-cyber-green/50 rounded flex items-center justify-center hover:bg-cyber-green/20 transition-colors"
              >
                <Minus className="w-4 h-4 text-cyber-green" />
              </button>
              <span className="w-8 text-center font-mono text-white">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 bg-cyber-gray border border-cyber-green/50 rounded flex items-center justify-center hover:bg-cyber-green/20 transition-colors"
              >
                <Plus className="w-4 h-4 text-cyber-green" />
              </button>
            </div>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="w-8 h-8 bg-cyber-gray border border-cyber-pink/50 rounded flex items-center justify-center hover:bg-cyber-pink/20 transition-colors"
            >
              <X className="w-4 h-4 text-cyber-pink" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
