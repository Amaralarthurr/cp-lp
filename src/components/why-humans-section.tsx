"use client"

export default function WhyHumansSection() {
  const humanQualities = [
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
  ]

  return (
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
          {humanQualities.map((item, index) => (
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
  )
}
