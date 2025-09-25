"use client"

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
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <div className="bg-cyber-gray/80 border border-cyber-green/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
      <h2 className="text-xl font-bold text-cyber-green mb-4 font-mono ">[RESUMO_PEDIDO]</h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between font-mono">
          <span className="text-gray-300">Subtotal:</span>
          <span className="text-white">R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-mono">
          <span className="text-gray-300">Impostos:</span>
          <span className="text-white">R$ {tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-cyber-green/30 pt-3">
          <div className="flex justify-between font-mono font-bold">
            <span className="text-cyber-green">Total:</span>
            <span className="text-cyber-green">R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full bg-gradient-to-r from-cyber-green to-cyber-cyan hover:from-cyber-pink hover:to-cyber-purple font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyber-green/50  font-mono disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {">>> FINALIZAR_COMPRA"}
      </button>
    </div>
  )
}
