import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  active?: boolean
  bigHeader: boolean
  id: string
  children: ReactNode
}

export const anchorOffset = -64

export default function TableSectionHeader({
  bigHeader,
  children,
  active,
  id,
}: Props) {
  const bigHeaderClasses = 'mt-2'
  const subHeaderClasses = 'ml-4 text-[80%] leading-normal'
  // temp
  // const { lenis } = useContext(scrollContext)

  // const onClick: MouseEventHandler = useCallback(
  //   (event) => {
  //     event.preventDefault()
  //     const associatedElement = document.getElementById(id)
  //     if (associatedElement) {
  //       lenis?.scrollTo(associatedElement, {
  //         lock: true,
  //         lerp: 0.1,
  //         offset: anchorOffset,
  //       })
  //     }
  //   },
  //   [lenis],
  // )

  return (
    <a
      // onClick={onClick}
      href={`#${id}`}
      className={twMerge(
        'hover:text-text-light block transition-colors duration-200',
        bigHeader ? bigHeaderClasses : subHeaderClasses,
        active ? 'text-primary!' : '',
      )}
    >
      {children}
    </a>
  )
}
