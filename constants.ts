export const URL_FRAGMENT_BLOG = 'intech-resting'

export type TLOCALE = 'en' | 'fr'
export const LOCALES: TLOCALE[] = ['en', 'fr']

export function getPreferredLanguage(
  acceptLanguageHeader: string,
): 'en' | 'fr' {
  if (!acceptLanguageHeader) return 'en'
  const languages = acceptLanguageHeader.split(',').map((lang) => {
    const [language, qValue] = lang.split(';q=')
    return {
      language: language.trim(),
      weight: qValue ? parseFloat(qValue) : 1,
    }
  })
  languages.sort((a, b) => b.weight - a.weight)
  const frenchPreference = languages.find((lang) =>
    lang.language.startsWith('fr'),
  )
  const englishPreference = languages.find((lang) =>
    lang.language.startsWith('en'),
  )
  // Return 'fr' if French is preferred enough
  if (
    frenchPreference &&
    (!englishPreference || frenchPreference.weight >= 0.5)
  )
    return 'fr'

  return 'en'
}

export const getLocaledPortfolioUrl = (locale: TLOCALE) =>
  `https://jordannoailletas.com/${locale}`
export const getNONLocalIntechRestingHomeUrl = () => '/'
export const getLocaledIntechRestingHomeUrl = (locale: TLOCALE) => `/${locale}`

export const getNONLocaledIntechRestingPostUrl = ({
  postId,
}: {
  postId: string
}) => `/post/${postId}`
export const getLocaledIntechRestingPostUrl = (
  locale: TLOCALE,
  postId: string,
) => `/${locale}/post/${postId}`
