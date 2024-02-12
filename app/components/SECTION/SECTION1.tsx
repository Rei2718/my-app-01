'use client'

import Link from 'next/link';
import useStore from '@/store';
import Image from 'next/image';
import { useEffect } from 'react';
import type { Session } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';

type ProfileType = Database['public']['Tables']['profiles']['Row'];

const SECTION1 = ({
  session,
  profile,
}: {
  session: Session | null;
  profile: ProfileType | null;
}) => {
  const { setUser } = useStore();

  useEffect(() => {
    if (session && profile) {
      setUser({
        id: session.user.id,
        email: session.user.email!,
        name: profile.name,
        introduce: profile.introduce,
        avatar_url: profile.avatar_url,
      });
    }
  }, [session, profile, setUser]);

  return (
    <section>
      <div className="text-white absolute bottom-0 left-1/2 transform -translate-x-1/2 z-1">
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <div className="element text-3xl font-bold my-2">
            <Link legacyBehavior href="/">
              <a>Welcome Back</a>
            </Link>
          </div>

          <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex items-center justify-center my-2">
            <div
              style={{
                width: '100%', // 画像の親コンテナの幅を100%に設定
                height: '100%', // 画像の親コンテナの高さを100%に設定
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <Image
                src={profile ? profile.avatar_url || '/img001.jpg' : '/img001.jpg'}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                alt="avatar"
              />
            </div>
          </div>

          <div className="element text-xl font-bold my-2">
            {profile ? profile.name || 'HELLO!' : 'HELLO!'}
          </div>
        </div>
      </div>
      <p className="scroll absolute w-2 h-100px bottom-2 left-1/2 transform -translate-x-1/2 z-1"></p>
    </section>
  );
};

export default SECTION1;
