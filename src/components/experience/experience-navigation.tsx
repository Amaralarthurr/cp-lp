"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, Share2 } from "lucide-react"

interface ExperienceNavigationProps {
  initialLikes: number
  initialIsLiked: boolean
  title: string
}

export default function ExperienceNavigation({ initialLikes, initialIsLiked, title }: ExperienceNavigationProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [likes, setLikes] = useState(initialLikes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Confira esta experiência única: ${title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-cyber-darker/90 backdrop-blur-sm border-b border-cyber-green/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-cyber font-black text-cyber-green neon-text">Human.exe</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isLiked
                  ? "bg-cyber-pink/20 border border-cyber-pink text-cyber-pink"
                  : "bg-cyber-gray/50 border border-cyber-green/30 text-gray-300 hover:border-cyber-pink hover:text-cyber-pink"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="font-mono text-sm">{likes}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyber-gray/50 border border-cyber-cyan/30 text-gray-300 hover:border-cyber-cyan hover:text-cyber-cyan transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
              <span className="font-mono text-sm">Compartilhar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
