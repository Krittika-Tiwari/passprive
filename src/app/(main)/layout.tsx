import { Header, Footer } from '@/components/layout'
import { LocationProvider } from '@/lib/context/LocationContext'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocationProvider>
      <Header />
      <div className="flex-1 w-full mx-auto max-w-7xl">
        {children}
      </div>
      <Footer />
    </LocationProvider>
  )
}
