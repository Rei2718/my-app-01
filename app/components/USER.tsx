'use client'

import Link from 'next/link';
import useStore from '@/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';

import SECTION2 from './SECTION/SECTION2';
import SECTION3 from './SECTION/SECTION3';
import SECTION1 from './SECTION/SECTION1';

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
      <header className="sticky top-0 bg-transparent z-40">
        <div className="flex justify-between">
          <div className="py-2 px-2 flex justify-start items-center col-span-1">
            <img src="logo.png" alt="logo" className="w-12 h-12 bg-transparent" />
          </div>
          <div className="py-2 px-2 flex justify-end items-center col-span-1">
            <div className="py-2 px-2 flex justify-between items-center">
              <nav
                className={
                  isOpen
                    ? 'z-40 bg-[#81d8d0] text-[#6b7280] fixed top-0 right-0 bottom-0 left-0 h-screen flex flex-col'
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
                    <a onClick={() => { handleMenuClose(); changeActiveTab('001'); }}>HOME</a>
                  </li>
                  <li>
                    <a onClick={() => { handleMenuClose(); changeActiveTab('002'); }}>SECTION2</a>
                  </li>
                  <li>
                    <a onClick={() => { handleMenuClose(); changeActiveTab('003'); }}>SECTION3</a>
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
      <section id='contents'>
        <section id='keyvisual'>
          <div id='bg'
            style={{
              backgroundImage: 'url("/girl2.gif")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh',
              position: 'fixed',
              zIndex: -1, // 数値を指定
              width: '100%',
              top: 0,
              left: 0,
              backgroundRepeat: 'no-repeat', // キャメルケースに修正
            }}
          >
            <div
              style={{
                backgroundImage: 'url("dot.png")',
                height: '100vh',
                position: 'relative',
                backgroundSize: "2px",
                opacity: "1",
              }}
            ></div>
          </div>
        </section>
        <section id='content'>
          <section className={activeTab === '001' ? 'block' : 'hidden'}>
            <SECTION1 session={session} profile={profile} />
          </section>
          <section className={activeTab === '002' ? 'block' : 'hidden'}>
            <SECTION2 />
          </section>
          <section className={activeTab === '003' ? 'block' : 'hidden'}>
            <SECTION3 />
          </section>
        </section>
      </section>
    </>
  );
};

export default USER;
