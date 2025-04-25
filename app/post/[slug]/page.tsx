import {
  getLocaledIntechRestingPostUrl,
  getPreferredLanguage,
} from '@/constants'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

type PageParams = {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = params

  return {
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

export default async function PostRedirect({ params }: PageParams) {
  const { slug } = params

  // Get the Accept-Language header
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') ?? ''

  // Determine the preferred language
  const preferredLanguage = getPreferredLanguage(acceptLanguage)

  // Redirect to the localized version
  redirect(getLocaledIntechRestingPostUrl(preferredLanguage, slug))
}
