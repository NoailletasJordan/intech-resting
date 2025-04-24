import { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { ThemeOverwrite } from './constants'

interface Props {
  styleConfig: ThemeOverwrite
  children: ReactNode
  className?: HTMLAttributes<HTMLDivElement>['className']
  style?: HTMLAttributes<HTMLDivElement>['style']
}

export default function ThemeHandler({
  styleConfig,
  style = {},
  children,
  className = '',
}: Props) {
  return (
    <div
      style={{ ...styleConfig, ...style } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  )
}
