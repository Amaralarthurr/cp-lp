"use client"

interface NavigationProps {
  activeSection: string
}

export default function Navigation({ activeSection }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full bg-cyber-darker/90 backdrop-blur-sm border-b border-cyber-green/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-cyber font-black text-cyber-green neon-text">Human.exe</span>
            <span className="text-cyber-green animate-pulse text-xl">_</span>
          </div>
          <ul className="hidden md:flex space-x-8">
            {[
              { href: "/", label: "> Início" },
              { href: "/experience/1", label: "> Experiência" },
              { href: "/cart", label: "> Carrinho" },
              { href: "#quiz", label: "> Quiz" },
              { href: "#contact", label: "> Contato" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav-link text-white hover:text-cyber-green transition-colors duration-300 relative group neon-text"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-green transition-all duration-300 group-hover:w-full shadow-sm shadow-cyber-green"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
