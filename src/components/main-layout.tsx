"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import MatrixBackground from "@/components/matrix-background"
import HeroSection from "@/components/hero-section"
import WhyHumansSection from "@/components/why-humans-section"
import CoexistenceSection from "@/components/coexistence-section"
import QuizSection from "@/components/quiz-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function MainLayout() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }

    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute("href")?.substring(1)
        if (targetId) {
          scrollToSection(targetId)
        }
      })
    })

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const navLinks = document.querySelectorAll(".nav-link")

      let current = ""
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || ""
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="bg-cyber-dark text-white font-body overflow-x-hidden">
      <MatrixBackground />
      <Navigation activeSection={activeSection} />

      <main>
        <HeroSection />
        <WhyHumansSection />
        <QuizSection />
        <CoexistenceSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
