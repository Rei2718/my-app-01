'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
import Link from 'next/link'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
})

// パスワードリセットページ
const ResetPassword = () => {
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
    defaultValues: { email: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)
    setMessage('')

    try {
      // パスワードリセットメールを送信
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${location.origin}/auth/reset-password/confirm`,
      })

      // エラーチェック
      if (error) {
        setMessage('エラーが発生しました。' + error.message)
        return
      }

      setMessage('パスワードリセットに必要なメールを送信しました。')
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
        <section id='keyvisual'>
          <video
            src="../bg2.mp4"
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
          {/* MAIN CONTENT */}  
          <section>
            <div className='w-screen h-screen flex flex-col justify-center items-center text-white z-20'>
              {/* Header Logo */}
              <div className="bg-transparent container absolute top-0 left-0 right-0 flex justify-between items-center p-3">
                <div className="flex items-center">
                  <Link href="/">
                    <img
                      src="../logo.png"
                      alt="logo"
                      className="w-12 h-12 bg-transparent"
                    />
                  </Link>
                </div>
              </div>

              <div className="max-w-[400px] w-5/6">
                <div className="text-center font-bold text-xl mb-2.5">Find your email</div>
                <div className="text-center font-bold text-sm mb-5">Enter your phone number or recovery email</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* email */}
                  <div className="my-5">
                    <input
                      type="email"
                      className="border rounded-full w-full py-2 px-3 focus:outline outline-2 outline-[#81d8d0] bg-transparent text-white"
                      placeholder="email"
                      id="email"
                      {...register('email', { required: true })}
                    />
                    <div className="my-3 text-center text-sm text-red-500">{errors.email?.message}</div>
                  </div>

                  {/* 送信ボタン */}
                  <div className="flex items-center justify-center">
                    {loading ? (
                      <Loading />
                    ) : (
                      <button
                        type="submit"
                        className="w-5/6 bg-transparent hover:bg-[#81d8d0] text-[#81d8d0] font-semibold hover:text-white py-2 px-4 border border-[#81d8d0] hover:border-transparent rounded-full focus:outline-2 focus:shadow-outline"
                      >
                        SUBMIT
                      </button>
                    )}
                  </div>
                </form>

                {message && <div className="my-5 text-center text-sm text-red-500">{message}</div>}
              </div>

            </div>
          </section>
        </section>
      </section>
    </>
  )
}

export default ResetPassword
