"use client"

import { Check } from "lucide-react"

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  period: "mensal" | "anual"
  features: string[]
  popular?: boolean
}

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[]
  selectedPlan: string | null
  onSelectPlan: (planId: string) => void
}

export default function SubscriptionPlans({ plans, selectedPlan, onSelectPlan }: SubscriptionPlansProps) {
  return (
    <div className="bg-cyber-gray/80 border border-cyber-purple/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-cyber-purple mb-6 font-mono neon-text">[PLANOS_PREMIUM]</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative border rounded-lg p-4 transition-all duration-300 ${
              plan.popular
                ? "border-cyber-pink bg-cyber-pink/10"
                : selectedPlan === plan.id
                  ? "border-cyber-green bg-cyber-green/10"
                  : "border-cyber-gray bg-cyber-gray/20 hover:border-cyber-cyan"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-cyber-pink text-white px-3 py-1 rounded-full font-mono text-xs">MAIS POPULAR</span>
              </div>
            )}
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold text-white font-mono mb-2">{plan.name}</h4>
              <div className="text-3xl font-bold text-cyber-green font-mono">R$ {plan.price.toFixed(2)}</div>
              <div className="text-gray-400 font-mono text-sm">/{plan.period}</div>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-cyber-green mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 font-mono text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelectPlan(plan.id)}
              className={`w-full py-2 px-4 rounded-lg font-mono text-sm transition-all duration-300 ${
                selectedPlan === plan.id
                  ? "bg-cyber-green text-cyber-dark"
                  : "bg-cyber-gray border border-cyber-cyan/30 text-cyber-cyan hover:border-cyber-cyan"
              }`}
            >
              {selectedPlan === plan.id ? "✓ SELECIONADO" : ">>> SELECIONAR"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
