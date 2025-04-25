import IntechRestingHome, {
  Props as IntechRestingHomeProps,
} from '@/components/pageComponents/IntechRestingHome'
import { PartialContentfulFields } from '@/components/pageComponents/IntechRestingHome/components/PostsOverview'
import { getLocaledIntechRestingHomeUrl, LOCALES, TLOCALE } from '@/constants'
import locales from '@/locales'
import * as contentful from 'contentful'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: TLOCALE }
}): Promise<Metadata> {
  const locale = params.locale

  return {
    title: "Jordan Noailletas | Intech'Resting",
    description: locales[locale].seo_home_description,
    alternates: {
      canonical: getLocaledIntechRestingHomeUrl('fr'),
      languages: {
        en: getLocaledIntechRestingHomeUrl('en'),
        fr: getLocaledIntechRestingHomeUrl('fr'),
        'x-default': getLocaledIntechRestingHomeUrl('fr'),
      },
    },
  }
}

export default async function IntechRestingHomePage(props0: {
  params: Promise<{ locale: string }>
}) {
  const params = await props0.params
  const { locale } = params

  if (!process.env.CONTENTFUL_SPACE || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error(`Contentful env variables not set`)
  }

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

  const items = data.items.toSorted((a, b) =>
    new Date(a.fields.publishedDate as any) >
    new Date(b.fields.publishedDate as any)
      ? -1
      : 1,
  )

  const props: IntechRestingHomeProps = {
    items: items as any,
    currentLocale: locale as (typeof LOCALES)[number],
  }

  return <IntechRestingHome {...props} />
}
