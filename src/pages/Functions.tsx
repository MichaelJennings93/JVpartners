import { motion } from 'framer-motion'
import CtaBand from '@/components/approach/CtaBand'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const FUNCTIONS = [
  {
    name: 'Board',
    line: 'Chairs and non-executives who bring judgement, access and calm — governance that helps rather than hovers.',
  },
  {
    name: 'CEO',
    line: 'The seat where conviction matters most. Succession, search and support for the leader who carries the plan.',
  },
  {
    name: 'Financial Officers',
    line: 'CFOs and senior finance leadership for every stage — exit-ready reporting, funding, control and pace.',
  },
  {
    name: 'Investment Professionals',
    line: 'Investors and deal-team talent for funds and their platforms, from origination through portfolio.',
  },
  {
    name: 'Growth Officers',
    line: 'Commercial, revenue and marketing leadership that turns a strategy into a number.',
  },
  {
    name: 'People',
    line: 'CHROs and people leaders who build the organisations that plans depend on.',
  },
]

function RiseLine({ text, className, delay }: { text: string; className: string; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </span>
  )
}

export default function Functions() {
  return (
    <div className="bg-grain-black">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[60dvh] flex-col justify-center overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-[4vw] top-1/2 -translate-y-1/2 select-none text-[38vw] font-extrabold leading-none text-off-white/[0.03]"
        >
          F
        </span>
        <div className="container-jv relative py-24">
          <motion.span
            className="font-mono text-[11px] tracking-[0.25em] text-mist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            06 / <span className="text-gold">FUNCTIONS</span>
          </motion.span>
          <h1 className="mt-8 text-[40px] font-bold leading-[1.02] tracking-[-0.02em] text-off-white md:text-[72px]">
            <RiseLine text="The seats" className="" delay={0.1} />
            <RiseLine text="we cover." className="text-gold" delay={0.22} />
          </h1>
          <motion.p
            className="mt-8 max-w-[58ch] text-[16px] leading-[1.7] text-mist md:text-[18px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          >
            Value concentrates in a handful of seats. We know what good looks like in each of them —
            and where to find it.
          </motion.p>
        </div>
      </section>

      {/* ── Function grid ────────────────────────────────────── */}
      <section className="py-[88px] md:py-[140px]" aria-label="Functions we cover">
        <div className="container-jv grid gap-px overflow-hidden border border-charcoal-line bg-charcoal-line md:grid-cols-2 lg:grid-cols-3">
          {FUNCTIONS.map((f, i) => (
            <motion.div
              key={f.name}
              className="group relative bg-grain-black p-10 transition-colors duration-500 ease-jv hover:bg-charcoal md:min-h-[280px] md:p-12"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <span className="font-mono text-[13px] tracking-[0.15em] text-gold">0{i + 1}</span>
              <h2 className="mt-6 text-[24px] font-bold leading-none tracking-[-0.01em] text-off-white md:text-[28px]">
                {f.name}
              </h2>
              <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-mist">{f.line}</p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-jv group-hover:scale-x-100"
              />
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
