import Rhombus from '@/components/common/Icons/Rhombus'
import { LOCALES } from '@/constants'
import locales from '@/locales'
import * as contentful from 'contentful'
import { ReactNode } from 'react'
import { VerticalSpace } from '../InTechRestingPost/components/VerticalSpacer'
import { CSSVAR } from '../ThemeHandler/constants'
import EntranceWrapper from './components/EntranceWrapper'
import FeaturedVideos from './components/FeaturedVideos'
import Hero from './components/Hero'
import PostsOverview, {
  PartialContentfulFields,
} from './components/PostsOverview'
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
    <Container>
      <VerticalSpace times={2} classNames="max-sm:h-12" />
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
            Intech' Resting - Du contenu pour les devs qui aiment faire les
            choses bien.
          </div>
        </div>
      </EntranceWrapper>
      <VerticalSpace times={2} />
      <EntranceWrapper>
        <SectionSeparator
          title={locales[currentLocale]['videos_section_title']}
        />
        <FeaturedVideos />
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
  return (
    <div className="@container mx-auto w-full max-w-[800px] px-4">
      {children}
    </div>
  )
}
