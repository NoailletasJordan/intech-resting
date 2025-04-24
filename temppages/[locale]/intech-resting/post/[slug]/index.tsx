import IntechRestingPost, {
  Props,
} from '@/components/pageComponents/InTechRestingPost'
import {
  getLocaledIntechRestingPostUrl,
  getNONLocaledIntechRestingPostUrl,
  LOCALES,
  TLOCALE,
} from '@/constants'
import * as contentful from 'contentful'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

export const getStaticPaths = (async () => {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })

  const data = await client.getEntries({
    content_type: 'blogPost',
    locale: 'fr',
  })

  const slugs = data.items.map(({ fields }) => fields.slug)

  return {
    paths: LOCALES.flatMap((locale) =>
      slugs.map((slug) => ({
        params: { slug, locale },
      })),
    ),
    fallback: false,
  }
}) as GetStaticPaths

export const getStaticProps = (async (context) => {
  const { locale, slug } = context.params as { slug: string; locale: TLOCALE }
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })

  const data = await client.getEntries({
    content_type: 'blogPost',
    locale,
  })

  const singleArticleData = data.items.find(
    ({ fields }) => fields.slug === slug,
  )

  return {
    props: {
      pageData: singleArticleData,
      currentLocale: locale,
    },
  }
}) as GetStaticProps<Props>

export default function IntechRestingPostPage(props: Props) {
  const { pageData } = props
  return (
    <>
      <Head>
        <title>{`${pageData.fields.title} | Intech' Resting`}</title>
        <meta name="description" content={pageData.fields.description} />
        <meta
          property="og:title"
          content={`${pageData.fields.title} | Intech' Resting`}
        />
        <meta property="og:description" content={pageData.fields.description} />
        <link
          rel="cannonical"
          hrefLang="en"
          href={getLocaledIntechRestingPostUrl('en', pageData.fields.slug)}
        />
        <link
          rel="alternate"
          hrefLang="en"
          href={getLocaledIntechRestingPostUrl('en', pageData.fields.slug)}
        />
        <link
          rel="alternate"
          hrefLang="en"
          href={getNONLocaledIntechRestingPostUrl({
            postId: pageData.fields.slug,
          })}
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href={getLocaledIntechRestingPostUrl('fr', pageData.fields.slug)}
        />
      </Head>
      <IntechRestingPost {...props} />
    </>
  )
}
