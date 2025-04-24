import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  getLocaledIntechRestingHomeUrl,
  getPreferredLanguage,
} from '../constants'

import locales from '../locales'

export const metadata = {
  title: "Jordan Noailletas | Intech'Resting",
  description: locales.en.posts_section_title,
  alternates: {
    canonical: getLocaledIntechRestingHomeUrl('en'),
    languages: {
      en: getLocaledIntechRestingHomeUrl('en'),
      fr: getLocaledIntechRestingHomeUrl('fr'),
      'x-default': getLocaledIntechRestingHomeUrl('fr'),
    },
  },
}

export default async function RedirectToLocalizedHome() {
  // Get the Accept-Language header
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') ?? ''

  // Determine the preferred language
  const preferredLanguage = getPreferredLanguage(acceptLanguage)

  // Redirect to the localized version
  redirect(getLocaledIntechRestingHomeUrl(preferredLanguage))
}
