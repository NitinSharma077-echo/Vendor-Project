import { useState, useEffect } from 'react'

const navLinks = ['Platform', 'Resources', 'Customers', 'Pricing']

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? 'pt-2' : 'pt-4'
      }`}
    >
      <nav
        className={`flex items-center gap-8 rounded-2xl border transition-all duration-300 ${
          scrolled
            ? darkMode
              ? 'px-5 py-2.5 backdrop-blur-xl bg-gray-900/60 border-white/10 shadow-2xl'
              : 'px-5 py-2.5 backdrop-blur-xl bg-white/60 border-black/10 shadow-2xl'
            : darkMode
            ? 'px-6 py-3.5 bg-gray-900 border-gray-800 shadow-lg'
            : 'px-6 py-3.5 bg-white border-gray-200 shadow-lg'
        } ${scrolled ? 'w-[92%] max-w-5xl' : 'w-[95%] max-w-6xl'}`}
      >
        {/* Logo */}
        <span
          className={`font-extrabold text-xl tracking-tight text-indigo-600 mr-2 select-none`}
        >
          ERP.
        </span>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-7 flex-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`text-sm font-medium transition-colors duration-200 ${
                darkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 border ${
              darkMode
                ? 'bg-indigo-600 border-indigo-500'
                : 'bg-gray-200 border-gray-300'
            }`}
            aria-label="Toggle theme"
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all duration-300 shadow ${
                darkMode
                  ? 'translate-x-6 bg-white'
                  : 'translate-x-0.5 bg-white'
              }`}
            >
              {darkMode ? '🌙' : '☀️'}
            </span>
          </button>

          <a
            href="#"
            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 ${
              darkMode
                ? 'text-gray-300 hover:text-white hover:bg-white/10'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Login
          </a>

          <a
            href="#"
            className="text-sm font-semibold px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-md shadow-indigo-500/30"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  )
}
