import Link from 'next/link'
import Image from 'next/image'
import { Bookmark } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import type { NewKickInStore } from '@/lib/types/stores'

export function NewKickInStores({ stores }: { stores: NewKickInStore[] }) {
  if (!stores.length) return null

  return (
    <section className="bg-white py-6 md:py-10">
      <SectionHeader title="New kicks in stores" />
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 md:px-6">
        {stores.map(store => {
          const offer = store.offers?.[0]
          return (
            <Link
              key={store.store_id}
              href={`/stores/${store.store_id}`}
              className="relative aspect-3/4 rounded-2xl overflow-hidden block bg-gray-900"
            >
              {store.cover_image_url ? (
                <Image
                  src={store.cover_image_url}
                  alt={store.store_name}
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-purple-900/80 to-gray-900" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

              <span className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                NEW
              </span>

              {offer?.badge_text && (
                <span className="absolute top-2.5 right-2.5 bg-brand/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                  {offer.badge_text}
                </span>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-2.5 flex items-end justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <p className="text-white text-[12px] font-bold truncate leading-tight">{store.store_name}</p>
                  <p className="text-white/55 text-[10px] truncate mt-0.5">
                    {store.location_name ?? store.city ?? ''}
                  </p>
                </div>
                <button type="button" aria-label="Save" className="p-1 rounded-md bg-black/30 text-white/70 hover:text-white shrink-0">
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
