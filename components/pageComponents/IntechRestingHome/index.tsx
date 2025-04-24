import Rhombus from '@/components/common/Icons/Rhombus'
import Separator from '@/components/common/Separator'
import { LOCALES } from '@/constants'
import * as contentful from 'contentful'
import { ReactNode } from 'react'
import LinksAndCopyrights from '../../common/LinksAndCopyrights'
import {
  BlogStyles,
  VerticalSpace,
} from '../InTechRestingPost/components/VerticalSpacer'
import ThemeHandler from '../ThemeHandler'
import { CSSVAR, themeIntechResting } from '../ThemeHandler/constants'
import EntranceWrapper from './components/EntranceWrapper'
import FeaturedVideos from './components/FeaturedVideos'
import Header from './components/Header'
import Hero from './components/Hero'
import PostsOverview, {
  PartialContentfulFields,
} from './components/PostsOverview'
import locales from './locales'
export interface Props {
  currentLocale: (typeof LOCALES)[number]
  items: contentful.EntryCollection<
    contentful.EntrySkeletonType<PartialContentfulFields>,
    undefined
  >['items']
}

const PX = 'px-5'

const containerClasses = 'max-w-[1000px] mx-auto px-4 max-sm:px-0'

export default function IntechRestingHome({ items, currentLocale }: Props) {
  return (
    <ThemeHandler styleConfig={themeIntechResting}>
      <BlogStyles>
        <div className="bg-background text-text min-h-[100svh] w-[100vw]">
          <Header currentLocale={currentLocale} />
          <VerticalSpace times={4} />
          <Container>
            <Hero />
            <VerticalSpace times={3} />
            <EntranceWrapper>
              <div className="flex justify-center">
                <div className="flex size-[7cqw] items-center justify-center">
                  <Rhombus currentColor={CSSVAR['--color-primary']} />
                </div>
              </div>
            </EntranceWrapper>
            <VerticalSpace times={2} />
            <EntranceWrapper>
              <div className="flex justify-center">
                <div className="text-text-light max-w-[400px] text-center text-[110%] font-normal">
                  Intech' Resting - Du contenu pour les devs qui aiment faire
                  les choses bien.
                </div>
              </div>
            </EntranceWrapper>
            <VerticalSpace times={2} />
            <EntranceWrapper>
              <SectionSeparator
                title={locales[currentLocale]['videos_section_title']}
              />
              <FeaturedVideos currentLocale={currentLocale} />
            </EntranceWrapper>
            <div className={containerClasses}>
              <EntranceWrapper>
                <SectionSeparator
                  title={locales[currentLocale]['posts_section_title']}
                />
                <PostsOverview
                  currentLocale={currentLocale}
                  items={items}
                  postsClassName={PX}
                />
              </EntranceWrapper>
              <VerticalSpace times={2} />
            </div>
            <VerticalSpace times={2} />
          </Container>
          <Separator />
          <div className="mx-auto max-w-[1000px] px-4 max-sm:px-0">
            <LinksAndCopyrights />
          </div>
        </div>
      </BlogStyles>
    </ThemeHandler>
  )
}

function SectionSeparator({ title }: { title: string }) {
  return (
    <>
      <VerticalSpace times={2} />
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-8">
        <div className="font-display text-primary text-[160%] font-semibold">
          {title}
        </div>
        <div className="bg-primary h-1">
          <div className="bg-surface-lighter h-1 w-[calc(100%-3rem)]" />
        </div>
      </div>
      <VerticalSpace times={2} />
    </>
  )
}

function Container({ children }: { children: ReactNode }) {
  return <div className="@container mx-auto max-w-[800px] px-4">{children}</div>
}
