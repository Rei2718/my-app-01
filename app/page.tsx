import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'
import Link from 'next/link'
import LISTNER1 from '@/app/components/LISTNER1'

// メインページ
const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    return (
      <>
        <LISTNER1 />
      </>
    )
  } else {
    return (
      <>
        <section>
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
          <section>
            <div className="text-white absolute bottom-0 left-1/2 transform -translate-x-1/2 z-1">
              <div className="w-screen h-screen flex flex-col justify-center items-center">
                <div className='w-full flex flex-col items-center object-center text-white z-20'>
                  {/* Header Logo */}
                  <div className="bg-transparent container absolute top-0 left-0 right-0 flex justify-between items-center p-3">
                    <div className="flex items-center">
                      <img
                        src="logo.png"
                        alt="logo"
                        className="w-12 h-12 bg-transparent"
                      />
                    </div>
                  </div>

                  <Link href="/" className="element text-2xl font-bold mb-4">
                    WELCOME
                  </Link>

                  <div className="flex items-center justify-center space-x-6 w-4/5 pt-5">
                    <Link href="/auth/signup" className="w-4/5 max-w-xs bg-transparent hover:bg-[#81d8d0] text-[#81d8d0] font-semibold hover:text-white py-2 px-4 border-2 border-[#81d8d0] hover:border-transparent rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center">
                      <button className=''>
                        JOIN
                      </button>
                    </Link>
                    <Link href="/auth/login" className="w-4/5 max-w-xs bg-transparent hover:bg-[#81d8d0] text-[#81d8d0] font-semibold hover:text-white py-2 px-4 border-2 border-[#81d8d0] hover:border-transparent rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center">
                      <button className=''>
                        LOGIN
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </>
    )
  }
}

export default Home