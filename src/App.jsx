import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import LoadingScreen from './components/LoadingScreen';

import Hero from './components/Hero';
import WhoIAm from './components/WhoIAm';
import BentoGrid from './components/BentoGrid';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import ParallaxCard from './components/ParallaxCard';
import { Github, Linkedin, Mail } from 'lucide-react';

import Sidebar from './components/Sidebar';

const sections = ['hero', 'whoiam', 'skills', 'projects', 'certificates', 'contact'];

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let scrollTimeout;
    let lastScrollY = window.scrollY;

    lenis.on('scroll', (e) => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
        lastScrollY = currentScrollY;

        let targetScroll = -1;
        let minDistance = Infinity;

        // Collect all snap points
        const snapPoints = sections.map(id => {
          const wrapper = document.getElementById(`wrapper-${id}`);
          return wrapper ? wrapper.offsetTop : 0;
        }).filter(pos => pos !== undefined);

        // Find the nearest snap point
        snapPoints.forEach(pos => {
          const distance = Math.abs(pos - currentScrollY);
          if (distance < minDistance) {
            minDistance = distance;
            targetScroll = pos;
          }
        });

        // If the user scrolled with momentum towards the next/prev section, 
        // favor snapping to that section instead of snapping back.
        if (Math.abs(e.velocity) > 0.5) {
          const aheadPoints = snapPoints.filter(pos => 
            scrollDirection > 0 ? pos > currentScrollY : pos < currentScrollY
          );
          
          if (aheadPoints.length > 0) {
            // Find the closest point in the direction of travel
            let closestAhead = aheadPoints[0];
            aheadPoints.forEach(pos => {
              if (Math.abs(pos - currentScrollY) < Math.abs(closestAhead - currentScrollY)) {
                closestAhead = pos;
              }
            });
            
            // If the closest ahead point is reasonably close, snap to it
            if (Math.abs(closestAhead - currentScrollY) < window.innerHeight * 0.8) {
              targetScroll = closestAhead;
              minDistance = Math.abs(targetScroll - currentScrollY);
            }
          }
        }

        // Snap if we are within a reasonable distance (prevents snapping in the middle of a tall section)
        if (targetScroll !== -1 && minDistance > 5 && minDistance < window.innerHeight * 0.6) {
          lenis.scrollTo(targetScroll, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
        }
      }, 150); 
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      clearTimeout(scrollTimeout);
    };
  }, [isLoading]);

  return (
    <div className="bg-black text-gray-100 min-h-screen selection:bg-emerald-500/30 font-sans">
      
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative">
          <Sidebar />

          <main className="relative w-full">
            <ParallaxCard id="wrapper-hero" zIndex={0} bgClass="bg-black">
               <Hero />
            </ParallaxCard>
            
            <ParallaxCard id="wrapper-whoiam" zIndex={10} bgClass="bg-white">
              <WhoIAm />
            </ParallaxCard>

            <ParallaxCard id="wrapper-skills" zIndex={20} bgClass="bg-black">
              <BentoGrid />
            </ParallaxCard>

            <ParallaxCard id="wrapper-projects" zIndex={30} bgClass="bg-white">
              <Projects />
            </ParallaxCard>

            <ParallaxCard id="wrapper-certificates" zIndex={40} bgClass="bg-black">
              <Certificates />
            </ParallaxCard>

            <ParallaxCard id="wrapper-contact" zIndex={50} bgClass="bg-white">
              <Contact />
            </ParallaxCard>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
