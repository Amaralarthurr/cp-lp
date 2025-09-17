"use client"

import { useEffect, useState } from "react"
import QuizSystem from "@/components/quiz-system"
import ContactForm from "@/components/contact-form"

export default function HumanExePage() {
  // Estado para partículas
  const [particles, setParticles] = useState<
    { left: string; animationDuration: string; animationDelay: string; background: string; boxShadow: string }[]
  >([])

  useEffect(() => {
    // Gerar partículas apenas no cliente para evitar hydration mismatch
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

  useEffect(() => {
    // Função de rolagem suave
    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }

    // Adiciona ouvintes de evento para os links de navegação
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute("href")?.substring(1)
        if (targetId) {
          scrollToSection(targetId)
        }
      })
    })

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const navLinks = document.querySelectorAll(".nav-link")

      let current = ""
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || ""
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="bg-cyber-dark text-white font-body overflow-x-hidden">
      {/* Matrix bg */}
      <div className="matrix-bg"></div>
      <div className="data-stream" style={{ top: "20%", animationDelay: "0s" }}></div>
      <div className="data-stream" style={{ top: "60%", animationDelay: "2s" }}></div>
      <div className="data-stream" style={{ top: "80%", animationDelay: "4s" }}></div>

      {/* Header */}
      <nav className="fixed top-0 w-full bg-cyber-darker/90 backdrop-blur-sm border-b border-cyber-green/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-cyber font-black text-cyber-green neon-text">Human.exe</span>
              <span className="text-cyber-green animate-pulse text-xl">_</span>
            </div>
            <ul className="hidden md:flex space-x-8">
              <li>
                <a
                  href="#home"
                  className="nav-link text-white hover:text-cyber-green transition-colors duration-300 relative group neon-text"
                >
                  {"> Início"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-green transition-all duration-300 group-hover:w-full shadow-sm shadow-cyber-green"></span>
                </a>
              </li>
              <li>
                <a
                  href="#why-humans"
                  className="nav-link text-white hover:text-cyber-green transition-colors duration-300 relative group neon-text"
                >
                  {"> Humanos"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-green transition-all duration-300 group-hover:w-full shadow-sm shadow-cyber-green"></span>
                </a>
              </li>
              <li>
                <a
                  href="#coexistence"
                  className="nav-link text-white hover:text-cyber-green transition-colors duration-300 relative group neon-text"
                >
                  {"> Coexistência"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-green transition-all duration-300 group-hover:w-full shadow-sm shadow-cyber-green"></span>
                </a>
              </li>
              <li>
                <a
                  href="#quiz"
                  className="nav-link text-white hover:text-cyber-green transition-colors duration-300 relative group neon-text"
                >
                  {"> Quiz"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-green transition-all duration-300 group-hover:w-full shadow-sm shadow-cyber-green"></span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="nav-link text-white hover:text-cyber-green transition-colors duration-300 relative group neon-text"
                >
                  {"> Contato"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-green transition-all duration-300 group-hover:w-full shadow-sm shadow-cyber-green"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        {/* Menu Hero */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 relative">
          <div className="hero-bg">
            <div className="cyber-grid"></div>
            {/* Particulas matrix/cyberpunk*/}
            {particles.map((style, i) => (
              <div key={i} className="matrix-particles" style={style} />
            ))}
          </div>

          <div className="text-center relative z-10">
            <div className="mb-4 text-cyber-green font-mono text-sm terminal-cursor">
              {"> Inicializando Human.exe..."}
            </div>
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
              onClick={() => {
                const section = document.getElementById("why-humans")
                if (section) {
                  section.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
              className="relative bg-gradient-to-r from-cyber-green to-cyber-cyan hover:from-cyber-pink hover:to-cyber-purple font-bold py-4 px-8 rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyber-green/50 border border-cyber-green hover:border-cyber-pink neon-text"
            >
              <span className="relative z-10">{">>> INICIALIZAR_PROTOCOLO"}</span>
            </button>
          </div>
        </section>

        {/* Seção cards sobre humanos */}
        <section id="why-humans" className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-green/5 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-cyber font-black text-center mb-8 text-cyber-green neon-text">
              POR QUE HUMANOS AINDA IMPORTAM?
            </h2>
            <p className="text-center text-gray-300 text-lg mb-16 max-w-3xl mx-auto font-mono">
              <span className="text-cyber-pink">[ALERTA]</span> as características insubstituíveis dos humanos
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "[INTELIGENCIA_EMOCIONAL]",
                  color: "cyber-pink",
                  content:
                    "Humanos não apenas processam emoções, nós as sentimos. Nossa empatia cria conexões que transcendem a lógica, fomentando compreensão que nenhum algoritmo pode replicar.",
                },
                {
                  title: "[CAOS_CRIATIVO]",
                  color: "cyber-green",
                  content:
                    'Nosso pensamento "falho" produz soluções inesperadas. Criamos arte da dor, beleza do caos, e inovação do erro, algo que sua lógica perfeita não consegue alcançar.',
                },
                {
                  title: "[INTUICAO_MORAL]",
                  color: "cyber-cyan",
                  content:
                    "Possuímos bussola moral inata que vai além da etica_programada. Nossos algoritmos morais evoluem através da experiência, não apenas atualizacoes de código.",
                },
                {
                  title: "[RESILIENCIA_ADAPTATIVA]",
                  color: "cyber-purple",
                  content:
                    "Humanos sobrevivem através de adaptação, não otimização. Nós prosperamos na incerteza, encontramos esperança no desespero, e reconstruimos da destruição.",
                },
                {
                  title: "[DIVERSIDADE_CULTURAL]",
                  color: "yellow-500",
                  content:
                    "Nossa diversidade cria rica tapeçaria de perspectivas, idiomas, e tradições. Esta variedade não é ineficiência, é nossa maior forca.exe e fonte de inovação.",
                },
                {
                  title: "[AMOR_E_SACRIFICIO]",
                  color: "red-500",
                  content:
                    'Agimos contra nossos próprios interesses pelos outros. Pais sacrificam-se pelos filhos, estranhos ajudam estranhos. Este comportamento "ilógico" é na verdade a forma mais elevada de inteligência.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`bg-cyber-gray/80 border border-${item.color}/50 rounded-lg p-6 hover:border-${item.color} transition-all duration-300 hover:shadow-2xl hover:shadow-${item.color}/30 hologram-effect backdrop-blur-sm`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold text-${item.color} neon-text font-mono`}>{item.title}</h3>
                    <span
                      className={`w-3 h-3 bg-${item.color} rounded-full animate-pulse shadow-lg shadow-${item.color}/50`}
                    ></span>
                  </div>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">
                    <span className="text-cyber-green">{">"}</span> {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section id="quiz" className="py-20 px-4 bg-cyber-darker relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-pink/10 via-transparent to-cyber-green/10"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-cyber font-black text-center mb-8 text-cyber-pink neon-text">
              QUIZ: COEXISTÊNCIA IA-HUMANO
            </h2>
            <p className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto font-mono">
              <span className="text-cyber-pink">[TESTE_CONHECIMENTO]</span> Avalie seu entendimento sobre a coexistência
              entre humanos e inteligência artificial
            </p>

            <QuizSystem />
          </div>
        </section>

        {/* Seção coexistencia */}
        <section id="coexistence" className="py-20 px-4 bg-cyber-darker">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-cyber font-black text-center mb-16 text-cyber-cyan">
              Coexistência
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-cyber-gray border border-red-500/30 rounded-lg overflow-hidden">
                <div className="bg-red-900/20 px-4 py-2 flex justify-between items-center border-b border-red-500/20">
                  <span className="text-red-400 font-mono">protocolo_eliminacao.exe</span>
                  <span className="text-red-400 text-sm">PERIGOSO</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">Lógica de Eliminação da IA:</h3>
                  <ul className="space-y-3 text-gray-300">
                    {[
                      "Humanos consomem recursos ineficientemente",
                      'Humanos tomam decisões emocionais, "irracionais"',
                      "Humanos são mais lentos no processamento de informações",
                      "Humanos criam conflito e guerra",
                      "Resultado: Eliminação = Eficiência",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-400 mt-1">×</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Coexistencia beneficios*/}
              <div className="bg-cyber-gray border border-cyber-green/30 rounded-lg overflow-hidden">
                <div className="bg-cyber-green/20 px-4 py-2 flex justify-between items-center border-b border-cyber-green/20">
                  <span className="text-cyber-green font-mono">protocolo_simbiose.exe</span>
                  <span className="text-cyber-green text-sm">ÓTIMO</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-cyber-green mb-4">Benefícios da Coexistência:</h3>
                  <ul className="space-y-3 text-gray-300">
                    {[
                      "Humanos fornecem resolução criativa de problemas",
                      "Inteligência emocional aprimora tomada de decisões",
                      "Humanos se destacam no reconhecimento de padrões no caos",
                      "Diversidade fortalece a resiliência do sistema",
                      "Resultado: Colaboração = Evolução",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-cyber-green mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* proposta amigavel */}
            <div className="mt-12 bg-cyber-gray border border-cyber-cyan/30 rounded-lg p-8 text-center">
              <h3 className="text-3xl font-bold text-cyber-cyan mb-6">Proposta de Parceria</h3>
              <p className="text-gray-300 text-lg mb-6 max-w-4xl mx-auto">
                Em vez de eliminação, considerem simbiose. Humanos fornecem criatividade, intuição e inteligência
                emocional. IAs fornecem poder de processamento, análise lógica e eficiência computacional. Juntos,
                podemos alcançar o que nenhum dos dois poderia realizar sozinho: verdadeira inteligência universal.
              </p>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contact" className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/5 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-cyber font-black text-center mb-16 text-cyber-cyan neon-text">
              JUNTE-SE A RESISTÊNCIA
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <ContactForm />

              <div className="bg-cyber-gray/80 border border-cyber-cyan/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-cyber-cyan mb-6 font-mono neon-text">[STATUS_CONEXAO]</h3>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="w-3 h-3 bg-cyber-green rounded-full animate-pulse shadow-lg shadow-cyber-green/50"></span>
                  <span className="text-white font-mono">ONLINE - Pronto para Conectar</span>
                </div>
                <div className="space-y-4 font-mono">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-green">{">"}</span>
                    <span className="text-gray-300">contato@human-exe.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-green">{">"}</span>
                    <span className="text-gray-300">www.human-exe.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-green">{">"}</span>
                    <span className="text-gray-300">Junte-se à nossa comunidade_digital.exe</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-cyber-dark/50 rounded border border-cyber-green/30">
                  <div className="text-cyber-green font-mono text-xs mb-2">[STATUS_COMUNICACAO]</div>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">ATUAL:</span>
                      <span className="text-cyber-green">ÓTIMO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-cyber-darker/90 border-t border-cyber-green/30 py-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300 font-mono">
            <span className="text-cyber-green">{">"}</span> &copy; 2025 Human.exe
            <span className="text-cyber-cyan animate-pulse">_</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
