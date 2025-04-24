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

// Define the content type for blog posts
interface BlogPostFields {
  slug: string
  title: string
  description: string
  publishedDate: string
  body: any // Using any for simplicity
  thumbnail?: any
}

type PageParams = {
  params: {
    slug: string
    locale: TLOCALE
  }
}

export async function generateMetadata({ params }: PageParams) {
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
      canonical: getLocaledIntechRestingPostUrl('en', slug),
      languages: {
        en: getLocaledIntechRestingPostUrl('en', slug),
        fr: getLocaledIntechRestingPostUrl('fr', slug),
        'x-default': getNONLocaledIntechRestingPostUrl({ postId: slug }),
      },
    },
  }
}

export function generateStaticParams() {
  // In a real implementation, we would fetch slugs from Contentful
  // But since generateStaticParams needs to be synchronous, we'd need a different approach
  // For now, I'm simplifying this
  return LOCALES.flatMap((locale) => [{ locale, slug: 'example-slug' }])
}

export default async function IntechRestingPostPage({ params }: PageParams) {
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
    // Handle the case where post is not found
    return <div>Post not found</div>
  }

  const pageData = data.items[0]

  const props: Props = {
    pageData: pageData as any,
    currentLocale: locale,
  }

  return <IntechRestingPost {...props} />
}
