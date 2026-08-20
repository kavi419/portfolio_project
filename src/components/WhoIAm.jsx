import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { certificatesData } from './Certificates';
import { Github, Linkedin, Mail, Code, Database, Terminal, Cpu, ChevronDown } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const statsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4
    }
  }
};

const statItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// CountUp Component for animated numbers
const CountUp = ({ end, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (value) => {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Minimalist Stat Item for vertical stack
const StatItem = ({ endCount, subtitle }) => (
  <motion.div variants={statItemVariants} className="flex flex-col items-center lg:items-end text-center lg:text-right group">
    <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-1 transition-transform duration-300 group-hover:-translate-y-1 drop-shadow-sm">
      <CountUp end={endCount} />
    </h3>
    <p className="text-gray-500 text-[9px] md:text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase drop-shadow-sm">
      {subtitle}
    </p>
  </motion.div>
);

// Magnetic Icon Component
const MagneticIcon = ({ children, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="p-3 md:p-4 rounded-full bg-white/50 border border-gray-100 hover:bg-black hover:text-white transition-colors duration-300 text-gray-600 shadow-sm backdrop-blur-sm cursor-pointer"
      >
        {children}
      </motion.div>
    </a>
  );
};

// Interactive Photo Component for B&W to Color reveal effect
const InteractivePhoto = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      className="relative w-[240px] sm:w-[300px] md:w-[380px] lg:w-[420px] pointer-events-auto group cursor-crosshair"
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={imgRef}
    >
      <img
        src="/profile-transparent.png"
        alt="Kavindu Amarasooriya (B&W)"
        className="w-full h-auto object-bottom drop-shadow-2xl grayscale transition-all duration-700"
      />
      <img
        src="/profile-transparent.png"
        alt="Kavindu Amarasooriya (Color Reveal)"
        className="absolute top-0 left-0 w-full h-auto object-bottom drop-shadow-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          WebkitMaskImage: isHovered 
            ? `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`
            : 'none',
          maskImage: isHovered 
            ? `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`
            : 'none',
        }}
      />
    </motion.div>
  );
};

const WhoIAm = () => {
  // Mouse tracking for parallax background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax transform layers
  const x1 = useTransform(mouseX, [-1, 1], [-30, 30]);
  const y1 = useTransform(mouseY, [-1, 1], [-30, 30]);
  const x2 = useTransform(mouseX, [-1, 1], [50, -50]);
  const y2 = useTransform(mouseY, [-1, 1], [50, -50]);
  const x3 = useTransform(mouseX, [-1, 1], [-70, 70]);
  const y3 = useTransform(mouseY, [-1, 1], [-70, 70]);
  const x4 = useTransform(mouseX, [-1, 1], [20, -20]);
  const y4 = useTransform(mouseY, [-1, 1], [20, -20]);

  return (
    <section 
      id="whoiam" 
      className="relative w-full bg-white z-10 h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      
      {/* Dynamic Font Import for Signature */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap');`}
      </style>

      {/* BACKGROUND: Parallax Tech Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden md:block">
        <motion.div style={{ x: x1, y: y1 }} className="absolute top-[20%] left-[15%] text-gray-200/50">
           <Code size={100} strokeWidth={1} />
        </motion.div>
        <motion.div style={{ x: x2, y: y2 }} className="absolute top-[70%] left-[30%] text-gray-200/50">
           <Database size={80} strokeWidth={1} />
        </motion.div>
        <motion.div style={{ x: x3, y: y3 }} className="absolute top-[25%] right-[15%] text-gray-200/50">
           <Terminal size={140} strokeWidth={1} />
        </motion.div>
        <motion.div style={{ x: x4, y: y4 }} className="absolute top-[65%] right-[25%] text-gray-200/50">
           <Cpu size={90} strokeWidth={1} />
        </motion.div>
      </div>

      {/* 0. MAGNETIC SOCIAL SIDEBAR (Top Left) */}
      <div className="absolute top-6 md:top-8 left-4 sm:left-10 md:left-16 lg:left-24 flex flex-row gap-3 md:gap-4 z-40 pointer-events-auto">
        <MagneticIcon href="https://github.com"><Github size={20} /></MagneticIcon>
        <MagneticIcon href="https://linkedin.com"><Linkedin size={20} /></MagneticIcon>
        <MagneticIcon href="mailto:contact@kavindu.com"><Mail size={20} /></MagneticIcon>
      </div>

      {/* 1. TOP: Brutalist Title */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}
        className="absolute top-6 md:top-8 left-0 w-full flex justify-center text-center z-20 pointer-events-none"
      >
        <h2 className="text-[10vw] md:text-[6vw] lg:text-[5vw] font-black uppercase leading-none text-black tracking-widest md:tracking-[0.1em]" style={{ fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}>
          WHO I AM
        </h2>
      </motion.div>

      {/* 2. CENTER: Big name text */}
      <div className="absolute top-[32%] md:top-[34%] -translate-y-1/2 left-0 w-full flex flex-row items-center justify-center gap-1 md:gap-3 text-center z-10 pointer-events-none">
         <h1 
            className="text-[7vw] sm:text-[6.5vw] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[8rem] font-black uppercase leading-none text-transparent select-none whitespace-nowrap" 
            style={{ WebkitTextStroke: '2px black', fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}
         >
           KAVINDU
         </h1>
         <h1 
            className="text-[7vw] sm:text-[6.5vw] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[8rem] font-black uppercase leading-none text-black select-none whitespace-nowrap" 
            style={{ fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}
         >
           AMARASOORIYA
         </h1>
      </div>

      {/* 2.5. LEFT: Bio Paragraph & Signature */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}
        className="absolute top-[55%] -translate-y-1/2 left-4 sm:left-10 md:left-24 lg:left-32 xl:left-40 w-[300px] sm:w-[340px] md:w-[380px] z-30 pointer-events-auto"
      >
        <p className="text-gray-900 text-xl md:text-2xl leading-[1.5] font-light mb-4 drop-shadow-sm">
          I am a passionate <span className="font-semibold text-black">Full Stack Developer</span> and third-year IT undergraduate at SLIIT.
        </p>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light mb-8 drop-shadow-sm">
          I continuously improve my skills through hands-on projects, certifications, and modern software engineering practices.
        </p>

        {/* Animated Signature */}
        <motion.div 
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <span 
            className="text-5xl md:text-6xl text-gray-800"
            style={{ fontFamily: "'Mrs Saint Delafield', cursive" }}
          >
            Kavindu A.
          </span>
        </motion.div>
      </motion.div>

      {/* 4. RIGHT: Vertical Stats Row */}
      <motion.div 
        variants={statsContainerVariants}
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        className="absolute bottom-6 md:bottom-10 right-4 sm:right-10 md:right-16 lg:right-24 xl:right-32 flex flex-col gap-4 md:gap-6 z-30 pointer-events-auto"
      >
        <StatItem endCount={10} subtitle="Projects Completed" />
        <StatItem endCount={Math.max(0, certificatesData.length - 1)} subtitle="Certificates Earned" />
        <StatItem endCount={20} subtitle="Technologies Learned" />
        <StatItem endCount={3} subtitle="Years of Learning" />
      </motion.div>

      {/* 3. BOTTOM: Interactive Photo Wrapper */}
      <div className="absolute bottom-4 md:bottom-8 left-0 w-full flex justify-center z-20 pointer-events-none">
        <InteractivePhoto />
      </div>

      {/* 5. BOTTOM: Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-gray-400" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default WhoIAm;
