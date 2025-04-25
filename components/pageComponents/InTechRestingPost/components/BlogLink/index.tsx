'use client'

import ExternalLink from '@/components/common/Icons/ExtermalLink'
import { CSSVAR } from '@/components/pageComponents/ThemeHandler/constants'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { ReactNode, useMemo, useState } from 'react'

interface Props {
  content: ReactNode
  url: string
  textColor?: string
  underlineColor?: string
  forceOpenSamePage?: boolean
}

export default function BlogLink({
  textColor = CSSVAR['--color-text-light'],
  underlineColor = CSSVAR['--color-primary'],
  forceOpenSamePage,
  content,
  url,
}: Props) {
  const [anchorDOM, setAnchorDOM] = useState<HTMLAnchorElement | null>(null)

  const externalIconSize = useMemo(() => {
    if (!anchorDOM) return '14px'
    const computedFontSize = getComputedStyle(anchorDOM).fontSize
    return `calc(0.8 * ${computedFontSize})`
  }, [anchorDOM])

  const [isHovered, { open, close }] = useDisclosure()

  return (
    <Link
      ref={setAnchorDOM}
      href={url}
      target={forceOpenSamePage ? '' : '_blank'}
      rel={forceOpenSamePage ? '' : 'noopener noreferrer'}
      style={{ color: textColor, boxShadow: `0 1.2px 0 ${underlineColor}` }}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      {content}

      {!forceOpenSamePage && (
        <span
          style={{ width: externalIconSize, height: externalIconSize }}
          className="ml-[2px] inline-flex translate-y-[2px] items-center justify-center"
        >
          <ExternalLink
            arrowColorHovered={CSSVAR['--color-primary']}
            currentColor={CSSVAR['--color-text-light']}
            isHovered={isHovered}
          />
        </span>
      )}
    </Link>
  )
}

export const getIsExternalLink = (url: string): boolean => {
  try {
    const link = new URL(url, window.location.origin)
    return link.hostname !== window.location.hostname
  } catch (_e) {
    console.error('Invalid URL provided:', url)
    return false
  }
}
