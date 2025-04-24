import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  content: ReactNode
  id?: string
  preventMT?: boolean
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export default function BlogH3({
  id,
  className = '',
  content,
  preventMT,
}: Props) {
  const classes = twMerge(
    'font-semibold text-[120%] text-text-light',
    !preventMT ? 'mt-4' : '',
    className,
  )

  return (
    <h3 id={id} className={classes}>
      {content}
    </h3>
  )
}
