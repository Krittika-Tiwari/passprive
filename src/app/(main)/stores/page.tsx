import { StoresPageClient } from '@/components/sections/stores/StoresPageClient'
import { getActiveStores, getStoreMoodCategories, getHomeSections } from '@/lib/services/stores'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stores & Boutiques',
  description:
    'Browse exclusive stores, boutiques, and lifestyle brands near you. Unlock member discounts and special offers with PassPrivé.',
  openGraph: {
    title: 'Stores & Boutiques | PassPrivé',
    description: 'Explore top stores with exclusive member discounts and offers near you.',
    url: '/stores',
  },
  alternates: {
    canonical: '/stores',
  },
}

export default async function Stores() {
  const [stores, moodCategories, homeSections] = await Promise.all([
    getActiveStores(),
    getStoreMoodCategories(),
    getHomeSections(),
  ])

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <StoresPageClient
        moodCategories={moodCategories}
        stores={stores}
        homeSections={homeSections}
      />
    </main>
  )
}
