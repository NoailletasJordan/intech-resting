import { ReactNode } from 'react'

interface Props {
  content: ReactNode
}

export default function InlineCode({ content }: Props) {
  return (
    <code className="rounded-xs border border-border bg-surface-light px-[5px] py-[3px] text-[80%] text-text-light">
      {content}
    </code>
  )
}
