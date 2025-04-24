import Button from '@/components/common/Button'
import Home from '@/components/common/Icons/Home'
import Separator from '@/components/common/Separator'
import Space from '@/components/common/Space'
import { TLOCALE } from '@/constants'
import { languageContext } from '@/contexts/language-context'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Text } from '@contentful/rich-text-types'
import * as contentful from 'contentful'
import Link from 'next/link'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { getLocaledIntechRestingHomeUrl } from '../../../constants'
import LinksAndCopyrights from '../../common/LinksAndCopyrights'
import Header from '../IntechRestingHome/components/Header'
import locales from '../IntechRestingHome/locales'
import ThemeHandler from '../ThemeHandler'
import { CSSVAR, themeIntechResting } from '../ThemeHandler/constants'
import TableOfContent, { IHeader } from './components/TableOfContent'
import {
  BlogStyles,
  VerticalSpace,
  VerticalSpaceContainer,
} from './components/VerticalSpacer'
import { formatDate, renderOption } from './helpers'

export interface ContentfulFields {
  slug: string
  title: string
  description: string
  thumbnail: any
  publishedDate: Date
  body: any
}

export interface Props {
  currentLocale: TLOCALE
  pageData: contentful.Entry<
    contentful.EntrySkeletonType<ContentfulFields>,
    undefined
  >
}

export default function IntechRestingPost({ pageData, currentLocale }: Props) {
  const rawDate = pageData.fields.publishedDate as string | undefined
  const date = rawDate && formatDate(rawDate, currentLocale)
  const bodyWithIds = useMemo(() => {
    const newBody = JSON.parse(JSON.stringify(pageData.fields.body))
    newBody.content = newBody.content.map((elt: any, index: number) => ({
      ...elt,
      data: { ...elt.data, id: `id-${index}` },
    }))

    return newBody
  }, [pageData])

  const tableContent: IHeader[] = useMemo(
    () =>
      bodyWithIds.content.reduce(
        (acc: IHeader[], cur: any) => {
          if (
            cur.nodeType !== BLOCKS.HEADING_2 &&
            cur.nodeType !== BLOCKS.HEADING_3
          )
            return acc

          return [
            ...acc,
            {
              id: cur.data.id,
              bigHeader: cur.nodeType === BLOCKS.HEADING_2,
              value: cur.content.reduce(
                (acc: string, cur: Text) => `${acc} ${cur.value}`.trim(),
                '',
              ),
            },
          ]
        },
        [
          {
            bigHeader: true,
            value: locales[currentLocale]['anchor_introduction'],
            id: 'intro',
          },
        ],
      ),
    [bodyWithIds, currentLocale],
  )

  const paddindX = 'px-5 max-sm:px-2'
  return (
    <ThemeHandler styleConfig={themeIntechResting}>
      <languageContext.Provider value={currentLocale}>
        <div className="bg-background text-text">
          <BlogStyles>
            <Header currentLocale={currentLocale} />
            <VerticalSpace times={2} />
            <div className="mx-auto flex max-w-[calc(750px_+_4rem_+_300px_+_4rem)] justify-center px-8 max-sm:px-2">
              <div className="grid grid-cols-[minmax(auto,750px)_300px] gap-16 max-lg:grid-cols-[minmax(auto,660px)] max-lg:gap-8">
                <div>
                  <h1 className="mx-[10%] text-center text-[32px] leading-[1.4] font-bold">
                    {pageData.fields.title as string}
                  </h1>
                  <Space className="h-4" />
                  <p className="text-center">
                    <span>{locales[currentLocale]['article_date']}</span>
                    <span className="text-text-light italic">{date}</span>
                  </p>
                  <VerticalSpace times={2} />
                </div>
                <div className="max-lg:hidden" />
                <div>
                  <div id="intro" className={twMerge('@container', paddindX)}>
                    <VerticalSpaceContainer>
                      {documentToReactComponents(bodyWithIds, renderOption)}
                    </VerticalSpaceContainer>
                    <VerticalSpace times={2} />
                    <div className="flex justify-center">
                      <Link
                        href={getLocaledIntechRestingHomeUrl(currentLocale)}
                      >
                        <Button
                          onlyVisual
                          className="flex items-center gap-x-3"
                        >
                          <span className="inline-block">
                            {locales[currentLocale]['back_to_home']}
                          </span>
                          <span className="size-5">
                            <Home
                              currentColor={CSSVAR['--color-text']}
                              strokeWidth={1.5}
                            />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="max-w-[300px] max-lg:hidden">
                  <div className="sticky top-[150px]">
                    <TableOfContent
                      currentLocale={currentLocale}
                      slug={pageData.fields.slug}
                      data={tableContent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </BlogStyles>
          <VerticalSpace times={4} />
          <Separator />
          <div className="mx-auto max-w-[1000px] px-4 max-sm:px-0">
            <LinksAndCopyrights />
          </div>
        </div>
      </languageContext.Provider>
    </ThemeHandler>
  )
}
