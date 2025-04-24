import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { VerticalSpace } from '../VerticalSpacer'

interface Props {
  id?: string
  content: ReactNode
  preventMT?: boolean
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export default function BlogH2({
  className = '',
  content,
  id,
  preventMT,
}: Props) {
  const classes = twMerge(
    'text-text-light text-[170%] font-semibold leading-[1.5]',
    className,
  )

  return (
    <>
      {!preventMT && <VerticalSpace />}
      <h2 id={id} className={classes}>
        {content}
      </h2>
    </>
  )
}
