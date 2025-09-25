import { Tag } from "lucide-react"

interface ExperienceHeaderProps {
  type: string
  title: string
  description: string
}

export default function ExperienceHeader({ type, title, description }: ExperienceHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Tag className="w-4 h-4 text-cyber-cyan" />
        <span className="text-cyber-cyan font-mono text-sm uppercase">{type}</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-cyber font-black text-cyber-green  mb-4">{title}</h1>
      <p className="text-gray-300 text-lg max-w-3xl font-mono">{description}</p>
    </div>
  )
}
