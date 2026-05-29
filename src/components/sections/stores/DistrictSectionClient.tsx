'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Tag } from 'lucide-react'
import { useLocation } from '@/lib/context/LocationContext'
import type { HomeSection } from '@/lib/types/stores'

interface Props {
  sections: HomeSection[]
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.asin(Math.sqrt(a))
}

export function DistrictSectionClient({ sections }: Props) {
  const { location } = useLocation()
  const userCoords = useMemo(
    () => location.lat != null && location.lng != null
      ? { lat: location.lat, lng: location.lng }
      : null,
    [location.lat, location.lng]
  )

  // Sort items by distance within each section (closest first)
  const sortedSections = useMemo(() =>
    sections.map(section => ({
      ...section,
      items: [...section.items].sort((a, b) => {
        if (!userCoords) return 0
        const da = a.stores.lat != null && a.stores.lng != null
          ? haversineKm(userCoords.lat, userCoords.lng, a.stores.lat, a.stores.lng)
          : Infinity
        const db = b.stores.lat != null && b.stores.lng != null
          ? haversineKm(userCoords.lat, userCoords.lng, b.stores.lat, b.stores.lng)
          : Infinity
        return da - db
      }).map(item => {
        const dist = userCoords && item.stores.lat != null && item.stores.lng != null
          ? haversineKm(userCoords.lat, userCoords.lng, item.stores.lat, item.stores.lng)
          : null
        return { ...item, dist }
      }),
    })),
    [sections, userCoords]
  )

  if (!sections.length) return null

  return (
    <section className="py-5">
      <h2 className="px-4 md:px-6 text-[18px] font-bold text-gray-900 mb-4">In Your District</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-6 pb-1 md:grid md:grid-cols-3 md:overflow-visible">
        {sortedSections.map(section => (
          <div
            key={section.id}
            className="shrink-0 w-[82vw] max-w-sm md:w-auto border border-gray-200 rounded-2xl p-4 bg-white"
          >
            <div className="mb-3">
              <p className="text-brand text-[15px] font-bold leading-tight">{section.title}</p>
              {section.subtitle && (
                <p className="text-gray-400 text-[12px] mt-0.5">{section.subtitle}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {section.items.map(item => (
                <Link
                  key={item.store_id}
                  href={`/stores/${item.stores.slug}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative w-16 h-16 rounded-xl shrink-0 overflow-hidden bg-gray-100 border border-gray-100">
                    {item.stores.logo_url ? (
                      <Image src={item.stores.logo_url} alt={item.stores.name} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-xl" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-gray-900 truncate">{item.stores.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                      {item.dist != null
                        ? `${item.dist < 1 ? `${Math.round(item.dist * 1000)}m` : `${item.dist.toFixed(1)}km`} • ${item.stores.location_name ?? item.stores.city ?? ''}`
                        : (item.stores.location_name ?? item.stores.city ?? '')}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Tag className="w-3 h-3 text-brand shrink-0" />
                      <span className="text-[11px] font-semibold text-brand">Exclusive offer</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
