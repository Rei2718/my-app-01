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
        <div>未ログイン</div>
        <div className="flex items-center space-x-5">
          <Link href="/auth/login">ログイン</Link>
          <Link href="/auth/signup">サインアップ</Link>
        </div>
        <div>ちょっと今サインアップできない。下のやつでログイン可</div>
            <div>email:once2718@gmail.com</div>
            <div>pw:Yrf53563</div>
      </>
    )
  }
}

export default Home
