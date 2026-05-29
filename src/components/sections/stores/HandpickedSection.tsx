'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
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

export function HandpickedSection({ sections }: Props) {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      pos => setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { timeout: 6000 }
    )
  }, [])

  const allItems = useMemo(
    () => sections.flatMap(s => s.items),
    [sections]
  )

  if (!allItems.length) return null

  const preview = allItems.slice(0, 3)

  return (
    <section className="px-4 py-5 md:px-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.18em] whitespace-nowrap">
          Handpicked For You
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-[#1a1035] px-4 py-4">
        {/* Card header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-brand text-[15px] font-bold">Handpicked For You</p>
            <p className="text-white/50 text-[12px] mt-0.5">{allItems.length} stores</p>
          </div>
          <Link href="/stores" className="text-white/50 hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Store list */}
        <div className="flex flex-col divide-y divide-white/8">
          {preview.map(item => {
            const dist =
              userCoords && item.stores.lat != null && item.stores.lng != null
                ? haversineKm(userCoords.lat, userCoords.lng, item.stores.lat, item.stores.lng)
                : null

            return (
              <Link
                key={item.store_id}
                href={`/stores/${item.stores.slug}`}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                {/* Thumbnail */}
                <div className="relative w-14 h-14 rounded-xl shrink-0 overflow-hidden bg-white/10">
                  {item.stores.logo_url ? (
                    <Image
                      src={item.stores.logo_url}
                      alt={item.stores.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 rounded-xl" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-white text-[14px] font-semibold truncate">{item.stores.name}</p>
                  <p className="text-white/50 text-[12px] mt-0.5 truncate">
                    {dist != null
                      ? `${dist < 1 ? `${Math.round(dist * 1000)}m` : `${dist.toFixed(1)}km`} • ${item.stores.city ?? item.stores.location_name ?? ''}`
                      : (item.stores.city ?? item.stores.location_name ?? '')}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* See all if more than preview */}
        {allItems.length > 3 && (
          <Link
            href="/stores"
            className="mt-3 block text-center text-brand text-[12px] font-semibold pt-3 border-t border-white/8"
          >
            See all {allItems.length} stores
          </Link>
        )}
      </div>
    </section>
  )
}
