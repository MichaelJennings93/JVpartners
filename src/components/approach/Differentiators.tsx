import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface CardDef {
  title: string
  body: string
  icon: React.ReactNode
}

// Hand-coded 1.5px-stroke geometric line icons in gold.
// pathLength=1 + dashoffset lets the stroke "redraw" on hover via CSS.
function LineIcon({ paths }: { paths: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className="h-9 w-9 text-gold"
      aria-hidden
    >
      {paths}
    </svg>
  )
}

function P({ d }: { d: string }) {
  return (
    <path
      d={d}
      pathLength={1}
      className="[stroke-dasharray:1] [stroke-dashoffset:0] group-hover:[animation:icon-redraw_0.9s_cubic-bezier(0.16,1,0.3,1)]"
    />
  )
}

const CARDS: CardDef[] = [
  {
    title: 'Senior-only delivery',
    body: 'The partner you meet is the partner who delivers. No bait-and-switch, no learning on your budget.',
    icon: (
      <LineIcon
        paths={
          <>
            <P d="M16 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
            <P d="M5 29c0-6 5-10 11-10s11 4 11 10" />
            <P d="M22 6l6-3M25 9l4-1" />
          </>
        }
      />
    ),
  },
  {
    title: 'Integrated perspective',
    body: 'Deals, organisations and people under one roof — because in practice they were never separate.',
    icon: (
      <LineIcon
        paths={
          <>
            <P d="M16 3v26M3 16h26" />
            <P d="M8 8h7v7H8zM17 17h7v7h-7zM17 8h7v7h-7zM8 17h7v7H8z" />
          </>
        }
      />
    ),
  },
  {
    title: 'Outcome ownership',
    body: 'We commit to results we can be measured against, and we report against them honestly.',
    icon: (
      <LineIcon
        paths={
          <>
            <P d="M16 27a11 11 0 1 0 0-22 11 11 0 0 0 0 22Z" />
            <P d="M16 22a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
            <P d="M16 16l7-7" />
          </>
        }
      />
    ),
  },
  {
    title: 'Discreet by design',
    body: 'No logos on our slides, no name-dropping, no case studies without consent. Your business stays your business.',
    icon: (
      <LineIcon
        paths={
          <>
            <P d="M4 16s5-8 12-8c3 0 5.6 1.4 7.6 3.4M28 16s-5 8-12 8c-3 0-5.6-1.4-7.6-3.4" />
            <P d="M6 26L26 6" />
          </>
        }
      />
    ),
  },
]

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

export default function Differentiators() {
  return (
    <section className="bg-grain-black py-[88px] md:py-[160px]">
      <style>{`@keyframes icon-redraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }`}</style>
      <div className="container-jv">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          The Difference
        </motion.p>
        <motion.h2
          className="mt-6 text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[56px]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
        >
          Why clients choose us
        </motion.h2>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-30% 0px' }}
        >
          {CARDS.map((c) => (
            <motion.article
              key={c.title}
              variants={cardVariants}
              className="group border border-charcoal-line bg-charcoal p-8 transition-[border-color,transform] duration-500 ease-jv hover:-translate-y-1 hover:border-gold/40 md:p-10"
            >
              {c.icon}
              <h3 className="mt-7 text-[24px] font-semibold tracking-[-0.01em] text-off-white md:text-[26px]">
                {c.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.65] text-mist">{c.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
