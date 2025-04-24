import IntechRestingPost, {
  Props,
} from '@/components/pageComponents/InTechRestingPost'
import { TLOCALE } from '@/constants'
import * as contentful from 'contentful'
import { Metadata } from 'next'

type PageParams = {
  params: Promise<{
    slug: string
    locale: TLOCALE
  }>
}

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
}

export default async function IntechRestingPostPage(props0: PageParams) {
  const params = await props0.params
  const { locale, slug } = params

  if (
    !process.env.CONTENTFUL_SPACE ||
    !process.env.CONTENTFUL_DRAFT_PREVIEW_TOKEN
  ) {
    throw new Error(`Contentful env variables not set`)
  }

  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_DRAFT_PREVIEW_TOKEN,
    host: 'preview.contentful.com',
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

  return (
    <div>
      <div className="flex h-20 items-center justify-center text-orange-300">
        Draft version
      </div>
      <IntechRestingPost {...props} />
    </div>
  )
}
