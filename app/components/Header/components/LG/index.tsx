'use client'

import Button from '@/components/common/Button'
import Github from '@/components/common/Icons/Github'
import Language2 from '@/components/common/Icons/Language2'
import LinkedIn from '@/components/common/Icons/Linkedin'
import Share from '@/components/common/Icons/Share'
import Twitter from '@/components/common/Icons/Twitter'
import { themeIntechResting } from '@/components/pageComponents/ThemeHandler/constants'
import { TLOCALE } from '@/constants'
import locales from '@/locales'
import { motion } from 'framer-motion'
import Link from 'next/link'
import DropDownMenu from './components/DropDownMenu'
import Profile from './components/Profile'

interface Props {
  currentLocale: TLOCALE
  socials: {
    twitter: string
    linkedin: string
    github: string
  }
  portfolioUrl: string
  oppositeLocalePath: string
}

export default function HeaderLG({
  currentLocale,
  portfolioUrl,
  socials,
  oppositeLocalePath,
}: Props) {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.6, ease: 'easeOut' },
      }}
      className="sticky top-0 z-10 h-16 w-[100%] content-center bg-[#121418bb] backdrop-blur-md max-sm:hidden"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        <div>
          <Profile currentLocale={currentLocale} />
        </div>
        <div className="flex gap-x-4">
          <DropDownMenu
            label={locales[currentLocale][`socials_label`]}
            iconLeft={
              <Share
                strokeWidth={1.5}
                currentColor={themeIntechResting['--color-text']}
              />
            }
            options={[
              {
                label: 'Twitter',
                isLink: true,
                url: socials.twitter,
                iconRight: (
                  <Twitter currentColor={themeIntechResting['--color-text']} />
                ),
              },
              {
                label: 'Linkedin',
                isLink: true,
                url: socials.linkedin,
                iconRight: (
                  <LinkedIn currentColor={themeIntechResting['--color-text']} />
                ),
              },
              {
                label: 'Github',
                isLink: true,
                url: socials.github,
                iconRight: (
                  <Github currentColor={themeIntechResting['--color-text']} />
                ),
              },
            ]}
          />
          <DropDownMenu
            label={locales[currentLocale][`language_option_${currentLocale}`]}
            iconLeft={
              <Language2
                strokeWidth={1.5}
                currentColor={themeIntechResting['--color-text']}
              />
            }
            options={[
              {
                label: locales[currentLocale]['action_switch_language'],
                isLink: true,
                samePage: true,
                url: oppositeLocalePath,
              },
            ]}
          />
          <Link href={portfolioUrl}>
            <Button onlyVisual className="rounded-full px-3">
              {locales[currentLocale].visit_portfolio}
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
