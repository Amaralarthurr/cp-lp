"use client"
import CheckoutForm from "@/components/cart/checkout-form"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import CartNavigation from "@/components/cart/cart-navigation"
import CartItems from "@/components/cart/cart-items"
import SubscriptionPlans from "@/components/cart/subscription-plans"
import OrderSummary from "@/components/cart/order-summary"

interface CartItem {
  id: string
  title: string
  type: "experiência" | "assinatura"
  price: number
  quantity: number
  image: string
  creator: string
}

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  period: "mensal" | "anual"
  features: string[]
  popular?: boolean
}

interface CheckoutFormData {
  email: string
  name: string
  paymentMethod: "card" | "pix"
  cardNumber: string
  expiryDate: string
  cvv: string
  billingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Explorador Humano",
    price: 29.9,
    period: "mensal",
    features: [
      "Acesso a 10 experiências por mês",
      "Biblioteca de arte digital",
      "Suporte da comunidade",
      "Downloads em HD",
    ],
  },
  {
    id: "premium",
    name: "Guardião da Criatividade",
    price: 59.9,
    period: "mensal",
    popular: true,
    features: [
      "Acesso ilimitado a todas as experiências",
      "Conteúdo exclusivo de criadores",
      "Sessões ao vivo com artistas",
      "Downloads em 4K",
      "Acesso antecipado a novos lançamentos",
      "Suporte prioritário",
    ],
  },
  {
    id: "annual",
    name: "Protetor da Humanidade",
    price: 499.9,
    period: "anual",
    features: [
      "Todos os benefícios do plano Premium",
      "2 meses grátis (economia de R$ 119,80)",
      "Certificado de Apoiador da Arte Humana",
      "Acesso vitalício a experiências selecionadas",
      "Encontros exclusivos com criadores",
      "Influência nas próximas experiências",
    ],
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const mockItems: CartItem[] = [
      {
        id: "1",
        title: "Memórias de Chuva Digital",
        type: "experiência",
        price: 89.9,
        quantity: 1,
        image: "/neon-city.jpg",
        creator: "Ana Silva",
      },
    ]
    setCartItems(mockItems)
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const addSubscription = (planId: string) => {
    const plan = subscriptionPlans.find((p) => p.id === planId)
    if (!plan) return

    const subscriptionItem: CartItem = {
      id: `sub-${planId}`,
      title: plan.name,
      type: "assinatura",
      price: plan.price,
      quantity: 1,
      image: "/service-img.jpg",
      creator: "Human.exe",
    }

    setCartItems((prev) => {
      const withoutSubs = prev.filter((item) => item.type !== "assinatura")
      return [...withoutSubs, subscriptionItem]
    })
    setSelectedPlan(planId)
  }

  const handleCheckout = () => {
    setStep("checkout")
  }

  const handleCheckoutSubmit = async (_data: CheckoutFormData) => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setStep("success")
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-cyber-dark text-white flex items-center justify-center">
        <div className="matrix-bg"></div>
        <div className="text-center relative z-10">
          <div className="w-24 h-24 bg-cyber-green/20 border-2 border-cyber-green rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-cyber-green" />
          </div>
          <h1 className="text-4xl font-cyber font-black text-cyber-green neon-text mb-4">COMPRA REALIZADA!</h1>
          <p className="text-gray-300 font-mono text-lg mb-8 max-w-md">
            Obrigado por manter a criatividade humana viva. Suas experiências estão sendo preparadas.
          </p>
          <div className="space-y-4">
            <Link
              href="/experience/1"
              className="block bg-gradient-to-r from-cyber-green to-cyber-cyan hover:from-cyber-pink hover:to-cyber-purple font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 neon-text font-mono"
            >
              {">>> ACESSAR_MINHAS_EXPERIÊNCIAS"}
            </Link>
            <Link href="/" className="block text-cyber-cyan hover:text-cyber-green transition-colors font-mono">
              {"Voltar ao início"}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      <div className="matrix-bg"></div>
      <div className="data-stream" style={{ top: "20%", animationDelay: "0s" }}></div>
      <div className="data-stream" style={{ top: "60%", animationDelay: "2s" }}></div>

      <CartNavigation step={step} />

      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === "cart" && (
            <>
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-cyber font-black text-cyber-green neon-text mb-4">
                  CARRINHO DE EXPERIÊNCIAS
                </h1>
                <p className="text-gray-300 text-lg font-mono">
                  <span className="text-cyber-pink">[MISSÃO]</span> Cada compra mantém a criatividade humana viva
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <CartItems items={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />

                  <SubscriptionPlans
                    plans={subscriptionPlans}
                    selectedPlan={selectedPlan}
                    onSelectPlan={addSubscription}
                  />
                </div>

                <OrderSummary items={cartItems} onCheckout={handleCheckout} />
              </div>
            </>
          )}

          {step === "checkout" && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-cyber font-black text-cyber-green neon-text mb-4">
                  FINALIZAR COMPRA
                </h1>
                <p className="text-gray-300 text-lg font-mono">
                  <span className="text-cyber-pink">[SEGURO]</span> Seus dados estão protegidos por criptografia
                  quântica
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <CheckoutForm onSubmit={handleCheckoutSubmit} isProcessing={isProcessing} />
                </div>

                <div className="space-y-6">
                  <div className="bg-cyber-gray/80 border border-cyber-green/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-cyber-green mb-4 font-mono neon-text">[RESUMO_FINAL]</h3>
                    <div className="space-y-3 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between font-mono text-sm">
                          <span className="text-gray-300">
                            {item.title} x{item.quantity}
                          </span>
                          <span className="text-white">R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-cyber-green/30 pt-3">
                        <div className="flex justify-between font-mono">
                          <span className="text-gray-300">Subtotal:</span>
                          <span className="text-white">
                            R$ {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span className="text-gray-300">Impostos:</span>
                          <span className="text-white">
                            R$ {(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between font-mono font-bold text-lg mt-2">
                          <span className="text-cyber-green">Total:</span>
                          <span className="text-cyber-green">
                            R$ {(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyber-gray/80 border border-cyber-pink/50 rounded-lg p-4 hologram-effect backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-cyber-pink font-mono text-xs mb-2">[GARANTIA_SEGURANÇA]</div>
                      <div className="text-gray-300 font-mono text-xs">
                        🔒 Criptografia SSL 256-bit
                        <br />
                        🛡️ Dados protegidos
                        <br />⚡ Processamento instantâneo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
