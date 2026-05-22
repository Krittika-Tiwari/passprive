import { createClient } from '@/lib/supabase/server'
import LoginDialog from '@/components/LoginDialog'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="flex flex-col items-center justify-center py-40 px-6 text-center">
      <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
        Your private access,<br />simplified.
      </h1>
      <p className="mt-6 max-w-lg text-lg text-gray-400">
        Passprive keeps your credentials secure and accessible only to you.
      </p>
      {!user && <LoginDialog variant="hero" />}
    </main>
  )
}
