import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import { Providers } from '@/redux/provider';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
// import { store } from '@/redux/store';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nordeste Repuestos',
  description: 'Control de comisiones',
  authors: {name: "Angelo", url: `https://bitecnologias.com`},
}

//const persistor = persistStore(store);

export default function RootLayout({children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <PersistGate persistor={persistor}>
            <Providers> */}
            {children}
            {/* </Providers> 
        </PersistGate> */}
      </body>
    </html>
  )
}
