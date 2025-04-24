import { themeIntechResting } from '@/components/pageComponents/ThemeHandler/constants'
import MenuIcon from '../MenuIcon'

interface Props {
  isOpen: boolean
  toggle: () => void
}

export default function MenuButton({ isOpen, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="border-border-active absolute top-10 right-5 z-30 flex size-12 items-center justify-center rounded-full border transition-colors min-sm:hidden"
      style={{
        backgroundColor: isOpen
          ? themeIntechResting['--color-background-dark']
          : themeIntechResting['--color-background'],
      }}
    >
      <div className="scale-130">
        <MenuIcon isOpen={isOpen} isHover={false} />
      </div>
    </button>
  )
}
