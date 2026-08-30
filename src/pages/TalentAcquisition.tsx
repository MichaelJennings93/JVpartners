import { motion } from 'framer-motion'
import { Link } from 'react-router'
import CtaBand from '@/components/approach/CtaBand'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const CAPABILITIES = [
  {
    name: 'Retained Executive Search',
    line: 'For the seats that move value. Discreet mapping, honest assessment, shortlists chosen to stay — not to flatter the brief.',
  },
  {
    name: 'Permanent Recruitment',
    line: 'Critical hires below board level, run with search-grade rigour: real market coverage, structured interviews, evidence over gut feel.',
  },
  {
    name: 'Interim, Contract & Fractional',
    line: 'Proven operators in the seat within weeks — to bridge, to turn around, or to carry a programme that cannot wait.',
  },
  {
    name: 'Embedded Talent Partnerships',
    line: 'Our recruiters inside your business, on your systems and your employer brand — capacity that scales up and down with the plan.',
  },
  {
    name: 'Market Mapping & Talent Intelligence',
    line: 'Who is where, what they earn, who is movable and why. Decisions made on the map, not the anecdote.',
  },
  {
    name: 'Salary Benchmarking & Offer Design',
    line: 'Offers built to land the right person the first time — benchmarked, structured and sold with conviction.',
  },
]

const PROCESS = [
  { step: 'Brief', line: 'The role behind the job spec: outcomes, context, and what failure would look like.' },
  { step: 'Map', line: 'Full market coverage before anyone is approached. The long list is evidence, not memory.' },
  { step: 'Approach', line: 'Discreet, senior-led conversations. Your name is used carefully, or not at all.' },
  { step: 'Assess', line: 'Structured interviews and referencing against the brief — strengths, risks, and how they land.' },
  { step: 'Shortlist & Offer', line: 'A small list you can hire from, and an offer designed to be accepted.' },
  { step: 'Land & Stay', line: 'Onboarding support and structured follow-through until the hire is delivering.' },
]

const PROOF = [
  { value: 'Senior-led', label: 'EVERY SEARCH', line: 'The person you brief is the person who delivers.' },
  { value: 'Evidence', label: 'OVER INSTINCT', line: 'Structured assessment on every shortlist.' },
  { value: 'Candour', label: 'AS STANDARD', line: 'If the brief is wrong, we say so before we search.' },
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

export default function TalentAcquisition() {
  return (
    <div className="bg-grain-black">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[70dvh] flex-col justify-center overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-[4vw] top-1/2 -translate-y-1/2 select-none text-[38vw] font-extrabold leading-none text-off-white/[0.03]"
        >
          T
        </span>
        <div className="container-jv relative py-24">
          <motion.span
            className="font-mono text-[11px] tracking-[0.25em] text-mist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link to="/services" className="transition-colors hover:text-gold">
              SERVICES
            </Link>{' '}
            / <span className="text-gold">TALENT ACQUISITION</span>
          </motion.span>
          <h1 className="mt-8 text-[40px] font-bold leading-[1.02] tracking-[-0.02em] text-off-white md:text-[72px]">
            <RiseLine text="Hiring is a capability." className="" delay={0.1} />
            <RiseLine text="We build it." className="text-gold" delay={0.22} />
          </h1>
          <motion.p
            className="mt-8 max-w-[58ch] text-[16px] leading-[1.7] text-mist md:text-[18px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          >
            From a single critical hire to an embedded team, we bring search-grade rigour to every
            level of recruitment — senior-led, evidence-based, and honest about what the market will
            actually give you.
          </motion.p>
        </div>
      </section>

      {/* ── Capability grid ──────────────────────────────────── */}
      <section className="py-[88px] md:py-[140px]" aria-label="Talent acquisition capabilities">
        <div className="container-jv">
          <div className="mb-14 md:mb-20">
            <span className="eyebrow">WHAT WE DO</span>
            <h2 className="mt-6 max-w-[20ch] text-[32px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[48px]">
              Six ways in<span className="text-gold">.</span> One standard<span className="text-gold">.</span>
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-charcoal-line bg-charcoal-line md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.name}
                className="group relative bg-grain-black p-10 transition-colors duration-500 ease-jv hover:bg-charcoal md:min-h-[300px] md:p-12"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
              >
                <span className="font-mono text-[13px] tracking-[0.15em] text-gold">0{i + 1}</span>
                <h3 className="mt-6 max-w-[16ch] text-[21px] font-bold leading-[1.15] tracking-[-0.01em] text-off-white md:text-[24px]">
                  {c.name}
                </h3>
                <p className="mt-5 max-w-[36ch] text-[14px] leading-relaxed text-mist">{c.line}</p>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-jv group-hover:scale-x-100"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process rail ─────────────────────────────────────── */}
      <section className="border-y border-charcoal-line bg-ink py-[88px] md:py-[140px]" aria-label="How a search runs">
        <div className="container-jv">
          <div className="mb-14 flex items-end justify-between gap-6 md:mb-20">
            <div>
              <span className="eyebrow">HOW A SEARCH RUNS</span>
              <h2 className="mt-6 max-w-[20ch] text-[32px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[48px]">
                No mystery<span className="text-gold">.</span> Just method<span className="text-gold">.</span>
              </h2>
            </div>
            <span className="hidden font-mono text-[11px] tracking-[0.2em] text-mist md:block">
              01–06 / THE RAIL
            </span>
          </div>
          <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <motion.li
                key={p.step}
                className="relative border-l border-charcoal-line pl-8"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.1 }}
              >
                <span
                  aria-hidden
                  className="absolute -left-[3px] top-1 h-[5px] w-[5px] rounded-full bg-gold"
                />
                <span className="font-mono text-[12px] tracking-[0.2em] text-gold">0{i + 1}</span>
                <h3 className="mt-3 text-[20px] font-bold tracking-[-0.01em] text-off-white">
                  {p.step}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-mist">{p.line}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Proof strip ──────────────────────────────────────── */}
      <section className="py-[88px] md:py-[120px]" aria-label="How we work">
        <div className="container-jv grid gap-12 md:grid-cols-3">
          {PROOF.map((s, i) => (
            <motion.div
              key={s.label}
              className="border-t border-gold/40 pt-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            >
              <p className="text-[34px] font-bold leading-none tracking-[-0.02em] text-gold md:text-[44px]">
                {s.value}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-off-white">
                {s.label}
              </p>
              <p className="mt-4 max-w-[30ch] text-[14px] leading-relaxed text-mist">{s.line}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
