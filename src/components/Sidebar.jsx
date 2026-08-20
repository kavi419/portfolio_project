import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code2, Grid, Award, Mail } from 'lucide-react';

const sections = [
  { id: 'hero', theme: 'dark' }, // Hidden on this section, but used for tracking
  { id: 'whoiam', icon: User, label: 'Who I Am', theme: 'light' },
  { id: 'skills', icon: Code2, label: 'Mindset', theme: 'dark' },
  { id: 'projects', icon: Grid, label: 'Work', theme: 'light' },
  { id: 'certificates', icon: Award, label: 'Awards', theme: 'dark' },
  { id: 'contact', icon: Mail, label: 'Contact', theme: 'light' }
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide Sidebar completely if we are at the very top (Hero section)
      if (window.scrollY < window.innerHeight * 0.4) {
        setIsVisible(false);
        setActiveSection('hero');
        return;
      }
      setIsVisible(true);

      const sectionElements = sections.map(s => document.getElementById(s.id));
      let currentActive = 'hero';

      sectionElements.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Since sections slide up and stick, the last one in DOM whose top
        // has crossed the middle of the screen is the visible one.
        if (rect.top < window.innerHeight * 0.5) {
          currentActive = el.id;
        }
      });
      
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeTheme = sections.find(s => s.id === activeSection)?.theme || 'dark';

  const themeStyles = {
    light: {
      // Light theme (Background is White) -> Sidebar should be dark/black elements
      bg: 'rgba(0, 0, 0, 0.05)',
      border: 'rgba(0, 0, 0, 0.1)',
      color: '#000000',
      hoverItemBg: 'rgba(0, 0, 0, 0.08)',
      activeItemBg: 'rgba(0, 0, 0, 0.12)',
    },
    dark: {
      // Dark theme (Background is Black) -> Sidebar should be light/white elements
      bg: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      hoverItemBg: 'rgba(255, 255, 255, 0.1)',
      activeItemBg: 'rgba(255, 255, 255, 0.2)',
    }
  };

  const currentStyles = themeStyles[activeTheme];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          <motion.div
            animate={{
              width: isHovered ? 200 : 64,
              backgroundColor: currentStyles.bg,
              borderColor: currentStyles.border,
            }}
            transition={{ duration: 0.4, ease: "anticipate" }}
            className="rounded-3xl border backdrop-blur-md overflow-hidden flex flex-col py-4 shadow-2xl"
          >
            {sections.filter(s => s.id !== 'hero').map((section) => {
              const isActive = activeSection === section.id;
              
              const handleLinkClick = (e) => {
                e.preventDefault();
                if (window.lenis) {
                  // Prevent App.jsx snapping from hijacking this scroll
                  window.isSidebarScrolling = true;
                  
                  const target = document.getElementById(`wrapper-${section.id}`) || document.getElementById(section.id);
                  if (target) {
                    // Critical Fix: Lenis fails to calculate the correct scroll destination for 'sticky' elements 
                    // because their getBoundingClientRect().top changes while stuck.
                    // We must calculate the true absolute Y position from the document top using offsetTop.
                    let absoluteY = 0;
                    let el = target;
                    while (el) {
                      absoluteY += el.offsetTop;
                      el = el.offsetParent;
                    }

                    window.lenis.scrollTo(absoluteY, { 
                      duration: 1.2,
                    });
                    
                    // Reset flag after animation completes
                    setTimeout(() => {
                      window.isSidebarScrolling = false;
                    }, 1300);
                  } else {
                    window.isSidebarScrolling = false;
                  }
                } else {
                  const el = document.getElementById(section.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              };

              return (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={handleLinkClick}
                  className="relative flex items-center h-14 px-5 cursor-pointer overflow-hidden group"
                  animate={{
                    color: currentStyles.color,
                    backgroundColor: isActive ? currentStyles.activeItemBg : 'transparent'
                  }}
                  whileHover={{
                    backgroundColor: currentStyles.hoverItemBg,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="relative z-10"
                  >
                    <section.icon size={22} className="min-w-[22px]" />
                  </motion.div>
                  
                  <motion.span
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -10,
                    }}
                    transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
                    className="ml-4 font-semibold tracking-wide text-sm whitespace-nowrap relative z-10"
                    style={{ display: isHovered ? "block" : "none" }}
                  >
                    {section.label}
                  </motion.span>

                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                      animate={{ backgroundColor: currentStyles.color }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
