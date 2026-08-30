import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/approach', label: 'Approach' },
  { to: '/impact', label: 'Impact' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? y / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-gold"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
      <header
        className={`fixed top-0 left-0 z-50 h-20 w-full transition-colors duration-500 ease-jv ${
          scrolled
            ? 'border-b border-charcoal-line bg-[rgba(31,31,31,0.82)] backdrop-blur-[12px]'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-jv flex h-full items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="JV Partners home">
            <img src="/logo-monogram.png" alt="" className="h-9 w-9 object-contain" />
            <span className="text-[13px] font-extrabold uppercase tracking-[0.3em] text-off-white">
              JV&nbsp;Partners
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `group relative text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ease-jv ${
                    isActive ? 'text-off-white' : 'text-mist hover:text-off-white'
                  }`
                }
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-jv group-hover:scale-x-100" />
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="group relative overflow-hidden border border-gold px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-350 ease-jv hover:text-grain-black"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-350 ease-jv group-hover:scale-x-100" />
              <span className="relative">Start a conversation</span>
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
          >
            <span
              className={`block h-[2px] w-7 bg-gold transition-transform duration-300 ease-jv ${
                open ? 'translate-y-[4.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-7 bg-gold transition-transform duration-300 ease-jv ${
                open ? '-translate-y-[4.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[65] flex flex-col justify-center bg-ink lg:hidden"
          >
            <nav className="container-jv flex flex-col gap-6" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={l.to} className="flex items-baseline gap-4 text-off-white">
                    <span className="font-mono text-xs text-gold">0{i + 1}</span>
                    <span className="text-[40px] font-bold leading-none tracking-[-0.02em]">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.a
              href="mailto:hello@jvpartners.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="container-jv absolute bottom-10 left-0 right-0 font-mono text-sm text-gold"
            >
              hello@jvpartners.com
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
