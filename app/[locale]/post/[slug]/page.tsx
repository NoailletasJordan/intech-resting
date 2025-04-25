import IntechRestingPost, {
  Props,
} from '@/components/pageComponents/InTechRestingPost'
import { getLocaledIntechRestingPostUrl, LOCALES, TLOCALE } from '@/constants'
import * as contentful from 'contentful'

type PageParams = {
  params: Promise<{
    slug: string
    locale: TLOCALE
  }>
}

export async function generateMetadata(props: PageParams) {
  const params = await props.params
  const { locale, slug } = params

  if (!process.env.CONTENTFUL_SPACE || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error(`Contentful env variables not set`)
  }

  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const data = await client.getEntries({
    content_type: 'blogPost',
    locale,
    'fields.slug': slug,
  })

  if (data.items.length === 0) {
    return {
      title: "Post not found | Intech'Resting",
    }
  }

  const pageData = data.items[0]

  return {
    title: `${pageData.fields.title} | Intech'Resting`,
    description: pageData.fields.description,
    openGraph: {
      title: `${pageData.fields.title} | Intech'Resting`,
      description: pageData.fields.description,
    },
    alternates: {
      canonical: getLocaledIntechRestingPostUrl('fr', slug),
      languages: {
        en: getLocaledIntechRestingPostUrl('en', slug),
        fr: getLocaledIntechRestingPostUrl('fr', slug),
        'x-default': getLocaledIntechRestingPostUrl('fr', slug),
      },
    },
  }
}

export async function generateStaticParams() {
  if (!process.env.CONTENTFUL_SPACE || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error(`Contentful env variables not set`)
  }
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })

  const data = await client.getEntries({
    content_type: 'blogPost',
    locale: 'fr',
  })

  const slugs = data.items.map(({ fields }) => fields.slug)

  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}
export const dynamicParams = false

export default async function IntechRestingPostPage(props0: PageParams) {
  const params = await props0.params
  const { locale, slug } = params

  if (!process.env.CONTENTFUL_SPACE || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error(`Contentful env variables not set`)
  }

  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const data = await client.getEntries({
    content_type: 'blogPost',
    locale,
    'fields.slug': slug,
  })

  const pageData = data.items[0]

  const props: Props = {
    pageData: pageData as any,
    currentLocale: locale,
  }

  return <IntechRestingPost {...props} />
}
