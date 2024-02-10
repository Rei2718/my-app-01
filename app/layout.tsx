import SupabaseListener2 from './components/supabase.listner2'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Supabase Auth',
  description: 'Supabase Auth',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={inter.className}>
        <div className="font-sans flex flex-col min-h-screen">
          <SupabaseListener2 />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
