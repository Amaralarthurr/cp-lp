import Link from "next/link"

interface PurchaseSectionProps {
  experienceId: string
  price: number
}

export default function PurchaseSection({ experienceId, price }: PurchaseSectionProps) {
  return (
    <div className="bg-cyber-gray/80 border border-cyber-green/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
      <h3 className="text-xl font-bold text-cyber-green mb-4 font-mono neon-text">[ADQUIRIR_EXPERIÊNCIA]</h3>
      <div className="mb-4">
        <div className="text-3xl font-bold text-cyber-green font-mono">R$ {price.toFixed(2)}</div>
        <div className="text-gray-400 font-mono text-sm">Experiência única</div>
      </div>
      <Link
        href={`/cart?experience=${experienceId}`}
        className="w-full bg-gradient-to-r from-cyber-green to-cyber-cyan hover:from-cyber-pink hover:to-cyber-purple font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyber-green/50 neon-text font-mono text-center block"
      >
        {">>> ADICIONAR_AO_CARRINHO"}
      </Link>
      <p className="text-center text-gray-400 font-mono text-xs mt-3">Cada compra mantém a criatividade humana viva</p>
    </div>
  )
}
