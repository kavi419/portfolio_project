import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, ArrowRight, X, ExternalLink } from 'lucide-react';

export const awsCertificates = [
  { id: 'aws1', title: "AWS Cloud Practitioner Essentials", issuer: "AWS Training & Certification", date: "Sept 2026", type: "aws", link: "/certificates/aws/121fbced-623f-40b4-8357-d994e8e52e3a.pdf" },
  { id: 'aws2', title: "AWS Compute Services Overview", issuer: "AWS Training & Certification", date: "Sept 2026", type: "aws", link: "/certificates/aws/e258d571-9e77-4f44-9ef1-130865bc9bdd.pdf" },
  { id: 'aws3', title: "AWS Command Line Interface (AWS CLI) Getting Started", issuer: "AWS Training & Certification", date: "Sept 2026", type: "aws", link: "/certificates/aws/ef909b46-014e-40e7-9429-0a9e5dbf3671.pdf" },
  { id: 'aws4', title: "Amazon Data Firehose Getting Started", issuer: "AWS Training & Certification", date: "Sept 2026", type: "aws", link: "/certificates/aws/0d746456-dac3-4d7a-9e98-b87e4ba4687e.pdf" },
  { id: 'aws5', title: "Amazon Kinesis Data Streams - Getting Started", issuer: "AWS Training & Certification", date: "Sept 2026", type: "aws", link: "/certificates/aws/5b8309e4-0d58-4a19-8886-5daa1f79ce57.pdf" },
  { id: 'aws6', title: "Amazon OpenSearch Service Getting Started", issuer: "AWS Training & Certification", date: "Sept 2026", type: "aws", link: "/certificates/aws/78394cfc-98d8-4d2a-9908-28da8f34868f.pdf" },
  { id: 'aws7', title: "Fundamentals of Generative AI", issuer: "AWS Training & Certification", date: "Sept 2026", type: "aws", link: "/certificates/aws/c8a6b96b-3f3b-4d91-b7ff-ecf82aadb1f3.pdf" },
  { id: 'aws8', title: "Getting Started with Amazon Augmented AI", issuer: "AWS Training & Certification", date: "Sept 2026", type: "aws", link: "/certificates/aws/43f5207f-27f6-41da-8497-09f8a8c9ada4.pdf" },
];

export const aiCertificates = [
  { id: 'ai1', title: "AI/ML Engineer - Stage 1", issuer: "SLIIT", date: "Aug 2026", type: "ai", link: "/certificates/ai/Kavindu Amarasuriya - 2026-08-16.pdf" },
  { id: 'ai2', title: "AI/ML Engineer - Stage 2", issuer: "SLIIT", date: "Aug 2026", type: "ai", link: "/certificates/ai/Kavindu Amarasuriya - 2026-08-16(2).pdf" },
  { id: 'ai3', title: "AI/ML Engineer - Stage 3", issuer: "SLIIT", date: "Aug 2026", type: "ai", link: "/certificates/ai/Kavindu Amarasuriya - 2026-08-16(3).pdf" },
];

export const certificatesData = [...awsCertificates, ...aiCertificates];

const SpotlightCard = ({ cert, index, onClick }) => {
  const divRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cardDims, setCardDims] = useState({ width: 0, height: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse tracking for spotlight
  const spotlightX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      setCardDims({ width, height });
      mouseX.set(width / 2);
      mouseY.set(height / 2);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // 3D Tilt calculations
  const rotateX = useTransform(mouseY, [0, cardDims.height || 256], [10, -10]);
  const rotateY = useTransform(mouseX, [0, cardDims.width || 384], [-10, 10]);

  const isAws = cert.type === 'aws';
  const color = isAws ? '245, 158, 11' : '6, 182, 212'; // Amber vs Cyan

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(cardDims.width / 2);
        mouseY.set(cardDims.height / 2);
      }}
      onClick={() => onClick(cert)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className="relative flex flex-col justify-between h-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 cursor-pointer group shadow-2xl"
    >
      {/* 3D Depth Layer for content */}
      <div style={{ transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)', transition: 'transform 0.3s ease-out' }} className="absolute inset-0 pointer-events-none" />

      {/* Spotlight background layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => 'radial-gradient(400px circle at ' + x + 'px ' + y + 'px, rgba(' + color + ', 0.1), transparent 40%)'
          )
        }}
      />
      {/* Spotlight border layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 border border-transparent"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => 'radial-gradient(400px circle at ' + x + 'px ' + y + 'px, rgba(' + color + ', 0.5), transparent 40%) border-box'
          ),
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      
      {/* Card Content (Pushed forward in 3D) */}
      <div 
        className="relative z-10 flex flex-col h-full"
        style={{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)', transition: 'transform 0.3s ease-out' }}
      >
        <div className="flex justify-between items-start mb-6">
           <div className={"p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500"}>
              <Award size={24} className={isAws ? 'text-amber-500' : 'text-cyan-500'} />
           </div>
           <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 group-hover:text-white group-hover:border-white/20 transition-colors duration-500">
             {cert.date}
           </span>
        </div>
        
        <div className="mt-auto">
          <h3 className={"text-xl font-bold text-white/90 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-500 " + (isAws ? 'group-hover:from-amber-200 group-hover:to-amber-500' : 'group-hover:from-cyan-200 group-hover:to-cyan-500')}>
            {cert.title}
          </h3>
          <p className="text-sm font-medium text-white/40 mt-3 group-hover:text-white/60 transition-colors duration-500">
            {cert.issuer}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const [activeTab, setActiveTab] = useState('aws');
  const [selectedCert, setSelectedCert] = useState(null);
  const activeData = activeTab === 'aws' ? awsCertificates : aiCertificates;

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => { 
      document.body.style.overflow = ''; 
      if (window.lenis) window.lenis.start();
    };
  }, [selectedCert]);

  return (
    <div className="relative z-40 w-full bg-black text-white min-h-screen overflow-hidden py-32">
       {/* Ambient Tech Grid Background */}
       <div 
         className="absolute inset-0 pointer-events-none opacity-40 z-0" 
         style={{ 
           backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)', 
           backgroundSize: '4rem 4rem', 
           maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 80%, transparent 100%)',
           WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 80%, transparent 100%)'
         }} 
       />

       {/* Floating Ambient Orbs */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ 
               x: [0, 100, -50, 0], 
               y: [0, -50, 100, 0],
               scale: [1, 1.2, 0.9, 1] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className={"absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 mix-blend-screen transition-colors duration-1000 " + (activeTab === 'aws' ? 'bg-amber-500' : 'bg-cyan-500')}
          />
          <motion.div 
            animate={{ 
               x: [0, -100, 50, 0], 
               y: [0, 100, -50, 0],
               scale: [1, 0.8, 1.1, 1] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className={"absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 mix-blend-screen transition-colors duration-1000 " + (activeTab === 'aws' ? 'bg-orange-500' : 'bg-blue-500')}
          />
       </div>
       
       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: -40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.8 }}
             transition={{ duration: 0.8 }}
             className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-20"
          >
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none tracking-widest text-white mb-4" style={{ fontFamily: "'Impact', 'Oswald', 'Arial Black', sans-serif" }}>
                ACHIEVEMENTS
              </h2>
              <p className="text-white/40 font-mono text-xs md:text-sm">
                Verified Credentials & Certifications
              </p>
            </div>
            
            {/* Category Switcher Pill */}
            <div className="flex bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md self-start md:self-auto">
               <button 
                 onClick={() => setActiveTab('aws')} 
                 className={"relative px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 " + (activeTab === 'aws' ? 'text-black' : 'text-white/50 hover:text-white')}
               >
                  {activeTab === 'aws' && (
                    <motion.div 
                      layoutId="certTab" 
                      className="absolute inset-0 bg-amber-500 rounded-full" 
                      transition={{ type: "spring", stiffness: 300, damping: 25 }} 
                    />
                  )}
                  <span className="relative z-10">AWS Cloud ({awsCertificates.length})</span>
               </button>
               
               <button 
                 onClick={() => setActiveTab('ai')} 
                 className={"relative px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 " + (activeTab === 'ai' ? 'text-black' : 'text-white/50 hover:text-white')}
               >
                  {activeTab === 'ai' && (
                    <motion.div 
                      layoutId="certTab" 
                      className="absolute inset-0 bg-cyan-500 rounded-full" 
                      transition={{ type: "spring", stiffness: 300, damping: 25 }} 
                    />
                  )}
                  <span className="relative z-10">AI & ML ({aiCertificates.length})</span>
               </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
             <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
             >
                {activeData.map((cert, index) => (
                   <SpotlightCard key={cert.id} cert={cert} index={index} onClick={setSelectedCert} />
                ))}
             </motion.div>
          </AnimatePresence>
       </div>

       {/* Cyberpunk Glassmorphism Credential Viewer Modal */}
       <AnimatePresence>
         {selectedCert && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/60"
             onClick={() => setSelectedCert(null)}
           >
             <motion.div 
               initial={{ scale: 0.9, y: 30, rotateX: 20 }}
               animate={{ scale: 1, y: 0, rotateX: 0 }}
               exit={{ scale: 0.9, y: 30, rotateX: 20 }}
               transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
               style={{ transformPerspective: 1000 }}
               className="relative w-full max-w-2xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden"
               onClick={(e) => e.stopPropagation()}
             >
                {/* Glowing Accent for Modal */}
                <div className={"absolute top-0 left-0 w-full h-1 " + (selectedCert.type === 'aws' ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-gradient-to-r from-cyan-500 to-blue-600')} />
                
                <button onClick={() => setSelectedCert(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/5 p-2 rounded-full border border-white/10 hover:bg-white/10">
                   <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                   <div className={"w-24 h-24 flex items-center justify-center rounded-2xl mb-8 bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] " + (selectedCert.type === 'aws' ? 'shadow-amber-500/20 text-amber-500' : 'shadow-cyan-500/20 text-cyan-500')}>
                      <Award size={48} />
                   </div>
                   
                   <span className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">{selectedCert.date}</span>
                   <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{selectedCert.title}</h3>
                   <p className="text-white/50 text-lg mb-10">{selectedCert.issuer}</p>

                   <a 
                     href={selectedCert.link || "#"} 
                     target="_blank"
                     rel="noreferrer"
                     onClick={(e) => { if (!selectedCert.link) e.preventDefault(); }}
                     className={"group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 overflow-hidden " + (selectedCert.type === 'aws' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]')}
                   >
                      <span className="relative z-10 flex items-center gap-2">Verify Authenticity <ExternalLink size={16} /></span>
                   </a>
                </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

export default Certificates;
