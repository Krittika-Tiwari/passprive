import Link from 'next/link'
import Image from 'next/image'
import { Bookmark } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import type { StoreRow } from '@/lib/types/stores'

export function ShopThisWeekend({ stores }: { stores: StoreRow[] }) {
  if (!stores.length) return null
  const featured = stores.slice(0, 8)

  return (
    <section className="bg-white py-6 md:py-10">
      <SectionHeader title="Shop This Weekend" />
      <div className="mt-5 flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-2 md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible">
        {featured.map(store => (
          <Link
            key={store.id}
            href={`/stores/${store.slug}`}
            className="relative shrink-0 w-[75vw] max-w-75 md:w-auto aspect-3/4 rounded-2xl overflow-hidden block bg-gray-900"
          >
            {store.cover_image ? (
              <Image
                src={store.cover_image}
                alt={store.name}
                fill
                className="object-cover opacity-75"
                sizes="(max-width: 768px) 75vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-purple-900 to-gray-900" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end gap-2.5">
              <div className="relative w-11 h-11 rounded-xl bg-white shrink-0 overflow-hidden shadow">
                {store.logo_url ? (
                  <Image src={store.logo_url} alt="" fill className="object-contain p-1" sizes="44px" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[13px] font-bold leading-tight truncate">{store.name}</p>
                <p className="text-white/60 text-[11px] truncate mt-0.5">
                  {store.description ?? store.subcategory ?? store.category ?? ''}
                </p>
              </div>
              <button type="button" aria-label="Save" className="p-1.5 rounded-lg bg-black/30 text-white/80 hover:text-white shrink-0">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
