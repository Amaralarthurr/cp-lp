import QuizSystem from "@/components/quiz-system"

export default function QuizSection() {
  return (
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
  )
}
