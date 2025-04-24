import { ReactNode } from 'react'

interface Props {
  content: ReactNode
}

export default function Emphasis({ content }: Props) {
  return <span className="text-text-light font-semibold">{content}</span>
}
