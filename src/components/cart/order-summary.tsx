"use client"

import { Shield, Check } from "lucide-react"

interface CartItem {
  id: string
  title: string
  type: "experiência" | "assinatura"
  price: number
  quantity: number
  image: string
  creator: string
}

interface OrderSummaryProps {
  items: CartItem[]
  onCheckout: () => void
}

export default function OrderSummary({ items, onCheckout }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      <div className="bg-cyber-gray/80 border border-cyber-cyan/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
        <h3 className="text-xl font-bold text-cyber-cyan mb-4 font-mono neon-text">[RESUMO_PEDIDO]</h3>
        <div className="space-y-3 font-mono">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal:</span>
            <span className="text-white">R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Taxa de processamento:</span>
            <span className="text-white">R$ {tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-cyber-cyan/30 pt-3">
            <div className="flex justify-between">
              <span className="text-cyber-green font-bold">Total:</span>
              <span className="text-cyber-green font-bold text-xl">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        {items.length > 0 && (
          <button
            onClick={onCheckout}
            className="w-full mt-6 bg-gradient-to-r from-cyber-green to-cyber-cyan hover:from-cyber-pink hover:to-cyber-purple font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyber-green/50 neon-text font-mono"
          >
            {">>> FINALIZAR_COMPRA"}
          </button>
        )}
      </div>

      {/* Security Info */}
      <div className="bg-cyber-gray/80 border border-cyber-green/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-cyber-green" />
          <h3 className="text-lg font-bold text-cyber-green font-mono">[SEGURANÇA]</h3>
        </div>
        <ul className="space-y-2 font-mono text-sm text-gray-300">
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-cyber-green" />
            <span>Pagamento 100% seguro</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-cyber-green" />
            <span>Dados criptografados</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-cyber-green" />
            <span>Garantia de 30 dias</span>
          </li>
        </ul>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-br from-cyber-pink/20 to-cyber-purple/20 border border-cyber-pink/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
        <h3 className="text-lg font-bold text-cyber-pink mb-3 font-mono neon-text">[NOSSA_MISSÃO]</h3>
        <p className="text-gray-300 font-mono text-sm leading-relaxed">
          Cada compra é um voto pela preservação da criatividade humana. Você não está apenas adquirindo uma
          experiência, está investindo no futuro da arte e da expressão humana.
        </p>
      </div>
    </div>
  )
}
