import { Head, Html, Main, NextScript } from 'next/document'

export default function Document(ctx: any) {
  // Will work only on initial load, not changing on navigation
  const isFrLocale =
    ctx.dangerousAsPath.endsWith('/fr') || ctx.dangerousAsPath.includes('/fr/')

  return (
    <Html lang={isFrLocale ? 'fr' : 'en'}>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
