import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Manifesto words; "stay" is rendered in gold
const WORDS = ['We', 'stay', 'until', 'the', 'work', 'is', 'embedded.']

export default function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced) {
        gsap.set('.manifesto-word', { opacity: 1 })
        gsap.set('.manifesto-mark', { scale: 1, rotate: 0, opacity: 1 })
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      // Background plate parallax — translates 80px slower than scroll
      tl.fromTo('.manifesto-bg', { y: -80 }, { y: 0, duration: 2, ease: 'none' }, 0)

      // Gold quotation mark scales in with a slight rotation settle
      tl.fromTo(
        '.manifesto-mark',
        { scale: 0.6, rotate: -14, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.45, ease: 'expo.out' },
        0.05,
      )

      // Words light up sequentially (0.15 → 1)
      tl.fromTo(
        '.manifesto-word',
        { opacity: 0.15 },
        { opacity: 1, duration: 0.35, stagger: 0.18, ease: 'power1.out' },
        0.25,
      )

      // Support line follows
      tl.fromTo(
        '.manifesto-support',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' },
        1.55,
      )
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-ink"
    >
      {/* Dark photo plate with slow parallax */}
      <div className="manifesto-bg absolute -inset-y-24 inset-x-0" aria-hidden>
        <img
          src="/JVpartners/approach-hands.jpg"
          alt=""
          className="h-full w-full object-cover opacity-[0.12]"
        />
      </div>

      <div className="container-jv relative z-10 flex flex-col items-center py-24 text-center">
        <span className="manifesto-mark select-none text-[64px] font-bold leading-none text-gold" aria-hidden>
          “
        </span>
        <p className="mt-6 max-w-[22ch] text-[30px] font-medium leading-[1.3] tracking-[-0.01em] text-off-white md:text-[44px]">
          {WORDS.map((w, i) => (
            <span key={i}>
              <span className={`manifesto-word inline-block ${w === 'stay' ? 'text-gold' : ''}`}>
                {w}
              </span>
              {i < WORDS.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
        <p className="manifesto-support mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-mist">
          Capability, clarity and confidence that endure after we leave — that's the only
          scorecard we accept.
        </p>
      </div>
    </section>
  )
}
