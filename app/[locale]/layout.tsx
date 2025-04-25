import Separator from '@/components/common/Separator'
import {
  BlogStyles,
  VerticalSpace,
} from '@/components/pageComponents/InTechRestingPost/components/VerticalSpacer'
import ThemeHandler from '@/components/pageComponents/ThemeHandler'
import { themeIntechResting } from '@/components/pageComponents/ThemeHandler/constants'
import { TLOCALE } from '@/constants'
import LanguageWrapper from '@/contexts/language-context/wrapper'
import { Metadata } from 'next'
import { ReactNode } from 'react'
import '../../globals.css'
import Header from '../components/Header'
import LinksAndCopyrights from '../components/LinksAndCopyrights'

export const metadata: Metadata = {
  title: 'InTech/ Resting',
  icons: {
    icon: '/favicon.png',
  },
}

interface Props {
  children: ReactNode
  params: Promise<{ locale?: string }>
}

export default async function Layout(props: Props) {
  const params = await props.params

  const { children } = props

  const resolvedParams = params

  const locale = (resolvedParams.locale ?? 'en') as TLOCALE

  return (
    <html lang={locale}>
      <body className="min-h-[10svh] w-full">
        <ThemeHandler styleConfig={themeIntechResting}>
          <LanguageWrapper locale={locale}>
            <div className="bg-background text-text relative">
              <BlogStyles>
                <Header />
                {children}
                <VerticalSpace times={2} />
              </BlogStyles>
              <Separator />
              <div className="mx-auto w-full max-w-[1000px] px-4 max-sm:px-0">
                <LinksAndCopyrights />
              </div>
            </div>
          </LanguageWrapper>
        </ThemeHandler>
      </body>
    </html>
  )
}
