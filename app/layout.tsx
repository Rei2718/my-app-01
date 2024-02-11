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
        <meta name="author" content="Created by K-Tech (Ishikawa Ichiro,)"></meta>
      </head>
      <body className={inter.className}>
        <div className="font-sans flex flex-col min-h-screen">
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
