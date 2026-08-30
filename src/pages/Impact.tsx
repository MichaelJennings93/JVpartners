import { memo, useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ---------------------------------- data --------------------------------- */

const STATS = [
  {
    value: 40,
    prefix: '',
    suffix: '+',
    label: 'Transformations',
    context: 'Led to completion across six sectors; completion, for us, means embedded.',
  },
  {
    value: null,
    display: '£*m',
    label: 'Transaction Value',
    context: 'Advised across buy-side, sell-side and integration mandates.',
  },
  {
    value: 90,
    prefix: '',
    suffix: '%',
    label: 'Repeat & Referral',
    context: 'Clients come back, and send their peers — the metric we guard most.',
  },
  {
    value: 18,
    prefix: '',
    suffix: '',
    label: 'Months',
    context: 'Average partnership length; we stay until the work is embedded.',
  },
]

const SECTORS = [
  {
    name: 'Professional Services',
    scope: 'Partnership economics, operating models, lateral integration.',
    tag: '[ 12 ENGAGEMENTS ]',
  },
  {
    name: 'Financial Services',
    scope: 'Regulatory transformation, carve-outs, leadership builds.',
    tag: '[ 9 ENGAGEMENTS ]',
  },
  {
    name: 'Technology',
    scope: 'Scale-up operating cadence, talent systems, M&A readiness.',
    tag: '[ 11 ENGAGEMENTS ]',
  },
  {
    name: 'Industrial & Manufacturing',
    scope: 'Footprint redesign, post-merger integration, succession.',
    tag: '[ 8 ENGAGEMENTS ]',
  },
  {
    name: 'Healthcare & Life Sciences',
    scope: 'Growth integration, clinical-commercial alignment, executive search.',
    tag: '[ 6 ENGAGEMENTS ]',
  },
  {
    name: 'Private Equity',
    scope: 'Portfolio value creation, 100-day plans, management assessment.',
    tag: '[ 14 ENGAGEMENTS ]',
  },
]

const CASES = [
  {
    id: 'CASE 01',
    sector: 'INDUSTRIAL',
    titleLead: 'Integration mandate for',
    outcome:
      'Post-merger integration of two manufacturing groups. 24 months. Synergy case exceeded by 31%; leadership team retained in full.',
  },
  {
    id: 'CASE 02',
    sector: 'PRIVATE EQUITY',
    titleLead: 'Value creation programme for',
    outcome:
      '100-day value creation plan for a platform acquisition. EBITDA bridge delivered two quarters early; CEO succession embedded.',
  },
  {
    id: 'CASE 03',
    sector: 'FINANCIAL SERVICES',
    titleLead: 'Transformation reset for',
    outcome:
      'Enterprise transformation reset after a stalled programme. Re-planned in 6 weeks; benefits back on track within the year.',
  },
]

const MILESTONES = [
  { month: 0, phase: 'DIAGNOSE', caption: 'We listen first. The mandate is defined together, in plain terms.' },
  { month: 6, phase: 'DELIVER', caption: 'Early proof points land; momentum becomes visible to the organisation.' },
  { month: 12, phase: 'EMBED', caption: 'New ways of working are owned by your people, not ours.' },
  { month: 18, phase: 'HANDOVER', caption: "We leave. The capability doesn't." },
]

/* ------------------------------ tiny helpers ----------------------------- */

function SectionHead({ eyebrow, title, index }: { eyebrow: string; title: ReactNode; index?: string }) {
  return (
    <div className="mb-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4">
            <span className="eyebrow">{eyebrow}</span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="h-px w-12 origin-left bg-gold"
              aria-hidden
            />
          </div>
          <h2 className="mt-6 max-w-[18ch] text-[clamp(34px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.02em] text-off-white">
            {title}
          </h2>
        </div>
        {index && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="hidden font-mono text-xs text-mist md:block"
          >
            {index}
          </motion.span>
        )}
      </div>
    </div>
  )
}

/* ------------------------------ Section 1 hero ---------------------------- */

function ImpactHero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: bgRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])

  const line1 = 'Measured by'.split(' ')
  const line2 = 'what remains.'.split(' ')

  return (
    <section ref={bgRef} className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink">
      {/* Background plate */}
      <motion.div aria-hidden className="absolute inset-0" style={{ y }}>
        <motion.img
          src="/sector-abstract.jpg"
          alt=""
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
          className="h-full w-full object-cover opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-ink/60" />
      </motion.div>

      <div className="container-jv relative z-10 pb-20 pt-40">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-mono text-xs text-mist"
        >
          04 / IMPACT
        </motion.span>
        <div className="mt-4 flex items-center gap-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="eyebrow"
          >
            Our Impact
          </motion.span>
        </div>

        <h1 className="mt-8 text-[clamp(44px,8vw,96px)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            {line1.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 }}
                className="mr-[0.25em] inline-block text-off-white"
              >
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {line2.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.1 }}
                className="mr-[0.25em] inline-block text-gold"
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.8 }}
          className="mt-10 h-px w-full max-w-md origin-left bg-gold"
          aria-hidden
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-mist"
        >
          Our best work can't be shown — it's running inside our clients' organisations. Here's what
          we can say.
        </motion.p>
      </div>
    </section>
  )
}

/* --------------------------- Section 2 stats band -------------------------- */

function StatBlock({ stat, delay }: { stat: (typeof STATS)[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(stat.display ?? `${stat.prefix}0${stat.suffix}`)
  const [done, setDone] = useState(stat.value === null)

  useEffect(() => {
    if (!inView || stat.value === null) return
    const controls = animate(0, stat.value, {
      duration: 1.8,
      ease: EASE,
      delay,
      onUpdate: (v) => setDisplay(`${stat.prefix}${Math.round(v)}${stat.suffix}`),
      onComplete: () => setDone(true),
    })
    return () => controls.stop()
  }, [inView, stat, delay])

  return (
    <div ref={ref} className="relative px-8 py-14 md:py-20">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
        className="absolute left-0 top-8 bottom-8 hidden w-px origin-top bg-charcoal-line md:block"
        aria-hidden
      />
      <div className="relative inline-block">
        <span className="block text-[clamp(56px,7vw,88px)] font-extrabold leading-none tracking-[-0.03em] text-gold">
          {display}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={done ? { scaleX: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-3 block h-[2px] w-full origin-left bg-gold"
          aria-hidden
        />
      </div>
      <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.32em] text-off-white">
        {stat.label}
      </p>
      <p className="mt-3 max-w-[30ch] text-[14px] leading-relaxed text-mist">{stat.context}</p>
    </div>
  )
}

function StatsBand() {
  return (
    <section className="border-y border-gold/50 bg-grain-black">
      <div className="container-jv">
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatBlock key={s.label} stat={s} delay={i * 0.15} />
          ))}
        </div>
        <p className="border-t border-charcoal-line py-6 font-mono text-[11px] text-mist">
          Illustrative figures. Verified detail shared in conversation, under NDA.
        </p>
      </div>
    </section>
  )
}

/* --------------------------- Section 3 sector grid ------------------------- */

function SectorTile({ sector, index }: { sector: (typeof SECTORS)[number]; index: number }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      data-cursor="View"
      className="group relative aspect-[4/3] overflow-hidden border border-charcoal-line bg-charcoal p-8 transition-[border-color] duration-500 ease-jv hover:border-gold/40"
    >
      {/* Texture reveal on hover */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-0 transition-all duration-700 ease-jv group-hover:scale-[1.03] group-hover:opacity-10"
        style={{ backgroundImage: "url('/texture-charcoal.jpg')" }}
      />
      {/* Gold frame draw on hover — 4 segments */}
      <span aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-jv group-hover:scale-x-100" />
        <span className="absolute right-0 top-0 h-full w-px origin-top scale-y-0 bg-gold transition-transform duration-500 ease-jv [transition-delay:120ms] group-hover:scale-y-100" />
        <span className="absolute bottom-0 right-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-jv [transition-delay:240ms] group-hover:scale-x-100" />
        <span className="absolute bottom-0 left-0 h-full w-px origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-jv [transition-delay:360ms] group-hover:scale-y-100" />
      </span>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <span className="font-mono text-xs text-gold-dim">0{index + 1}</span>
        <div>
          <h3 className="text-[clamp(22px,2.2vw,28px)] font-semibold tracking-[-0.01em] text-off-white">
            {sector.name}
          </h3>
          <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-mist">{sector.scope}</p>
          <p className="mt-5 font-mono text-[11px] text-mist transition-colors duration-500 ease-jv group-hover:text-gold">
            {sector.tag}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function SectorsGrid() {
  return (
    <section className="py-[88px] md:py-40">
      <div className="container-jv">
        <SectionHead
          eyebrow="Sectors"
          index="02 / SECTORS"
          title={
            <>
              Where we've done <span className="text-gold">the work.</span>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((s, i) => (
            <SectorTile key={s.name} sector={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------ Section 4 NDA case teasers ----------------------- */

const ShimmerStyles = memo(function ShimmerStyles() {
  return (
    <style>{`
      @keyframes nda-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .nda-bar {
        background-image: linear-gradient(
          100deg,
          #141414 0%,
          #141414 38%,
          rgba(201, 160, 90, 0.45) 50%,
          #141414 62%,
          #141414 100%
        );
        background-size: 200% 100%;
        animation: nda-shimmer 6s linear infinite;
      }
      .nda-card:hover .nda-bar { animation-play-state: paused; }
      @media (prefers-reduced-motion: reduce) {
        .nda-bar { animation: none; }
      }
    `}</style>
  )
})

function CaseCard({ caseItem, index }: { caseItem: (typeof CASES)[number]; index: number }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 120, damping: 14 })
  const sry = useSpring(ry, { stiffness: 120, damping: 14 })

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 4) // ≤2° each direction
    rx.set(-py * 4)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      initial={{ x: -60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="nda-card border border-charcoal-line bg-charcoal p-8 transition-colors duration-500 ease-jv hover:border-gold/40 md:p-10"
      >
        {/* Mono header row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-mist">
          <span className="text-gold">{caseItem.id}</span>
          <span aria-hidden>·</span>
          <span>SECTOR:</span>
          <span className="nda-bar inline-block h-[1.1em] w-24 align-middle" aria-label={`${caseItem.sector} (redacted)`} />
          <span aria-hidden>·</span>
          <span>STATUS: COMPLETE</span>
        </div>

        {/* Redacted title */}
        <h3 className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[clamp(20px,2.4vw,26px)] font-semibold tracking-[-0.01em] text-off-white">
          <span>{caseItem.titleLead}</span>
          <span className="nda-bar inline-block h-[0.9em] w-40 align-middle" aria-hidden />
        </h3>

        <p className="mt-5 max-w-[70ch] text-[16px] leading-[1.65] text-mist">{caseItem.outcome}</p>
      </motion.div>
    </motion.div>
  )
}

function NdaWall() {
  return (
    <section className="bg-ink py-[88px] md:py-40">
      <ShimmerStyles />
      <div className="container-jv">
        <SectionHead
          eyebrow="Under NDA"
          index="03 / CASES"
          title={
            <>
              Stories we can only tell <span className="text-gold">in person.</span>
            </>
          }
        />
        <div className="flex flex-col gap-6">
          {CASES.map((c, i) => (
            <CaseCard key={c.id} caseItem={c} index={i} />
          ))}
        </div>

        {/* Quote panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-20 border-l-2 border-gold pl-8 md:pl-12"
        >
          <span aria-hidden className="block text-[64px] font-bold leading-none text-gold">
            &ldquo;
          </span>
          <p className="mt-2 max-w-[24ch] text-[clamp(26px,3.4vw,38px)] font-medium leading-[1.3] tracking-[-0.01em] text-off-white">
            We measure success by what remains after we leave.
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.12em] text-mist">
            — JV PARTNERS, ENGAGEMENT CHARTER
          </p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.18em] text-gold"
          >
            Request references in conversation
            <span
              aria-hidden
              className="transition-transform duration-300 ease-jv group-hover:translate-x-1.5"
            >
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ----------------------- Section 5 partnership timeline -------------------- */

function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 25%'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <section className="py-[88px] md:py-40">
      <div className="container-jv">
        <SectionHead
          eyebrow="Partnership"
          index="04 / TIMELINE"
          title={
            <>
              Eighteen months, <span className="text-gold">measured.</span>
            </>
          }
        />

        <div ref={ref} className="relative pt-4">
          {/* Line */}
          <motion.div
            aria-hidden
            style={{ scaleX: lineScale }}
            className="absolute left-0 top-[7px] h-px w-full origin-left bg-gold"
          />
          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {MILESTONES.map((m, i) => (
              <TimelineNode key={m.month} milestone={m} index={i} progress={lineScale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineNode({
  milestone,
  index,
  progress,
}: {
  milestone: (typeof MILESTONES)[number]
  index: number
  progress: ReturnType<typeof useSpring>
}) {
  // Node pops when the scrubbed line reaches its x position (0, 1/3, 2/3, 1)
  const threshold = index / (MILESTONES.length - 1)
  const scale = useTransform(progress, [Math.max(0, threshold - 0.04), threshold], [0, 1], {
    clamp: true,
  })
  const dotScale = useSpring(scale, { stiffness: 260, damping: 16 })
  const capOpacity = useTransform(progress, [threshold, Math.min(1, threshold + 0.05)], [0, 1], {
    clamp: true,
  })
  const capY = useTransform(progress, [threshold, Math.min(1, threshold + 0.05)], [12, 0], {
    clamp: true,
  })

  return (
    <div className="relative">
      <motion.span
        aria-hidden
        style={{ scale: dotScale }}
        className="absolute -top-[1px] left-0 block h-4 w-4 -translate-y-1/2 rounded-full bg-gold"
      />
      <motion.div style={{ opacity: capOpacity, y: capY }} className="pt-10">
        <p className="font-mono text-[11px] tracking-[0.12em] text-gold">
          MONTH {milestone.month} · {milestone.phase}
        </p>
        <p className="mt-3 max-w-[26ch] text-[14px] leading-relaxed text-mist">
          {milestone.caption}
        </p>
      </motion.div>
    </div>
  )
}

/* ------------------------------ Section 6 CTA ------------------------------ */

function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t border-gold/50 bg-ink">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: "url('/texture-charcoal.jpg')" }}
      />
      <div className="container-jv relative z-10 py-[88px] text-center md:py-40">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-[16ch] text-[clamp(36px,5.5vw,64px)] font-bold leading-[1.05] tracking-[-0.02em] text-off-white"
        >
          Your story could be <span className="text-gold">next.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="mt-12"
        >
          <Link
            to="/contact"
            className="group relative inline-block overflow-hidden border border-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-350 ease-jv hover:text-grain-black"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-350 ease-jv group-hover:scale-x-100" />
            <span className="relative">Start a conversation</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------- page ----------------------------------- */

export default function Impact() {
  return (
    <>
      <ImpactHero />
      <StatsBand />
      <SectorsGrid />
      <NdaWall />
      <Timeline />
      <CtaBand />
    </>
  )
}
