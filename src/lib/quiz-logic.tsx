"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export default function ScrollToSection() {
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    correct: 0,
    streak: 0,
    timeLeft: 15,
    timer: null as NodeJS.Timeout | null,
    startTime: null as number | null,
    bestScore: 0,
    achievements: [] as string[],
    totalQuizzes: 0,
    totalCorrect: 0,
    bestStreak: 0,
    isPlaying: false,
  })

  const [konamiCode, setKonamiCode] = useState<string[]>([])
  const particleContainerRef = useRef<HTMLDivElement | null>(null)

  const quizQuestions = [
    {
      question: "Qual é o principal benefício da colaboração entre humanos e IA?",
      options: [
        "Substituição completa dos humanos",
        "Combinação de criatividade humana com eficiência da IA",
        "Eliminação de erros humanos",
        "Redução de custos operacionais",
      ],
      correct: 1,
      explanation:
        "A colaboração permite combinar o melhor dos dois mundos: criatividade e intuição humana com processamento e eficiência da IA.",
    },
    {
      question: "Por que a diversidade humana é importante na era da IA?",
      options: [
        "Para criar mais dados de treinamento",
        "Para manter tradições antigas",
        "Para fornecer perspectivas únicas que enriquecem soluções",
        "Para competir com máquinas",
      ],
      correct: 2,
      explanation:
        "A diversidade humana oferece perspectivas variadas que levam a soluções mais criativas e inclusivas, algo que a IA sozinha não consegue replicar.",
    },
    {
      question: "Qual característica humana é mais difícil de replicar em IA?",
      options: [
        "Velocidade de processamento",
        "Memória de longo prazo",
        "Empatia e inteligência emocional",
        "Cálculos matemáticos",
      ],
      correct: 4,
      explanation:
        "A empatia e inteligência emocional envolvem compreensão profunda de contextos sociais e emocionais que vão além do processamento lógico.",
    },
    {
      question: "Como a IA pode complementar a tomada de decisão humana?",
      options: [
        "Substituindo completamente o julgamento humano",
        "Fornecendo análises de dados para informar decisões",
        "Tomando todas as decisões automaticamente",
        "Ignorando fatores emocionais",
      ],
      correct: 3,
      explanation:
        "A IA pode processar grandes volumes de dados e identificar padrões, fornecendo informações valiosas para que humanos tomem decisões mais informadas.",
    },
    {
      question: "Qual é o maior risco de uma sociedade sem colaboração humano-IA?",
      options: [
        "Perda de eficiência tecnológica",
        "Perda da criatividade e inovação humana",
        "Aumento dos custos de produção",
        "Redução da velocidade de processamento",
      ],
      correct: 2,
      explanation:
        "Sem colaboração, perdemos a capacidade humana única de inovação criativa, pensamento lateral e resolução de problemas complexos.",
    },
    {
      question: "Por que humanos são essenciais em decisões éticas?",
      options: [
        "Porque são mais rápidos que IA",
        "Porque possuem valores morais e contexto cultural",
        "Porque são mais precisos",
        "Porque custam menos",
      ],
      correct: 4,
      explanation:
        "Humanos trazem valores morais, contexto cultural e compreensão de nuances éticas que são fundamentais para decisões que afetam a sociedade.",
    },
    {
      question: "Como a IA pode ajudar a amplificar capacidades humanas?",
      options: [
        "Substituindo habilidades humanas",
        "Automatizando tarefas repetitivas para liberar tempo criativo",
        "Eliminando a necessidade de aprendizado",
        "Reduzindo a interação social",
      ],
      correct: 1,
      explanation:
        "A IA pode assumir tarefas repetitivas e de processamento, liberando humanos para focar em atividades criativas, estratégicas e relacionais.",
    },
    {
      question: "Qual é a importância da transparência na IA para coexistência?",
      options: [
        "Não é importante",
        "Permite que humanos compreendam e confiem nas decisões da IA",
        "Reduz a velocidade de processamento",
        "Aumenta os custos de desenvolvimento",
      ],
      correct: 2,
      explanation:
        "A transparência permite que humanos compreendam como a IA toma decisões, construindo confiança e permitindo supervisão adequada.",
    },
    {
      question: "Como humanos podem se preparar para trabalhar com IA?",
      options: [
        "Competindo diretamente com máquinas",
        "Desenvolvendo habilidades complementares como criatividade e empatia",
        "Evitando tecnologia completamente",
        "Focando apenas em tarefas manuais",
      ],
      correct: 3,
      explanation:
        "Desenvolver habilidades uniquamente humanas como criatividade, empatia, pensamento crítico e colaboração é essencial para uma parceria efetiva.",
    },
    {
      question: "Qual é o futuro ideal da relação humano-IA?",
      options: [
        "Dominação completa da IA",
        "Eliminação da tecnologia",
        "Parceria simbiótica e colaborativa",
        "Separação total entre humanos e IA",
      ],
      correct: 1,
      explanation:
        "O futuro ideal é uma parceria onde humanos e IA trabalham juntos, cada um contribuindo com suas forças únicas para resolver problemas complexos.",
    },
  ]

  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [])

  const createParticle = useCallback((container: HTMLElement) => {
    const particle = document.createElement("div")
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: #0891b2;
      border-radius: 50%;
      opacity: 0.3;
      animation: float ${Math.random() * 10 + 10}s linear infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      box-shadow: 0 0 6px #0891b2;
    `

    container.appendChild(particle)

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 20000)
  }, [])

  const createParticles = useCallback(() => {
    if (particleContainerRef.current) return

    const particleContainer = document.createElement("div")
    particleContainer.className = "particles"
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    `
    document.body.appendChild(particleContainer)
    particleContainerRef.current = particleContainer

    for (let i = 0; i < 50; i++) {
      createParticle(particleContainer)
    }
  }, [createParticle])

  const showQuizNotification = useCallback((message: string, type = "info") => {
    const notification = document.createElement("div")
    notification.className = "quiz-notification"

    let borderColor = "#00ff41"
    if (type === "error") borderColor = "#ff0080"
    if (type === "achievement") borderColor = "#8b5cf6"
    if (type === "success") borderColor = "#00ff41"

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(30, 30, 47, 0.95);
      border: 2px solid ${borderColor};
      color: white;
      padding: 1rem;
      border-radius: 8px;
      font-family: monospace;
      font-size: 0.875rem;
      z-index: 9999;
      backdrop-filter: blur(10px);
      box-shadow: 0 0 20px ${borderColor}50;
      animation: slideInRight 0.3s ease-out;
    `
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOutRight 0.3s ease-in"
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification)
          }
        }, 300)
      }
    }, 3000)
  }, [])

  useEffect(() => {
    // Load saved data from localStorage
    const savedBestScore = localStorage.getItem("humanExeQuizBest") || "0"
    const savedAchievements = JSON.parse(localStorage.getItem("humanExeQuizAchievements") || "[]")
    const savedTotalQuizzes = localStorage.getItem("humanExeQuizTotal") || "0"
    const savedTotalCorrect = localStorage.getItem("humanExeQuizTotalCorrect") || "0"
    const savedBestStreak = localStorage.getItem("humanExeQuizBestStreak") || "0"

    setQuizState((prev) => ({
      ...prev,
      bestScore: Number.parseInt(savedBestScore),
      achievements: savedAchievements,
      totalQuizzes: Number.parseInt(savedTotalQuizzes),
      totalCorrect: Number.parseInt(savedTotalCorrect),
      bestStreak: Number.parseInt(savedBestStreak),
    }))

    // Add navigation event listeners
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      const handleClick = (e: Event) => {
        e.preventDefault()
        const targetId = (e.target as HTMLElement).getAttribute("href")?.substring(1)
        if (targetId) scrollToSection(targetId)
      }
      link.addEventListener("click", handleClick)
    })

    // Typing animation
    const typingElement = document.querySelector(".typing-animation")
    if (typingElement) {
      const text = typingElement.textContent || ""
      typingElement.textContent = ""

      let i = 0
      const typeWriter = () => {
        if (i < text.length) {
          typingElement.textContent += text.charAt(i)
          i++
          setTimeout(typeWriter, 100)
        }
      }
      setTimeout(typeWriter, 1000)
    }

    // Stat bars animation
    const statBars = document.querySelectorAll(".stat-fill")
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target as HTMLElement
          const width = bar.style.width
          bar.style.setProperty("--final-width", width)
          bar.style.animation = "stat-fill 2s ease-out forwards"
        }
      })
    }, observerOptions)

    statBars.forEach((bar) => observer.observe(bar))

    // Glitch effect
    const glitchElement = document.querySelector(".glitch")
    let glitchInterval: NodeJS.Timeout
    if (glitchElement) {
      glitchInterval = setInterval(() => {
        if (Math.random() < 0.1) {
          ;(glitchElement as HTMLElement).style.animation = "none"
          setTimeout(() => {
            ;(glitchElement as HTMLElement).style.animation = ""
          }, 100)
        }
      }, 2000)
    }

    // Contact form
    const contactForm = document.querySelector(".form")
    if (contactForm) {
      const handleSubmit = (e: Event) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const submitButton = form.querySelector(".submit-button") as HTMLButtonElement
        const buttonSpan = submitButton.querySelector("span") as HTMLSpanElement
        const originalText = buttonSpan.textContent

        buttonSpan.textContent = "Transmitting..."
        submitButton.disabled = true

        setTimeout(() => {
          buttonSpan.textContent = "Message Sent!"
          setTimeout(() => {
            buttonSpan.textContent = originalText
            submitButton.disabled = false
            form.reset()
          }, 2000)
        }, 2000)
      }
      contactForm.addEventListener("submit", handleSubmit)
    }

    // Create particles
    createParticles()

    // Add CSS styles
    const style = document.createElement("style")
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.3;
        }
        90% {
          opacity: 0.3;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
      @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `
    document.head.appendChild(style)

    // Cleanup function
    return () => {
      if (glitchInterval) clearInterval(glitchInterval)
      observer.disconnect()
      if (particleContainerRef.current) {
        document.body.removeChild(particleContainerRef.current)
        particleContainerRef.current = null
      }
    }
  }, [scrollToSection, createParticles])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const navLinks = document.querySelectorAll(".nav-link")

      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        const sectionHeight = section.clientHeight
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
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiCode((prev) => {
        const newCode = [...prev, e.code]
        if (newCode.length > konamiSequence.length) {
          newCode.shift()
        }

        if (newCode.join(",") === konamiSequence.join(",")) {
          // Activate Matrix mode
          document.body.style.filter = "hue-rotate(120deg)"
          setTimeout(() => {
            document.body.style.filter = ""
          }, 5000)

          // Show special message
          const message = document.createElement("div")
          message.textContent = "MATRIX MODE ACTIVATED"
          message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--accent-green);
            color: black;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: bold;
            z-index: 9999;
            animation: fadeInOut 3s ease-in-out;
          `
          document.body.appendChild(message)

          setTimeout(() => {
            if (document.body.contains(message)) {
              document.body.removeChild(message)
            }
          }, 3000)

          return []
        }

        return newCode
      })
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [konamiSequence])

  return null // This component handles global effects, no UI needed
}
