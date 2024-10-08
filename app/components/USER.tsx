'use client'

import useStore from '@/store';
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';

import SECTION2 from './SECTION/SECTION2/SECTION2';
import SECTION3 from './SECTION/SECTION3';
import SECTION1 from './SECTION/SECTION1';
import SECTION4 from './SECTION/SECTION4';
import Logout from './logout';

import SplashScreen from './SplashScreen';
import { usePathname } from 'next/navigation';

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

  {/* Splash */}
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if(isLoading)
      return
  },[isLoading])

  return (
    <>
      {isLoading && isHome ? (
        <SplashScreen finishLoading={() => setIsLoading(false)} />
      ) : (
        <>
          <header className="bg-transparent z-40">
            <div className="flex justify-between">
              <div className="py-2 px-2 flex justify-start items-center col-span-1">
                <img 
                  src="logo.png" 
                  alt="logo" 
                  className="w-12 h-12 bg-transparent"
                  onClick={() => { handleMenuClose(); changeActiveTab('001'); }}
                />
              </div>
              <div className="py-2 px-2 flex justify-end items-center col-span-1">
                <div className="py-2 px-2 flex justify-between items-center">
                  <nav
                    className={
                      isOpen
                        ? 'z-40 bg-[#81d8d0] text-[#6b7280] fixed top-0 right-0 bottom-0 left-0 h-screen flex flex-col'
                        : 'fixed right-[-100%] md:mx-auto:mx-auto'
                    }
                  >
                    <ul
                      className={
                        isOpen
                          ? 'flex h-screen justify-center items-center flex-col gap-6 text-xl'
                          : 'block md:mx-auto'
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
                      <li>
                        <a onClick={() => { handleMenuClose(); changeActiveTab('004'); }}>SETTINGS</a>
                      </li>
                      <li>
                        <Logout />
                      </li>
                    </ul>
                  </nav>
                  <button className="z-50 space-y-2 md:mx-auto:hidden" onClick={handleMenuOpen}>
                    <span
                      className={
                        isOpen
                          ? 'block w-8 h-0.5 bg-white translate-y-2.5 rotate-45 duration-300'
                          : 'block w-8 h-0.5 bg-white duration-300'
                      }
                    />
                    <span
                      className={
                        isOpen ? 'block opacity-0 duration-300' : 'block w-8 h-0.5 bg-white duration-300'
                      }
                    />
                    <span
                      className={
                        isOpen
                          ? 'block w-8 h-0.5 bg-white -rotate-45 duration-300'
                          : 'block w-8 h-0.5 bg-white duration-300'
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </header>
          <section id='contents'>
            <section id='keyvisual'>
              <video
                src="bg2.mp4"
                muted
                autoPlay
                playsInline
                loop
                style={{
                  objectFit: 'cover',
                  width: '100vw',
                  height: '100vh',
                  position: 'fixed',
                  zIndex: -2,
                  top: 0,
                  left: 0,
                }}
              ></video>
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
              <section className={activeTab === '004' ? 'block' : 'hidden'}>
                <SECTION4 />
              </section>
            </section>
          </section>
        </>

      )}
    </>
  );
};

export default USER;
