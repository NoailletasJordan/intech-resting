import Button from '@/components/common/Button'
import ExternalLink from '@/components/common/Icons/ExtermalLink'
import Github from '@/components/common/Icons/Github'
import Language from '@/components/common/Icons/Language'
import LinkedIn from '@/components/common/Icons/Linkedin'
import Twitter from '@/components/common/Icons/Twitter'
import Separator from '@/components/common/Separator'
import { VerticalSpace } from '@/components/pageComponents/InTechRestingPost/components/VerticalSpacer'
import { CSSVAR } from '@/components/pageComponents/ThemeHandler/constants'
import { getLocaledIntechRestingHomeUrl, TLOCALE } from '@/constants'
import locales from '@/locales'
import { useDisclosure } from '@mantine/hooks'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import MenuButton from './components/MenuButton'

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

export default function HeaderSM({
  currentLocale,
  portfolioUrl,
  socials,
  oppositeLocalePath,
}: Props) {
  const [isOpen, { toggle }] = useDisclosure(false)

  const variants: Variants = {
    open: {
      opacity: 1,
      pointerEvents: 'auto',
      display: 'block',
    },
    closed: {
      opacity: 0,
      pointerEvents: 'none',
      transitionEnd: {
        display: 'none',
      },
    },
  }

  return (
    <>
      <motion.div
        className="bg-background-dark absolute right-0 z-10 h-[100dvh] w-[100vw] min-sm:hidden"
        variants={variants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className="relative flex size-full flex-col content-center items-center justify-center">
          <Link href={portfolioUrl}>
            <Button
              onlyVisual
              className="absolute top-12 left-4 flex items-center gap-x-2"
            >
              <span className="inline-block">
                {locales[currentLocale].visit_portfolio}
              </span>
              <span className="inline-block size-4">
                <ExternalLink
                  currentColor={CSSVAR['--color-text']}
                  arrowColorHovered={CSSVAR['--color-text']}
                  isHovered={false}
                />
              </span>
            </Button>
          </Link>
          <Link
            onClick={() => toggle()}
            href={getLocaledIntechRestingHomeUrl(currentLocale)}
          >
            <Button onlyVisual className="px-4 py-1 text-[150%]">
              {locales[currentLocale].back_to_home}
            </Button>
          </Link>
          <VerticalSpace times={2} />
          <Separator className="w-[65%]" />
          <VerticalSpace />
          <div className="flex justify-center gap-x-4">
            <SocialButton href={socials.twitter}>
              <Twitter
                currentColor={CSSVAR['--color-text']}
                strokeWidth={1.2}
              />
            </SocialButton>
            <SocialButton href={socials.linkedin}>
              <LinkedIn
                currentColor={CSSVAR['--color-text']}
                strokeWidth={1.2}
              />
            </SocialButton>
            <SocialButton href={socials.github}>
              <Github currentColor={CSSVAR['--color-text']} strokeWidth={1.2} />
            </SocialButton>
          </div>
          <div className="absolute bottom-18 left-1/2 -translate-x-1/2">
            <Link href={oppositeLocalePath}>
              <Button
                onlyVisual
                className="flex items-center gap-x-4 px-3 py-2"
              >
                <span>
                  {locales[currentLocale][`language_option_${currentLocale}`]}
                </span>
                <div className="mx-auto size-8">
                  <Language currentColor="white" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
      <MenuButton isOpen={isOpen} toggle={toggle} />
    </>
  )
}

function SocialButton({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href}>
      <Button onlyVisual className="size-13 rounded-full p-3">
        {children}
      </Button>
    </Link>
  )
}
