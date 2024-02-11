import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'
import MAIN from './components/MAIN/MAIN'
import SupabaseListener1 from './components/supabase-listner1'
import Link from 'next/link'

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
    return(
      <>
        <SupabaseListener1 />
      </>
    )
  } else {
    return(
      <>



        <section>
          <div className="relative bg-fixed flex items-center justify-center z-10" style={{ backgroundImage: 'url("girl2.gif")', backgroundSize: 'cover', backgroundPosition: 'center', height: "100svh"}}>
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
                <button className="w-4/5 max-w-xs bg-transparent hover:bg-teal-500 text-teal-500 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded-full focus:outline-none focus:shadow-outline">
                  <Link href="/auth/signup">JOIN</Link>
                </button>
                <button className="w-4/5 max-w-xs bg-transparent hover:bg-teal-500 text-teal-500 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded-full focus:outline-none focus:shadow-outline">
                  <Link href="/auth/login">LOGIN</Link>
                </button>
              </div>

            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Home
