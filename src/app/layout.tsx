import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/src/app/redux/provider';
import SessionAuthProvider from '@/src/context/SessionAuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nordeste Repuestos',
  description: 'Control de comisiones',
  authors: {name: "Angelo", url: `https://bitecnologias.com`},
}

export default function RootLayout({children,}: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionAuthProvider>
        <Providers>
            {children}
        </Providers>
      </SessionAuthProvider>
      </body>
    </html>
  )
}
