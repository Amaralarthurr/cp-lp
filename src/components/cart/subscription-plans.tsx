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
      <h2 className="text-xl font-bold text-cyber-purple mb-4 font-mono neon-text">[PLANOS_DE_ASSINATURA]</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
              selectedPlan === plan.id
                ? "border-cyber-purple bg-cyber-purple/20"
                : "border-cyber-purple/30 hover:border-cyber-purple/50"
            } ${plan.popular ? "ring-2 ring-cyber-pink/50" : ""}`}
            onClick={() => onSelectPlan(plan.id)}
          >
            {plan.popular && <div className="text-cyber-pink text-xs font-mono mb-2 text-center">MAIS POPULAR</div>}
            <h3 className="font-bold text-white font-mono text-center mb-2">{plan.name}</h3>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-cyber-purple font-mono">R$ {plan.price}</div>
              <div className="text-gray-400 text-xs font-mono">/{plan.period}</div>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <Check className="w-4 h-4 text-cyber-green mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 font-mono">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
