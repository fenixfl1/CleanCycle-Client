import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface MotionComponentProps {
  children: React.ReactNode
  delay?: number
}

const MotionComponent: React.FC<MotionComponentProps> = ({
  delay = 1,
  ...props
}) => {
  const router = useRouter()
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const pageTransition = {
    duration: delay,
  }

  return (
    <AnimatePresence initial presenceAffectsLayout mode="wait">
      <motion.div
        // key={router.route}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  )
}

export default MotionComponent
