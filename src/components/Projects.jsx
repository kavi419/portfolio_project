import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projectsData = [
  {
    title: "Meat Mart E-Commerce",
    description: "A full-stack e-commerce web application for an online meat store with inventory management, real-time cart, and staff dashboard.",
    tech: ["PHP", "MySQL", "JavaScript"],
    tag: "Full-Stack",
    github: "#"
  },
  {
    title: "Cosmos SL",
    description: "Modern digital platform built for scale. Hosted on Vercel with high performance.",
    tech: ["JavaScript", "Vercel", "Web"],
    tag: "Frontend",
    github: "#",
    link: "https://cosmos-sl.vercel.app/"
  },
  {
    title: "Cyber Guard SL",
    description: "Security-focused application emphasizing robust web architecture and clean UI.",
    tech: ["JavaScript", "Security"],
    tag: "Frontend",
    github: "#",
    link: "https://cyber-guard-sl.vercel.app/"
  },
  {
    title: "MediFind LK",
    description: "Healthcare discovery platform linking patients with medical resources in Sri Lanka.",
    tech: ["React", "Node.js", "MongoDB"],
    tag: "Web App",
    github: "#",
    link: "https://medifind-lk.vercel.app/"
  },
  {
    title: "Lifeline Blood Link",
    description: "A Java-based system for managing blood donation campaigns and donor records efficiently.",
    tech: ["Java", "OOP", "MySQL"],
    tag: "Desktop/Core",
    github: "#"
  },
  {
    title: "Fixit SL",
    description: "Utility application for quick service requests and issue tracking.",
    tech: ["JavaScript", "CSS"],
    tag: "Frontend",
    github: "#",
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

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative flex flex-col justify-between p-8 md:p-10 bg-white border border-gray-200 rounded-3xl hover:bg-black transition-colors duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-16">
        <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest border border-gray-900 text-gray-900 rounded-full group-hover:border-white group-hover:text-white transition-colors duration-500">
          {project.tag}
        </span>
        <div className="flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:!text-emerald-500 group-hover:text-white transition-all duration-500 group-hover:-translate-y-1">
              <Github size={24} />
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:!text-emerald-500 group-hover:text-white transition-all duration-500 group-hover:-translate-y-1">
              <ExternalLink size={24} />
            </a>
          )}
        </div>
      </div>

      {/* Middle Section */}
      <div>
        <h3 className="text-3xl md:text-4xl font-black text-black group-hover:text-white tracking-tight mb-6 transition-colors duration-500">
          {project.title}
        </h3>
        <p className="text-gray-600 group-hover:text-gray-400 text-sm md:text-base leading-relaxed transition-colors duration-500 max-w-sm">
          {project.description}
        </p>
      </div>

      {/* Bottom Section (Tech Stack) */}
      <div className="mt-12 flex flex-wrap gap-2">
        {project.tech.map((tech, i) => (
          <span 
            key={i} 
            className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 bg-gray-100 text-gray-600 group-hover:bg-white/10 group-hover:text-gray-300 rounded transition-colors duration-500"
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
    <section id="projects" className="relative w-full bg-white z-20 pt-32 pb-32">
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-6"
      >
        
        {/* Brutalist Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <motion.div variants={itemVariants}>
            <h2 className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-black uppercase leading-none text-black tracking-widest md:tracking-[0.1em] ml-2" style={{ fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}>
              FEATURED WORK
            </h2>
            <p className="text-gray-500 text-sm md:text-lg max-w-2xl mt-6 font-mono">
              A curated selection of my software projects.
            </p>
          </motion.div>
          
          <motion.a 
            variants={itemVariants}
            href="https://github.com/kavi419" 
            target="_blank" 
            rel="noreferrer"
            className="mt-8 md:mt-0 group flex items-center gap-2 text-black font-bold tracking-widest uppercase hover:text-emerald-500 transition-colors"
          >
            View GitHub 
            <ExternalLink size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </motion.a>
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
