import Button from '@/components/common/Button'
import Space from '@/components/common/Space'
import { languageContext } from '@/contexts/language-context'
import { useElementSize } from '@mantine/hooks'
import { motion, MotionValue, useInView, useMotionValue } from 'framer-motion'
import { use, useEffect, useRef, useState } from 'react'
import { VerticalSpace } from '../../../VerticalSpacer/index'

const SQUARE_SIZE_PX = 40
const ANIMATION_FREQUENCY = 0.015 // Control the speed of oscillation (lower is slower)

const texts = {
  en: {
    title: 'Framerate impact on an animation',
    square1: '60 fps: One update per frame',
    square2: '45 fps',
    square3: '30 fps',
    square4: '15 fps',
    play: 'Play ▶',
    pause: 'Pause ⏸',
  },
  fr: {
    title: 'Impact du framerate sur une animation',
    square1: '60 ips: Update à chaque frame',
    square2: '45 ips',
    square3: '30 ips',
    square4: '15 ips',
    play: 'Lecture ▶',
    pause: 'Pause ⏸',
  },
}

// Helper function to get nearest modulo value
const getNearestModulo = (num: number, mod: number): number => {
  return num % mod === 0 ? num : num - (num % mod)
}

// Square component extracted for reusability
function Square({ x, sizePx }: { sizePx: number; x: MotionValue<number> }) {
  return (
    <motion.div
      style={{ x, width: sizePx, height: sizePx }}
      className="bg-primary"
    />
  )
}

// Custom hook for animation logic
function useOscillatingAnimation(
  containerWidth: number,
  isPlaying: boolean,
  initialFrameCount = 0,
) {
  const x = useMotionValue(0)
  const xFrame1Dot5 = useMotionValue(0)
  const xFrame2 = useMotionValue(0)
  const xFrame4 = useMotionValue(0)
  const frameCount = useRef(initialFrameCount)

  // Initial position setup
  useEffect(() => {
    const oscillatingValue =
      (Math.sin(ANIMATION_FREQUENCY * frameCount.current) + 1) / 2
    const xValue = oscillatingValue * (containerWidth - SQUARE_SIZE_PX)

    x.set(xValue)
    xFrame1Dot5.set(getNearestModulo(xValue, 1.5))
    xFrame2.set(getNearestModulo(xValue, 2))
    xFrame4.set(getNearestModulo(xValue, 4))
    frameCount.current++
  }, [containerWidth])

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return

    let previousTime: number | null = null
    let rafId: number

    const animate = (time: number) => {
      if (previousTime !== null) {
        const oscillatingValue =
          (Math.sin(ANIMATION_FREQUENCY * frameCount.current) + 1) / 2
        const xValue = oscillatingValue * (containerWidth - SQUARE_SIZE_PX)

        x.set(xValue)
        xFrame1Dot5.set(getNearestModulo(xValue, 1.5))
        xFrame2.set(getNearestModulo(xValue, 2))
        xFrame4.set(getNearestModulo(xValue, 4))
        frameCount.current++
      }
      previousTime = time

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafId)
  }, [isPlaying, containerWidth])

  return { x, xFrame1Dot5, xFrame2, xFrame4 }
}

export default function FramerateComparison() {
  const currentLocale = use(languageContext)
  const [isPlaying, setIsPlaying] = useState(false)
  const inViewRef = useRef(null)
  const isInView = useInView(inViewRef)
  const { ref: boxContainerRef, width: boxContainerWidth } = useElementSize()

  const animationIsPlaying = isInView && isPlaying

  const { x, xFrame1Dot5, xFrame2, xFrame4 } = useOscillatingAnimation(
    boxContainerWidth,
    animationIsPlaying,
  )

  const togglePlay = () => setIsPlaying((prev) => !prev)

  return (
    <div>
      <VerticalSpace />
      <div
        ref={inViewRef}
        className="border-border bg-surface-light rounded-md border py-4"
      >
        <div className="mx-5 grid grid-cols-2 gap-x-4 gap-y-6 text-[90%] max-sm:grid-cols-1">
          <div ref={boxContainerRef}>
            <p className="text-center">{texts[currentLocale].square1}</p>
            <Space className="h-2" />
            <Square sizePx={SQUARE_SIZE_PX} x={x} />
          </div>
          <div>
            <p className="text-center">{texts[currentLocale].square2}</p>
            <Space className="h-2" />
            <Square sizePx={SQUARE_SIZE_PX} x={xFrame1Dot5} />
          </div>
          <div>
            <p className="text-center">{texts[currentLocale].square3}</p>
            <Space className="h-2" />
            <Square sizePx={SQUARE_SIZE_PX} x={xFrame2} />
          </div>
          <div>
            <p className="text-center">{texts[currentLocale].square4}</p>
            <Space className="h-2" />
            <Square sizePx={SQUARE_SIZE_PX} x={xFrame4} />
          </div>
        </div>
        <Space className="h-8" />
        <div className="flex justify-center gap-4">
          <Button onClick={togglePlay}>
            {isPlaying ? texts[currentLocale].pause : texts[currentLocale].play}
          </Button>
        </div>
      </div>
      <div className="text-[80%]">*{texts[currentLocale].title}</div>
      <VerticalSpace />
    </div>
  )
}
