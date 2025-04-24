import Info from '@/components/common/Icons/Info'
import Success from '@/components/common/Icons/Success'
import Warning from '@/components/common/Icons/Warning'
import Space from '@/components/common/Space'
import ThemeHandler from '@/components/pageComponents/ThemeHandler'
import {
  CSSVAR,
  themeIntechResting,
  ThemeOverwrite,
} from '@/components/pageComponents/ThemeHandler/constants'
import { ReactNode } from 'react'

interface Props {
  title: ReactNode
  content: ReactNode
  type: 'info' | 'success' | 'warning'
}

const config: Record<
  Props['type'],
  { icon: ReactNode; theme: ThemeOverwrite }
> = {
  info: {
    icon: <Info currentColor={CSSVAR['--color-primary']} />,
    theme: {
      '--color-background': '#1D2A57',
      '--color-primary': '#3b82f6',
      '--color-surface-light': '#223475',
      '--color-border': '#314587',
    },
  },
  success: {
    icon: <Success currentColor={CSSVAR['--color-primary']} />,
    theme: {
      '--color-background': '#19351e',
      '--color-primary': '#3aa11c',
      '--color-surface-light': '#26422b',
      '--color-border': '#38553d',
    },
  },

  warning: {
    icon: <Warning currentColor={CSSVAR['--color-primary']} />,
    theme: {
      '--color-background': '#3d2b08',
      '--color-primary': '#c47000',
      '--color-surface-light': '#462000',
      '--color-border': '#5d4a2a',
    },
  },
}

export default function BlockQuote({ content, title, type }: Props) {
  return (
    <ThemeHandler styleConfig={config[type].theme}>
      <div className="bg-background text-text-light relative mt-3 rounded-lg px-6 py-3">
        <div
          className="absolute top-0 left-0 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full p-1"
          style={{
            backgroundColor: themeIntechResting['--color-background'],
          }}
        >
          {config[type].icon}
        </div>
        <div className="text-text-light font-semibold"> {title}</div>
        <Space className="h-2" />
        <div className="text-[90%]">{content}</div>
      </div>
    </ThemeHandler>
  )
}
