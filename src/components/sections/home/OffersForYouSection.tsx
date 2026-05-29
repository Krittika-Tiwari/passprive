const OFFERS = [
  {
    id: '1',
    logo: 'HSBC',
    title: 'Unlock exclusive benefits with HSBC Debit/Credit Cards',
    gradient: 'from-[#0c1d3e] to-[#1a3a6e]',
  },
  {
    id: '2',
    logo: 'HDFC',
    title: 'Unlock exclusive benefits with HDFC Bank Cards',
    gradient: 'from-[#1a0a2e] to-[#3d1a6b]',
  },
  {
    id: '3',
    logo: 'ICICI',
    title: 'Unlock exclusive benefits with ICICI Bank Cards',
    gradient: 'from-[#0a1f2e] to-[#0e4c6e]',
  },
]

export function OffersForYouSection() {
  return (
    <section className="bg-white py-5 md:py-8">
      <h2 className="text-[17px] md:text-[19px] font-bold text-gray-900 px-4 md:px-6 mb-4">
        Offers for you
      </h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:px-6 pb-2">
        {OFFERS.map(offer => (
          <div
            key={offer.id}
            className={`shrink-0 w-[72vw] max-w-[280px] rounded-2xl bg-linear-to-r ${offer.gradient} p-4 flex items-center gap-4 cursor-pointer`}
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-extrabold tracking-wider">{offer.logo}</span>
            </div>
            <p className="text-white text-[12px] font-semibold leading-snug flex-1">
              {offer.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
