import Link from 'next/link'
import Image from 'next/image'

const LINKS = [
  { label: 'Dining', href: '/dining', icon: '/dining.png' },
  { label: 'Stores', href: '/stores', icon: '/stores.png' },
]

export function ForYouQuickLinks() {
  return (
    <section className="bg-white px-4 py-4 md:px-8 md:py-6">
      <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-7xl mx-auto">
        {LINKS.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center gap-2 bg-linear-to-b from-gray-200 to-white rounded-2xl py-5 px-4 md:py-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="relative w-14 h-14 md:w-20 md:h-20">
              <Image src={icon} alt={label} fill className="object-contain" sizes="80px" />
            </div>
            <span className="text-[13px] md:text-[16px] font-semibold text-gray-800">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
