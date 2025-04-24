import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  children: ReactNode
  onClick?: () => void
  onlyVisual?: boolean
  className?: string
}

export default function Button({
  onlyVisual,
  children,
  onClick,
  className: classNameOverwrite,
}: Props) {
  const className = twMerge(
    'rounded-md border border-border-active cursor-pointer bg-surface-light px-2 py-[2px] text-[85%] hover:border-border-active hover:bg-surface-lighter active:border-border-active active:bg-background',
    classNameOverwrite,
  )
  if (onlyVisual)
    return (
      <span onClick={onClick} className={twMerge('inline-block', className)}>
        {children}
      </span>
    )

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}
