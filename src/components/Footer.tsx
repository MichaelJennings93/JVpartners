import { Link } from 'react-router'
import { ArrowUp } from 'lucide-react'

const SITEMAP = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/approach', label: 'Approach' },
  { to: '/impact', label: 'Impact' },
  { to: '/contact', label: 'Contact' },
]

const SERVICES = [
  'Transformation',
  'Integration',
  'M&A Advisory',
  'HR & People',
  'Talent Acquisition',
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/60 bg-ink">
      {/* Giant JV watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[6vw] left-1/2 -translate-x-1/2 select-none text-[24vw] font-extrabold leading-none tracking-[-0.05em] text-[#262626]"
      >
        JV
      </div>

      <div className="container-jv relative z-10 grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/logo-lockup.png" alt="JV Partners" className="h-16 w-auto object-contain" />
          <p className="mt-6 max-w-[26ch] text-[15px] leading-relaxed text-mist">
            Clarity. Partnership. Enduring impact.
          </p>
        </div>

        <div>
          <h3 className="eyebrow mb-6">Sitemap</h3>
          <ul className="space-y-3">
            {SITEMAP.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-[15px] text-mist transition-colors duration-300 ease-jv hover:text-off-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-6">Services</h3>
          <ul className="space-y-3">
            {SERVICES.map((s) => (
              <li key={s}>
                <Link
                  to="/services"
                  className="text-[15px] text-mist transition-colors duration-300 ease-jv hover:text-off-white"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-6">Contact</h3>
          <a
            href="mailto:hello@jvpartners.com"
            className="group relative inline-block text-[15px] text-gold"
          >
            hello@jvpartners.com
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-jv group-hover:scale-x-100" />
          </a>
          <p className="mt-3 text-[15px] text-mist">www.jvpartners.com</p>
          <p className="mt-6 max-w-[30ch] font-mono text-[11px] leading-relaxed text-mist/70">
            Discreet by design — details shared under NDA.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group mt-8 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-mist transition-colors duration-300 ease-jv hover:text-gold"
          >
            Back to top
            <ArrowUp
              size={14}
              className="text-gold transition-transform duration-300 ease-jv group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>

      <div className="relative z-10 border-t border-charcoal-line">
        <div className="container-jv flex flex-col items-start justify-between gap-3 py-6 font-mono text-[11px] text-mist md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} JV Partners LLP. All rights reserved.</span>
          <span className="flex gap-4">
            <a href="#" className="transition-colors duration-300 hover:text-off-white">
              Privacy
            </a>
            <span aria-hidden>·</span>
            <a href="#" className="transition-colors duration-300 hover:text-off-white">
              Terms
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
