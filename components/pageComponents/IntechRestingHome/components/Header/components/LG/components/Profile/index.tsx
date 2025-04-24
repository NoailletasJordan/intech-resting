import { themeIntechResting } from '@/components/pageComponents/ThemeHandler/constants'
import { getLocaledIntechRestingHomeUrl, TLOCALE } from '@/constants'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import locales from '../../../../../../locales'

interface Props {
  currentLocale: TLOCALE
}
export default function ProfileAndTooltip({ currentLocale }: Props) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="mx-auto">
            <Profile currentLocale={currentLocale} />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade rounded-full px-4 py-4 leading-none will-change-[transform,opacity] select-none"
            sideOffset={5}
            style={{
              backgroundColor: themeIntechResting['--color-surface-lighter'],
              color: themeIntechResting['--color-text'],
            }}
            side="bottom"
          >
            {locales[currentLocale].home}
            <Tooltip.Arrow
              style={{ fill: themeIntechResting['--color-surface-lighter'] }}
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

function Profile({ currentLocale }: Props) {
  const { rive, RiveComponent } = useRive({
    src: '/robot-profile-picture.riv',
    autoplay: true,
    artboard: 'profile',
    isTouchScrollEnabled: true,
    stateMachines: 'main',
  })

  const animateInput = useStateMachineInput(rive, 'main', 'animate')
  const [riveIsready, setRiveIsready] = useState(false)
  useEffect(() => {
    setRiveIsready(!!rive)
  }, [rive])

  return (
    <Link
      href={getLocaledIntechRestingHomeUrl(currentLocale)}
      onMouseEnter={() => {
        animateInput?.fire()
      }}
      className="hover:bg-surface-light flex items-center justify-center gap-4 rounded-full p-2 transition-colors"
    >
      <div
        className="size-12 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: riveIsready
            ? undefined
            : 'url(/robot-picture-placeholder.png)',
        }}
      >
        <RiveComponent width={64} height={64} />
      </div>
    </Link>
  )
}
