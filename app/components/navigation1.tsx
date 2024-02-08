'use client'

import Link from 'next/link'
import useStore from '@/store'
import Image from 'next/image'
import { useEffect } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import MAIN from './MAIN/MAIN'

type ProfileType = Database['public']['Tables']['profiles']['Row']

// ナビゲーション
const Navigation1 = ({
  session,
  profile,
}: {
  session: Session | null
  profile: ProfileType | null
}) => {
  const { setUser } = useStore()

  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avatar_url: session && profile ? profile.avatar_url : '',
    })
  }, [session, setUser, profile])

  return (
    <>
      <section style={{ opacity: 1, position: 'relative', height: '100vh', background: `url(user.png)`, backgroundSize: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div id="bg" style={{ backgroundImage: 'url(girl.jpg)', zIndex: -1, position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className='w-full flex flex-col items-center object-center'>
          <Link href="/" className="text-4xl font-bold mb-4">
            HELLOWOELD
          </Link>
          <div className="text-lg">welcome back(最終更新(02.09/0:28))</div>
          <div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
            <div className="font-bold text-xl cursor-pointer">
              {profile && profile.name ? `${profile.name}` : 'HELLO!'}
            </div>
            <Link href="/settings/profile">
              <div className="relative w-10 h-10">
                <Image
                  src={profile && profile.avatar_url ? profile.avatar_url : '/default.png'}
                  className="rounded-full object-cover"
                  alt="avatar"
                  fill
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ opacity: 1 }}>
        <MAIN />
      </section>
    </>
  )
}

export default Navigation1