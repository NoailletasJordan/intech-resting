'use client'

import Button from '@/components/common/Button'
import CopyClipboard from '@/components/common/Icons/CopyClipboard'
import CopyClipboardChecked from '@/components/common/Icons/CopyClipboardChecked'
import Github from '@/components/common/Icons/Github'
import LinkedIn from '@/components/common/Icons/Linkedin'
import Twitter from '@/components/common/Icons/Twitter'
import { CSSVAR } from '@/components/pageComponents/ThemeHandler/constants'
import { languageContext } from '@/contexts/language-context'
import { useClipboard } from '@mantine/hooks'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { use } from 'react'
import locales from '../../../locales'

export default function LinksAndCopyrights() {
  const currentLocale = use(languageContext)
  const clipboard = useClipboard({ timeout: 2500 })
  const transition = {
    duration: 0.2,
    ease: 'easeOut',
  }

  return (
    <div className="flex h-16 items-center justify-between text-[16px] max-sm:h-[5.5rem] max-sm:flex-col max-sm:justify-between max-sm:py-3 max-sm:text-[12px]">
      <div className="flex items-center gap-x-4">
        <Button
          onClick={() => {
            clipboard.copy('j.noailletas@gmail.com')
          }}
        >
          <div className="flex items-center gap-x-2 overflow-hidden px-2 py-1">
            <div className="flex size-5 items-center justify-center max-sm:size-5">
              {clipboard.copied ? (
                <CopyClipboardChecked
                  currentColor={CSSVAR['--color-text']}
                  strokeWidth={1.5}
                />
              ) : (
                <CopyClipboard
                  currentColor={CSSVAR['--color-text']}
                  strokeWidth={1.5}
                />
              )}
            </div>
            <div className="grid">
              <motion.p
                initial={false}
                transition={transition}
                animate={{ y: clipboard.copied ? 0 : 25 }}
                className="col-start-1 row-start-1"
              >
                {locales[currentLocale].footer_email_copied}
              </motion.p>
              <motion.p
                initial={false}
                animate={{ y: clipboard.copied ? -25 : 0 }}
                className="col-start-1 row-start-1"
                transition={transition}
              >
                j.noailletas@gmail.com
              </motion.p>
            </div>
          </div>
        </Button>
        <div className="bg-border-active h-6 w-px" />
        <Link
          href="https://x.com/jordanndotdev"
          target="_blank"
          rel="noopener,noreferrer"
        >
          <Button onlyVisual>
            <div className="flex size-7 items-center justify-center rounded-full p-1 max-sm:size-7">
              <Twitter
                strokeWidth={1.5}
                currentColor={CSSVAR['--color-text']}
              />
            </div>
          </Button>
        </Link>
        <Link
          href="https://www.linkedin.com/in/jo-noa"
          target="_blank"
          rel="noopener,noreferrer"
        >
          <Button onlyVisual>
            <div className="flex size-7 items-center justify-center rounded-full p-1 max-sm:size-7">
              <LinkedIn
                strokeWidth={1.5}
                currentColor={CSSVAR['--color-text']}
              />
            </div>
          </Button>
        </Link>
        <Link
          target="_blank"
          rel="noopener,noreferrer"
          href="https://github.com/NoailletasJordan"
          className="max-sm:hidden"
        >
          <Button onlyVisual>
            <div className="flex size-7 items-center justify-center rounded-full p-1 max-sm:size-7">
              <Github strokeWidth={1.5} currentColor={CSSVAR['--color-text']} />
            </div>
          </Button>
        </Link>
      </div>
      <div>Jordan Noailletas • All rights reserved.</div>
    </div>
  )
}
