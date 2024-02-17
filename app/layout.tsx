import Head from './components/Head'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'R-2025(K-Tech)',
  description: 'Created by a member of K-Tech.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <Head />
      <body className={inter.className}>
        <div className="font-sans flex flex-col min-h-screen">
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
