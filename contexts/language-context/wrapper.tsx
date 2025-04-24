'use client'

import { TLOCALE } from '@/constants'
import { ReactNode } from 'react'
import { languageContext } from '.'

interface Props {
  children: ReactNode
  locale: TLOCALE
}

export default function LanguageWrapper({ children, locale }: Props) {
  return (
    <languageContext.Provider value={locale}>
      {children}
    </languageContext.Provider>
  )
}
