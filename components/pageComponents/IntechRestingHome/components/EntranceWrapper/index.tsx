'use client'
import { HTMLMotionProps, motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props extends HTMLMotionProps<'div'> {
  children: React.ReactNode
}

export const transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
}

export const entranceState = {
  opacity: 0,
  transform: 'translateY(2rem)',
}

export const exitState = {
  opacity: 1,
  transform: 'translateY(0rem)',
}

export default function EntranceWrapper({ children, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={entranceState}
      animate={isInView ? exitState : entranceState}
      transition={{ ...transition, ...props.transition }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
