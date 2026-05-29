'use client'

import { useState } from 'react'
import { CategoryBar } from './CategoryBar'
import { AllStoresSection } from './AllStoresSection'
import { DistrictSectionClient } from './DistrictSectionClient'
import type { StoreRow, StoreMoodCategory, HomeSection } from '@/lib/types/stores'

interface Props {
  moodCategories: StoreMoodCategory[]
  stores: StoreRow[]
  homeSections: HomeSection[]
}

export function StoresPageClient({ moodCategories, stores, homeSections }: Props) {
  const [activeSlug, setActiveSlug] = useState('all-stores')

  return (
    <>
      <CategoryBar
        moodCategories={moodCategories}
        active={activeSlug}
        onSelect={setActiveSlug}
      />
      <DistrictSectionClient sections={homeSections} />
      <AllStoresSection
        stores={stores}
        moodCategories={moodCategories}
        activeCategorySlug={activeSlug}
        onCategoryChange={setActiveSlug}
      />
    </>
  )
}
