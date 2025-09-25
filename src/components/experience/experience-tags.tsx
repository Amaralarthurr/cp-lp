interface ExperienceTagsProps {
  tags: string[]
}

export default function ExperienceTags({ tags }: ExperienceTagsProps) {
  return (
    <div className="bg-cyber-gray/80 border border-cyber-purple/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
      <h3 className="text-xl font-bold text-cyber-purple mb-4 font-mono ">[TAGS]</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-cyber-purple/20 border border-cyber-purple/50 rounded-full text-cyber-purple font-mono text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}
