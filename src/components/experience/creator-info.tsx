import { User } from "lucide-react"

interface Creator {
  name: string
  bio: string
  avatar: string
  humanTouch: string
}

interface CreatorInfoProps {
  creator: Creator
}

export default function CreatorInfo({ creator }: CreatorInfoProps) {
  return (
    <div className="bg-cyber-gray/80 border border-cyber-cyan/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
      <h3 className="text-xl font-bold text-cyber-cyan mb-4 font-mono neon-text">[CRIADOR]</h3>
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={creator.avatar || "/placeholder.svg"}
          alt={creator.name}
          className="w-16 h-16 rounded-full border-2 border-cyber-cyan"
        />
        <div>
          <h4 className="text-white font-bold font-mono">{creator.name}</h4>
          <div className="flex items-center space-x-1 mt-1">
            <User className="w-3 h-3 text-cyber-cyan" />
            <span className="text-cyber-cyan font-mono text-xs">Artista Verificado</span>
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-sm mb-4 font-mono">{creator.bio}</p>
      <div className="border-t border-cyber-cyan/30 pt-4">
        <h5 className="text-cyber-pink font-mono font-bold text-sm mb-2">[TOQUE_HUMANO]</h5>
        <p className="text-gray-300 text-sm font-mono italic">
          {creator.humanTouch ? `"${creator.humanTouch}"` : ""}
        </p>
      </div>
    </div>
  )
}
