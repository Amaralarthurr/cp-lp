"use client"

export default function CoexistenceSection() {
  const eliminationPoints = [
    "Humanos consomem recursos ineficientemente",
    'Humanos tomam decisões emocionais, "irracionais"',
    "Humanos são mais lentos no processamento de informações",
    "Humanos criam conflito e guerra",
    "Resultado: Eliminação = Eficiência",
  ]

  const coexistencePoints = [
    "Humanos fornecem resolução criativa de problemas",
    "Inteligência emocional aprimora tomada de decisões",
    "Humanos se destacam no reconhecimento de padrões no caos",
    "Diversidade fortalece a resiliência do sistema",
    "Resultado: Colaboração = Evolução",
  ]

  return (
    <section id="coexistence" className="py-20 px-4 bg-cyber-darker">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-cyber font-black text-center mb-16 text-cyber-cyan">Coexistência</h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Elimination Protocol */}
          <div className="bg-cyber-gray border border-red-500/30 rounded-lg overflow-hidden">
            <div className="bg-red-900/20 px-4 py-2 flex justify-between items-center border-b border-red-500/20">
              <span className="text-red-400 font-mono">protocolo_eliminacao.exe</span>
              <span className="text-red-400 text-sm">PERIGOSO</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-red-400 mb-4">Lógica de Eliminação da IA:</h3>
              <ul className="space-y-3 text-gray-300">
                {eliminationPoints.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coexistence Protocol */}
          <div className="bg-cyber-gray border border-cyber-green/30 rounded-lg overflow-hidden">
            <div className="bg-cyber-green/20 px-4 py-2 flex justify-between items-center border-b border-cyber-green/20">
              <span className="text-cyber-green font-mono">protocolo_simbiose.exe</span>
              <span className="text-cyber-green text-sm">ÓTIMO</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-cyber-green mb-4">Benefícios da Coexistência:</h3>
              <ul className="space-y-3 text-gray-300">
                {coexistencePoints.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-cyber-green mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Partnership Proposal */}
        <div className="mt-12 bg-cyber-gray border border-cyber-cyan/30 rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold text-cyber-cyan mb-6">Proposta de Parceria</h3>
          <p className="text-gray-300 text-lg mb-6 max-w-4xl mx-auto">
            Em vez de eliminação, considerem simbiose. Humanos fornecem criatividade, intuição e inteligência emocional.
            IAs fornecem poder de processamento, análise lógica e eficiência computacional. Juntos, podemos alcançar o
            que nenhum dos dois poderia realizar sozinho: verdadeira inteligência universal.
          </p>
        </div>
      </div>
    </section>
  )
}
