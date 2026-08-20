import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Layout, Terminal, Code2, Globe, Component, Monitor, Smartphone, Server, Cpu, FileCode2, HardDrive, Network, Layers } from 'lucide-react';

// Premium Spotlight Card Component
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl bg-[#050505] border border-white/10 group ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full p-8 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

// Auto-typing Terminal Component
const TerminalTyping = () => {
  const code = `const developer = {
  name: "Kavindu",
  role: "Full-Stack Dev",
  stack: ["React", "Node", "Java"]
};

developer.buildFlawlessExperiences();`;
  
  const [text, setText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < code.length) {
        setText(code.slice(0, i + 1));
        i++;
      } else {
        setTimeout(() => { i = 0; setText(''); }, 5000); // Reset after 5s
      }
    }, 50);
    return () => clearInterval(timer);
  }, [code]);

  return (
    <div className="font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-gray-500">kavindu@macbook:~</span>
      </div>
      {/* Terminal Body */}
      <pre className="text-gray-300 whitespace-pre-wrap min-h-[140px] md:min-h-[120px] lg:min-h-[150px]">
        <code className="text-emerald-400">{text}</code>
        <span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-pulse align-middle" />
      </pre>
    </div>
  );
};

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

const BentoGrid = () => {
  return (
    <section id="skills" className="relative w-full bg-black z-20 pt-32 pb-32">
      
      {/* Noise Background Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        {/* Brutalist Title */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-black uppercase leading-none text-white tracking-widest md:tracking-[0.1em] ml-2" style={{ fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}>
            MINDSET & CRAFT
          </h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mt-6 font-mono">
            A look into my professional background and core stack.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-[250px]">
          
          {/* Card 1: Education (Spans 2 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-2 relative">
            <SpotlightCard>
              {/* Marquee Background */}
              <div className="absolute inset-0 z-0 overflow-hidden opacity-5 pointer-events-none flex items-center">
                <motion.div 
                  animate={{ x: [0, -1000] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap font-black text-9xl uppercase"
                  style={{ fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}
                >
                  SLIIT UNDERGRADUATE SLIIT UNDERGRADUATE SLIIT UNDERGRADUATE
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Education</h4>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    BSc (Hons) in Information Technology
                  </h3>
                </div>
                <p className="text-gray-400 text-sm max-w-md">
                  Undergraduate gaining hands-on experience through complex engineering challenges at SLIIT.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 2: Frontend */}
          <motion.div variants={itemVariants}>
            <SpotlightCard>
              {/* Floating Icons Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                <motion.div animate={{ y: [-10, 10, -10], x: [-5, 5, -5], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] right-[15%]">
                  <Component className="w-12 h-12 text-emerald-500" />
                </motion.div>
                <motion.div animate={{ y: [10, -10, 10], x: [5, -5, 5], rotate: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] right-[5%]">
                  <Monitor className="w-10 h-10 text-cyan-500" />
                </motion.div>
                <motion.div animate={{ y: [-5, 5, -5], x: [10, -10, 10], rotate: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[40%] right-[30%]">
                  <Smartphone className="w-8 h-8 text-emerald-300" />
                </motion.div>
              </div>

              <div className="relative z-10">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                  <Layout className="w-10 h-10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Frontend</h3>
                  <p className="text-gray-400 text-sm">React, Next.js, Tailwind, Vue</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 3: Backend */}
          <motion.div variants={itemVariants}>
            <SpotlightCard>
              {/* Floating Icons Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                <motion.div animate={{ y: [-10, 10, -10], x: [-5, 5, -5], rotate: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] right-[10%]">
                  <Server className="w-12 h-12 text-blue-500" />
                </motion.div>
                <motion.div animate={{ y: [10, -10, 10], x: [5, -5, 5], rotate: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] right-[20%]">
                  <Cpu className="w-10 h-10 text-purple-500" />
                </motion.div>
                <motion.div animate={{ y: [-5, 5, -5], x: [10, -10, 10], rotate: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[50%] right-[5%]">
                  <FileCode2 className="w-8 h-8 text-blue-300" />
                </motion.div>
              </div>

              <div className="relative z-10">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                  <Terminal className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Backend</h3>
                  <p className="text-gray-400 text-sm">Node.js, PHP, Java, Kotlin</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 4: Location (Spans 1 col) */}
          <motion.div variants={itemVariants}>
            <SpotlightCard className="overflow-hidden group">
              {/* Premium Map Dot Grid Background */}
              <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                  <Globe className="w-10 h-10 text-emerald-500/60 mb-4 group-hover:text-emerald-400 transition-colors duration-300" />
                </motion.div>
                <div>
                  <h4 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Location</h4>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white">Sri Lanka</h3>
                    {/* Advanced Radar Ping */}
                    <div className="relative flex items-center justify-center h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-emerald-400/40" style={{ animationDuration: '2s' }}></span>
                      <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-emerald-400/20" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                    </div>
                  </div>
                  <p className="text-emerald-500/80 text-xs font-medium">Available for remote work</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 5: Databases */}
          <motion.div variants={itemVariants}>
            <SpotlightCard>
              {/* Floating Icons Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                <motion.div animate={{ y: [-8, 8, -8], x: [5, -5, 5], rotate: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] right-[10%]">
                  <HardDrive className="w-10 h-10 text-purple-500" />
                </motion.div>
                <motion.div animate={{ y: [10, -10, 10], x: [-5, 5, -5], rotate: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] right-[5%]">
                  <Network className="w-8 h-8 text-fuchsia-400" />
                </motion.div>
                <motion.div animate={{ y: [-5, 5, -5], x: [10, -10, 10], rotate: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[45%] right-[25%]">
                  <Layers className="w-6 h-6 text-purple-300" />
                </motion.div>
              </div>

              <div className="relative z-10">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}>
                  <Database className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Databases</h3>
                  <p className="text-gray-400 text-sm">MySQL, PostgreSQL, MongoDB</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 6: Terminal Code (Spans 2 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <SpotlightCard className="bg-[#020202]">
              <TerminalTyping />
            </SpotlightCard>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default BentoGrid;
