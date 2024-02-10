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
    <section>
      <div className="relative bg-fixed h-screen flex items-center justify-center z-10" style={{ backgroundImage: 'url("girl2.gif")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className='w-full flex flex-col items-center object-center text-white z-20'>
          <Link href="/" className="text-4xl font-bold mb-4">
            HELLOWOELD
          </Link>
          <div className="relative w-full h-full flex items-center justify-center py-3">
            <Image
              src={profile && profile.avatar_url ? profile.avatar_url : '/user.jpg'}
              width={60}
              height={60}
              className="rounded-full object-cover"
              alt="avatar"
            />
          </div>
          <div className="font-bold text-xl w-full flex flex-col items-center justify-center py-3" style={{ zIndex: 1 }}>
            {profile && profile.name ? `${profile.name}` : 'HELLO!'}
          </div>
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