import { motion } from 'framer-motion'
import { Link } from 'react-router'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Capability = {
  name: string
  line: string
}

type Group = {
  title: string
  to: string
  intro: string
  items: Capability[]
}

const GROUPS: Group[] = [
  {
    title: 'Pre-Deal',
    to: '/services/pre-deal',
    intro: 'Before a process begins, when access and judgement matter most.',
    items: [
      {
        name: 'Deal Origination, Identification & Management Access',
        line: 'Proprietary introductions and early, discreet access to management teams.',
      },
      {
        name: 'Deal Advisor Sourcing',
        line: 'The right advisors around the table — matched to thesis, sector and stage.',
      },
      {
        name: 'Leadership Scan',
        line: 'A quiet, evidence-based read on the leadership you are about to back.',
      },
    ],
  },
  {
    title: 'Leadership Advisory',
    to: '/services/leadership-advisory',
    intro: 'Through the hold, keeping the team and the plan aligned.',
    items: [
      {
        name: 'Leadership Mobilisation',
        line: 'Aligning the team behind the value-creation plan from day one.',
      },
      {
        name: 'Succession Planning',
        line: 'Cover for every critical seat — built before it is needed.',
      },
      {
        name: 'Management Reset',
        line: 'Honest recalibration when the plan and the team have drifted apart.',
      },
      {
        name: 'Exit Preparation',
        line: 'Leadership readiness that stands up to buyer diligence.',
      },
    ],
  },
  {
    title: 'Leadership Change',
    to: '/services/leadership-change',
    intro: 'When the answer is a different person in the seat.',
    items: [
      {
        name: 'Executive Search',
        line: 'Senior appointments — discreetly mapped, honestly assessed.',
      },
      {
        name: 'Executive Interim',
        line: 'Proven operators in the seat within weeks, not quarters.',
      },
      {
        name: 'Leadership Evaluation',
        line: 'Evidence over instinct: the team you have, against the team you need.',
      },
    ],
  },
]

const FUNCTIONS = [
  'Board',
  'CEO',
  'Financial Officers',
  'Investment Professionals',
  'Growth Officers',
  'People',
]

export default function CapabilityIndex() {
  return (
    <section className="py-[88px] md:py-[160px]" aria-label="The deal lifecycle">
      <div className="container-jv">
        <div className="mb-14 flex items-end justify-between gap-6 md:mb-20">
          <div>
            <span className="eyebrow">THE DEAL LIFECYCLE</span>
            <h2 className="mt-6 max-w-[22ch] text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[56px]">
              From first look to exit<span className="text-gold">.</span>
            </h2>
          </div>
          <span className="hidden font-mono text-[11px] tracking-[0.2em] text-mist md:block">
            01–04 / WHERE WE STAND
          </span>
        </div>

        <div className="grid gap-x-14 gap-y-16 md:grid-cols-3">
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{ duration: 0.7, ease: EASE, delay: gi * 0.1 }}
            >
              <div className="border-t border-gold/40 pt-6">
                <span className="font-mono text-[13px] tracking-[0.15em] text-gold">
                  0{gi + 1}
                </span>
                <h3 className="mt-4 text-[22px] font-bold leading-none tracking-[-0.01em] text-off-white md:text-[28px]">
                  {g.title}
                </h3>
                <p className="mt-4 max-w-[36ch] text-[14px] leading-snug text-mist">{g.intro}</p>
                <Link
                  to={g.to}
                  className="group mt-5 inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold"
                >
                  Explore the practice
                  <span aria-hidden className="transition-transform duration-300 ease-jv group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
              <ul className="mt-8 space-y-6">
                {g.items.map((c) => (
                  <li key={c.name}>
                    <p className="flex items-baseline gap-3 text-[15px] font-semibold leading-snug text-off-white md:text-[16px]">
                      <span aria-hidden className="text-gold">
                        ·
                      </span>
                      {c.name}
                    </p>
                    <p className="mt-1.5 pl-[18px] text-[13px] leading-relaxed text-mist">
                      {c.line}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Functions strip */}
        <motion.div
          className="mt-20 border-t border-charcoal-line pt-10 md:mt-28"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-baseline justify-between gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist">
              FUNCTIONS
            </span>
            <span className="hidden font-mono text-[11px] tracking-[0.2em] text-mist md:block">
              THE SEATS WE COVER
            </span>
          </div>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-4">
            {FUNCTIONS.map((f, i) => (
              <motion.span
                key={f}
                className="flex items-baseline gap-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              >
                {i > 0 && (
                  <span aria-hidden className="text-[24px] text-charcoal-line">
                    ·
                  </span>
                )}
                <Link to="/functions" className="text-[18px] text-off-white transition-colors duration-300 ease-jv hover:text-gold md:text-[24px]">{f}</Link>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
