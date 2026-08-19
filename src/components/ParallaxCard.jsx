import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxCard = ({ children, zIndex, bgClass = "bg-white" }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      setHeight(entries[0].borderBoxSize[0]?.blockSize || entries[0].contentRect.height);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  // If card is taller than screen, stick it when its bottom hits the screen bottom.
  // If shorter, stick it at the top.
  const stickyTop = height > windowHeight ? windowHeight - height : 0;

  // Track this specific card's position to trigger the scale/darken effect
  // "end end": Bottom of card reaches bottom of viewport (it becomes sticky)
  // "end start": Bottom of card reaches top of viewport (next card has fully covered it)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div 
      ref={ref} 
      className="sticky w-full flex flex-col"
      style={{ 
        zIndex,
        top: `${stickyTop}px`,
        minHeight: '100vh'
      }}
    >
      <motion.div 
        style={{ scale, opacity }} 
        className={`w-full flex-1 origin-top shadow-[0_-30px_60px_rgba(0,0,0,0.6)] overflow-hidden ${bgClass}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxCard;
