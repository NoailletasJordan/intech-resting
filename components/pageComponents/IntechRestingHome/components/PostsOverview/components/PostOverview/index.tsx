import Space from '@/components/common/Space'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface Props {
  url: string
  title: string
  className?: string
}

export default function PostOverview({ className = '', title, url }: Props) {
  return (
    <Link href={url}>
      <span
        className={twMerge(
          'hover:bg-surface-light active:bg-surface-light block rounded-lg pt-2 transition-colors duration-300',
          className,
        )}
      >
        <p>{title}</p>

        <Space className="h-2" />
      </span>
    </Link>
  )
}
