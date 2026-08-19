import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import WhoIAm from './components/WhoIAm';
import BentoGrid from './components/BentoGrid';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import ParallaxCard from './components/ParallaxCard';
import { Github, Linkedin, Mail } from 'lucide-react';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navOpacity = useTransform(scrollY, [0, windowHeight * 0.8, windowHeight], [0, 0, 1]);
  const navPointerEvents = useTransform(scrollY, [0, windowHeight * 0.8, windowHeight], ["none", "none", "auto"]);

  return (
    <div className="bg-black text-gray-100 min-h-screen selection:bg-emerald-500/30 font-sans">
      <CustomCursor />
      
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative">
          {/* Premium Navbar - Hidden on Hero */}
          <motion.nav 
            style={{ opacity: navOpacity, pointerEvents: navPointerEvents }}
            className="fixed w-full top-0 z-50 glass bg-black/50 border-b-0 border-white/10"
          >
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="font-bold text-xl tracking-tighter text-white">
                KAVINDU<span className="text-emerald-500">.</span>
              </div>
              <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 uppercase tracking-widest">
                <a href="#whoiam" className="hover:text-white transition-colors interactive">Who I Am</a>
                <a href="#skills" className="hover:text-white transition-colors interactive">Skills</a>
                <a href="#projects" className="hover:text-white transition-colors interactive">Projects</a>
                <a href="#certificates" className="hover:text-white transition-colors interactive">Certificates</a>
              </div>
              <a href="#contact" className="hidden md:block px-5 py-2 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-xs tracking-widest uppercase interactive">
                MENU
              </a>
            </div>
          </motion.nav>

          <main className="relative w-full">
            {/* Hero is the base layer, it scales down when WhoIAm slides over it */}
            <ParallaxCard zIndex={0} bgClass="bg-black">
               <Hero />
            </ParallaxCard>
            
            <ParallaxCard zIndex={10} bgClass="bg-white">
              <WhoIAm />
            </ParallaxCard>

            <ParallaxCard zIndex={20} bgClass="bg-black">
              <BentoGrid />
            </ParallaxCard>

            <ParallaxCard zIndex={30} bgClass="bg-white">
              <Projects />
            </ParallaxCard>

            <ParallaxCard zIndex={40} bgClass="bg-black">
              <Certificates />
            </ParallaxCard>

            <ParallaxCard zIndex={50} bgClass="bg-white">
              <Contact />
            </ParallaxCard>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
