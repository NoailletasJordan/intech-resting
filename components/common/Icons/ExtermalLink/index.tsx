import { motion, Transition, Variants } from 'framer-motion'
import { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
  currentColor: string
  arrowColorHovered: string
  isHovered: boolean
}

export default function ExternalLink({
  currentColor,
  arrowColorHovered,
  isHovered,
  ...svgProps
}: Props) {
  const arrowVariants: Variants = {
    off: {
      x: 0,
      y: 0,
      stroke: currentColor,
    },
    on: {
      x: 1,
      y: -1,
      stroke: arrowColorHovered,
    },
  }

  const transition: Transition = {
    type: 'spring',
    stiffness: 350,
    damping: 10,
    stroke: { type: 'tween', duration: 0.1 },
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke={currentColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...svgProps}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
      <motion.g
        transition={transition}
        initial={false}
        variants={arrowVariants}
        animate={isHovered ? 'on' : 'off'}
      >
        <path id="arrow-tail" d="M11 13l9 -9" />
        <path id="arrow-head" d="M15 4h5v5" />
      </motion.g>
    </svg>
  )
}
