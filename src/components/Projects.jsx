import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const webProjectsData = [
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
    tag: "Desktop",
    github: "https://github.com/kavi419/lifeline-blood-link"
  },
  {
    title: "Fixit SL",
    description: "Utility application for quick service requests and issue tracking.",
    tech: ["JavaScript", "CSS"],
    tag: "Frontend",
    github: "https://github.com/kavi419/Fixit-sl",
    link: "https://fixit-sl.vercel.app/"
  },
  {
    title: "Verity Project",
    description: "A comprehensive web-based platform with advanced digital features and scalable architecture.",
    tech: ["JavaScript", "React", "Node.js"],
    tag: "Web App",
    github: "https://github.com/SSMShehan/Verity-Project.git"
  },
  {
    title: "Smart Campus Hub",
    description: "An integrated university management platform designed to streamline student activities and campus administration.",
    tech: ["React", "Express", "MongoDB"],
    tag: "Full-Stack",
    github: "https://github.com/kavi419/smart-campus-hub.git"
  },
  {
    title: "SerendibGo v2",
    description: "A modern tourism and travel web application showcasing the beauty of Sri Lanka with interactive booking systems.",
    tech: ["Next.js", "TailwindCSS", "PostgreSQL"],
    tag: "Web App",
    github: "https://github.com/Blitz2001/serendibgo_v2.git"
  },
  {
    title: "Charisma AI",
    description: "An intelligent AI-powered conversational agent and virtual assistant platform built for seamless human-computer interaction.",
    tech: ["React", "Python", "OpenAI"],
    tag: "AI / Web",
    github: "https://github.com/kavi419/CharismaAi.git"
  }
];

const mobileProjectsData = [
  {
    title: "Wellness Tracker",
    description: "A feature-rich Android app designed to help users track daily habits, hydration, and emotional well-being with health scores.",
    tech: ["Kotlin", "Android SDK", "Material 3"],
    tag: "Mobile App",
    github: "https://github.com/kavi419/Wellness-Tracker.git"
  },
  {
    title: "MySmartPOS",
    description: "Point of Sale & Inventory Management Android application for retail businesses with real-time billing and stock control.",
    tech: ["Kotlin", "Compose", "Firebase"],
    tag: "Mobile App",
    github: "https://github.com/kavi419/MySmartPOS.git"
  },
  {
    title: "Viraj Cash App",
    description: "Secure cash management and expense tracking mobile application for daily personal and business financial monitoring.",
    tech: ["Kotlin", "Android", "Finance"],
    tag: "Mobile App",
    github: "https://github.com/kavi419/Viraj-Cash-App.git"
  },
  {
    title: "MyHelth App",
    description: "Comprehensive personal health ecosystem designed to build healthy lifestyle habits with nutrition and fitness tracking.",
    tech: ["Kotlin", "Android SDK", "Health Tech"],
    tag: "Mobile App",
    github: "https://github.com/kavi419/MyHelth_App.git"
  },
  {
    title: "NexBus",
    description: "Smart commuting app featuring real-time bus tracking, route planning, and live schedules for stress-free transport.",
    tech: ["Kotlin", "Google Maps", "API"],
    tag: "Mobile App",
    github: "https://github.com/kavi419/NexBus.git"
  },
  {
    title: "Pet Mate App",
    description: "All-in-one pet care and marketplace Android application connecting pet owners with health tracking and supplies.",
    tech: ["Kotlin", "Android SDK", "Marketplace"],
    tag: "Mobile App",
    github: "https://github.com/kavi419/Pet_Mate-App.git"
  }
];

const ProjectCard = ({ project, index, activeCategory }) => {
  const isWeb = activeCategory === 'web';
  
  const badgeHover = isWeb 
    ? 'group-hover:border-emerald-500/50 group-hover:text-emerald-600 group-hover:bg-emerald-500/10' 
    : 'group-hover:border-purple-500/50 group-hover:text-purple-600 group-hover:bg-purple-500/10';
    
  const titleHover = isWeb ? 'group-hover:text-emerald-600' : 'group-hover:text-purple-600';
  
  const techHover = isWeb 
    ? 'group-hover:bg-emerald-500/10 group-hover:text-emerald-700' 
    : 'group-hover:bg-purple-500/10 group-hover:text-purple-700';
    
  const iconHover = isWeb ? 'hover:text-emerald-600' : 'hover:text-purple-600';
  
  const numberHover = isWeb ? 'group-hover:text-emerald-500/20' : 'group-hover:text-purple-500/20';

  return (
    <div className="group relative w-[85vw] sm:w-[400px] h-[500px] flex-shrink-0 flex flex-col justify-between p-8 rounded-3xl bg-black/5 backdrop-blur-xl border border-black/10 hover:border-black/20 transition-all duration-500 hover:-translate-y-4 hover:bg-black/10 cursor-pointer shadow-sm hover:shadow-xl">
      
      {/* Index Number */}
      <div className={`absolute -top-6 -right-4 md:-right-8 text-[120px] leading-none font-black text-black/5 transition-all duration-500 select-none pointer-events-none z-0 group-hover:-translate-y-6 group-hover:scale-110 ${numberHover}`}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Top Section */}
      <div className="relative z-10">
        <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] border border-black/20 text-black/70 rounded-full transition-colors duration-500 ${badgeHover}`}>
          {project.tag}
        </span>
        <h3 className={`text-2xl font-black text-black mt-8 tracking-tight transition-colors duration-500 ${titleHover}`}>
          {project.title}
        </h3>
        <p className="text-black/60 mt-4 text-sm leading-relaxed group-hover:text-black/90 transition-colors duration-500 line-clamp-4">
          {project.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span 
              key={i} 
              className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-black/5 text-black/80 rounded transition-all duration-500 translate-y-0 group-hover:-translate-y-1 ${techHover}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-black/10 group-hover:border-black/20 transition-colors duration-500">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer" 
              className={`p-2 bg-black/5 rounded-full text-black/50 hover:bg-black/10 hover:scale-110 transition-all duration-300 ${iconHover}`}
            >
              <Github size={20} />
            </a>
          )}
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer" 
              className={`p-2 bg-black/5 rounded-full text-black/50 hover:bg-black/10 hover:scale-110 transition-all duration-300 ${iconHover}`}
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('web');
  const targetRef = useRef(null);
  const activeProjects = activeCategory === 'web' ? webProjectsData : mobileProjectsData;

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative z-30 h-[400vh] bg-white">
      
      {/* Sticky view that pins to the screen */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-t border-black/5">
        
        {/* Dynamic Background Glow for White Theme */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-15 pointer-events-none transition-colors duration-1000 ${activeCategory === 'web' ? 'bg-emerald-300' : 'bg-purple-300'}`} />

        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="absolute top-12 md:top-16 left-0 w-full px-6 flex flex-col md:flex-row items-center justify-between gap-6 z-20 max-w-7xl mx-auto right-0"
        >
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none text-black tracking-widest md:tracking-[0.08em]" style={{ fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}>
              FEATURED WORK
            </h2>
            <p className="text-black/50 text-xs md:text-sm max-w-xl mt-2 font-mono">
              Scroll down to explore horizontally
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Switcher Pill */}
            <div className="flex bg-black/5 p-1.5 rounded-full backdrop-blur-md border border-black/10">
              <button
                onClick={() => setActiveCategory('web')}
                className={`relative px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === 'web' ? 'text-white' : 'text-black/60 hover:text-black'
                }`}
              >
                {activeCategory === 'web' && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-emerald-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">Web Ecosystem</span>
              </button>
              <button
                onClick={() => setActiveCategory('mobile')}
                className={`relative px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === 'mobile' ? 'text-white' : 'text-black/60 hover:text-black'
                }`}
              >
                {activeCategory === 'mobile' && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-purple-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">Mobile Apps</span>
              </button>
            </div>

            {/* GitHub Header Button */}
            <a 
              href="https://github.com/kavi419" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/10 bg-black/5 hover:bg-black/10 text-xs font-bold uppercase tracking-widest text-black/70 hover:text-black transition-all shadow-sm hover:shadow-md"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>

        {/* Horizontal Scrolling Track */}
        <div className="flex items-center mt-32 md:mt-40 relative z-10">
          <motion.div 
            style={{ x }} 
            className="flex gap-8 px-[10vw] md:px-[20vw]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex gap-8"
              >
                {activeProjects.map((project, index) => (
                  <motion.div 
                    key={project.title}
                    initial={{ opacity: 0, x: 100, rotateY: -15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: index < 3 ? index * 0.15 + 0.3 : 0 }}
                  >
                    <ProjectCard project={project} index={index} activeCategory={activeCategory} />
                  </motion.div>
                ))}

                {/* Final GitHub Explore Card */}
                <motion.a 
                  href="https://github.com/kavi419" 
                  target="_blank" 
                  rel="noreferrer"
                  initial={{ opacity: 0, x: 100, rotateY: -15 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                  className="group relative w-[85vw] sm:w-[400px] h-[500px] flex-shrink-0 flex flex-col justify-center items-center p-8 rounded-3xl bg-black/5 backdrop-blur-xl border border-black/10 hover:border-black/20 transition-all duration-500 hover:-translate-y-4 hover:bg-black/10 cursor-pointer shadow-sm hover:shadow-xl text-decoration-none"
                >
                  <Github size={80} className={`mb-8 transition-colors duration-500 ${activeCategory === 'web' ? 'text-black/10 group-hover:text-emerald-500/80' : 'text-black/10 group-hover:text-purple-500/80'}`} />
                  <h3 className={`text-2xl font-black text-black tracking-tight transition-colors duration-500 text-center ${activeCategory === 'web' ? 'group-hover:text-emerald-600' : 'group-hover:text-purple-600'}`}>
                    Explore More<br/>on GitHub
                  </h3>
                  <p className="text-black/50 mt-4 text-sm text-center leading-relaxed max-w-[250px] group-hover:text-black/70 transition-colors">
                    Check out my full portfolio of open source projects and contributions.
                  </p>
                  
                  <div className={`mt-8 px-6 py-2 rounded-full border border-black/10 text-xs font-bold uppercase tracking-widest transition-colors ${activeCategory === 'web' ? 'group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:text-emerald-700' : 'group-hover:bg-purple-500/10 group-hover:border-purple-500/30 group-hover:text-purple-700'}`}>
                    View Profile
                  </div>
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default Projects;
