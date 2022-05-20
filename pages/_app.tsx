import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">
          <div className="h-screen overflow-y-scroll">
            <Header />
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
