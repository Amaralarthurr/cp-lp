import QuizSystem from "@/components/quiz-system"
import { useCallback, useRef, useState } from "react"
import dynamic from "next/dynamic"

// Carrega o componente 3D apenas no cliente
const Quiz3DScene = dynamic(() => import("@/components/quiz-3d-scene"), { ssr: false })

export default function QuizSection() {
  const [robotVisible, setRobotVisible] = useState(false)
  const [robotMessage, setRobotMessage] = useState("")
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleAnswered = useCallback(
    ({ isCorrect }: { isCorrect: boolean; points: number; explanation: string }) => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = null
      }

      // Mensagens curtas
      const positive = ["Muito bem!", "Correto!", "Boa!", "Show!", "Nice!"]
      const supportive = ["Quase!", "Tente de novo", "Você consegue!", "Sem problema", "Segue o jogo!"]
      const msg = (isCorrect ? positive : supportive)[Math.floor(Math.random() * 5)]

      setRobotMessage(msg)
      setRobotVisible(true)

      hideTimeoutRef.current = setTimeout(() => {
        setRobotVisible(false)
      }, 3000)
    },
    [],
  )
  return (
    <section id="quiz" className="py-20 px-4 bg-cyber-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-pink/10 via-transparent to-cyber-green/10"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-cyber font-black text-center mb-8 text-cyber-pink neon-text">
          QUIZ: COEXISTÊNCIA IA-HUMANO
        </h2>
        {/* Cena 3D do robô: overlay fixo no canto inferior direito */}
        <div className="mb-12 relative">
          <div
            className="fixed bottom-4 right-4 w-[360px] max-w-[85vw] z-50 drop-shadow-[0_0_20px_rgba(255,0,128,0.3)]"
            style={{ pointerEvents: robotVisible ? "auto" : "none", opacity: robotVisible ? 1 : 0, transition: "opacity 200ms ease" }}
          >
            <Quiz3DScene
              quizState={{ isPlaying: robotVisible }}
              currentMessage={robotMessage}
              visible={robotVisible}
              onClose={() => setRobotVisible(false)}
            />
          </div>
        </div>
        <p className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto font-mono">
          <span className="text-cyber-pink">[TESTE_CONHECIMENTO]</span> Avalie seu entendimento sobre a coexistência
          entre humanos e inteligência artificial
        </p>
        <QuizSystem onAnswered={handleAnswered} />
      </div>
    </section>
  )
}
