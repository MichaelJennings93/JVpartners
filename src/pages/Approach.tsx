import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PrinciplesStory from '@/components/approach/PrinciplesStory'
import Differentiators from '@/components/approach/Differentiators'
import Manifesto from '@/components/approach/Manifesto'
import CtaBand from '@/components/approach/CtaBand'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[60dvh] items-end overflow-hidden bg-ink"
    >
      {/* Watermark "A" at 4% opacity, parallax */}
      <motion.span
        aria-hidden
        style={{ y: watermarkY }}
        className="pointer-events-none absolute -right-[4vw] -top-[6vw] select-none text-[38vw] font-extrabold leading-none tracking-[-0.05em] text-off-white/[0.04]"
      >
        A
      </motion.span>

      {/* Mono page index */}
      <motion.span
        className="absolute right-[clamp(24px,5vw,80px)] top-10 font-mono text-xs tracking-[0.3em] text-mist"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
      >
        03 / APPROACH
      </motion.span>

      <div className="container-jv relative z-10 pb-20 pt-16 md:pb-28">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          How We Work
        </motion.p>

        <h1 className="mt-8 text-[52px] font-extrabold leading-[0.95] tracking-[-0.03em] md:text-[96px]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-off-white"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            >
              Principles,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-gold"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            >
              not packages.
            </motion.span>
          </span>
        </h1>

        {/* Gold rule draw */}
        <motion.div
          className="mt-10 h-px w-24 origin-left bg-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.8 }}
          aria-hidden
        />

        <motion.p
          className="mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-mist md:text-[18px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
        >
          Methodologies are commodities. What clients actually buy is judgement, presence, and
          the willingness to stay. Here is how we think.
        </motion.p>
      </div>
    </section>
  )
}

export default function Approach() {
  return (
    <>
      <Hero />
      <PrinciplesStory />
      <Differentiators />
      <Manifesto />
      <CtaBand />
    </>
  )
}
