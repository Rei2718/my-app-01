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
  name: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  password: z.string().min(6, { message: '6文字以上入力する必要があります。' }),
})

// サインアップページ
const Signup = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: { name: '', email: '', password: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      // サインアップ
      const { error: errorSignup } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })

      // エラーチェック
      if (errorSignup) {
        setMessage('エラーが発生しました。' + errorSignup.message)
        return
      }

      // プロフィールの名前を更新
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ name: data.name })
        .eq('email', data.email)

      // エラーチェック
      if (updateError) {
        setMessage('エラーが発生しました。' + updateError.message)
        return
      }

      // 入力フォームクリア
      reset()
      setMessage(
        '本登録用のURLを記載したメールを送信しました。メールをご確認の上、メール本文中のURLをクリックして、本登録を行ってください。'
      )
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

              {/* SingUp */}
              <div className="max-w-[400px] w-5/6">
                <div className="text-center font-bold text-xl mb-10">SIGN UP</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* nickname */}
                  <div className="mb-3">
                    <input
                      type="text"
                      className="border-2 border-[#81d8d0] rounded-full w-full py-2 px-3 focus:outline outline-2 outline-[#81d8d0] bg-transparent text-white"
                      placeholder="nickname"
                      id="name"
                      {...register('name', { required: true })}
                    />
                    <div className="my-3 text-center text-sm text-[#81d8d0]">{errors.name?.message}</div>
                  </div>

                  {/* email */}
                  <div className="mb-3">
                    <input
                      type="email"
                      className="border-2 border-[#81d8d0] rounded-full w-full py-2 px-3 focus:outline outline-2 outline-[#81d8d0] bg-transparent text-white"
                      placeholder="email"
                      id="email"
                      {...register('email', { required: true })}
                    />
                    <div className="my-3 text-center text-sm text-[#81d8d0]">{errors.email?.message}</div>
                  </div>

                  {/* password */}
                  <div className="mb-10">
                    <input
                      type="password"
                      className="border-2 border-[#81d8d0] rounded-full w-full py-2 px-3 focus:outline outline-2 outline-[#81d8d0] bg-transparent text-white" 
                      placeholder="password"
                      id="password"
                      {...register('password', { required: true })}
                    />
                    <div className="my-3 text-center text-sm text-[#81d8d0]">{errors.password?.message}</div>
                  </div>

                  {/* サインアップボタン */}
                  <div className="flex items-center justify-center">
                    {loading ? (
                      <Loading />
                    ) : (
                      <button
                        type="submit"
                        className="w-5/6 bg-transparent hover:bg-[#81d8d0] text-[#81d8d0] font-semibold hover:text-white py-2 px-4 border-2 border-[#81d8d0] hover:border-transparent rounded-full focus:outline-2 focus:shadow-outline"
                      >
                        SIGN UP
                      </button>
                    )}
                  </div>
                </form>

                {message && <div className="my-5 text-center text-sm text-[#81d8d0]">{message}</div>}

                <div className="text-center text-sm my-5">
                  <Link href="/auth/login" className="text-[#6b7280] font-bold">
                    ログインはこちら
                  </Link>
                </div>
              </div>

            </div>
          </section>
        </section>
      </section>
    </>
  )
}

export default Signup
