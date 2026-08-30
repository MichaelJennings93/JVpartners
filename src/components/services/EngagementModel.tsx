import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STEPS = [
  {
    numeral: 'i',
    title: 'Diagnose',
    body: "Two to four weeks. We listen, test assumptions, and tell you what we'd do if it were our own capital.",
  },
  {
    numeral: 'ii',
    title: 'Deliver',
    body: 'Partner-led teams embedded with yours. Weekly cadence, honest reporting, no disappearing acts.',
  },
  {
    numeral: 'iii',
    title: 'Embed',
    body: 'We stay until the work is embedded — capability transferred, confidence built, exits earned.',
  },
]

/**
 * Section 3 — How engagements run.
 * GSAP-owned component: the gold connector line scaleX is scrubbed to scroll,
 * and each step activates (numeral mist→gold, card lifts 4px) as the line reaches it.
 */
export default function EngagementModel() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const line = sectionRef.current?.querySelector<HTMLElement>('.model-line')
      const steps = gsap.utils.toArray<HTMLElement>('.model-step', sectionRef.current ?? undefined)
      if (!line || steps.length === 0) return

      // Scrubbed gold connector line, 70% → 30% of viewport
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: true,
          },
        }
      )

      // Steps activate sequentially as the line reaches them
      steps.forEach((step, i) => {
        const numeral = step.querySelector<HTMLElement>('.model-numeral')
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${70 - i * 20}%`,
              toggleActions: 'play none none reverse',
            },
          })
          .to(numeral, { color: '#C9A05A', duration: 0.4, ease: 'power2.out' }, 0)
          .to(step, { y: -4, duration: 0.4, ease: 'power2.out' }, 0)
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-[88px] md:py-[160px]"
      aria-label="How engagements run"
    >
      {/* Charcoal texture at 8% */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url('/JVpartners/texture-charcoal.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container-jv relative">
        <div className="mb-16 md:mb-24">
          <span className="eyebrow">HOW ENGAGEMENTS RUN</span>
          <h2 className="mt-6 max-w-[16ch] text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[56px]">
            The model<span className="text-gold">.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Gold connector line (draws across on scroll) */}
          <div
            aria-hidden
            className="model-line absolute left-0 top-[28px] hidden h-px w-full origin-left bg-gold md:block"
          />

          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {STEPS.map((s) => (
              <article key={s.numeral} className="model-step relative">
                {/* Node dot on the line */}
                <span
                  aria-hidden
                  className="absolute left-0 top-[24px] hidden h-2 w-2 -translate-y-1/2 rounded-full border border-gold bg-ink md:block"
                />
                <span className="model-numeral block font-mono text-[14px] tracking-[0.2em] text-mist md:pt-14">
                  {s.numeral}
                </span>
                <h3 className="mt-4 text-[26px] font-semibold tracking-[-0.01em] text-off-white">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[16px] leading-[1.65] text-mist">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
