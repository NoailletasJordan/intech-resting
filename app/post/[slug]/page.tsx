import {
  getLocaledIntechRestingPostUrl,
  getPreferredLanguage,
} from '@/constants'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

interface IPageParams {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: IPageParams): Promise<Metadata> {
  const { slug } = await params

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

export default async function PostRedirect({ params }: IPageParams) {
  const { slug } = await params

  // Get the Accept-Language header
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') ?? ''

  // Determine the preferred language
  const preferredLanguage = getPreferredLanguage(acceptLanguage)

  // Redirect to the localized version
  redirect(getLocaledIntechRestingPostUrl(preferredLanguage, slug))
}
