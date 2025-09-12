"use client"

import { useState } from "react"
import ExperienceNavigation from "@/components/experience/experience-navigation"
import ExperienceHeader from "@/components/experience/experience-header"
import ExperienceContent from "@/components/experience/experience-content"
import CreatorInfo from "@/components/experience/creator-info"
import ExperienceTags from "@/components/experience/experience-tags"
import PurchaseSection from "@/components/experience/purchase-section"

interface ExperienceData {
  id: string
  title: string
  type: "arte" | "música" | "narrativa"
  creator: {
    name: string
    bio: string
    avatar: string
    humanTouch: string
  }
  description: string
  content: {
    image?: string
    audio?: string
    text?: string
  }
  humanElement: string
  price: number
  duration: string
  tags: string[]
  likes: number
  isLiked: boolean
}

// Mock data - em um app real, isso viria de uma API
const mockExperience: ExperienceData = {
  id: "1",
  title: "Memórias de Chuva Digital",
  type: "arte",
  creator: {
    name: "Ana Silva",
    bio: "Artista digital que explora a intersecção entre memória humana e tecnologia. Formada em Belas Artes, dedica sua obra à preservação da experiência emocional humana.",
    avatar: "/user-woman.png",
    humanTouch:
      "Cada pincelada digital carrega as lágrimas reais que derramei durante a pandemia. A IA pode simular chuva, mas não pode sentir a saudade que cada gota representa.",
  },
  description:
    "Uma obra interativa que combina arte digital com memórias pessoais, explorando como a tecnologia pode preservar e amplificar a experiência emocional humana.",
  content: {
    image: "/neon-city.jpg",
  },
  humanElement:
    "Esta obra nasceu de noites insones durante o isolamento, onde cada pixel foi posicionado com a precisão de quem busca eternizar um sentimento. A IA ajudou na renderização, mas a alma por trás de cada elemento é puramente humana - carregada de nostalgia, esperança e a vulnerabilidade que só nós, humanos, conseguimos transformar em arte.",
  price: 89.9,
  duration: "Experiência de 15 minutos",
  tags: ["Emocional", "Interativo", "Memória", "Digital"],
  likes: 1247,
  isLiked: false,
}

export default function ExperienceDetailsPage() {
  const [experience] = useState<ExperienceData>(mockExperience)

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      {/* Background Effects */}
      <div className="matrix-bg"></div>
      <div className="data-stream" style={{ top: "20%", animationDelay: "0s" }}></div>
      <div className="data-stream" style={{ top: "60%", animationDelay: "2s" }}></div>

      {/* Navigation */}
      <ExperienceNavigation
        initialLikes={experience.likes}
        initialIsLiked={experience.isLiked}
        title={experience.title}
      />

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ExperienceHeader type={experience.type} title={experience.title} description={experience.description} />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Experience Content */}
            <ExperienceContent
              title={experience.title}
              image={experience.content.image}
              duration={experience.duration}
              humanElement={experience.humanElement}
            />

            {/* Sidebar */}
            <div className="space-y-6">
              <CreatorInfo creator={experience.creator} />
              <ExperienceTags tags={experience.tags} />
              <PurchaseSection experienceId={experience.id} price={experience.price} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
