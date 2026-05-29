'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Tag, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocation } from '@/lib/context/LocationContext'
import type { StoreRow, StoreMoodCategory } from '@/lib/types/stores'

interface Props {
  stores: StoreRow[]
  moodCategories: StoreMoodCategory[]
  activeCategorySlug: string
  onCategoryChange: (slug: string) => void
}

const DISTANCE_OPTIONS = [
  { label: 'Under 5 km', km: 5 },
  { label: 'Under 10 km', km: 10 },
  { label: 'Under 25 km', km: 25 },
]

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.asin(Math.sqrt(a))
}

export function AllStoresSection({ stores, moodCategories, activeCategorySlug, onCategoryChange }: Props) {
  const { location } = useLocation()
  const userCoords = useMemo(
    () => location.lat != null && location.lng != null
      ? { lat: location.lat, lng: location.lng }
      : null,
    [location.lat, location.lng]
  )

  const [distanceKm, setDistanceKm] = useState<number | null>(null)
  const [showDistanceOptions, setShowDistanceOptions] = useState(false)

  const activeCategoryTitle = activeCategorySlug === 'all-stores'
    ? null
    : (moodCategories.find(c => c.slug === activeCategorySlug)?.title ?? null)

  const storesWithDist = useMemo(() =>
    stores.map(s => ({
      ...s,
      dist: userCoords && s.lat != null && s.lng != null
        ? haversineKm(userCoords.lat, userCoords.lng, s.lat, s.lng)
        : null,
    })),
    [stores, userCoords]
  )

  const filtered = useMemo(() => {
    let result = storesWithDist

    if (activeCategoryTitle) {
      result = result.filter(s =>
        (s.category ?? '').split(',').map(c => c.trim()).includes(activeCategoryTitle)
      )
    }

    if (distanceKm != null) {
      result = result.filter(s => s.dist != null && s.dist <= distanceKm)
    }

    if (userCoords) {
      result = [...result].sort((a, b) => (a.dist ?? Infinity) - (b.dist ?? Infinity))
    }

    return result
  }, [storesWithDist, activeCategoryTitle, distanceKm, userCoords])

  const categoryPills = moodCategories.filter(c => c.key !== 'ALL_STORES')
  const activeDistLabel = DISTANCE_OPTIONS.find(o => o.km === distanceKm)?.label
  const isFiltered = activeCategorySlug !== 'all-stores' || distanceKm != null

  return (
    <section className="px-4 py-5 md:px-6">
      <h2 className="text-[18px] font-bold text-gray-900 mb-4">All Stores</h2>

      <div className="relative mb-3">
        {/* Single scrollable row — Filters button + category pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 md:mx-0 md:px-0 md:flex-wrap">
          <button
            type="button"
            onClick={() => setShowDistanceOptions(v => !v)}
            className={cn(
              'shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-colors whitespace-nowrap',
              distanceKm != null
                ? 'bg-brand text-white border-brand'
                : 'bg-white text-gray-700 border-gray-300 hover:border-brand hover:text-brand'
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {activeDistLabel ?? 'Filters'}
            <span className="text-[10px]">▾</span>
          </button>

          {categoryPills.map(cat => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onCategoryChange(cat.slug === activeCategorySlug ? 'all-stores' : cat.slug)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-colors whitespace-nowrap',
                cat.slug === activeCategorySlug
                  ? 'bg-brand text-white border-brand'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-brand hover:text-brand'
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Dropdown outside overflow-x-auto so it renders over cards */}
        {showDistanceOptions && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-30 min-w-35 py-1">
            <button
              type="button"
              onClick={() => { setDistanceKm(null); setShowDistanceOptions(false) }}
              className={cn('w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50', distanceKm == null && 'text-brand font-semibold')}
            >
              All distances
            </button>
            {DISTANCE_OPTIONS.map(opt => (
              <button
                key={opt.km}
                type="button"
                onClick={() => { setDistanceKm(opt.km); setShowDistanceOptions(false) }}
                className={cn('w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50', distanceKm === opt.km && 'text-brand font-semibold')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {isFiltered && (
        <p className="text-[12px] text-gray-400 mb-3">{filtered.length} store{filtered.length !== 1 ? 's' : ''}</p>
      )}

      {filtered.length === 0 && (
        <p className="text-[13px] text-gray-400 py-8 text-center">No stores match your filters.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(store => {
          const offer = store.store_offers?.[0]
          return (
            <Link
              key={store.id}
              href={`/stores/${store.slug}`}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full aspect-4/3 bg-gray-100">
                {store.cover_image ? (
                  <Image
                    src={store.cover_image}
                    alt={store.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-brand/10 to-purple-50" />
                )}
                {offer && (
                  <div className="absolute bottom-0 left-0 right-0 bg-brand/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-white shrink-0" />
                    <span className="text-white text-[11px] font-semibold truncate">
                      {offer.badge_text ?? offer.title}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 p-3">
                <div className="relative w-12 h-12 rounded-xl shrink-0 overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                  {store.logo_url ? (
                    <Image src={store.logo_url} alt="" fill className="object-contain p-1" sizes="48px" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-xl" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-bold text-gray-900 truncate">{store.name}</p>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">
                    {store.dist != null
                      ? `${store.dist < 1 ? `${Math.round(store.dist * 1000)}m` : `${store.dist.toFixed(1)}km`} • ${store.location_name ?? store.city ?? ''}`
                      : (store.location_name ?? store.city ?? '')}
                  </p>
                  {(store.category || store.subcategory) && (
                    <p className="text-[11px] text-gray-400 truncate">
                      {[store.category, store.subcategory].filter(Boolean).join(' • ')}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
