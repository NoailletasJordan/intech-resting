import { ContentfulFields } from '@/components/pageComponents/InTechRestingPost'
import { VerticalSpace } from '@/components/pageComponents/InTechRestingPost/components/VerticalSpacer'
import { getLocaledIntechRestingPostUrl, TLOCALE } from '@/constants'
import * as contentful from 'contentful'
import { Fragment, HTMLAttributes, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import PostOverview from './components/PostOverview'

export type PartialContentfulFields = Pick<
  ContentfulFields,
  'publishedDate' | 'description' | 'title' | 'slug'
>
interface Props {
  items: contentful.EntryCollection<
    contentful.EntrySkeletonType<PartialContentfulFields>,
    undefined
  >['items']
  postsClassName?: HTMLAttributes<HTMLDivElement>['className']
  currentLocale: TLOCALE
}

export default function PostsOverview({
  items = [],
  postsClassName,
  currentLocale,
}: Props) {
  const groupedByYear = useMemo(() => getItemsByYear(items), [items])

  return (
    <div className="space-y-1">
      {groupedByYear.map(({ items, year }, yearIndex) => (
        <Fragment key={year}>
          {yearIndex !== 0 && <VerticalSpace />}
          <h3 className={twMerge(postsClassName, 'text-primary')}>{year}</h3>
          {items.map(({ fields }) => (
            <PostOverview
              key={fields.title}
              url={getLocaledIntechRestingPostUrl(currentLocale, fields.slug)}
              title={fields.title}
              className={postsClassName}
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}

const getItemsByYear = (items: Props['items']) => {
  const sorted = items.toSorted(
    (a, b) => b.fields.publishedDate - a.fields.publishedDate,
  )
  const yearMap = new Map<number, typeof items>()

  sorted.forEach((item) => {
    const year = new Date(item.fields.publishedDate).getFullYear()

    if (yearMap.has(year)) {
      yearMap.get(year)!.push(item)
    } else {
      yearMap.set(year, [item])
    }
  })

  return Array.from(yearMap.entries()).map(([year, items]) => ({
    year,
    items,
  }))
}
