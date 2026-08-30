import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const EASE = 'expo.out'

const PRINCIPLES = [
  {
    title: 'Clarity before action',
    body: "We diagnose before we prescribe. The first deliverable is never a plan — it's an honest picture of where you actually are.",
    tag: 'LISTEN → TEST → SPEAK PLAINLY',
  },
  {
    title: 'Partnership, not packages',
    body: 'No off-the-shelf frameworks with your logo pasted in. Every engagement is shaped around your context, your people, your constraints.',
    tag: 'SHAPED, NOT STAMPED',
  },
  {
    title: 'Substance over theatre',
    body: "We don't do hundred-page decks that die in drawers. We do decisions, cadence, and work that survives contact with Monday morning.",
    tag: 'OUTCOMES > OPTICS',
  },
  {
    title: 'People at the centre',
    body: 'Strategy is executed by humans. We design for adoption, build capability as we go, and leave teams stronger than we found them.',
    tag: 'CAPABILITY THAT STAYS',
  },
]

export default function PrinciplesStory() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced) {
        // Static stack: show everything, full rail
        gsap.set('.principle-panel', { opacity: 1, y: 0, position: 'relative', height: 'auto' })
        gsap.set('.chapter-numeral', { opacity: 0 })
        gsap.set('.chapter-numeral-0', { opacity: 1 })
        gsap.set('.principles-rail-fill', { scaleY: 1 })
        gsap.set('.principle-tag-char', { opacity: 1, x: 0 })
        return
      }

      const panels = gsap.utils.toArray<HTMLElement>('.principle-panel')
      const numerals = gsap.utils.toArray<HTMLElement>('.chapter-numeral')

      // Initial states: only chapter 1 visible
      gsap.set(panels, { opacity: 0, y: 60 })
      gsap.set(panels[0], { opacity: 1, y: 0 })
      gsap.set(numerals, { opacity: 0, y: 10 })
      gsap.set(numerals[0], { opacity: 1, y: 0 })
      gsap.set(panels[0].querySelectorAll('.principle-tag-char'), { opacity: 1, x: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=360%', // 4 chapters × ~90vh
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      // Gold rail fills across the whole story
      tl.fromTo('.principles-rail-fill', { scaleY: 0 }, { scaleY: 1, duration: 4, ease: 'none' }, 0)

      // Chapter transitions (each segment = 1 unit; swap at segment boundary)
      for (let i = 0; i < panels.length - 1; i++) {
        const at = i + 0.5 // middle of each ~1-unit segment
        const out = panels[i]
        const inn = panels[i + 1]
        // Outgoing: slide up 60px + fade
        tl.to(out, { y: -60, opacity: 0, duration: 0.4, ease: 'power1.in' }, at)
        // Incoming: from 60px below + fade in
        tl.fromTo(inn, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: EASE }, at + 0.15)
        // Numeral crossfade with 10px rise
        tl.to(numerals[i], { y: -10, opacity: 0, duration: 0.3, ease: 'power1.in' }, at)
        tl.fromTo(
          numerals[i + 1],
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: EASE },
          at + 0.15,
        )
        // Mono tag letters reveal left-to-right on entry
        tl.fromTo(
          inn.querySelectorAll('.principle-tag-char'),
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.012, ease: 'power1.out' },
          at + 0.35,
        )
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden bg-grain-black">
      <div className="container-jv grid min-h-[100dvh] grid-cols-1 items-center gap-10 py-24 lg:grid-cols-5 lg:gap-16">
        {/* Sticky column: eyebrow, chapter numeral, progress rail */}
        <div className="flex items-center gap-8 lg:col-span-2 lg:gap-12">
          {/* Vertical gold progress rail */}
          <div className="relative hidden h-[42vh] w-px bg-charcoal-line lg:block" aria-hidden>
            <div className="principles-rail-fill absolute inset-0 origin-top bg-gold" />
          </div>
          <div>
            <p className="eyebrow">Our Principles</p>
            <div className="relative mt-8 h-[96px] w-[160px]" aria-live="polite">
              {PRINCIPLES.map((_, i) => (
                <span
                  key={i}
                  className={`chapter-numeral chapter-numeral-${i} absolute left-0 top-0 font-mono text-[96px] font-medium leading-none text-gold`}
                >
                  {i + 1}
                </span>
              ))}
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-mist">
              of four
            </p>
          </div>
        </div>

        {/* Panels: one visible at a time */}
        <div className="relative lg:col-span-3">
          {PRINCIPLES.map((p) => (
            <article
              key={p.title}
              className="principle-panel absolute inset-0 flex h-full flex-col justify-center"
            >
              <h2 className="text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[56px]">
                {p.title}
              </h2>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-mist md:text-[18px]">
                {p.body}
              </p>
              <p className="mt-8 font-mono text-[13px] tracking-[0.14em] text-gold-dim" aria-label={`[ ${p.tag} ]`}>
                <span aria-hidden>[ </span>
                {p.tag.split('').map((c, i) => (
                  <span key={i} className="principle-tag-char inline-block" aria-hidden>
                    {c === ' ' ? ' ' : c}
                  </span>
                ))}
                <span aria-hidden> ]</span>
              </p>
            </article>
          ))}
          {/* Spacer sizes the panel stage (panels are absolutely stacked) */}
          <div className="h-[62vh] md:h-[52vh]" aria-hidden />
        </div>
      </div>
    </section>
  )
}
