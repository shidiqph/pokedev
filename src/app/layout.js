'use client'

import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo-client'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`container mt-10 ${inter.className}`}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  )
}
