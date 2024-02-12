'use client'

import { useCallback, useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
import useStore from '@/store'
import Logout from './logout'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string().min(2, { message: '2文字以上入力する必要があります' }).max(16, { message: "16字以内にしてください" }),
  introduce: z.string().min(0).max(30, { message: "30字以内にしてください" }),
})

// プロフィール
const Profile = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [fileMessage, setFileMessage] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('/user.jpg')
  const { user } = useStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: {
      name: user.name ? user.name : '',
      introduce: user.introduce ? user.introduce : '',
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // アバター画像の取得
  useEffect(() => {
    if (user && user.avatar_url) {
      setAvatarUrl(user.avatar_url)
    }
  }, [user])

  // 画像アップロード
  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setFileMessage('')

    // ファイルが選択されていない場合
    if (!files || files?.length == 0) {
      setFileMessage('画像をアップロードしてください。')
      return
    }

    const fileSize = files[0]?.size / 1024 / 1024 // size in MB
    const fileType = files[0]?.type // MIME type of the file

    if (fileSize > 2 || (fileType !== 'image/jpeg' && fileType !== 'image/png')) {
      let message = '';
      if (fileSize > 2) {
        message += '画像サイズを2MB以下にする必要があります。';
      }
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        if (message !== '') {
          message += '\n'; // 既にメッセージがある場合は改行を挿入
        }
        message += '画像はjpgまたはpng形式である必要があります。';
      }
      setFileMessage(message);
      return;
    }
    

    // 画像をセット
    setAvatar(files[0])
  }, [])

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)
    setMessage('')

    try {
      let avatar_url = user.avatar_url

      if (avatar) {
        // supabaseストレージに画像アップロード
        const { data: storageData, error: storageError } = await supabase.storage
          .from('profile')
          .upload(`${user.id}/${uuidv4()}`, avatar)

        // エラーチェック
        if (storageError) {
          setMessage('エラーが発生しました。' + storageError.message)
          return
        }

        if (avatar_url) {
          const fileName = avatar_url.split('/').slice(-1)[0]

          // 古い画像を削除
          await supabase.storage.from('profile').remove([`${user.id}/${fileName}`])
        }

        // 画像のURLを取得
        const { data: urlData } = await supabase.storage
          .from('profile')
          .getPublicUrl(storageData.path)

        avatar_url = urlData.publicUrl
      }

      // プロフィールアップデート
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          introduce: data.introduce,
          avatar_url,
        })
        .eq('id', user.id)

      // エラーチェック
      if (updateError) {
        setMessage('エラーが発生しました。' + updateError.message)
        return
      }

      setMessage('プロフィールを更新しました。')
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
        <div className='relative bg-fixed flex items-center justify-center z-1'>
          <div className='w-full flex flex-col items-center object-center text-white'>
          
            <div className='max-w-[400px] w-5/6'>
              <div className="text-center font-bold text-3xl mb-10">Settings</div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* アバター画像 */}
                <div className="flex items-center justify-center mb-5">
                  <label htmlFor="avatar" className="relative cursor-pointer">
                    <div className="w-40 h-40 bg-gray-200 hover:bg-[#81d8d0] rounded-full overflow-hidden">
                      {/* アップロードされた画像を表示 */}
                      {avatar ? (
                        <img
                          src={URL.createObjectURL(avatar)}
                          alt="Avatar Preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        // アップロードされた画像がない場合
                        <span></span>
                      )}
                    </div>
                    <input
                      type="file"
                      id="avatar"
                      onChange={onUploadImage}
                      className="opacity-0 absolute inset-0"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5/6 bg-transparent text-[#81d8d0] font-semibold hover:text-[#81d8d0] py-2 px-4 border border-[#81d8d0] rounded-full">
                        UploadImage
                      </div>
                    </div>
                  </label>
                </div>
                {fileMessage && <div className="text-center text-[#81d8d0] my-5">{fileMessage}</div>}

                {/* 名前 */}
                <div className="mb-5">
                  <div className="text-sm mb-1 font-bold">Username</div>
                  <input
                    type="text"
                    className="border rounded-full w-full py-2 px-3 focus:outline outline-2 outline-[#81d8d0] bg-transparent text-white"
                    placeholder="Set your Username"
                    id="name"
                    {...register('name', { required: false })}
                    required
                  />
                  <div className="my-3 text-center text-sm text-[#81d8d0]">{errors.name?.message}</div>
                </div>

                {/* 自己紹介 */}
                <div className="mb-5">
                  <div className="text-sm mb-1 font-bold">Status Message</div>
                  <textarea
                    className="border rounded-3xl w-full py-2 px-3 focus:outline outline-2 outline-[#81d8d0] bg-transparent text-white"
                    placeholder="Set your Status Message"
                    id="introduce"
                    {...register('introduce', { required: false })}
                    required
                  />
                  <div className="my-3 text-center text-sm text-[#81d8d0]">{errors.introduce?.message}</div>
                </div>

                {/* 変更ボタン */}
                <div className="flex items-center justify-center">
                  {loading ? (
                    <Loading />
                  ) : (
                    <button
                      type="submit"
                      className="w-4/5 max-w-xs bg-transparent hover:bg-[#81d8d0] text-[#81d8d0] font-semibold hover:text-white py-2 px-4 border border-[#81d8d0] hover:border-transparent rounded-full focus:outline-none focus:shadow-outline"
                    >
                      Change
                    </button>
                  )}
                </div>
              </form>

              {/* メッセージ */}
              {message && <div className="my-5 text-center text-[#81d8d0] mb-5">{message}</div>}
            </div>
          </div>  

        </div>
      </section>
    </>

  )
}

export default Profile
