import { useElementSize } from '@mantine/hooks'
import {
  EventType,
  Rive,
  RiveEventType,
  RiveFile,
  StateMachineInputType,
  useRive,
  UseRiveParameters,
} from '@rive-app/react-canvas'
import { useInView } from 'framer-motion'
import { HTMLAttributes, useEffect, useLayoutEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  handleEvents?: boolean
  artboard: string
  height?: number
  width?: number
  riveFile: RiveFile
  onRiveLoad?: (rive: Rive) => void
  className?: HTMLAttributes<HTMLDivElement>['className']
  id?: string
  riveParams?: UseRiveParameters
}

const STATE_MACHINE = 'main'
export default function Canva({
  handleEvents,
  artboard,
  riveFile,
  onRiveLoad,
  className = '',
  height = 560,
  width = 670,
  id,
  riveParams,
}: Props) {
  const { rive, RiveComponent } = useRive({
    riveFile,
    artboard,
    isTouchScrollEnabled: true,
    stateMachines: STATE_MACHINE,
    ...riveParams,
  })

  const { height: elH, width: elW, ref } = useElementSize()
  const isInView = useInView(ref)

  useEffect(() => {
    if (!rive) return

    if (isInView) {
      rive.play()
    } else {
      rive.pause()
    }
  }, [rive, isInView])

  useLayoutEffect(() => {
    rive?.resizeToCanvas()
  }, [rive, elH, elW])

  const onRiveLoadRef = useRef(onRiveLoad)
  onRiveLoadRef.current = onRiveLoad
  useEffect(() => {
    if (!rive) return
    onRiveLoadRef.current?.(rive)

    return () => {
      rive.cleanup()
    }
  }, [rive])

  useEffect(() => {
    if (!rive || !handleEvents) return

    const inputs = rive.stateMachineInputs(STATE_MACHINE)
    const onRiveEventReceived = (riveEvent: any) => {
      const eventData = riveEvent.data
      if (eventData.type === RiveEventType.General) {
        const [eventName, eventStatus] = (eventData.name as string).split('|')

        const input = inputs.find(({ name }) => name === eventName)

        if (!input) {
          throw new Error(
            `Custom - Input name not found in rivefile: ${eventName}`,
          )
        }
        if (input.type !== StateMachineInputType.Number) {
          throw new Error(`Custom - Input should be a number: ${eventName}`)
        }

        input.value =
          eventStatus === 'on'
            ? (input.value as number) + 1
            : (input.value as number) - 1
      }
    }

    rive.on(EventType.RiveEvent, onRiveEventReceived)

    return () => {
      rive.off(EventType.RiveEvent, onRiveEventReceived)
    }
  }, [rive, handleEvents])

  return (
    <div ref={ref} className={twMerge('size-full', className)}>
      <RiveComponent id={id} width={width} height={height} />
    </div>
  )
}
