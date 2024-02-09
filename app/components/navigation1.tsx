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
        <div id="bg" style={{ backgroundImage: 'url(girl2.gif)', zIndex: -1, position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className='w-full flex flex-col items-center object-center text-white'>
          <Link href="/" className="text-4xl font-bold mb-4">
            HELLOWOELD
          </Link>
          <div className="text-lg">welcome back(最終更新:02.09/15:10)</div>
          <div className="text-lg">スマホでの使用を想定して開発中</div>
          <div className="grid w-10/12 grid-cols-2 mx-auto pt-10">
            <div className="font-bold text-xl w-full flex flex-col items-center">
              {profile && profile.name ? `${profile.name}` : 'HELLO!'}
            </div>
            <Link href="/settings/profile" className='w-full flex flex-col items-center'>
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