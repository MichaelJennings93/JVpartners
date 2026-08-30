import { useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Copy, Lock } from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const STEPS = [
  {
    title: 'Within one working day',
    body: 'A partner replies personally. No autoresponders.',
  },
  {
    title: 'A private call',
    body: "30 minutes. You talk, we listen, we say honestly if we're not the right fit.",
  },
  {
    title: 'A short proposal',
    body: 'If we can help: scope, people, and a fixed point of view on fees.',
  },
]

const PRACTICES = [
  'Transformation',
  'Integration',
  'M&A',
  'HR & People',
  'Talent',
  'Not sure yet',
]

const REASSURANCES = [
  'NO NEWSLETTERS. NO CRM DRIP.',
  'CONVERSATIONS COVERED BY CONFIDENTIALITY',
  'SENIOR PARTNER REPLIES, ALWAYS',
]

type Stage = 'idle' | 'sending' | 'sent'

function makeRef() {
  const n = Math.floor(1000 + Math.random() * 9000)
  return `JV-${n}`
}

/* Floating-label field: label shrinks to 11px gold uppercase and lifts on focus/value */
function Field({
  id,
  label,
  type = 'text',
  required = false,
  placeholder,
  textarea = false,
  index,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  placeholder?: string
  textarea?: boolean
  index: number
}) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0

  const shared =
    'peer w-full bg-transparent pt-5 pb-2 text-[16px] text-off-white outline-none placeholder:text-mist/40 placeholder:font-mono placeholder:text-[13px]'

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 + index * 0.07, duration: 0.7, ease: EASE }}
      className="relative"
    >
      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            name={id}
            rows={5}
            required={required}
            placeholder={focused ? placeholder : undefined}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${shared} resize-none`}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            required={required}
            placeholder={focused ? placeholder : undefined}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={shared}
          />
        )}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-0 transition-all duration-[250ms] ease-jv ${
            floated
              ? 'top-0 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold'
              : 'top-5 text-[16px] text-mist'
          }`}
        >
          {label}
          {required ? '' : ' ·'}
        </label>
      </div>
      {/* base hairline + gold focus underline drawing in */}
      <span className="absolute bottom-0 left-0 h-px w-full bg-charcoal-line" aria-hidden />
      <span
        aria-hidden
        className={`absolute bottom-0 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ease-jv ${
          focused ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </motion.div>
  )
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('hello@jvpartners.com')
    } catch {
      const ta = document.createElement('textarea')
      ta.value = 'hello@jvpartners.com'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={copy}
        className="group relative inline-flex items-center gap-3 text-[24px] font-semibold tracking-[-0.01em] text-gold md:text-[28px]"
        aria-label="Copy email address"
      >
        hello@jvpartners.com
        <Copy size={16} className="text-gold-dim transition-colors duration-300 group-hover:text-gold" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-jv group-hover:scale-x-100" />
      </button>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute -top-8 left-0 border border-gold/40 bg-ink px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-gold"
          >
            Copied
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

export default function Contact() {
  const [practice, setPractice] = useState<string | null>(null)
  const [stage, setStage] = useState<Stage>('idle')
  const [refCode, setRefCode] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (stage !== 'idle') return
    setStage('sending')
    window.setTimeout(() => {
      setRefCode(makeRef())
      setStage('sent')
    }, 900)
  }

  return (
    <main className="bg-grain-black">
      {/* ---------- Section 1 — Page hero ---------- */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden">
        {/* Background plate */}
        <motion.div
          aria-hidden
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute inset-0"
        >
          <img
            src="/hero-boardroom.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-grain-black via-grain-black/40 to-grain-black/60" />
        </motion.div>
        {/* Watermark C */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[4vw] -bottom-[10vw] select-none text-[38vw] font-extrabold leading-none text-off-white/[0.04]"
        >
          C
        </div>

        <div className="container-jv relative z-10 pb-20 pt-40">
          <div className="mb-8 flex items-center justify-between">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="eyebrow"
            >
              Start a conversation
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-mono text-[12px] tracking-[0.18em] text-mist"
            >
              05 / CONTACT
            </motion.span>
          </div>

          <h1 className="text-[clamp(52px,9vw,96px)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="block text-off-white"
              >
                Discreet by
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
                className="block text-gold"
              >
                design.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
            className="mt-8 max-w-[50ch] text-[17px] leading-[1.65] text-mist"
          >
            First conversations carry no obligation and leave no trace. Tell us as
            much or as little as you like — we'll take it from there.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: EASE }}
            className="mt-10 h-px w-24 origin-left bg-gold"
            aria-hidden
          />
        </div>
      </section>

      {/* ---------- Section 2 — Conversation form ---------- */}
      <section className="py-24 md:py-40">
        <div className="container-jv grid gap-16 lg:grid-cols-12">
          {/* Left column — sticky */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Write to us</p>
              <h2 className="mt-6 text-[32px] font-bold leading-[1.05] tracking-[-0.02em] text-off-white md:text-[40px]">
                What happens next
              </h2>

              <ol className="mt-12 space-y-10">
                {STEPS.map((s, i) => (
                  <motion.li
                    key={s.title}
                    initial={{ y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-25% 0px' }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: EASE }}
                    className="flex gap-6"
                  >
                    <span className="font-mono text-[13px] font-medium tracking-[0.18em] text-gold">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-[18px] font-semibold text-off-white">{s.title}</h3>
                      <p className="mt-2 max-w-[38ch] text-[15px] leading-[1.65] text-mist">
                        {s.body}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>

              <div className="mt-14 border-t border-charcoal-line pt-10">
                <CopyEmail />
                <p className="mt-4 text-[15px] text-mist">www.jvpartners.com</p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mist/70">
                  [ NDA available on request ]
                </p>
              </div>
            </div>
          </div>

          {/* Right column — form card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
              className="relative border border-charcoal-line bg-charcoal p-8 md:p-12"
            >
              <AnimatePresence mode="wait">
                {stage === 'sent' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex min-h-[520px] flex-col items-center justify-center text-center"
                  >
                    {/* Gold check circle draws itself */}
                    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden>
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="44"
                        stroke="#C9A05A"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: EASE }}
                      />
                      <motion.path
                        d="M32 49 L44 61 L66 37"
                        stroke="#C9A05A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
                      />
                    </svg>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
                      className="mt-10 max-w-[30ch] text-[24px] font-medium leading-[1.35] tracking-[-0.01em] text-off-white"
                    >
                      Received. A partner will reply within one working day.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="mt-6 font-mono text-[12px] uppercase tracking-[0.18em] text-gold"
                    >
                      REF: {refCode}
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="space-y-10"
                    noValidate={false}
                  >
                    <Field id="name" label="Name" required index={0} />
                    <Field
                      id="organisation"
                      label="Organisation"
                      placeholder="Optional. Discretion understood."
                      index={1}
                    />
                    <Field id="email" label="Email" type="email" required index={2} />
                    <Field
                      id="message"
                      label="What's on your mind?"
                      textarea
                      placeholder="A sentence is enough."
                      index={3}
                    />

                    {/* Preferred practice */}
                    <motion.fieldset
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + 4 * 0.07, duration: 0.7, ease: EASE }}
                    >
                      <legend className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                        Preferred practice · optional
                      </legend>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {PRACTICES.map((p) => {
                          const active = practice === p
                          return (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setPractice(active ? null : p)}
                              aria-pressed={active}
                              className={`border px-4 py-2 text-[13px] font-medium transition-colors duration-300 ease-jv ${
                                active
                                  ? 'border-gold text-gold'
                                  : 'border-charcoal-line bg-grain-black/40 text-mist hover:border-gold/40 hover:text-off-white'
                              }`}
                            >
                              {p}
                            </button>
                          )
                        })}
                      </div>
                      <input type="hidden" name="practice" value={practice ?? ''} />
                    </motion.fieldset>

                    {/* Submit */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + 5 * 0.07, duration: 0.7, ease: EASE }}
                    >
                      <motion.button
                        type="submit"
                        disabled={stage === 'sending'}
                        whileTap={{ scale: 0.97 }}
                        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden border border-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-350 ease-jv hover:text-grain-black disabled:cursor-wait"
                      >
                        {stage === 'sending' ? (
                          <span className="relative block h-[2px] w-full overflow-hidden bg-gold/20">
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.8, ease: 'linear' }}
                              className="absolute inset-0 origin-left bg-gold"
                            />
                          </span>
                        ) : (
                          <>
                            <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-350 ease-jv group-hover:scale-x-100" />
                            <span className="relative flex items-center gap-3">
                              Send in confidence
                              <Lock size={15} strokeWidth={1.5} />
                            </span>
                          </>
                        )}
                      </motion.button>
                      <p className="mt-4 text-center font-mono text-[11px] tracking-[0.08em] text-mist/60">
                        Sent only to the partnership. Never stored in a CRM.
                      </p>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Section 3 — Reassurance band ---------- */}
      <section className="relative bg-ink py-20">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1, ease: EASE }}
          className="absolute top-0 left-0 h-px w-full origin-left bg-gold/60"
          aria-hidden
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1, ease: EASE }}
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gold/60"
          aria-hidden
        />
        <div className="container-jv flex flex-col items-center justify-center gap-8 text-center md:flex-row md:gap-14">
          {REASSURANCES.map((r, i) => (
            <motion.p
              key={r}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mist"
            >
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden />
              {r}
            </motion.p>
          ))}
        </div>
      </section>
    </main>
  )
}
