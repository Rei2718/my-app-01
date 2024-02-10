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
      <div className="text-center font-bold text-xl mb-10">プロフィール変更</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* アバター画像 */}
        <div className="mb-5">
          <div className="flex flex-col text-sm items-center justify-center mb-5">
            <input type="file" id="avatar" onChange={onUploadImage} />
            {fileMessage && <div className="text-center text-red-500 my-5">{fileMessage}</div>}
          </div>
        </div>

        {/* 名前 */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">User Name</div>
          <input
            type="text"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="Set new User Name"
            id="name"
            {...register('name', { required: false })}
            required
          />
          <div className="my-3 text-center text-sm text-red-500">{errors.name?.message}</div>
        </div>

        {/* 自己紹介 */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">Status Message</div>
          <textarea
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="Set new Status Message"
            id="introduce"
            {...register('introduce', { required: false })}
            required
          />
          <div className="my-3 text-center text-sm text-red-500">{errors.introduce?.message}</div>
        </div>

        {/* 変更ボタン */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
            >
              変更
            </button>
          )}
        </div>
      </form>

      {/* メッセージ */}
      {message && <div className="my-5 text-center text-red-500 mb-5">{message}</div>}
    </>
  )
}

export default Profile
