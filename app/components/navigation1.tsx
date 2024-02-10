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
<<<<<<< HEAD
      <header>
        <div className="relative bg-fixed h-screen flex items-center justify-center" style={{ backgroundImage: 'url("girl.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="element">
            <div className="relative text-brack text-center z-10 text-[#000000]">

              <Link href="/" className="text-4xl font-bold mb-4">
                  HELLOWOELD
              </Link>
              <div className="text-lg">welcome back</div>

              <div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
                
                <div className="font-bold text-xl cursor-pointer">
                  {profile && profile.name ? `${profile.name}` : 'HELLO!'}
                </div>

                <div className="text-sm font-bold">
                  <div className="flex items-center space-x-5">
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
              </div>
            </div>
=======
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
>>>>>>> c4f2787a7bb97a0003698d7d92f87658c874a0eb
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