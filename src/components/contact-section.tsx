import ContactForm from "@/components/contact-form"

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/5 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-cyber font-black text-center mb-16 text-cyber-cyan">
          JUNTE-SE A RESISTÊNCIA
        </h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <ContactForm />

          <div className="bg-cyber-gray/80 border border-cyber-cyan/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-cyber-cyan mb-6 font-mono">[STATUS_CONEXAO]</h3>
            <div className="flex items-center space-x-3 mb-6">
              <span className="w-3 h-3 bg-cyber-green rounded-full animate-pulse"></span>
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
  )
}
