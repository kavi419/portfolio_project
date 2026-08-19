import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Trigger the black curve transition instead of unmounting immediately
          setIsLoaded(true);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  // When the curve finishes covering the screen, unmount the loading screen
  const handleTransitionComplete = () => {
    onLoadingComplete();
  };

  return (
    <motion.div
      key="loading-wrapper"
      className="fixed inset-0 z-[200] bg-white text-black flex flex-col items-center justify-center overflow-hidden"
      // Exit animation is instantaneous because the black curve already covers the screen perfectly
      exit={{ opacity: 0, transition: { duration: 0.1 } }} 
    >
      {/* The main white loading screen content */}
      <div className="z-10 flex flex-col items-center justify-center">
        <div className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 relative overflow-hidden text-center px-4">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            KAVINDU AMARASOORIYA.
          </motion.div>
        </div>
        
        <div className="w-48 md:w-64 h-1 bg-gray-200 rounded-full overflow-hidden mt-8">
          <motion.div 
            className="h-full bg-black"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 text-sm text-gray-500 font-mono tracking-widest font-bold">
          {progress}%
        </div>
      </div>

      {/* The Black Curve Transition */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleTransitionComplete}
            className="absolute inset-0 z-20 flex flex-col"
          >
            {/* The Curved Top (using SVG for a smooth curve) */}
            <svg 
              className="w-full h-32 md:h-64 absolute top-0 -translate-y-[99%] left-0" 
              viewBox="0 0 1440 320" 
              preserveAspectRatio="none"
            >
              <path 
                fill="#000000" 
                d="M0,320 C320,100 1120,100 1440,320 Z" 
              ></path>
            </svg>
            {/* The Solid Black Body */}
            <div className="w-full h-[150vh] bg-black"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;
