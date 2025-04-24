import { motion, Variants } from 'framer-motion'

interface Props {
  isOpen: boolean
  isHover: boolean
}

export default function TargetIcon({ isHover, isOpen }: Props) {
  const transition = {
    duration: 0.2,
    ease: 'easeOut',
  }
  const linesVariants: Variants = {
    dots: (isFirstDot: boolean) => ({
      x: isFirstDot ? -7 : 7,
      height: '4px',
      width: '4px',
      rotateZ: 0,
      transition,
    }),
    cross: (isFirstLine: boolean) => ({
      x: 0,
      height: '22px',
      width: '3px',
      rotateZ: isFirstLine ? '45deg' : '-45deg',
      transition,
    }),
    hover: (isFirstDot: boolean) => ({
      x: isFirstDot ? -7 : 7,
      height: '8px',
      width: '4px',
      rotateZ: 0,
      transition,
    }),
  }

  const middleVariant: Variants = {
    default: {
      height: '4px',
    },
    hover: {
      height: '8px',
    },
  }

  return (
    <motion.div
      transition={{ ease: 'easeIn', duration: 0.3 }}
      className="relative flex size-8 items-center justify-center"
    >
      <motion.div
        initial={false}
        variants={linesVariants}
        animate={isOpen ? 'cross' : isHover ? 'hover' : 'dots'}
        custom={true}
        className="bg-text-light absolute rounded-md"
      />
      <motion.div
        variants={middleVariant}
        animate={isHover && !isOpen ? 'hover' : 'default'}
        className="bg-text-light absolute size-1 rounded-md"
        transition={transition}
      />
      <motion.div
        initial={false}
        animate={isOpen ? 'cross' : isHover ? 'hover' : 'dots'}
        variants={linesVariants}
        custom={false}
        className="bg-text-light absolute rounded-md"
      />
    </motion.div>
  )
}
