import { motion } from 'framer-motion'
import EntranceWrapper, {
  entranceState,
  exitState,
  transition,
} from '../EntranceWrapper/index'

export default function Hero() {
  return (
    <div className="relative">
      <div className="font-junni text-primary text-center text-[18cqw] leading-tight font-black">
        {['I', 'N', 'T', 'E', 'C', 'H', "'"].map((letter, index) => (
          <LetterStaggerEffect key={index} letter={letter} index={index} />
        ))}
        <br />
        <EntranceWrapper transition={{ delay: 0.2 }}>RESTING</EntranceWrapper>
      </div>
      <motion.div
        initial={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' }}
        animate={{ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
          mass: 1,
          delay: 0.75,
        }}
        style={{ backgroundImage: 'url(/profile-picture-no-bg.png)' }}
        className="absolute top-1/2 left-1/2 aspect-6/10 w-[21cqw] rounded-full bg-[#26272B] bg-cover bg-center"
      />
    </div>
  )
}

function LetterStaggerEffect({
  letter,
  index,
}: {
  letter: string
  index: number
}) {
  return (
    <motion.span
      className="inline-block"
      initial={entranceState}
      animate={exitState}
      transition={{
        ...transition,
        delay: index * 0.08,
      }}
    >
      {letter}
    </motion.span>
  )
}
