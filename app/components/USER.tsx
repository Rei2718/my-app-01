'use client'

import Link from 'next/link';
import useStore from '@/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
import SECTION2 from './SECTION/SECTION2';
import SECTION3 from './SECTION/SECTION3';

type ProfileType = Database['public']['Tables']['profiles']['Row'];

const USER = ({
  session,
  profile,
}: {
  session: Session | null;
  profile: ProfileType | null;
}) => {
  const { setUser } = useStore();

  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avatar_url: session && profile ? profile.avatar_url : '',
    });
  }, [session, setUser, profile]);

  const [isOpen, setOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  const [activeTab, setActiveTab] = useState('001');

  const changeActiveTab = (tabID: string) => {
    setActiveTab(tabID);
  };

  return (
    <>
      <section
        style={{
          backgroundImage: 'url("/girl2.gif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          position: 'relative',
        }}
      >
        <header className="sticky top-0 bg-transparent z-40">
          <div className="flex justify-between">
            <div className="py-2 px-2 flex justify-start items-center col-span-1">
              <img src="logo.png" alt="logo" className="w-12 h-12 bg-transparent" />
            </div>
            <div className="py-2 px-2 flex justify-end items-center col-span-1">
              <div className="py-4 px-4 flex justify-between items-center">
                <nav
                  className={
                    isOpen
                      ? 'z-40 bg-blue-100 fixed top-0 right-0 bottom-0 left-0 h-screen flex flex-col'
                      : 'fixed right-[-100%] md:right-4'
                  }
                >
                  <ul
                    className={
                      isOpen
                        ? 'flex h-screen justify-center items-center flex-col gap-6 text-xl'
                        : 'block md:flex md:gap-8'
                    }
                  >
                    <li>
                      <a onClick={() => { handleMenuClose(); changeActiveTab('001'); }}>About</a>
                    </li>
                    <li>
                      <a onClick={() => { handleMenuClose(); changeActiveTab('002'); }}>Company</a>
                    </li>
                    <li>
                      <a onClick={() => { handleMenuClose(); changeActiveTab('003'); }}>Recruit</a>
                    </li>
                  </ul>
                </nav>
                <button className="z-50 space-y-2 md:hidden" onClick={handleMenuOpen}>
                  <span
                    className={
                      isOpen
                        ? 'block w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 duration-300'
                        : 'block w-8 h-0.5 bg-gray-600 duration-300'
                    }
                  />
                  <span
                    className={
                      isOpen ? 'block opacity-0 duration-300' : 'block w-8 h-0.5 bg-gray-600 duration-300'
                    }
                  />
                  <span
                    className={
                      isOpen
                        ? 'block w-8 h-0.5 bg-gray-600 -rotate-45 duration-300'
                        : 'block w-8 h-0.5 bg-gray-600 duration-300'
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className={activeTab === '001' ? 'block' : 'hidden'}>
          <div className="text-white absolute bottom-0 left-1/2 transform -translate-x-1/2 z-1">
            <div className="w-screen h-screen flex flex-col justify-center items-center">
              <div className="element text-2xl font-bold my-2">
                <Link legacyBehavior href="/">
                  <a>Welcome Back</a>
                </Link>
              </div>

              <div className="relative w-16 h-16 flex items-center justify-center my-2">
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={profile && profile.avatar_url ? profile.avatar_url : '/img001.jpg'}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    alt="avatar"
                  />
                </div>
              </div>

              <div className="element text-xl font-bold my-2">
                {profile && profile.name ? `${profile.name}` : 'HELLO!'}
              </div>
            </div>
          </div>
          <p className="scroll absolute w-2 h-100px bottom-2 left-1/2 transform -translate-x-1/2 z-1"></p>
        </section>
        <section className={activeTab === '002' ? 'block' : 'hidden'}><SECTION2 /></section>
        <section className={activeTab === '003' ? 'block' : 'hidden'}><SECTION3 /></section>
      </section>
    </>
  );
};

export default USER;
