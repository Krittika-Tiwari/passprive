import Link from 'next/link'
import Image from 'next/image'
import { Download } from 'lucide-react'

export function ForYouHero() {
  return (
    <section className="bg-white px-4 pt-5 pb-0 md:px-6 md:pt-8">
      {/* Dark purple gradient card — matches AppCTASection brand style */}
      <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#1e0d4a] via-[#150a38] to-[#0c0622] px-6 py-8 md:px-14 md:py-12">
        {/* Watermark */}
        <div
          className="absolute -top-4 right-6 text-[160px] font-black text-white/3 leading-none select-none pointer-events-none tracking-tight"
          aria-hidden="true"
        >
          PP
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-1">
              <Image
                src="/passpriveWhiteLogo.png"
                alt="PassPrivé"
                width={130}
                height={55}
                className="h-12 w-auto object-contain"
              />
              <p className="text-[11px] text-white/50">Your Pass to the Best Deals &amp; Places.</p>
            </div>

            <div>
              <h1 className="text-[28px] md:text-[40px] font-extrabold text-white leading-tight tracking-tight">
                Better{' '}
                <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Experiences
                </span>
                <br />
                Deals &amp; Places
              </h1>
              <p className="mt-2 text-[13px] md:text-[15px] text-white/60 leading-relaxed max-w-md">
                Great deals on dining and stores near you.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-1">
              <Link
                href="/dining"
                className="flex items-center gap-2 bg-white text-gray-900 rounded-full px-5 py-2.5 text-[13px] font-bold hover:bg-gray-100 transition-colors"
              >
                Explore Dining →
              </Link>
              <Link
                href="/stores"
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-5 py-2.5 text-[13px] font-bold hover:bg-white/15 transition-colors"
              >
                Browse Stores
              </Link>
            </div>
          </div>

          {/* Desktop: app download QR hint */}
          <div className="hidden md:flex flex-col items-center gap-3 shrink-0">
            <div className="w-36 bg-white/8 border border-white/10 rounded-2xl flex items-center justify-center py-6 px-5">
              <Download className="w-12 h-12 text-white/40" aria-hidden="true" />
            </div>
            <p className="text-[11px] font-bold text-white/50 tracking-[0.2em] uppercase text-center">
              Download the App
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
