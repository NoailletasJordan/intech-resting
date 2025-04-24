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

export const metadata = {
  title: "Jordan Noailletas | Intech'Resting",
  alternates: {
    canonical: getLocaledIntechRestingHomeUrl('en'),
    languages: {
      en: getLocaledIntechRestingHomeUrl('en'),
      fr: getLocaledIntechRestingHomeUrl('fr'),
      'x-default': getNONLocalIntechRestingHomeUrl(),
    },
  },
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function IntechRestingHomePage({
  params,
}: {
  params: { locale: string }
}) {
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

  const props: Props = {
    items: items as any,
    currentLocale: locale as (typeof LOCALES)[number],
  }

  return <IntechRestingHome {...props} />
}
