import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: HTMLAttributes<HTMLDivElement>['className']
  style?: HTMLAttributes<HTMLDivElement>['style']
}

export default function Space({ className = '', style = {} }: Props) {
  return <div style={style} className={className} />
}

type TSize = 'xs' | 'sm' | 'md' | 'lg'
export function Spacer({
  className = '',
  size = 'md',
  style = {},
}: Partial<Props> & {
  size: TSize
}) {
  const config = {
    xs: 'h-[1cqw] max-sm:h-[3cqw]',
    sm: 'h-[2cqw] max-sm:h-[6cqw]',
    md: 'h-[4cqw] max-sm:h-[12cqw]',
    lg: 'h-[6cqw] max-sm:h-[18cqw]',
  } as const
  const height = config[size]

  return <div style={style} className={twMerge(height, className)} />
}

export const getSpacing = ({
  isSmallMedia,
  size,
}: {
  size: TSize
  isSmallMedia: boolean
}) => {
  const config = {
    xs: { smallMedia: '3cqw', largeMedia: '1cqw' },
    sm: { smallMedia: '6cqw', largeMedia: '2cqw' },
    md: { smallMedia: '12cqw', largeMedia: '4cqw' },
    lg: { smallMedia: '18cqw', largeMedia: '6cqw' },
  }

  return config[size][isSmallMedia ? 'smallMedia' : 'largeMedia']
}
