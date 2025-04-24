import { LOCALES } from '@/constants'

import * as contentful from 'contentful'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

export const getStaticPaths = (() => {
  return {
    paths: LOCALES.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}) as GetStaticPaths

export const getStaticProps = (async (context) => {
  const { locale } = context.params as { locale: (typeof LOCALES)[number] }

  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })

  const data = await client.getEntries({
    content_type: 'portfolioItem',
    locale,
  })

  const portfolioDetails = data.items.reduce((acc, cur) => {
    return { ...acc, [cur.fields.slug as any]: cur }
  }, {})

  return { props: { portfolioDetails, currentLocale: locale } }
}) as GetStaticProps<Props>

export default function HomePage(props: Props) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          type="image/svg+xml"
          href={`/landing-front-${props.currentLocale}.svg `}
          as="image"
        />
        <title> Jordan Noailletas | Portfolio </title>
        <link rel="cannonical" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="x-default" href="/" />
        <link rel="alternate" hrefLang="fr" href="/fr" />
      </Head>
    </>
  )
}
