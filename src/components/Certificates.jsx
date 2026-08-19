import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Certificates = () => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax for the main certificate box
  const boxY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);
  
  // Unique 3D Objects Parallax - Brighter and more numerous
  const obj1Y = useTransform(scrollYProgress, [0, 1], ["100%", "-80%"]);
  const obj2Y = useTransform(scrollYProgress, [0, 1], ["-20%", "100%"]);
  const obj3Y = useTransform(scrollYProgress, [0, 1], ["30%", "-120%"]);
  const obj4Y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);

  return (
    <section ref={ref} id="certificates" className="py-24 px-6 max-w-6xl mx-auto relative">
      
      {/* Unique Floating Geometric Shapes for Certificates */}
      <motion.div 
        style={{ y: obj1Y }}
        className="absolute top-1/4 left-10 w-40 h-40 border-l-[3px] border-t-[3px] border-emerald-500/50 rounded-tl-[100px] pointer-events-none hidden md:block shadow-[0_0_20px_rgba(16,185,129,0.2)]"
      />
      <motion.div 
        style={{ y: obj2Y }}
        animate={{ rotate: [0, -180, -360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 right-20 w-32 h-32 border-4 border-double border-purple-500/60 rounded-full pointer-events-none hidden md:block shadow-[0_0_25px_rgba(168,85,247,0.3)]"
      />
      <motion.div 
        style={{ y: obj3Y }}
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-1/4 w-16 h-16 border-2 border-cyan-400/40 rounded-lg pointer-events-none hidden md:block backdrop-blur-sm"
      />
      <motion.div 
        style={{ y: obj4Y }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-[20%] w-8 h-8 bg-emerald-400/60 rounded-full pointer-events-none hidden md:block blur-[1px] shadow-[0_0_15px_rgba(16,185,129,0.5)]"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 w-full"
      >
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">Certifications.</h2>
          <p className="text-gray-400">Professional milestones and specialized training paths.</p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          style={{ y: boxY }}
          className="glass p-12 rounded-3xl flex flex-col items-center justify-center text-center relative z-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden group border border-white/20 max-w-2xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Award className="text-gray-400 group-hover:text-emerald-400 transition-colors duration-500 mb-6 drop-shadow-md" size={64} />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
          <p className="text-gray-400 max-w-md">
            This section is currently being updated. I will be adding my verified certificates and achievements here shortly.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Certificates;
