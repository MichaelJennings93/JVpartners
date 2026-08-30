import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import EngagementModel from '@/components/services/EngagementModel'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Practice = {
  name: string
  teaser: string
  tagline: string
  body: string
  deliverables: string[]
}

const PRACTICES: Practice[] = [
  {
    name: 'Transformation',
    teaser: 'Change that outlives the programme.',
    tagline: 'Change that outlives the programme.',
    body: 'Operating model redesign, enterprise programmes, turnaround and performance. We build the case, the plan and the cadence — then run it alongside your leaders until the new way is simply the way.',
    deliverables: [
      'Operating model design',
      'Programme leadership',
      'Benefits realisation',
      'Change & communications',
      'PMO that earns its keep',
    ],
  },
  {
    name: 'Integration',
    teaser: 'Day One is a milestone, not a strategy.',
    tagline: 'Day One is a milestone, not a strategy.',
    body: 'Pre-close integration planning, synergy cases that survive diligence, Day One readiness, and the 18-month grind after. We integrate cultures as carefully as we integrate systems.',
    deliverables: [
      'Integration blueprints',
      'Synergy validation',
      'Day One readiness',
      'Culture & retention plans',
      'Clean-team support',
    ],
  },
  {
    name: 'M&A Advisory',
    teaser: 'Counsel from thesis to close — and beyond.',
    tagline: 'Counsel from thesis to close — and beyond.',
    body: 'Buy-side origination support, commercial diligence leadership, sell-side preparation and deal execution counsel. We protect value in the negotiation and the twelve months after it.',
    deliverables: [
      'Deal thesis & screening',
      'Commercial diligence',
      'Vendor due diligence prep',
      'Negotiation support',
      'Value protection plans',
    ],
  },
  {
    name: 'HR & People',
    teaser: 'The human system that carries the strategy.',
    tagline: 'The human system that carries the strategy.',
    body: 'Organisation design, leadership assessment and development, culture work with measurable edges, reward and workforce strategy. People first — because nothing else executes.',
    deliverables: [
      'Organisation design',
      'Leadership assessment',
      'Culture diagnostics',
      'Reward & incentives',
      'Workforce planning',
    ],
  },
  {
    name: 'Talent Acquisition',
    teaser: 'The right person, when the wrong one is expensive.',
    tagline: 'The right person, when the wrong one is expensive.',
    body: 'Senior executive search, critical-hire campaigns, and interim leadership. Discreet mapping, honest assessment, and candidates who stay.',
    deliverables: [
      'Executive search',
      'Interim leadership',
      'Market mapping',
      'Succession builds',
      'Onboarding for impact',
    ],
  },
]

const SECTORS = [
  'Professional Services',
  'Financial Services',
  'Technology',
  'Industrial & Manufacturing',
  'Healthcare & Life Sciences',
  'Private Equity',
]

/* Masked-rise headline line */
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

export default function Services() {
  const heroRef = useRef<HTMLElement>(null)
  const watermarkRef = useRef<HTMLSpanElement>(null)
  const [openPractice, setOpenPractice] = useState<string>('')

  /* Watermark "S" parallax — drifts 40px slower than scroll */
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (watermarkRef.current) {
          watermarkRef.current.style.transform = `translateY(${window.scrollY * 0.08}px)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="bg-grain-black">
      {/* ================================================================
          SECTION 1 — PAGE HERO (60vh)
          ================================================================ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[60dvh] flex-col justify-center overflow-hidden"
        aria-label="Services hero"
      >
        {/* Oversized watermark "S" at 4% opacity, parallax drift */}
        <span
          ref={watermarkRef}
          aria-hidden
          className="pointer-events-none absolute -right-[4vw] top-1/2 -translate-y-1/2 select-none text-[42vw] font-extrabold leading-none text-off-white/[0.04]"
        >
          S
        </span>

        <div className="container-jv relative">
          <motion.span
            className="block font-mono text-[11px] tracking-[0.2em] text-mist"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          >
            02 / SERVICES
          </motion.span>

          <motion.p
            className="eyebrow mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
          >
            WHAT WE DO
          </motion.p>

          <h1 className="mt-6 text-[52px] font-extrabold leading-[0.95] tracking-[-0.03em] md:text-[96px]">
            <RiseLine text="Five practices." className="text-off-white" delay={0.6} />
            <RiseLine text="One standard." className="text-gold" delay={0.7} />
          </h1>

          <motion.p
            className="mt-8 max-w-[52ch] text-[16px] leading-[1.65] text-mist md:text-[18px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          >
            Each practice is led personally by a partner. Engagements combine freely — most
            clients meet us through one door and stay for the whole house.
          </motion.p>

          <motion.div
            aria-hidden
            className="mt-10 h-px w-[160px] origin-left bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
          />
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — THE PRACTICE INDEX (interactive dossier accordion)
          ================================================================ */}
      <section className="py-[88px] md:py-[160px]" aria-label="The practice index">
        <div className="container-jv">
          <div className="mb-14 flex items-end justify-between gap-6 md:mb-20">
            <div>
              <span className="eyebrow">THE PRACTICE INDEX</span>
              <h2 className="mt-6 max-w-[18ch] text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[56px]">
                Five dossiers<span className="text-gold">.</span>
              </h2>
            </div>
            <span className="hidden font-mono text-[11px] tracking-[0.2em] text-mist md:block">
              01–05 / OPEN ONE
            </span>
          </div>

          <AccordionPrimitive.Root
            type="single"
            collapsible
            value={openPractice}
            onValueChange={setOpenPractice}
            className="border-t border-charcoal-line"
          >
            {PRACTICES.map((p, i) => {
              const value = `practice-${i}`
              const isOpen = openPractice === value
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-25% 0px' }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                >
                  <AccordionPrimitive.Item
                    value={value}
                    className="border-b border-charcoal-line"
                  >
                    <AccordionPrimitive.Header>
                      <AccordionPrimitive.Trigger className="group flex min-h-[96px] w-full items-center gap-5 py-6 text-left outline-none md:gap-10">
                        <span className="w-8 shrink-0 font-mono text-[13px] tracking-[0.15em] text-gold transition-colors duration-300 ease-jv group-hover:text-mist md:w-12">
                          0{i + 1}
                        </span>
                        <span className="flex-1 text-[24px] font-bold leading-none tracking-[-0.02em] text-off-white md:text-[40px]">
                          {p.name}
                        </span>
                        <span className="hidden max-w-[28ch] flex-1 text-[14px] leading-snug text-mist lg:block">
                          {p.teaser}
                        </span>
                        {/* + rotates 45° to × on open */}
                        <motion.span
                          aria-hidden
                          className="shrink-0 text-[28px] font-light leading-none text-gold"
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                        >
                          +
                        </motion.span>
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>

                    <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            key="dossier"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="mb-10 grid gap-10 border border-charcoal-line bg-charcoal p-8 md:grid-cols-2 md:p-14"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 24 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                            >
                              <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-gold">
                                {p.tagline}
                              </p>
                              <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.7] text-off-white/90 md:text-[17px]">
                                {p.body}
                              </p>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 24 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
                            >
                              <p className="eyebrow">DELIVERABLES</p>
                              <ul className="mt-6 space-y-3">
                                {p.deliverables.map((d) => (
                                  <li
                                    key={d}
                                    className="flex items-baseline gap-3 font-mono text-[13px] tracking-[0.05em] text-mist"
                                  >
                                    <span aria-hidden className="text-gold">
                                      ·
                                    </span>
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </AccordionPrimitive.Content>
                  </AccordionPrimitive.Item>
                </motion.div>
              )
            })}
          </AccordionPrimitive.Root>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — HOW ENGAGEMENTS RUN (GSAP scroll-scrubbed model)
          ================================================================ */}
      <EngagementModel />

      {/* ================================================================
          SECTION 4 — SECTOR RELEVANCE STRIP
          ================================================================ */}
      <section className="py-[88px] md:py-[120px]" aria-label="Sector relevance">
        <div className="container-jv">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist">
            WHERE WE WORK
          </span>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-4">
            {SECTORS.map((s, i) => (
              <motion.span
                key={s}
                className="flex items-baseline gap-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              >
                {i > 0 && (
                  <span aria-hidden className="text-[24px] text-charcoal-line">
                    ·
                  </span>
                )}
                <Link
                  to="/impact"
                  aria-label={`${s} — see impact`}
                  className="group relative inline-flex items-center gap-2 text-[18px] text-mist transition-colors duration-300 ease-jv hover:text-gold md:text-[24px]"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-gold opacity-0 transition-opacity duration-300 ease-jv group-hover:opacity-100"
                  />
                  <span className="relative">
                    {s}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-jv group-hover:scale-x-100" />
                  </span>
                </Link>
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — CTA BAND
          ================================================================ */}
      <section
        className="relative overflow-hidden py-[88px] text-center md:py-[120px]"
        aria-label="Contact call to action"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "url('/grain-texture.png')", backgroundSize: '256px' }}
        />
        <div className="container-jv relative">
          <motion.div
            aria-hidden
            className="mx-auto mb-14 h-px w-[120px] origin-left bg-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 1, ease: EASE }}
          />
          <h2 className="mx-auto max-w-[18ch] text-[40px] font-bold leading-[1.05] tracking-[-0.02em] md:text-[64px]">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-off-white"
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                Not sure which door?
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-gold"
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              >
                Start with a conversation.
              </motion.span>
            </span>
          </h2>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <a
              href="mailto:hello@jvpartners.com"
              className="group relative inline-block overflow-hidden border border-gold px-10 py-5 text-[15px] font-semibold tracking-[0.08em] text-gold transition-colors duration-350 ease-jv hover:text-grain-black"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-350 ease-jv group-hover:scale-x-100" />
              <span className="relative">hello@jvpartners.com</span>
            </a>
          </motion.div>
          <p className="mt-8 font-mono text-[11px] tracking-[0.12em] text-mist">
            Discreet by design. First conversations carry no obligation.
          </p>
        </div>
      </section>
    </div>
  )
}
