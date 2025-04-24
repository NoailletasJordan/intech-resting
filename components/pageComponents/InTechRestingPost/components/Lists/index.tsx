'use client'

import ThinArrowRight from '@/components/common/Icons/ThinArrowRight'
import { CSSVAR } from '@/components/pageComponents/ThemeHandler/constants'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Block, Document, Inline } from '@contentful/rich-text-types'
import { ReactNode, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { renderOption } from '../../helpers'
import {
  spaceContainerClasses,
  VerticalSpaceContainer,
} from '../VerticalSpacer'

interface Props {
  children: ReactNode
}

const PREFIX_COLOR = CSSVAR['--color-primary']

export function UnorderedList({ node }: { node: Block | Inline }) {
  return (
    <ul className={twMerge('grid gap-x-3', spaceContainerClasses)}>
      {node.content.map((c, index) => (
        <UnorderedListItem key={index}>
          {documentToReactComponents(c as Document, renderOption)}
        </UnorderedListItem>
      ))}
    </ul>
  )
}

function UnorderedListItem({ children }: Props) {
  const [anchorDOM, setAnchorDOM] = useState<HTMLElement | null>(null)
  const { externalIconSize, marginTop } = useMemo(() => {
    if (!anchorDOM) return { externalIconSize: '22px', marginTop: '7px' }
    const computedFontSize = getComputedStyle(anchorDOM).fontSize
    return {
      externalIconSize: `calc(20px + 0.4 * ${computedFontSize})`,
      marginTop: `calc(${computedFontSize} * log(2.0, 20))`,
    }
  }, [anchorDOM])

  return (
    <li ref={setAnchorDOM} className="grid grid-cols-[min-content_1fr] gap-x-4">
      <span
        style={{ height: externalIconSize, width: externalIconSize, marginTop }}
        className="inline-flex justify-center"
      >
        <ThinArrowRight currentColor={PREFIX_COLOR} />
      </span>

      <VerticalSpaceContainer>{children}</VerticalSpaceContainer>
    </li>
  )
}

export function OrderedList({ node }: { node: Block | Inline }) {
  return (
    <ol className={twMerge('grid gap-x-3', spaceContainerClasses)}>
      {node.content.map((c, index) => (
        <OrderedListItem key={index} number={index + 1}>
          {documentToReactComponents(c as Document, renderOption)}
        </OrderedListItem>
      ))}
    </ol>
  )
}

function OrderedListItem({
  number,
  children,
}: {
  children: ReactNode
  number: number
}) {
  return (
    <li className="grid grid-cols-[min-content_1fr] gap-x-4">
      <span
        style={{ color: PREFIX_COLOR }}
        className="flex size-6 justify-center font-semibold"
      >
        {number}.
      </span>

      <div>{children}</div>
    </li>
  )
}
