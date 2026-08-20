import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projectsData = [
  {
    title: "Meat Mart E-Commerce",
    description: "A full-stack e-commerce web application for an online meat store with inventory management, real-time cart, and staff dashboard.",
    tech: ["PHP", "MySQL", "JavaScript"],
    tag: "Full-Stack",
    github: "https://github.com/kavi419/meat-mart-ecommerce"
  },
  {
    title: "Cosmos SL",
    description: "Modern digital platform built for scale. Hosted on Vercel with high performance.",
    tech: ["JavaScript", "Vercel", "Web"],
    tag: "Frontend",
    github: "https://github.com/kavi419/cosmos-sl",
    link: "https://cosmos-sl.vercel.app/"
  },
  {
    title: "Cyber Guard SL",
    description: "Security-focused application emphasizing robust web architecture and clean UI.",
    tech: ["JavaScript", "Security"],
    tag: "Frontend",
    github: "https://github.com/kavi419/cyber-guard-sl",
    link: "https://cyber-guard-sl.vercel.app/"
  },
  {
    title: "MediFind LK",
    description: "Healthcare discovery platform linking patients with medical resources in Sri Lanka.",
    tech: ["React", "Node.js", "MongoDB"],
    tag: "Web App",
    github: "https://github.com/kavi419/medifind-lk",
    link: "https://medifind-lk.vercel.app/"
  },
  {
    title: "Lifeline Blood Link",
    description: "A Java-based system for managing blood donation campaigns and donor records efficiently.",
    tech: ["Java", "OOP", "MySQL"],
    tag: "Desktop/Core",
    github: "https://github.com/kavi419/lifeline-blood-link"
  },
  {
    title: "Fixit SL",
    description: "Utility application for quick service requests and issue tracking.",
    tech: ["JavaScript", "CSS"],
    tag: "Frontend",
    github: "https://github.com/kavi419/Fixit-sl",
    link: "https://fixit-sl.vercel.app/"
  }
];

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

// 3. Magnetic Button Component
const MagneticButton = ({ children, href, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.4); 
    y.set((e.clientY - cy) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a 
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const ProjectCard = ({ project }) => {
  // 1. 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]); 
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  // 4. Color Reveal (Spotlight) Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Tilt calculation (relative to center)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);

    // Spotlight calculation (relative to top-left)
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col justify-between p-8 md:p-10 bg-white border border-gray-200 rounded-3xl hover:bg-[#050505] transition-colors duration-500 cursor-pointer shadow-sm hover:shadow-2xl"
    >
      {/* Dynamic Emerald Spotlight Reveal */}
      <motion.div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 rounded-3xl"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.15), transparent 80%)`
        }}
      />

      {/* Top Section */}
      <div className="relative z-10 flex justify-between items-start mb-16" style={{ transform: "translateZ(30px)" }}>
        <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest border border-gray-900 text-gray-900 rounded-full group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white transition-colors duration-500">
          {project.tag}
        </span>
        <div className="flex gap-4">
          {project.github && (
            <a 
              href={project.github} 
              target={project.github === '#' ? '_self' : '_blank'} 
              rel="noreferrer" 
              onClick={(e) => {
                e.stopPropagation();
                if (project.github === '#') {
                  e.preventDefault();
                  alert("GitHub repository link coming soon!");
                }
              }}
              className="text-gray-400 hover:!text-emerald-500 group-hover:text-gray-300 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110"
            >
              <Github size={24} />
            </a>
          )}
          {project.link && (
            <a 
              href={project.link} 
              target={project.link === '#' ? '_self' : '_blank'} 
              rel="noreferrer" 
              onClick={(e) => {
                e.stopPropagation();
                if (project.link === '#') {
                  e.preventDefault();
                }
              }}
              className="text-gray-400 hover:!text-emerald-500 group-hover:text-gray-300 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110"
            >
              <ExternalLink size={24} />
            </a>
          )}
        </div>
      </div>

      {/* Middle Section */}
      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <h3 className="text-3xl md:text-4xl font-black text-black group-hover:text-white tracking-tight mb-6 transition-colors duration-500">
          {project.title}
        </h3>
        <p className="text-gray-600 group-hover:text-gray-400 text-sm md:text-base leading-relaxed transition-colors duration-500 max-w-sm">
          {project.description}
        </p>
      </div>

      {/* Bottom Section (Tech Stack with Staggered Jump) */}
      <div className="relative z-10 mt-12 flex flex-wrap gap-2" style={{ transform: "translateZ(20px)" }}>
        {project.tech.map((tech, i) => (
          <span 
            key={i} 
            className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 bg-gray-100 text-gray-600 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 rounded transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
            style={{ transitionDelay: `${i * 75}ms` }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative w-full bg-white z-20 pt-16 pb-32" style={{ perspective: "1000px" }}>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-6"
      >
        
        {/* Brutalist Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div variants={itemVariants}>
            <h2 className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-black uppercase leading-none text-black tracking-widest md:tracking-[0.1em] ml-2" style={{ fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}>
              FEATURED WORK
            </h2>
            <p className="text-gray-500 text-sm md:text-lg max-w-2xl mt-6 font-mono">
              A curated selection of my software projects.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <MagneticButton 
              href="https://github.com/kavi419" 
              className="mt-8 md:mt-0 flex items-center justify-center gap-2 bg-gray-100 hover:bg-black hover:text-emerald-400 text-black font-bold tracking-widest uppercase px-6 py-4 rounded-full transition-colors duration-300 shadow-sm"
            >
              View GitHub 
              <ExternalLink size={20} />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        
      </motion.div>
    </section>
  );
};

export default Projects;
