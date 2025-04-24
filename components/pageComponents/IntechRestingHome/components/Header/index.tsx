import { LOCALES, TLOCALE } from '@/constants'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import HeaderLG from './components/LG'
import HeaderSM from './components/SM'

interface Props {
  currentLocale: TLOCALE
}
const socials = {
  twitter: 'https://x.com/jordanndotdev',
  linkedin: 'https://www.linkedin.com/in/jo-noa',
  github: 'https://github.com/NoailletasJordan',
}

export default function Header({ currentLocale }: Props) {
  const router = useRouter()

  const oppositeLocalePath = useMemo(() => {
    LOCALES.find((locale) => locale !== currentLocale)!
    const currentPath = router.asPath
    const oppositeLocale = LOCALES.find((locale) => locale !== currentLocale)!
    const newPath = currentPath.replace(
      `/${currentLocale}/`,
      `/${oppositeLocale}/`,
    )
    return newPath
  }, [currentLocale])

  useEffect(() => {
    router.prefetch(oppositeLocalePath)
  }, [oppositeLocalePath])

  const portfolioLink = `/${currentLocale}/`

  return (
    <>
      <HeaderLG
        portfolioLink={portfolioLink}
        currentLocale={currentLocale}
        socials={socials}
        oppositeLocalePath={oppositeLocalePath}
      />
      <HeaderSM
        portfolioLink={portfolioLink}
        currentLocale={currentLocale}
        socials={socials}
        oppositeLocalePath={oppositeLocalePath}
      />
    </>
  )
}
