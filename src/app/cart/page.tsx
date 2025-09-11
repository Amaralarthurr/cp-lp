"use client"

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

  // Mock cart items - em um app real, isso viria do estado global ou localStorage
  useEffect(() => {
    const mockItems: CartItem[] = [
      {
        id: "1",
        title: "Memórias de Chuva Digital",
        type: "experiência",
        price: 89.9,
        quantity: 1,
        image: "digital-rain-art-cyberpunk-emotional.jpg",
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
      image: "placeholder.svg?key=subscription",
      creator: "Human.exe",
    }

    setCartItems((prev) => {
      // Remove outras assinaturas
      const withoutSubs = prev.filter((item) => item.type !== "assinatura")
      return [...withoutSubs, subscriptionItem]
    })
    setSelectedPlan(planId)
  }

  const handleCheckout = () => {
    setStep("checkout")
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
              href="/dashboard"
              className="block bg-gradient-to-r from-cyber-green to-cyber-cyan hover:from-cyber-pink hover:to-cyber-purple font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 neon-text font-mono"
            >
              {">>> ACESSAR_MINHAS_EXPERIÊNCIAS"}
            </Link>
            <Link href="/" className="block text-cyber-cyan hover:text-cyber-green transition-colors font-mono">
              {"< Voltar ao início"}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      {/* Background Effects */}
      <div className="matrix-bg"></div>
      <div className="data-stream" style={{ top: "20%", animationDelay: "0s" }}></div>
      <div className="data-stream" style={{ top: "60%", animationDelay: "2s" }}></div>

      {/* Navigation */}
      <CartNavigation step={step} />

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === "cart" && (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-cyber font-black text-cyber-green neon-text mb-4">
                  CARRINHO DE EXPERIÊNCIAS
                </h1>
                <p className="text-gray-300 text-lg font-mono">
                  <span className="text-cyber-pink">[MISSÃO]</span> Cada compra mantém a criatividade humana viva
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  <CartItems items={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />

                  <SubscriptionPlans
                    plans={subscriptionPlans}
                    selectedPlan={selectedPlan}
                    onSelectPlan={addSubscription}
                  />
                </div>

                {/* Order Summary */}
                <OrderSummary items={cartItems} onCheckout={handleCheckout} />
              </div>
            </>
          )}

          {step === "checkout" && (
            <div className="text-center py-20">
              <h1 className="text-4xl font-cyber font-black text-cyber-green neon-text mb-4">
                CHECKOUT EM DESENVOLVIMENTO
              </h1>
              <p className="text-gray-300 font-mono mb-8">Esta funcionalidade será implementada em breve.</p>
              <button
                onClick={() => setStep("success")}
                className="bg-gradient-to-r from-cyber-green to-cyber-cyan hover:from-cyber-pink hover:to-cyber-purple font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 neon-text font-mono"
              >
                {">>> SIMULAR_COMPRA"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
