import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/components/SignOutButton'
import LoginDialog from '@/components/LoginDialog'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="border-b border-gray-100 px-8 py-4 flex items-center justify-between">
      <span className="text-lg font-bold tracking-tight text-gray-900">Passprive</span>
      {user ? <SignOutButton /> : <LoginDialog />}
    </nav>
  )
}
