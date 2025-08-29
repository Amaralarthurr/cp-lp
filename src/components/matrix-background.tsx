"use client"

import { useEffect, useState } from "react"

export default function MatrixBackground() {
  const [particles, setParticles] = useState<
    { left: string; animationDuration: string; animationDelay: string; background: string; boxShadow: string }[]
  >([])

  useEffect(() => {
    const colors = [
      { background: "#00ff41", boxShadow: "0 0 6px #00ff41" },
      { background: "#ff0080", boxShadow: "0 0 6px #ff0080" },
      { background: "#0891b2", boxShadow: "0 0 6px #0891b2" },
    ]
    const generated = Array.from({ length: 10 }, (_, i) => {
      const color = colors[i % 3]
      return {
        left: `${(i + 1) * 10}%`,
        animationDuration: `${Math.random() * 8 + 12}s`,
        animationDelay: `${Math.random() * 4}s`,
        background: color.background,
        boxShadow: color.boxShadow,
      }
    })
    setParticles(generated)
  }, [])

  return (
    <>
      <div className="matrix-bg"></div>
      <div className="data-stream" style={{ top: "20%", animationDelay: "0s" }}></div>
      <div className="data-stream" style={{ top: "60%", animationDelay: "2s" }}></div>
      <div className="data-stream" style={{ top: "80%", animationDelay: "4s" }}></div>

      <div className="hero-bg">
        <div className="cyber-grid"></div>
        {particles.map((style, i) => (
          <div key={i} className="matrix-particles" style={style} />
        ))}
      </div>
    </>
  )
}
