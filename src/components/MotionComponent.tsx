import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface MotionComponentProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}

const MotionComponent: React.FC<MotionComponentProps> = ({
  delay = 0.5,
  ...props
}) => {
  const router = useRouter();
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const pageTransition = {
    duration: delay,
    type: 'tween',
  };

  return (
    <AnimatePresence initial presenceAffectsLayout mode="wait">
      <motion.div
        key={router.route}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        {...props}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionComponent;
