"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Lock, Shield, QrCode, Copy, Check } from "lucide-react"

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

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void
  isProcessing: boolean
}

export default function CheckoutForm({ onSubmit, isProcessing }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    name: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  })

  const [pixCode, setPixCode] = useState("")
  const [pixCopied, setPixCopied] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("billingAddress.")) {
      const addressField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const generatePixCode = () => {
    const randomCode = `00020126580014BR.GOV.BCB.PIX013636401234-5678-9012-3456-789012345678520400005303986540${(Math.random() * 1000 + 100).toFixed(2)}5802BR5925HUMAN EXE DIGITAL STORE6009SAO PAULO62070503***6304${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    setPixCode(randomCode)
  }

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      setPixCopied(true)
      setTimeout(() => setPixCopied(false), 2000)
    } catch (err) {
      console.error("Erro ao copiar código PIX:", err)
    }
  }

  const handlePaymentMethodChange = (method: "card" | "pix") => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }))
    if (method === "pix") {
      generatePixCode()
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="bg-cyber-gray/80 border border-cyber-green/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-cyber-green" />
          <h3 className="text-xl font-bold text-cyber-green font-mono neon-text">[INFORMAÇÕES_CONTATO]</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-cyber-cyan font-mono text-sm mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full bg-cyber-darker border border-cyber-green/30 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-green focus:outline-none transition-colors"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-cyber-cyan font-mono text-sm mb-2">Nome Completo</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full bg-cyber-darker border border-cyber-green/30 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-green focus:outline-none transition-colors"
              placeholder="Seu Nome Completo"
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-cyber-gray/80 border border-cyber-purple/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="w-5 h-5 text-cyber-purple" />
          <h3 className="text-xl font-bold text-cyber-purple font-mono neon-text">[MÉTODO_PAGAMENTO]</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => handlePaymentMethodChange("card")}
            className={`p-4 rounded-lg border-2 transition-all duration-300 font-mono ${
              formData.paymentMethod === "card"
                ? "border-cyber-purple bg-cyber-purple/20 text-cyber-purple neon-text"
                : "border-cyber-gray text-gray-400 hover:border-cyber-purple/50"
            }`}
          >
            <CreditCard className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm">CARTÃO</div>
          </button>

          <button
            type="button"
            onClick={() => handlePaymentMethodChange("pix")}
            className={`p-4 rounded-lg border-2 transition-all duration-300 font-mono ${
              formData.paymentMethod === "pix"
                ? "border-cyber-green bg-cyber-green/20 text-cyber-green neon-text"
                : "border-cyber-gray text-gray-400 hover:border-cyber-green/50"
            }`}
          >
            <QrCode className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm">PIX</div>
          </button>
        </div>

        {formData.paymentMethod === "card" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-cyber-cyan font-mono text-sm mb-2">Número do Cartão</label>
              <input
                type="text"
                required
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                className="w-full bg-cyber-darker border border-cyber-purple/30 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-purple focus:outline-none transition-colors"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-cyber-cyan font-mono text-sm mb-2">Validade</label>
                <input
                  type="text"
                  required
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                  className="w-full bg-cyber-darker border border-cyber-purple/30 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-purple focus:outline-none transition-colors"
                  placeholder="MM/AA"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-cyber-cyan font-mono text-sm mb-2">CVV</label>
                <input
                  type="text"
                  required
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-cyber-darker border border-cyber-purple/30 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-purple focus:outline-none transition-colors"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-cyber-darker border border-cyber-green/30 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white p-4 rounded-lg">
                  <QrCode className="w-32 h-32 text-black" />
                </div>
              </div>
              <div className="text-center mb-4">
                <p className="text-cyber-green font-mono text-sm mb-2">[QR_CODE_PIX]</p>
                <p className="text-gray-400 font-mono text-xs">Escaneie o código ou copie o código abaixo</p>
              </div>

              {pixCode && (
                <div className="bg-cyber-gray/50 border border-cyber-green/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyber-cyan font-mono text-sm">Código PIX:</span>
                    <button
                      type="button"
                      onClick={copyPixCode}
                      className="flex items-center space-x-2 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green/50 rounded px-3 py-1 transition-colors"
                    >
                      {pixCopied ? (
                        <>
                          <Check className="w-4 h-4 text-cyber-green" />
                          <span className="text-cyber-green font-mono text-xs">COPIADO</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-cyber-green" />
                          <span className="text-cyber-green font-mono text-xs">COPIAR</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-cyber-darker rounded p-3 font-mono text-xs text-gray-300 break-all">{pixCode}</div>
                </div>
              )}

              <div className="mt-4 text-center">
                <p className="text-cyber-yellow font-mono text-sm">⚠️ PAGAMENTO_INSTANTÂNEO</p>
                <p className="text-gray-400 font-mono text-xs mt-1">
                  Após o pagamento, você receberá a confirmação em até 2 minutos
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Billing Address */}
      {formData.paymentMethod === "card" && (
        <div className="bg-cyber-gray/80 border border-cyber-cyan/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Lock className="w-5 h-5 text-cyber-cyan" />
            <h3 className="text-xl font-bold text-cyber-cyan font-mono neon-text">[ENDEREÇO_COBRANÇA]</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-cyber-cyan font-mono text-sm mb-2">Endereço</label>
              <input
                type="text"
                required
                value={formData.billingAddress.street}
                onChange={(e) => handleInputChange("billingAddress.street", e.target.value)}
                className="w-full bg-cyber-darker border border-cyber-cyan/30 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-cyan focus:outline-none transition-colors"
                placeholder="Rua, número, complemento"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-cyber-cyan font-mono text-sm mb-2">Cidade</label>
                <input
                  type="text"
                  required
                  value={formData.billingAddress.city}
                  onChange={(e) => handleInputChange("billingAddress.city", e.target.value)}
                  className="w-full bg-cyber-darker border border-cyber-cyan/30 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-cyan focus:outline-none transition-colors"
                  placeholder="Cidade"
                />
              </div>
              <div>
                <label className="block text-cyber-cyan font-mono text-sm mb-2">Estado</label>
                <input
                  type="text"
                  required
                  value={formData.billingAddress.state}
                  onChange={(e) => handleInputChange("billingAddress.state", e.target.value.toUpperCase())}
                  className="w-full bg-cyber-darker border border-cyber-cyan/30 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-cyan focus:outline-none transition-colors"
                  placeholder="SP"
                  maxLength={2}
                />
              </div>
            </div>
            <div>
              <label className="block text-cyber-cyan font-mono text-sm mb-2">CEP</label>
              <input
                type="text"
                required
                value={formData.billingAddress.zipCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  const formatted = value.length > 5 ? `${value.slice(0, 5)}-${value.slice(5, 8)}` : value
                  handleInputChange("billingAddress.zipCode", formatted)
                }}
                className="w-full bg-cyber-darker border border-cyber-cyan/30 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-cyan focus:outline-none transition-colors"
                placeholder="12345-678"
                maxLength={9}
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-cyber-green to-cyber-cyan hover:from-cyber-pink hover:to-cyber-purple font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyber-green/50 neon-text font-mono disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isProcessing
          ? formData.paymentMethod === "pix"
            ? ">>> AGUARDANDO_PIX..."
            : ">>> PROCESSANDO_PAGAMENTO..."
          : formData.paymentMethod === "pix"
            ? ">>> GERAR_PIX"
            : ">>> CONFIRMAR_PAGAMENTO"}
      </button>
    </form>
  )
}
