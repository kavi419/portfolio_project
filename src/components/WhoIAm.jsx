import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

import { certificatesData } from './Certificates';

// CountUp Component for animated numbers
const CountUp = ({ end, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

// Interactive 3D Wireframe Node
const SpinningShape = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[2, 1]} scale={0.85}>
      <meshBasicMaterial color="#1a1a1a" wireframe={true} />
    </Icosahedron>
  );
};

const TechNode3D = () => (
  <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing rounded-[2rem] overflow-hidden pointer-events-auto">
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      {/* Lights aren't strictly needed for BasicMaterial, but good for future changes */}
      <ambientLight intensity={0.5} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      <SpinningShape />
    </Canvas>
  </div>
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4 // Wait for the card to slide up before showing content
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Minimalist Stat Item
const StatItem = ({ endCount, subtitle }) => (
  <motion.div
    variants={statVariants}
    className="flex-1 flex flex-col items-center justify-center p-8 group cursor-pointer border-t md:border-t-0 md:border-l border-gray-200 first:border-0"
  >
    <h3 className="text-5xl lg:text-6xl font-light text-gray-900 mb-2 transition-transform duration-300 group-hover:-translate-y-2">
      <CountUp end={endCount} />
    </h3>
    <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase text-center group-hover:text-gray-600 transition-colors duration-300">
      {subtitle}
    </p>
  </motion.div>
);

const WhoIAm = () => {
  const certCount = certificatesData.length > 0 ? certificatesData.length - 1 : 0;

  return (
    <section id="whoiam" className="relative w-full bg-white z-10 pt-32 pb-32">
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        {/* Elegant Minimalist Title */}
        <motion.div variants={itemVariants} className="mb-24 flex justify-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.4em] md:tracking-[0.8em] text-gray-900 uppercase ml-[0.4em] md:ml-[0.8em]">
            Who I Am
          </h2>
        </motion.div>

        {/* Top Container: Bio and Visual Box */}
        <div className="flex flex-col lg:flex-row gap-16 mb-24 items-stretch">
          
          {/* Left Side: Editorial Bio */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="text-gray-800 text-2xl md:text-3xl lg:text-4xl leading-[1.6] font-light mb-8">
              I am a passionate <span className="font-semibold text-black">Full Stack Developer</span> and third-year IT undergraduate at SLIIT, crafting scalable digital solutions.
            </p>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light max-w-xl">
              I continuously improve my skills through hands-on projects, certifications, and modern software engineering practices. My goal is to become a professional Software Engineer specializing in Full Stack Development, Cloud Computing, and AI-powered applications.
            </p>
          </motion.div>

          {/* Right Side: Visual Box */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2 bg-gray-50 rounded-[2rem] min-h-[300px] lg:min-h-[400px] relative overflow-hidden border border-gray-200 shadow-inner group">
            <TechNode3D />
            
            {/* Elegant Hover Border Animation (Black line) */}
            <span className="absolute top-0 left-0 w-full h-[2px] bg-gray-900 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-20 pointer-events-none" />
            <span className="absolute top-0 right-0 w-[2px] h-full bg-gray-900 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100 ease-out z-20 pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gray-900 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200 ease-out z-20 pointer-events-none" />
            <span className="absolute bottom-0 left-0 w-[2px] h-full bg-gray-900 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-300 ease-out z-20 pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 pointer-events-none">
              <span className="text-gray-900 text-sm tracking-widest uppercase font-bold drop-shadow-md bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">Interact to Rotate</span>
            </div>
          </motion.div>

        </div>

        {/* Bottom Container: Minimalist Stats Row */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row border border-gray-200 rounded-3xl overflow-hidden shadow-sm bg-white"
        >
          <StatItem endCount={10} subtitle="Projects Completed" />
          <StatItem endCount={certCount} subtitle="Certificates Earned" />
          <StatItem endCount={20} subtitle="Technologies Learned" />
          <StatItem endCount={3} subtitle="Years of Learning" />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default WhoIAm;
