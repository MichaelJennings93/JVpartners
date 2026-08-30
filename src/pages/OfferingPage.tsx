import { motion } from 'framer-motion'
import { Link } from 'react-router'
import CtaBand from '@/components/approach/CtaBand'
import type { OfferingGroup } from '@/data/offerings'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

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

export default function OfferingPage({ group }: { group: OfferingGroup }) {
  return (
    <div className="bg-grain-black">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[60dvh] flex-col justify-center overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-[4vw] top-1/2 -translate-y-1/2 select-none text-[38vw] font-extrabold leading-none text-off-white/[0.03]"
        >
          {group.watermark}
        </span>
        <div className="container-jv relative py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="font-mono text-[11px] tracking-[0.25em] text-mist">
              <Link to="/services" className="transition-colors hover:text-gold">
                SERVICES
              </Link>{' '}
              / <span className="text-gold">{group.eyebrow}</span>
            </span>
          </motion.div>
          <h1 className="mt-8 text-[40px] font-bold leading-[1.02] tracking-[-0.02em] text-off-white md:text-[72px]">
            <RiseLine text={group.titleLines[0]} className="" delay={0.1} />
            <RiseLine text={group.titleLines[1]} className="text-gold" delay={0.22} />
          </h1>
          <motion.p
            className="mt-8 max-w-[58ch] text-[16px] leading-[1.7] text-mist md:text-[18px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          >
            {group.intro}
          </motion.p>
        </div>
      </section>

      {/* ── Offerings ────────────────────────────────────────── */}
      <section className="py-[88px] md:py-[140px]" aria-label={`${group.eyebrow} offerings`}>
        <div className="container-jv space-y-0">
          {group.items.map((o, i) => (
            <motion.article
              key={o.name}
              className="grid gap-10 border-t border-charcoal-line py-14 last:border-b md:grid-cols-[auto_1fr_1fr] md:gap-14 md:py-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="font-mono text-[13px] tracking-[0.15em] text-gold md:w-12">
                0{i + 1}
              </span>
              <div>
                <h2 className="max-w-[24ch] text-[24px] font-bold leading-[1.15] tracking-[-0.01em] text-off-white md:text-[32px]">
                  {o.name}
                </h2>
                <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.7] text-off-white/85 md:text-[16px]">
                  {o.body}
                </p>
              </div>
              <div className="md:pt-2">
                <p className="eyebrow">WHAT WE BRING</p>
                <ul className="mt-6 space-y-3">
                  {o.brings.map((b) => (
                    <li
                      key={b}
                      className="flex items-baseline gap-3 font-mono text-[13px] tracking-[0.05em] text-mist"
                    >
                      <span aria-hidden className="text-gold">
                        ·
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
