import { Suspense, lazy, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const HeroParticles = lazy(() => import('@/components/HeroParticles'))

/* ------------------------------------------------------------------ */
/* Line icons (1.5px gold stroke, geometric)                           */
/* ------------------------------------------------------------------ */
function ServiceIcon({ index }: { index: number }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'square' as const,
  }
  const paths = [
    // Transformation — arrows forming a cycle
    <>
      <path d="M6 18a9 9 0 0 1 15.5-6.2" {...common} />
      <path d="M18 18a9 9 0 0 1-15.5 6.2" {...common} transform="translate(6,-6) scale(0.75)" />
      <path d="M21 5v6h-6" {...common} />
    </>,
    // Integration — two squares merging
    <>
      <rect x="4" y="4" width="10" height="10" {...common} />
      <rect x="10" y="10" width="10" height="10" {...common} />
    </>,
    // M&A — diamond thesis mark
    <>
      <path d="M12 3l7 9-7 9-7-9z" {...common} />
      <path d="M12 8v8" {...common} />
    </>,
    // HR & People — three figures
    <>
      <circle cx="12" cy="8" r="3" {...common} />
      <circle cx="5" cy="11" r="2" {...common} />
      <circle cx="19" cy="11" r="2" {...common} />
      <path d="M6 21v-3a6 6 0 0 1 12 0v3" {...common} />
    </>,
    // Talent — target / crosshair
    <>
      <circle cx="12" cy="12" r="8" {...common} />
      <circle cx="12" cy="12" r="3" {...common} />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" {...common} />
    </>,
  ]
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" aria-hidden>
      {paths[index]}
    </svg>
  )
}

const SERVICES = [
  {
    title: 'Transformation',
    desc: 'Enterprise change that sticks — operating models, programmes, and the discipline to finish.',
  },
  {
    title: 'Integration',
    desc: 'Post-deal integration planned before signature and delivered after the confetti settles.',
  },
  {
    title: 'M&A Advisory',
    desc: 'Buy-side and sell-side counsel from thesis to close, with value protection built in.',
  },
  {
    title: 'HR & People',
    desc: 'Organisation design, leadership, culture — the human systems that carry strategy.',
  },
  {
    title: 'Talent Acquisition',
    desc: 'Senior hires and team builds for moments when the wrong hire is the expensive one.',
  },
]

const STATS: { value: number | null; text?: string; suffix: string; label: string; context: string }[] = [
  { value: 40, suffix: '+', label: 'Transformations', context: 'led to completion, not just kick-off' },
  { value: null, text: '£*m', suffix: '', label: 'Transaction value', context: 'advised across buy- and sell-side' },
  { value: 90, suffix: '%', label: 'Repeat & referral', context: 'of engagements come from clients who know us' },
  { value: 18, suffix: '', label: 'Months', context: 'average length of partnership' },
]

/* ------------------------------------------------------------------ */
/* Stat block with count-up                                            */
/* ------------------------------------------------------------------ */
function StatBlock({
  value,
  text,
  suffix,
  label,
  context,
}: {
  value: number | null
  text?: string
  suffix: string
  label: string
  context: string
}) {
  const numRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = numRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      if (value === null) {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 60%' },
        })
        return
      }
      const counter = { v: 0 }
      gsap.to(counter, {
        v: value,
        duration: 1.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 60%' },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.v)}${suffix}`
        },
      })
    }, el)
    return () => ctx.revert()
  }, [value, suffix])

  return (
    <div className="flex flex-col gap-4 px-6 py-10 md:px-10 md:py-14">
      <span
        ref={numRef}
        className="text-[64px] font-extrabold leading-none tracking-[-0.03em] text-gold md:text-[84px]"
      >
        {value === null ? text : `0${suffix}`}
      </span>
      <span className="text-[12px] font-semibold uppercase tracking-[0.32em] text-off-white">
        {label}
      </span>
      <span className="text-[14px] leading-relaxed text-mist">{context}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Home page                                                           */
/* ------------------------------------------------------------------ */
export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      /* ---------------- Hero load + pinned parallax ---------------- */
      const heroLines = gsap.utils.toArray<HTMLElement>('.hero-line-inner')
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.fromTo(
        '.hero-bg',
        { scale: 1.08 },
        { scale: 1, duration: 1.6 },
        0,
      )
        .fromTo(
          '.hero-eyebrow',
          { opacity: 0, letterSpacing: '0.5em' },
          { opacity: 1, letterSpacing: '0.32em', duration: 1.2 },
          0.2,
        )
        .fromTo(heroLines, { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.09 }, 0.3)
        .fromTo('.hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 1.0)
        .fromTo('.hero-cta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 1.1)
        .fromTo('.hero-meta', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.3)

      if (!reduced) {
        const rates = [0.3, 0.5, 0.7]
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=120%',
            scrub: true,
            pin: true,
          },
        })
        heroLines.forEach((line, i) => {
          pinTl.to(line, { yPercent: -60 * rates[i], ease: 'none' }, 0)
        })
        pinTl.to('.hero-fade', { opacity: 1, ease: 'none' }, 0.2)
      }

      /* ---------------- Gold rules draw ---------------- */
      gsap.utils.toArray<HTMLElement>('.gold-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'expo.out',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: rule, start: 'top 80%' },
          },
        )
      })

      /* ---------------- Section 2: word light-up ---------------- */
      const words = gsap.utils.toArray<HTMLElement>('.positioning-word')
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: '.positioning-statement',
            start: 'top 80%',
            end: 'center 45%',
            scrub: true,
          },
        },
      )

      /* ---------------- Section 3: service cards ---------------- */
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: '.services-grid', start: 'top 70%' },
          },
        )
      })

      /* ---------------- Section 4: hairlines + footnote ---------------- */
      gsap.utils.toArray<HTMLElement>('.stat-divider').forEach((d, i) => {
        gsap.fromTo(
          d,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            ease: 'expo.out',
            delay: i * 0.15,
            transformOrigin: 'top center',
            scrollTrigger: { trigger: '.stats-band', start: 'top 60%' },
          },
        )
      })
      gsap.fromTo(
        '.stats-footnote',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 1.2,
          scrollTrigger: { trigger: '.stats-band', start: 'top 60%' },
        },
      )

      /* ---------------- Section 5: philosophy reveal ---------------- */
      gsap.fromTo(
        '.philosophy-block',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.philosophy-block', start: 'top 70%' },
        },
      )
      gsap.fromTo(
        '.quote-mark',
        { scale: 0.6, rotate: -10, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.quote-panel', start: 'top 70%' },
        },
      )
      gsap.fromTo(
        '.quote-word',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.03,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.quote-panel', start: 'top 70%' },
        },
      )
      gsap.fromTo(
        '.quote-rule',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'expo.out',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: '.quote-panel', start: 'top 70%' },
        },
      )

      /* ---------------- Section 6: CTA words ---------------- */
      gsap.fromTo(
        '.cta-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.cta-band', start: 'top 75%' },
        },
      )

      /* Section number ticks */
      gsap.utils.toArray<HTMLElement>('.section-tick').forEach((tick) => {
        gsap.fromTo(
          tick,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: { trigger: tick, start: 'top 85%' },
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const scrollToServices = () => {
    document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={rootRef} className="relative -mt-20">
      {/* ================================================================
          SECTION 1 — HERO (full-bleed, opts out of Layout's nav padding)
          ================================================================ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100dvh] items-center overflow-hidden"
        aria-label="Introduction"
      >
        {/* Background stack */}
        <div className="hero-bg absolute inset-0">
          <img
            src="/JVpartners/hero-boardroom.jpg"
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-ink/[0.82]" />
        </div>

        {/* JV monogram behind particles */}
        <img
          src="/JVpartners/logo-monogram.png"
          alt=""
          aria-hidden
          className="absolute right-[8%] top-1/2 hidden w-[320px] -translate-y-1/2 opacity-30 md:block"
        />

        {/* Gold particle V */}
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>

        {/* Fade to grain-black before unpin */}
        <div className="hero-fade pointer-events-none absolute inset-0 bg-grain-black opacity-0" aria-hidden />

        {/* Content */}
        <div className="container-jv relative z-10 grid grid-cols-12">
          <div className="col-span-12 pt-24 lg:col-span-8">
            <p className="hero-eyebrow eyebrow mb-8">Strategic Advisory · Est. on Trust</p>
            <h1 className="text-[48px] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] md:text-[80px] xl:text-[96px]">
              {['Clarity.', 'Partnership.', 'Enduring impact.'].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <span
                    className={`hero-line-inner block ${i === 2 ? 'text-gold' : 'text-off-white'}`}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero-sub mt-8 max-w-[46ch] text-[17px] leading-[1.65] text-mist md:text-[18px]">
              JV Partners is a partner-led consultancy for transformation, integration, M&amp;A and
              the people challenges in between. Senior only. Discreet by design.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link
                to="/contact"
                className="hero-cta group relative overflow-hidden border border-gold px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-350 ease-jv hover:text-grain-black"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-350 ease-jv group-hover:scale-x-100" />
                <span className="relative">Start a conversation</span>
              </Link>
              <button
                type="button"
                onClick={scrollToServices}
                className="hero-cta group relative text-[13px] font-semibold uppercase tracking-[0.18em] text-mist transition-colors duration-300 ease-jv hover:text-off-white"
              >
                Explore our services ↓
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-jv group-hover:scale-x-100" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="hero-meta absolute bottom-8 left-0 right-0 z-10">
          <div className="container-jv flex items-end justify-between">
            <span className="font-mono text-[11px] tracking-[0.2em] text-mist">01 / 05</span>
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
              <div className="relative h-12 w-px overflow-hidden bg-gold/30">
                <span className="scroll-dot absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-mist">SCROLL</span>
            </div>
            <span className="hidden font-mono text-[11px] tracking-[0.2em] text-mist md:block">
              LONDON · WORLDWIDE
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — POSITIONING STATEMENT
          ================================================================ */}
      <section className="relative py-[88px] md:py-[160px]" aria-label="The firm">
        <span className="section-tick absolute left-6 top-10 font-mono text-[11px] tracking-[0.2em] text-mist md:left-16">
          02 / 05
        </span>
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <div className="gold-rule mx-auto mb-10 h-px w-[120px] bg-gold" />
          <p className="eyebrow mb-8">The Firm</p>
          <p className="positioning-statement text-[24px] font-medium leading-[1.3] tracking-[-0.01em] text-off-white md:text-[40px]">
            {'We are the partners organisations call when the work has to land — and last. No junior teams. No theatre. No decks that die in drawers.'
              .split(' ')
              .map((w, i) => (
                <span key={i} className="positioning-word">
                  {w}{' '}
                </span>
              ))}
          </p>
          <p className="mt-8 text-[16px] leading-[1.65] text-mist md:text-[17px]">
            We measure success by what remains after we leave — capability, clarity and confidence
            that endure.
          </p>
          <p className="mt-8 font-mono text-[12px] tracking-[0.15em] text-gold-dim">
            [ SENIOR-ONLY · OUTCOME-OWNED · DISCREET ]
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — WHAT WE DO
          ================================================================ */}
      <section id="what-we-do" className="relative pb-[88px] md:pb-[160px]" aria-label="Services">
        <span className="section-tick absolute left-6 top-0 font-mono text-[11px] tracking-[0.2em] text-mist md:left-16">
          03 / 05
        </span>
        <div className="container-jv">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-5">Services</p>
              <h2 className="max-w-[16ch] text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[56px]">
                Five practices. One partnership.
              </h2>
            </div>
            <Link
              to="/services"
              className="group flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold"
            >
              All services
              <ArrowRight
                size={16}
                className="transition-transform duration-300 ease-jv group-hover:translate-x-1.5"
              />
            </Link>
          </div>

          <div className="services-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES.map((s, i) => (
              <Link
                key={s.title}
                to="/services"
                className="service-card group relative flex min-h-[320px] flex-col justify-between overflow-hidden border border-charcoal-line bg-charcoal p-6 outline-none transition-all duration-350 ease-jv hover:-translate-y-1.5 hover:border-gold/40 focus-visible:ring-1 focus-visible:ring-gold"
                style={{ marginTop: undefined }}
              >
                {/* Gold left border sweep */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-gold transition-transform duration-350 ease-jv group-hover:scale-y-100"
                />
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[12px] tracking-[0.2em] text-mist transition-colors duration-300 group-hover:text-gold">
                    0{i + 1}
                  </span>
                  <ServiceIcon index={i} />
                </div>
                <div>
                  <h3 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] text-off-white">
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-mist">{s.desc}</p>
                  <span className="mt-5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-dim transition-colors duration-300 group-hover:text-gold">
                    Explore
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 ease-jv group-hover:translate-x-1.5"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — PROOF IN NUMBERS
          ================================================================ */}
      <section className="stats-band relative bg-ink py-[88px] md:py-[120px]" aria-label="Proof">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{ backgroundImage: "url('/JVpartners/texture-charcoal.jpg')" }}
        />
        <div className="container-jv relative">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className="relative">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="stat-divider absolute left-0 top-0 hidden h-full w-px bg-charcoal-line lg:block"
                  />
                )}
                <StatBlock
                  value={s.value}
                  text={s.text}
                  suffix={s.suffix}
                  label={s.label}
                  context={s.context}
                />
              </div>
            ))}
          </div>
          <p className="stats-footnote mt-10 font-mono text-[11px] tracking-[0.1em] text-mist">
            Illustrative. Specific case studies shared under NDA.
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — PHILOSOPHY TEASER + QUOTE
          ================================================================ */}
      <section className="relative py-[88px] md:py-[160px]" aria-label="How we work">
        <span className="section-tick absolute left-6 top-10 font-mono text-[11px] tracking-[0.2em] text-mist md:left-16">
          04 / 05
        </span>
        <div className="container-jv grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="philosophy-block lg:col-span-5">
            <p className="eyebrow mb-6">How we work</p>
            <h2 className="mb-8 text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[48px]">
              Clarity before action.
            </h2>
            <p className="mb-10 max-w-[44ch] text-[17px] leading-[1.65] text-mist">
              Every engagement starts slower than you'd expect — and finishes faster. We diagnose
              before we prescribe, embed before we exit, and stay until the work is embedded.
            </p>
            <Link
              to="/approach"
              className="group flex w-fit items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold"
            >
              Our approach
              <ArrowRight
                size={16}
                className="transition-transform duration-300 ease-jv group-hover:translate-x-1.5"
              />
            </Link>
          </div>

          <div className="quote-panel relative lg:col-span-7 lg:pl-16">
            <span
              aria-hidden
              className="quote-rule absolute left-0 top-0 hidden h-full w-px bg-gold lg:block"
            />
            <span aria-hidden className="quote-mark block text-[64px] font-bold leading-[0.6] text-gold">
              &ldquo;
            </span>
            <blockquote className="mt-6 text-[24px] font-medium leading-[1.3] tracking-[-0.01em] text-off-white md:text-[32px]">
              {'Substance over theatre. Partnership, not packages. People at the centre.'
                .split(' ')
                .map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <span className="quote-word inline-block">{w}&nbsp;</span>
                  </span>
                ))}
            </blockquote>
            <p className="mt-8 font-mono text-[12px] tracking-[0.15em] text-mist">
              — THE JV PARTNERS PRINCIPLES
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — CTA BAND
          ================================================================ */}
      <section
        className="cta-band relative overflow-hidden py-[88px] text-center md:py-[120px]"
        aria-label="Contact call to action"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "url('/JVpartners/grain-texture.png')", backgroundSize: '256px' }}
        />
        <div className="container-jv relative">
          <div className="gold-rule mx-auto mb-14 h-px w-[120px] bg-gold" />
          <span className="section-tick mb-8 block font-mono text-[11px] tracking-[0.2em] text-mist">
            05 / 05
          </span>
          <h2 className="mx-auto max-w-[18ch] text-[40px] font-bold leading-[1.05] tracking-[-0.02em] md:text-[64px]">
            {"Let's talk about what".split(' ').map((w, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="cta-word inline-block text-off-white">{w}&nbsp;</span>
              </span>
            ))}
            <span className="inline-block overflow-hidden">
              <span className="cta-word inline-block text-gold">endures.</span>
            </span>
          </h2>
          <div className="mt-12">
            <a
              href="mailto:hello@jvpartners.com"
              className="group relative inline-block overflow-hidden border border-gold px-10 py-5 text-[15px] font-semibold tracking-[0.08em] text-gold transition-colors duration-350 ease-jv hover:text-grain-black"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-350 ease-jv group-hover:scale-x-100" />
              <span className="relative">hello@jvpartners.com</span>
            </a>
          </div>
          <p className="mt-8 font-mono text-[11px] tracking-[0.12em] text-mist">
            Discreet by design. First conversations carry no obligation.
          </p>
        </div>
      </section>
    </div>
  )
}
