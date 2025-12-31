import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export type PageFlipDirection = 'forward' | 'backward';

interface PageFlipTransitionProps {
  /** The content of the page to display */
  children: React.ReactNode;
  /** The direction of the page turn */
  direction: PageFlipDirection;
  /** A unique key for the current page to trigger animations */
  pageKey: string | number;
  /** Optional class name for the container */
  className?: string;
  /** Duration of the flip animation in seconds */
  duration?: number;
}

const variants: Variants = {
  enter: (direction: PageFlipDirection) => ({
    rotateY: direction === 'forward' ? 90 : -90,
    opacity: 0,
    scale: 0.95,
    transformOrigin: 'left center',
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transformOrigin: 'left center',
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1.0], // cubic-bezier for smooth paper-like feel
    },
  },
  exit: (direction: PageFlipDirection) => ({
    rotateY: direction === 'forward' ? -90 : 90,
    opacity: 0,
    scale: 0.95,
    transformOrigin: 'left center',
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1.0],
    },
  }),
};

/**
 * PageFlipTransition
 * 
 * A component that animates its children with a 3D page-flip effect resembling a book.
 * It assumes a "spine" on the left side of the container.
 */
export const PageFlipTransition: React.FC<PageFlipTransitionProps> = ({
  children,
  direction,
  pageKey,
  className = '',
  duration = 0.6,
}) => {
  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ 
        perspective: '1200px', 
        transformStyle: 'preserve-3d' 
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={pageKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full bg-white shadow-md origin-left backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Inner content wrapper to ensure content doesn't bleed during 3D transform */}
          <div className="w-full h-full overflow-auto">
            {children}
          </div>
          
          {/* Shadow overlay for depth perception during flip */}
          <motion.div 
            className="absolute inset-0 bg-black pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0.1 }}
            transition={{ duration: duration / 2 }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageFlipTransition;