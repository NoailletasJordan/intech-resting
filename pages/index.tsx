// Redirecting to language's page
import locales from '@/components/pageComponents/About/locales'
import { getPreferredLanguage } from '@/constants'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const acceptLanguage = context.req.headers['accept-language'] ?? ''
  const preferredLanguage = getPreferredLanguage(acceptLanguage)

  return {
    redirect: {
      destination: `/${preferredLanguage}`,
      permanent: true,
    },
  }
}

export default function PlaceHolder() {
  return (
    <>
      <Head>
        <title> Jordan Noailletas | Portfolio </title>
        <meta name="description" content={locales.en.meta_content} />
        <link rel="cannonical" hrefLang="en" href="/en" />
        <link rel="cannonical" hrefLang="fr" href="/fr" />
        <link rel="alternate" hrefLang="x-default" href="/en" />
        <link rel="alternate" hrefLang="en" href="/" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="fr" href="/fr" />
      </Head>
      <div />
    </>
  )
}
