import IntechRestingHome, {
  Props,
} from '@/components/pageComponents/IntechRestingHome'
import { PartialContentfulFields } from '@/components/pageComponents/IntechRestingHome/components/PostsOverview'
import {
  getLocaledIntechRestingHomeUrl,
  getNONLocalIntechRestingHomeUrl,
  LOCALES,
} from '@/constants'
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
  if (!process.env.CONTENTFUL_SPACE || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error(`Contentful env variables not set`)
  }

  const { locale } = context.params as { locale: (typeof LOCALES)[number] }

  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const data = (await client.getEntries({
    content_type: 'blogPost',
    locale,
    select: [
      'fields.publishedDate',
      'fields.slug',
      'fields.title',
      'fields.description',
    ],
  })) as contentful.EntryCollection<
    contentful.EntrySkeletonType<PartialContentfulFields>
  >

  return {
    props: {
      items: data.items.toSorted((a, b) =>
        new Date(a.fields.publishedDate as any) >
        new Date(b.fields.publishedDate as any)
          ? -1
          : 1,
      ),
      currentLocale: locale,
    },
  }
}) as GetStaticProps<Props>

export default function IntechRestingHomePage(props: Props) {
  return (
    <>
      <Head>
        <title> Jordan Noailletas | Intech'Resting </title>
        <link
          rel="cannonical"
          hrefLang="en"
          href={getLocaledIntechRestingHomeUrl('en')}
        />
        <link
          rel="alternate"
          hrefLang="en"
          href={getLocaledIntechRestingHomeUrl('en')}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={getNONLocalIntechRestingHomeUrl()}
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href={getLocaledIntechRestingHomeUrl('fr')}
        />
      </Head>
      <IntechRestingHome {...props} />
    </>
  )
}
