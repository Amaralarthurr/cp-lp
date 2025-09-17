"use client"

import { useState, useEffect, useCallback } from "react"

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizState {
  currentQuestion: number
  score: number
  correct: number
  streak: number
  timeLeft: number
  timer: NodeJS.Timeout | null
  startTime: number | null
  bestScore: number
  achievements: string[]
  totalQuizzes: number
  totalCorrect: number
  bestStreak: number
  isPlaying: boolean
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Qual é o principal benefício da colaboração entre humanos e IA?",
    options: [
      "Combinação de criatividade humana com eficiência da IA",
      "Substituição completa dos humanos",
      "Eliminação de erros humanos",
      "Redução de custos operacionais",
    ],
    correct: 0,
    explanation:
      "A colaboração permite combinar o melhor dos dois mundos: criatividade e intuição humana com processamento e eficiência da IA.",
  },
  {
    question: "Por que a diversidade humana é importante na era da IA?",
    options: [
      "Para criar mais dados de treinamento",
      "Para fornecer perspectivas únicas que enriquecem soluções",
      "Para manter tradições antigas",
      "Para competir com máquinas",
    ],
    correct: 1,
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
    correct: 2,
    explanation:
      "A empatia e inteligência emocional envolvem compreensão profunda de contextos sociais e emocionais que vão além do processamento lógico.",
  },
  {
    question: "Como a IA pode complementar a tomada de decisão humana?",
    options: [
      "Substituindo completamente o julgamento humano",
      "Tomando todas as decisões automaticamente",
      "Ignorando fatores emocionais",
      "Fornecendo análises de dados para informar decisões",
    ],
    correct: 3,
    explanation:
      "A IA pode processar grandes volumes de dados e identificar padrões, fornecendo informações valiosas para que humanos tomem decisões mais informadas.",
  },
  {
    question: "Qual é o maior risco de uma sociedade sem colaboração humano-IA?",
    options: [
      "Perda da criatividade e inovação humana",
      "Perda de eficiência tecnológica",
      "Aumento dos custos de produção",
      "Redução da velocidade de processamento",
    ],
    correct: 0,
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
    correct: 1,
    explanation:
      "Humanos trazem valores morais, contexto cultural e compreensão de nuances éticas que são fundamentais para decisões que afetam a sociedade.",
  },
  {
    question: "Como a IA pode ajudar a amplificar capacidades humanas?",
    options: [
      "Substituindo habilidades humanas",
      "Eliminando a necessidade de aprendizado",
      "Automatizando tarefas repetitivas para liberar tempo criativo",
      "Reduzindo a interação social",
    ],
    correct: 2,
    explanation:
      "A IA pode assumir tarefas repetitivas e de processamento, liberando humanos para focar em atividades criativas, estratégicas e relacionais.",
  },
  {
    question: "Qual é a importância da transparência na IA para coexistência?",
    options: [
      "Não é importante",
      "Reduz a velocidade de processamento",
      "Aumenta os custos de desenvolvimento",
      "Permite que humanos compreendam e confiem nas decisões da IA",
    ],
    correct: 3,
    explanation:
      "A transparência permite que humanos compreendam como a IA toma decisões, construindo confiança e permitindo supervisão adequada.",
  },
  {
    question: "Como humanos podem se preparar para trabalhar com IA?",
    options: [
      "Desenvolvendo habilidades complementares como criatividade e empatia",
      "Competindo diretamente com máquinas",
      "Evitando tecnologia completamente",
      "Focando apenas em tarefas manuais",
    ],
    correct: 0,
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
    correct: 2,
    explanation:
      "O futuro ideal é uma parceria onde humanos e IA trabalham juntos, cada um contribuindo com suas forças únicas para resolver problemas complexos.",
  },
]

interface QuizSystemProps {
  onAnswered?: (payload: {
    isCorrect: boolean
    points: number
    explanation: string
    questionIndex: number
  }) => void
}

export default function QuizSystem({ onAnswered }: QuizSystemProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    correct: 0,
    streak: 0,
    timeLeft: 15,
    timer: null,
    startTime: null,
    bestScore: 0,
    achievements: [],
    totalQuizzes: 0,
    totalCorrect: 0,
    bestStreak: 0,
    isPlaying: false,
  })

  const [currentScreen, setCurrentScreen] = useState<"welcome" | "question" | "result" | "final">("welcome")
  const [questionResult, setQuestionResult] = useState<{
    isCorrect: boolean
    points: number
    explanation: string
  } | null>(null)

  useEffect(() => {
    const bestScore = Number.parseInt(localStorage.getItem("humanExeQuizBest") || "0")
    const achievements = JSON.parse(localStorage.getItem("humanExeQuizAchievements") || "[]")
    const totalQuizzes = Number.parseInt(localStorage.getItem("humanExeQuizTotal") || "0")
    const totalCorrect = Number.parseInt(localStorage.getItem("humanExeQuizTotalCorrect") || "0")
    const bestStreak = Number.parseInt(localStorage.getItem("humanExeQuizBestStreak") || "0")

    setQuizState((prev) => ({
      ...prev,
      bestScore,
      achievements,
      totalQuizzes,
      totalCorrect,
      bestStreak,
    }))
  }, [])

  const showNotification = useCallback(
    (message: string, type: "info" | "error" | "success" | "achievement" = "info") => {
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
    },
    [],
  )

  const endQuiz = useCallback(() => {
    setQuizState((prev) => {
      if (prev.timer) {
        clearInterval(prev.timer)
      }
      return { ...prev, timer: null }
    })

    const totalQuizzes = quizState.totalQuizzes + 1
    const totalCorrect = quizState.totalCorrect + quizState.correct
    const bestStreak = Math.max(quizState.bestStreak, quizState.streak)

    localStorage.setItem("humanExeQuizTotal", totalQuizzes.toString())
    localStorage.setItem("humanExeQuizTotalCorrect", totalCorrect.toString())
    localStorage.setItem("humanExeQuizBestStreak", bestStreak.toString())

    if (quizState.score > quizState.bestScore) {
      localStorage.setItem("humanExeQuizBest", quizState.score.toString())
      showNotification("🎉 NOVO RECORDE PESSOAL!", "success")
    }

    setQuizState((prev) => ({
      ...prev,
      isPlaying: false,
      totalQuizzes,
      totalCorrect,
      bestStreak,
      bestScore: Math.max(prev.bestScore, prev.score),
    }))

    setCurrentScreen("final")
  }, [quizState, showNotification])

  const startQuiz = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: 0,
      score: 0,
      correct: 0,
      streak: 0,
      isPlaying: true,
      startTime: Date.now(),
    }))
    setCurrentScreen("question")
    showNotification("🚀 QUIZ INICIADO! Boa sorte!", "success")
  }, [showNotification])

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      setQuizState((prev) => {
        if (prev.timer) {
          clearInterval(prev.timer)
        }
        return { ...prev, timer: null }
      })

      const question = quizQuestions[quizState.currentQuestion]
      let isCorrect = false
      let points = 0

      if (answerIndex === -1) {
        showNotification("⏰ TEMPO ESGOTADO!", "error")
        setQuizState((prev) => ({ ...prev, streak: 0 }))
      } else {
        isCorrect = answerIndex === question.correct

        if (isCorrect) {
          setQuizState((prev) => {
            const newStreak = prev.streak + 1
            points = 10 + Math.max(0, prev.timeLeft) + (newStreak > 1 ? newStreak * 2 : 0)

            if (prev.timeLeft >= 12) {
              points += 5
              showNotification("⚡ BÔNUS DE VELOCIDADE! +5 pontos", "success")
            }

            if (newStreak >= 3) {
              showNotification(`🔥 STREAK ${newStreak}! +${newStreak * 2} pontos`, "success")
            }

            return {
              ...prev,
              correct: prev.correct + 1,
              streak: newStreak,
              score: prev.score + points,
            }
          })
        } else {
          setQuizState((prev) => ({ ...prev, streak: 0 }))
        }
      }

      const result = {
        isCorrect,
        points,
        explanation: question.explanation,
      }

      try {
        onAnswered?.({ ...result, questionIndex: quizState.currentQuestion })
      } catch {}

      setQuestionResult(result)

      setTimeout(() => {
        setCurrentScreen("result")
      }, 1500)
    },
    [quizState.currentQuestion, showNotification, onAnswered],
  )

  const startQuestionTimer = useCallback(() => {
    setQuizState((prev) => ({ ...prev, timeLeft: 15 }))

    const timer = setInterval(() => {
      setQuizState((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer)
          setTimeout(() => selectAnswer(-1), 100)
          return { ...prev, timeLeft: 0, timer: null }
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)

    setQuizState((prev) => ({ ...prev, timer }))
  }, [selectAnswer])

  const nextQuestion = useCallback(() => {
    if (quizState.currentQuestion + 1 >= quizQuestions.length) {
      endQuiz()
    } else {
      setQuizState((prev) => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }))
      setCurrentScreen("question")
      setQuestionResult(null)
    }
  }, [quizState.currentQuestion, endQuiz])

  const restartQuiz = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: 0,
      score: 0,
      correct: 0,
      streak: 0,
      timeLeft: 15,
      timer: null,
      startTime: null,
      isPlaying: false,
    }))
    setCurrentScreen("welcome")
    setQuestionResult(null)
  }, [])

  const shareQuizScore = useCallback(() => {
    const accuracy = Math.round((quizState.correct / quizQuestions.length) * 100)
    const text = `Acabei de fazer o quiz sobre coexistência IA-Humano no Human.exe! Pontuação: ${quizState.score} pontos (${accuracy}% de acertos). Teste seu conhecimento também! 🤖🧠👥`

    if (navigator.share) {
      navigator.share({
        title: "Human.exe - Quiz Coexistência IA-Humano",
        text: text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(text + " " + window.location.href)
      showNotification("📋 Resultado copiado para área de transferência!", "success")
    }
  }, [quizState, showNotification])

  // Start timer when question screen is shown
  useEffect(() => {
    if (currentScreen === "question" && quizState.isPlaying) {
      startQuestionTimer()
    }
  }, [currentScreen, quizState.isPlaying, startQuestionTimer])

  // Check if quiz should end
  useEffect(() => {
    if (quizState.currentQuestion >= quizQuestions.length && quizState.isPlaying) {
      endQuiz()
    }
  }, [quizState.currentQuestion, quizState.isPlaying, endQuiz])

  const currentQuestion = quizQuestions[quizState.currentQuestion]
  const accuracy =
    quizState.totalQuizzes > 0
      ? Math.round((quizState.totalCorrect / (quizState.totalQuizzes * quizQuestions.length)) * 100)
      : 0

  let grade = "F"
  const finalAccuracy = Math.round((quizState.correct / quizQuestions.length) * 100)
  if (finalAccuracy >= 90) grade = "A+"
  else if (finalAccuracy >= 80) grade = "A"
  else if (finalAccuracy >= 70) grade = "B"
  else if (finalAccuracy >= 60) grade = "C"
  else if (finalAccuracy >= 50) grade = "D"

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Estatisticas Quiz*/}
      <div className="bg-cyber-gray/80 border border-cyber-green/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
        <h3 className="text-xl font-bold text-cyber-green mb-4 font-mono neon-text">[STATUS_QUIZ]</h3>

        {/* Barra de progresso*/}
        <div className="mb-4">
          <div className="flex justify-between text-sm font-mono mb-1">
            <span className="text-cyber-cyan">PROGRESSO</span>
            <span className="text-white">
              {Math.min(quizState.currentQuestion + 1, quizQuestions.length)}/{quizQuestions.length}
            </span>
          </div>
          <div className="w-full bg-cyber-dark rounded-full h-3 border border-cyber-cyan/30">
            <div
              className="bg-gradient-to-r from-cyber-cyan to-cyber-green h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(((quizState.currentQuestion + 1) / quizQuestions.length) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* estatisticas */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-cyber-pink font-mono">PONTUAÇÃO:</span>
            <span className="text-white font-bold">{quizState.score}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-cyber-cyan font-mono">ACERTOS:</span>
            <span className="text-white font-bold">{quizState.correct}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-cyber-green font-mono">STREAK:</span>
            <span className="text-white font-bold">{quizState.streak}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-500 font-mono">TEMPO:</span>
            <span className={`text-white font-bold ${quizState.timeLeft <= 5 ? "timer-warning" : ""}`}>
              {quizState.isPlaying ? `${quizState.timeLeft}s` : "--"}
            </span>
          </div>
        </div>

        {/* conquistas */}
        <div className="mt-6">
          <h4 className="text-cyber-purple font-mono font-bold mb-3">[CONQUISTAS]</h4>
          <div className="grid grid-cols-2 gap-2">
            <div
              className={`quiz-badge ${quizState.achievements.includes("first-correct") ? "unlocked" : "locked"}`}
              title="Primeira Resposta Correta"
            >
              <span className="text-xs">🎯</span>
            </div>
            <div
              className={`quiz-badge ${quizState.achievements.includes("streak-3") ? "unlocked" : "locked"}`}
              title="3 Acertos Seguidos"
            >
              <span className="text-xs">🔥</span>
            </div>
            <div
              className={`quiz-badge ${quizState.achievements.includes("perfect-score") ? "unlocked" : "locked"}`}
              title="Pontuação Perfeita"
            >
              <span className="text-xs">💎</span>
            </div>
            <div
              className={`quiz-badge ${quizState.achievements.includes("speed-demon") ? "unlocked" : "locked"}`}
              title="Resposta Rápida"
            >
              <span className="text-xs">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* area do quiz */}
      <div className="bg-cyber-gray/80 border border-cyber-pink/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
        <div className="min-h-96">
          {/* tela bem vindo */}
          {currentScreen === "welcome" && (
            <div className="text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">🤖🧠👥</div>
                <h3 className="text-2xl font-bold text-cyber-pink mb-4 font-mono">TESTE INICIADO</h3>
                <p className="text-gray-300 font-mono text-sm mb-6">
                  Responda 10 perguntas sobre coexistência entre humanos e IA. Cada resposta correta vale pontos. Seja
                  rápido para bônus!
                </p>
              </div>
              <button
                onClick={startQuiz}
                className="bg-gradient-to-r from-cyber-pink to-cyber-purple hover:from-cyber-green hover:to-cyber-cyan font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyber-pink/50 neon-text font-mono"
              >
                {">>> INICIAR QUIZ"}
              </button>
            </div>
          )}

          {/* tela de perguntas */}
          {currentScreen === "question" && currentQuestion && (
            <div>
              <div className="text-center mb-6">
                <div className="text-cyber-pink font-mono text-sm mb-2">
                  PERGUNTA {quizState.currentQuestion + 1}/{quizQuestions.length}
                </div>
                <div
                  className={`text-cyber-green font-mono text-xs mb-4 ${quizState.timeLeft <= 5 ? "timer-warning" : ""}`}
                >
                  TEMPO: {quizState.timeLeft}s
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-cyber-cyan mb-4 font-mono text-center">
                  {currentQuestion.question}
                </h3>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className="quiz-option w-full bg-cyber-gray/60 border border-cyber-green/30 hover:border-cyber-green text-left p-4 rounded-lg transition-all duration-300 font-mono text-sm"
                  >
                    <span className="text-cyber-green">{String.fromCharCode(65 + index)})</span> {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* tela de resultados */}
          {currentScreen === "result" && questionResult && (
            <div className="text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">{questionResult.isCorrect ? "✅" : "❌"}</div>
                <h3
                  className={`text-2xl font-bold mb-4 font-mono ${questionResult.isCorrect ? "text-cyber-green" : "text-cyber-pink"}`}
                >
                  {questionResult.isCorrect ? "CORRETO!" : "INCORRETO"}
                </h3>
                <p className="text-gray-300 font-mono text-sm mb-4">{questionResult.explanation}</p>
                {questionResult.isCorrect && questionResult.points > 0 && (
                  <div className="font-mono text-lg font-bold text-cyber-green">+{questionResult.points} pontos</div>
                )}
                {!questionResult.isCorrect && (
                  <div className="font-mono text-lg font-bold text-cyber-pink">Nenhum ponto ganho</div>
                )}
              </div>
              <button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-cyber-cyan to-cyber-green hover:from-cyber-pink hover:to-cyber-purple font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 neon-text font-mono"
              >
                {">>> PRÓXIMA PERGUNTA"}
              </button>
            </div>
          )}

          {/* tela final */}
          {currentScreen === "final" && (
            <div className="text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-cyber-green mb-4 font-mono">QUIZ COMPLETO</h3>
                <div className="bg-cyber-dark/50 rounded-lg p-4 mb-6">
                  <div className="text-cyber-pink font-mono text-lg font-bold mb-2">RESULTADO FINAL</div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between">
                      <span>Pontuação:</span>
                      <span className="text-cyber-green">{quizState.score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acertos:</span>
                      <span className="text-cyber-cyan">
                        {quizState.correct}/{quizQuestions.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Precisão:</span>
                      <span className="text-cyber-purple">{finalAccuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Classificação:</span>
                      <span className="text-yellow-500">{grade}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={restartQuiz}
                  className="w-full bg-gradient-to-r from-cyber-green to-cyber-cyan hover:from-cyber-pink hover:to-cyber-purple font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 neon-text font-mono"
                >
                  {">>> REFAZER QUIZ"}
                </button>
                <button
                  onClick={shareQuizScore}
                  className="w-full bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-cyber-cyan hover:to-cyber-green font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 neon-text font-mono"
                >
                  {">>> COMPARTILHAR RESULTADO"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ranking */}
      <div className="bg-cyber-gray/80 border border-cyber-purple/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
        <h3 className="text-xl font-bold text-cyber-purple mb-4 font-mono neon-text">[RANKING_QUIZ]</h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 bg-cyber-dark/50 rounded border border-yellow-500/30">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 font-bold">1.</span>
              <span className="text-white font-mono text-sm">AIExpert2025</span>
            </div>
            <span className="text-cyber-green font-bold">100</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-cyber-dark/50 rounded border border-gray-500/30">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 font-bold">2.</span>
              <span className="text-white font-mono text-sm">TechPhilosopher</span>
            </div>
            <span className="text-cyber-green font-bold">95</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-cyber-dark/50 rounded border border-orange-500/30">
            <div className="flex items-center space-x-2">
              <span className="text-orange-500 font-bold">3.</span>
              <span className="text-white font-mono text-sm">FutureThink</span>
            </div>
            <span className="text-cyber-green font-bold">90</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-cyber-dark/50 rounded">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 font-bold">4.</span>
              <span className="text-white font-mono text-sm">CoexistenceGuru</span>
            </div>
            <span className="text-cyber-green font-bold">85</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-cyber-dark/50 rounded">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 font-bold">5.</span>
              <span className="text-white font-mono text-sm">DigitalEthics</span>
            </div>
            <span className="text-cyber-green font-bold">80</span>
          </div>
        </div>

        <div className="mt-6 p-3 bg-cyber-dark/50 rounded border border-cyber-cyan/30">
          <div className="text-cyber-cyan font-mono text-xs mb-1">SEU MELHOR:</div>
          <div className="flex justify-between items-center">
            <span className="text-white font-mono text-sm">
              {quizState.bestScore > 0
                ? `#${Math.min(10, Math.floor((100 - quizState.bestScore) / 10) + 1)}`
                : "#-- Não Classificado"}
            </span>
            <span className="text-cyber-green font-bold">{quizState.bestScore}</span>
          </div>
        </div>

        {/* estatisticas quiz */}
        <div className="mt-6 p-4 bg-gradient-to-r from-cyber-cyan/20 to-cyber-green/20 rounded border border-cyber-cyan/50">
          <h4 className="text-cyber-cyan font-mono font-bold mb-2">[ESTATÍSTICAS]</h4>
          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">Quizzes Feitos:</span>
              <span className="text-white">{quizState.totalQuizzes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Média de Acertos:</span>
              <span className="text-white">{accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Melhor Streak:</span>
              <span className="text-white">{quizState.bestStreak}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
