"use client"

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 relative">
      <div className="text-center relative z-10">
        <div className="mb-4 text-cyber-green font-mono text-sm terminal-cursor">{"> Inicializando Human.exe..."}</div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-cyber font-black mb-8 relative">
          <span
            className="glitch text-white neon-text"
            data-text="HUMAN.EXE"
            style={{ textShadow: "0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41" }}
          >
            HUMAN.EXE
          </span>
        </h1>
        <div className="mb-8 text-cyber-pink font-mono text-lg hologram-effect p-2">
          [ STATUS: PROTOCOLO_PRESERVACAO_HUMANIDADE_ATIVO ]
        </div>

        <button
          onClick={() => scrollToSection("why-humans")}
          className="relative bg-gradient-to-r from-cyber-green to-cyber-cyan hover:from-cyber-pink hover:to-cyber-purple font-bold py-4 px-8 rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyber-green/50 border border-cyber-green hover:border-cyber-pink neon-text"
        >
          <span className="relative z-10">{">>> INICIALIZAR_PROTOCOLO"}</span>
        </button>
      </div>
    </section>
  )
}
