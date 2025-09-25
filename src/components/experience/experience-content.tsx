"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Pause, Clock } from "lucide-react"

interface ExperienceContentProps {
  title: string
  image?: string
  duration: string
  humanElement: string
}

export default function ExperienceContent({ title, image, duration, humanElement }: ExperienceContentProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="lg:col-span-2">
      <div className="bg-cyber-gray/80 border border-cyber-green/50 rounded-lg overflow-hidden hologram-effect backdrop-blur-sm mb-8">
        <div className="relative">
          <div className="relative w-full h-96">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyber-cyan" />
                <span className="text-cyber-cyan font-mono text-sm">{duration}</span>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-cyber-green/20 border border-cyber-green rounded-full p-3 hover:bg-cyber-green/30 transition-all duration-300"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-cyber-green" />
                ) : (
                  <Play className="w-6 h-6 text-cyber-green" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Human Element */}
      <div className="bg-cyber-gray/80 border border-cyber-pink/50 rounded-lg p-6 hologram-effect backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-cyber-pink mb-4 font-mono ">[TRAÇO_HUMANO]</h3>
        <p className="text-gray-300 leading-relaxed font-mono">
          <span className="text-cyber-pink">{">"}</span> {humanElement}
        </p>
      </div>
    </div>
  )
}
