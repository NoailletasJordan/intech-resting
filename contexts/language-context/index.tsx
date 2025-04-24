'use client'

import { TLOCALE } from '@/constants'
import { createContext } from 'react'

export const languageContext = createContext<TLOCALE>('en')
