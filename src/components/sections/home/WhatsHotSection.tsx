import Link from 'next/link'
import Image from 'next/image'
import { SectionHeader } from './SectionHeader'
import type { EditorialCollection } from '@/lib/types/stores'

const GRADIENTS = [
  'from-[#2d0f6e] via-[#4c1d95] to-[#7c3aed]',
  'from-[#4a0e6e] via-[#7e22ce] to-[#a855f7]',
  'from-[#1e0d4a] via-[#5b21b6] to-[#7c3aed]',
  'from-[#3b0764] via-[#6d28d9] to-[#c026d3]',
]

export function WhatsHotSection({ collections }: { collections: EditorialCollection[] }) {
  if (!collections.length) return null

  return (
    <section className="bg-white py-6 md:py-10 pb-10 md:pb-14">
      <SectionHeader title="What's Hot on Pass Privé" />
      <div className="mt-5 flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-6 pb-2 md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible">
        {collections.map((col, i) => (
          <Link
            key={col.id}
            href={`/collections/${col.slug}`}
            className={`relative shrink-0 w-[60vw] max-w-60 md:w-auto aspect-3/4 rounded-2xl overflow-hidden block bg-linear-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
          >
            {col.cover_image_url && (
              <Image
                src={col.cover_image_url}
                alt={col.title}
                fill
                className="object-cover opacity-30"
                sizes="(max-width: 768px) 60vw, 25vw"
              />
            )}

            {/* "PP" watermark */}
            <div className="absolute -bottom-3 -right-2 text-[80px] font-black text-white/5 leading-none select-none pointer-events-none" aria-hidden="true">
              PP
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full p-4">
              <div>
                {col.badge_text && (
                  <span className="inline-block bg-white/15 text-white text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full mb-2">
                    {col.badge_text}
                  </span>
                )}
                {col.city && (
                  <p className="text-white/50 text-[9px] font-bold uppercase tracking-[0.22em]">
                    {col.city}
                  </p>
                )}
                <p className="text-white text-[18px] md:text-[20px] font-extrabold leading-tight mt-1">
                  {col.title}
                </p>
                {col.subtitle && (
                  <p className="text-white/60 text-[11px] mt-1 line-clamp-2">{col.subtitle}</p>
                )}
                <p className="text-purple-300 text-[11px] font-semibold mt-2">
                  By {col.source_name ?? 'PassPrivé'}
                </p>
              </div>

              <div className="flex items-end justify-between gap-2">
                <div className="bg-black/30 rounded-xl px-3 py-2">
                  <p className="text-amber-300 text-[22px] font-extrabold leading-none">
                    {col.save_count}
                  </p>
                  <p className="text-white/60 text-[10px] mt-0.5 line-clamp-2 max-w-18">
                    saves
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
