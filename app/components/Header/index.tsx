'use client'

import { getLocaledPortfolioUrl, LOCALES } from '@/constants'
import { languageContext } from '@/contexts/language-context'
import { usePathname, useRouter } from 'next/navigation'
import { use, useEffect, useMemo } from 'react'
import HeaderLG from './components/LG'
import HeaderSM from './components/SM'

const socials = {
  twitter: 'https://x.com/jordanndotdev',
  linkedin: 'https://www.linkedin.com/in/jo-noa',
  github: 'https://github.com/NoailletasJordan',
}

export default function Header() {
  const currentLocale = use(languageContext)
  const router = useRouter()
  const pathname = usePathname()

  const oppositeLocalePath = useMemo(() => {
    const oppositeLocale = LOCALES.find((locale) => locale !== currentLocale)!
    return pathname.replace(`/${currentLocale}`, `/${oppositeLocale}`)
  }, [currentLocale, pathname])

  useEffect(() => {
    router.prefetch(oppositeLocalePath)
  }, [oppositeLocalePath, router])

  const portfolioUrl = getLocaledPortfolioUrl(currentLocale)

  return (
    <>
      <HeaderLG
        portfolioUrl={portfolioUrl}
        currentLocale={currentLocale}
        socials={socials}
        oppositeLocalePath={oppositeLocalePath}
      />
      <HeaderSM
        portfolioUrl={portfolioUrl}
        currentLocale={currentLocale}
        socials={socials}
        oppositeLocalePath={oppositeLocalePath}
      />
    </>
  )
}
