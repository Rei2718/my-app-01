'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  password: z.string().min(6, { message: '6文字以上入力する必要があります。' }),
})

// ログインページ
const Login = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: '', password: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      // ログイン
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      // エラーチェック
      if (error) {
        setMessage('エラーが発生しました。' + error.message)
        return
      }

      // トップページにアクセス
      router.push('/')
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <>
      <section>
        <div className="relative bg-fixed flex items-center justify-center z-10" style={{ backgroundImage: 'url("../girl2.gif")', backgroundSize: 'cover', backgroundPosition: 'center', height: "100svh"}}>
          <div className='w-full flex flex-col items-center object-center text-white z-20'>
            
            {/* Header Logo */}
            <div className="bg-transparent container absolute top-0 left-0 right-0 flex justify-between items-center p-3">
              <div className="flex items-center">
                <img
                  src="../logo.png"
                  alt="logo"
                  className="w-12 h-12 bg-transparent"
                />
              </div>
            </div>

            {/* Login */}
            <div className="max-w-[400px] w-5/6">
              <div className="text-center font-bold text-xl mb-5">LOGIN</div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* メールアドレス */}
                <div className="mb-3">
                  <input
                    type="email"
                    className="border rounded-md w-full py-2 px-3 focus:outline outline-2 outline-[#81d8d0]"
                    placeholder="e-mail"
                    id="email"
                    {...register('email', { required: true })}
                  />
                  <div className="my-3 text-center text-sm text-red-500">{errors.email?.message}</div>
                </div>

                {/* パスワード */}
                <div className="mb-5">
                  <input
                    type="password"
                    className="border rounded-md w-full py-2 px-3 focus:outline outline-2 outline-[#81d8d0]"
                    placeholder="password"
                    id="password"
                    {...register('password', { required: true })}
                  />
                  <div className="my-3 text-center text-sm text-red-500">{errors.password?.message}</div>
                </div>

                {/* ログインボタン */}
                <div className="flex items-center justify-center mb-5">
                  {loading ? (
                    <Loading />
                  ) : (
                    <button
                      type="submit"
                      className="w-5/6 bg-transparent hover:bg-[#81d8d0] text-[#81d8d0] font-semibold hover:text-white py-2 px-4 border border-[#81d8d0] hover:border-transparent rounded-full focus:outline-none focus:shadow-outline"
                    >
                      LOGIN
                    </button>
                  )}
                </div>
              </form>

              {message && <div className="my-5 text-center text-sm text-red-500">{message}</div>}

              <div className="text-center text-sm mb-5">
                <Link href="/auth/reset-password" className="text-gray-500 font-bold">
                  パスワードを忘れた方はこちら
                </Link>
              </div>

              <div className="text-center text-sm">
                <Link href="/auth/signup" className="text-gray-500 font-bold">
                  アカウントを作成する
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
