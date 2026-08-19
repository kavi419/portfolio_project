import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const roles = [
  "FULL-STACK DEVELOPER",
  "SOFTWARE ENGINEER",
  "MOBILE APP DEVELOPER",
  "QA ENGINEER",
  "DEVOPS ENGINEER"
];

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    
    const timer = setTimeout(() => {
      if (!isDeleting && currentText === role) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setCurrentText(prev => 
          isDeleting 
            ? role.substring(0, prev.length - 1) 
            : role.substring(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <section className="sticky top-0 w-full h-screen bg-black overflow-hidden flex flex-col justify-between z-0">
      
      {/* Top Bar */}
      <div className="w-full px-8 py-8 flex justify-between items-center z-10">
        <div 
          className="text-white font-bold text-2xl tracking-widest uppercase"
          style={{ transform: 'scaleX(-1)', display: 'inline-block' }}
        >
          KAVINDU
        </div>
        <div className="flex flex-col gap-[6px] cursor-pointer group p-2">
          <div className="w-8 h-[2px] bg-white transition-all group-hover:w-6" />
          <div className="w-8 h-[2px] bg-white transition-all group-hover:w-10" />
        </div>
      </div>

      {/* Main Typography Layout */}
      <div className="flex-1 flex flex-col justify-center w-full max-w-[1920px] mx-auto px-4 md:px-12 lg:px-20 -mt-10 relative">
        
        {/* First Line */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-2 md:mb-0 relative">
          <h1 className="text-[10vw] md:text-[9vw] lg:text-[10vw] font-black uppercase leading-none text-white origin-left whitespace-nowrap" style={{ fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}>
            HI ! I'M KAVINDU
          </h1>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 max-w-[200px] text-right">
            <p className="text-[#a0a0a0] text-xs leading-relaxed font-sans">
              Available for Internships & Full-time roles. Currently an IT Undergraduate at SLIIT.
            </p>
          </div>
        </div>

        {/* Second Line */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mt-4 md:mt-8 relative">
          <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 max-w-[200px] text-left z-10">
            <p className="text-[#a0a0a0] text-xs leading-relaxed font-sans">
              Based in Sri Lanka. I craft scalable digital products and focus on writing clean, elegant code.
            </p>
          </div>
          
          <div className="flex-1 flex md:justify-end min-h-[14vw] md:min-h-0 w-full relative z-0">
            <h1 className="text-[7vw] md:text-[6vw] lg:text-[7.5vw] font-black uppercase leading-none text-[#e0e0e0] origin-left md:origin-right whitespace-nowrap" style={{ fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}>
              {currentText}
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[1vw] h-[6vw] bg-white ml-2 align-baseline"
              />
            </h1>
          </div>
        </div>

      </div>

      {/* Bottom See My Work */}
      <div className="w-full pb-8 flex flex-col items-center justify-center gap-4 z-10">
        <span className="text-white text-xs font-bold tracking-[0.2em] uppercase font-sans">See My Work</span>
        <div className="w-[1px] h-12 bg-white/50" />
      </div>

    </section>
  );
};

export default Hero;
