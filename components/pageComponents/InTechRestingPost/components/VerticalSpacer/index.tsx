import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export const spaceContainerClasses = 'grid gap-y-6'
export const spaceClasses = 'h-6'

export function BlogStyles({ children }: { children: ReactNode }) {
  return (
    <div className="text-[1.05rem] leading-[1.8]">
      <VerticalSpaceContainer>{children}</VerticalSpaceContainer>
    </div>
  )
}

export function VerticalSpaceContainer({ children }: { children: ReactNode }) {
  return <div className={spaceContainerClasses}>{children}</div>
}

export function VerticalSpace({ times = 1 }: { times?: number }) {
  return (
    <>
      {Array.from({ length: times }).map((_, index) => (
        <span key={index} className={twMerge('block', spaceClasses)} />
      ))}
    </>
  )
}
