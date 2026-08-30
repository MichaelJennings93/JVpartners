# JV Partners Website — Deployment Handoff

Premium 5-page marketing site for JV Partners (Strategic Consultancy & Advisory).

## Stack
- React 19 + TypeScript
- Vite 7 (`base: './'` — already GitHub-Pages friendly)
- Tailwind CSS 3.4 + shadcn/ui
- GSAP + ScrollTrigger, Lenis, Framer Motion, Three.js / R3F (hero particles)
- Fonts: Archivo + IBM Plex Mono (Google Fonts, loaded in `index.html`)

## Pages / Routes
- `/` — Home (particle hero, positioning, services overview, stats, philosophy, CTA)
- `/services` — five practices as an interactive dossier accordion + engagement model
- `/approach` — pinned four-principles scroll story + differentiators + manifesto
- `/impact` — stats band, sector grid, NDA case teasers, partnership timeline
- `/contact` — confidential-style form (front-end only, no backend), click-to-copy email

## Brand assets
All committed in `public/` (logo lockup + monogram are the official brand artwork — do not modify or regenerate):
`logo-lockup.png`, `logo-monogram.png`, `hero-boardroom.jpg`, `texture-charcoal.jpg`, `approach-hands.jpg`, `sector-abstract.jpg`, `grain-texture.png`.

## Build
```bash
npm install
npm run build      # outputs to dist/
npm run dev        # local dev on port 3000
```
Requires Node.js 20+.

## Deploy to GitHub Pages
This is a single-page app using `BrowserRouter`, so GitHub Pages needs a 404 fallback.

Option A — GitHub Actions (workflow included at `.github/workflows/deploy.yml`):
1. Push this repo to GitHub.
2. Repo → Settings → Pages → Source: "GitHub Actions".
3. Push to `main`; the workflow builds and deploys. The site will be at `https://<user>.github.io/<repo>/`.
   - `vite.config.ts` already uses `base: './'`, so project-page paths work. For a user/organization root site (`<user>.github.io`) or a custom domain, you may change `base` to `'/'`.

Option B — `gh-pages` package:
```bash
npm install -D gh-pages
npm run build
cp dist/index.html dist/404.html   # SPA fallback
npx gh-pages -d dist
```

## Custom domain
Add a `CNAME` file in `public/` containing the domain, then configure DNS per GitHub Pages docs.

## Notes
- The contact form is a front-end demo (no backend). To receive submissions, wire it to a form service (e.g. Formspree) or add a backend endpoint.
- Lenis smooth scroll and pinned GSAP sections respect `prefers-reduced-motion`.
