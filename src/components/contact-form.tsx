"use client"

import type React from "react"

import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("sending")

    setTimeout(() => {
      setSubmitStatus("sent")
      setTimeout(() => {
        setSubmitStatus("idle")
        setIsSubmitting(false)
        setFormData({ name: "", email: "", message: "" })
      }, 2000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="bg-cyber-gray/80 border border-cyber-cyan/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
      <div className="mb-4 text-cyber-green font-mono text-sm">{"> Inicializando comunicacao..."}</div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-cyber-cyan font-bold mb-2 font-mono">
            [NOME_USUARIO]
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-cyber-dark/80 border border-cyber-cyan/30 rounded px-4 py-2 text-white focus:border-cyber-cyan focus:outline-none transition-colors font-mono backdrop-blur-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-cyber-cyan font-bold mb-2 font-mono">
            [ENDERECO_EMAIL]
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-cyber-dark/80 border border-cyber-cyan/30 rounded px-4 py-2 text-white focus:border-cyber-cyan focus:outline-none transition-colors font-mono backdrop-blur-sm"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-cyber-cyan font-bold mb-2 font-mono">
            [SUA_MENSAGEM]
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full bg-cyber-dark/80 border border-cyber-cyan/30 rounded px-4 py-2 text-white focus:border-cyber-cyan focus:outline-none transition-colors resize-none font-mono backdrop-blur-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-green hover:from-cyber-pink hover:to-cyber-purple text-white font-bold py-3 px-6 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyber-cyan/50 neon-text font-mono disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-white">
            {submitStatus === "idle" && ">>> TRANSMITIR_MENSAGEM"}
            {submitStatus === "sending" && "Transmitting..."}
            {submitStatus === "sent" && "Message Sent!"}
          </span>
        </button>
      </form>
    </div>
  )
}
