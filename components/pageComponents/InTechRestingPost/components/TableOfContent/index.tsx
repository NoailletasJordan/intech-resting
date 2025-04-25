'use client'

import { TLOCALE } from '@/constants'
import locales from '@/locales'
import { useCallback, useEffect, useState } from 'react'
import TableSectionHeader, {
  anchorOffset,
} from './components/TableSectionHeader'

export interface IHeader {
  value: string
  bigHeader: boolean
  id: string
}

interface Props {
  data: IHeader[]
  currentLocale: TLOCALE
  slug: string
}

export default function TableOfContent({ data, currentLocale }: Props) {
  const domElements = useHeadersDom(data)
  const activeIndex = useActiveIndexOnScroll(domElements)

  return (
    <aside className="w-[300px]">
      <div className="text-text-light font-semibold tracking-widest">
        {locales[currentLocale]['table_of_content']}
      </div>

      {data.map(({ bigHeader, value, id }, index) => (
        <TableSectionHeader
          bigHeader={bigHeader}
          key={index}
          id={id}
          active={index === activeIndex}
        >
          {value}
        </TableSectionHeader>
      ))}
    </aside>
  )
}

function useHeadersDom(data: { id: string }[]): HTMLElement[] {
  const [domElements, setDomElements] = useState<HTMLElement[]>([])

  useEffect(() => {
    const elements = data.map(({ id }) => document.getElementById(id)!)
    setDomElements(elements)
  }, [data])

  return domElements
}

function useActiveIndexOnScroll(domElements: HTMLElement[]): number {
  const [activeIndex, setActiveIndex] = useState(0)

  const getCurrentIndexScroll = useCallback(
    (elements: HTMLElement[]): number =>
      elements.reduce((acc, cur, index) => {
        const fixOffsetpx = 5
        if (cur.getBoundingClientRect().top + (anchorOffset - fixOffsetpx) > 0)
          return acc
        return index
      }, 0),
    [],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(getCurrentIndexScroll(domElements))
    }, 400)

    return () => {
      clearInterval(interval)
    }
  }, [domElements, getCurrentIndexScroll])

  return activeIndex
}
