import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: HTMLAttributes<HTMLDivElement>['className']
  style?: HTMLAttributes<HTMLDivElement>['style']
}

export default function Separator({ className = '', style = {} }: Props) {
  return (
    <div
      style={style}
      className={twMerge('h-[1px] w-full bg-border', className)}
    />
  )
}
