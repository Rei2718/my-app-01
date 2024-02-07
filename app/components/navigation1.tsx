'use client'

import Link from 'next/link'
import useStore from '@/store'
import Image from 'next/image'
import { useEffect } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
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
      <header>
        <div className="bg-fixed h-screen flex items-center justify-center" style={{ backgroundImage: 'url("girl.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
          <div className="element">
            <div className="text-brack text-center z-10 text-[#000000]">

              <Link href="/" className="text-4xl font-bold mb-4">
                  HELLOWOELD
              </Link>
              <div className="text-lg">welcome back(更新:2024/02/08/02:10)</div>

              <div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
                
                <div className="font-bold text-xl cursor-pointer">
                  {profile && profile.name ? `${profile.name}` : 'HELLO!'}
                </div>

                <div className="text-sm font-bold">
                  <div className="flex items-center space-x-5">
                    <div className="relative w-10 h-10">
                      <Image
                        src={profile && profile.avatar_url ? profile.avatar_url : '/default.png'}
                        className="rounded-full object-cover"
                        alt="avatar"
                        fill
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navigation1
