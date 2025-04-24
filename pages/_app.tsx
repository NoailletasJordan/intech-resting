import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="author" content="Jordan NOAILLETAS" />
        <meta
          name="keywords"
          content="Fullstack, Frontend, React, TypeScript, Golang"
        />
        {/* https://github.com/darkreader/darkreader/blob/main/CONTRIBUTING.md#disabling-dark-reader-on-your-site */}
        <meta name="darkreader-lock" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
