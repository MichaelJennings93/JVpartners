import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import Footer from './Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Layout() {
  const location = useLocation()

  // Site-wide Lenis smooth scrolling, synced with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-[100dvh] bg-grain-black text-off-white">
      <div className="grain-overlay" aria-hidden />
      <Navbar />
      {/* Nav is fixed (80px) — content starts below it; full-bleed heroes opt out inside their page */}
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
