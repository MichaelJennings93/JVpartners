import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const WORDS: { text: string; gold?: boolean }[] = [
  { text: 'Sound' },
  { text: 'like' },
  { text: 'your' },
  { text: 'kind' },
  { text: 'of' },
  { text: 'partner?', gold: true },
]

export default function CtaBand() {
  const btnRef = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 160, damping: 16, mass: 0.4 })

  const onMove = (e: React.MouseEvent) => {
    const el = btnRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section className="border-t border-charcoal-line bg-grain-black py-[88px] md:py-[160px]">
      <div className="container-jv flex flex-col items-start gap-10">
        {/* Gold hairline draw */}
        <motion.div
          className="h-px w-12 origin-left bg-gold"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1, ease: EASE }}
          aria-hidden
        />

        <h2 className="text-[38px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[64px]">
          {WORDS.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className={`inline-block ${w.gold ? 'text-gold' : ''}`}
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
              >
                {w.text}
                {i < WORDS.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
        >
          <motion.div style={{ x: sx, y: sy }}>
            <Link
              ref={btnRef}
              to="/contact"
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="group relative inline-block overflow-hidden border border-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-350 ease-jv hover:text-grain-black"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-350 ease-jv group-hover:scale-x-100" />
              <span className="relative">Start a conversation</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
