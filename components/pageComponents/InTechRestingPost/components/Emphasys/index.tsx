import { ReactNode } from 'react'

interface Props {
  content: ReactNode
}

export default function Emphasis({ content }: Props) {
  return <span className="font-semibold text-text-light">{content}</span>
}
