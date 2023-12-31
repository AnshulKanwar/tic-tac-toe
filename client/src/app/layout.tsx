import Nav from '@/components/nav'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
  description: 'Play Tic-Tac-Toe online with friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-white`}>
        <Nav />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
