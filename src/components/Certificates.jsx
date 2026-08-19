import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, FileText } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const certificatesData = [
  {
    id: 1,
    title: "AI/ML Engineer - Stage 1",
    issuer: "SLIIT",
    date: "Aug 2026",
    file: "/certificates/ai-ml-stage-1.pdf",
    color: "from-blue-500/20 to-transparent",
    iconColor: "text-blue-400"
  },
  {
    id: 2,
    title: "AI/ML Engineer - Stage 2",
    issuer: "SLIIT",
    date: "Aug 2026",
    file: "/certificates/ai-ml-stage-2.pdf",
    color: "from-purple-500/20 to-transparent",
    iconColor: "text-purple-400"
  },
  {
    id: 3,
    title: "AI/ML Engineer - Stage 3",
    issuer: "SLIIT",
    date: "Aug 2026",
    file: "/certificates/ai-ml-stage-3.pdf",
    color: "from-emerald-500/20 to-transparent",
    iconColor: "text-emerald-400"
  },
  {
    id: 4,
    title: "Basic Java Developments",
    issuer: "DIGIMAX Edu LK",
    date: "Mar 2023",
    file: "/certificates/basic-java.jpg",
    color: "from-orange-500/20 to-transparent",
    iconColor: "text-orange-400"
  }
];

const Certificates = () => {
  const ref = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const obj1Y = useTransform(scrollYProgress, [0, 1], ["100%", "-80%"]);
  const obj2Y = useTransform(scrollYProgress, [0, 1], ["-20%", "100%"]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCert]);

  return (
    <section ref={ref} id="certificates" className="py-24 px-6 max-w-6xl mx-auto relative">
      
      {/* Background Shapes */}
      <motion.div 
        style={{ y: obj1Y }}
        className="absolute top-1/4 left-10 w-40 h-40 border-l-[3px] border-t-[3px] border-emerald-500/30 rounded-tl-[100px] pointer-events-none hidden md:block shadow-[0_0_20px_rgba(16,185,129,0.1)]"
      />
      <motion.div 
        style={{ y: obj2Y }}
        animate={{ rotate: [0, -180, -360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 right-20 w-32 h-32 border-4 border-double border-purple-500/30 rounded-full pointer-events-none hidden md:block shadow-[0_0_25px_rgba(168,85,247,0.1)]"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 w-full"
      >
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">Certifications.</h2>
          <p className="text-gray-400">Professional milestones and specialized training paths.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certificatesData.map((cert) => (
            <motion.div 
              key={cert.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedCert(cert)}
              className="glass p-8 rounded-3xl flex flex-col items-center justify-center text-center relative z-10 shadow-lg overflow-hidden group border border-white/10 cursor-pointer transition-all duration-300 hover:border-white/30"
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="bg-white/5 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                <Award className={`${cert.iconColor} drop-shadow-md`} size={48} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">{cert.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{cert.issuer} &bull; {cert.date}</p>
              
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                <span>View</span>
                <ExternalLink size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fullscreen PDF Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[85vh] bg-neutral-900 border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-3">
                  <FileText className={selectedCert.iconColor} size={20} />
                  <h3 className="text-lg font-bold text-white">{selectedCert.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Document Viewer */}
              <div className="flex-1 w-full bg-neutral-800 relative">
                {/* Fallback/Loading state behind iframe */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <FileText size={40} className="mb-4 opacity-20" />
                  </motion.div>
                  <p>Loading document...</p>
                </div>
                
                {selectedCert.file.match(/\.(jpeg|jpg|gif|png)$/i) != null ? (
                  <img 
                    src={selectedCert.file} 
                    alt={selectedCert.title} 
                    className="absolute inset-0 w-full h-full object-contain z-10 bg-neutral-900"
                  />
                ) : (
                  <iframe 
                    src={`${selectedCert.file}#view=FitH`} 
                    className="absolute inset-0 w-full h-full border-none z-10 bg-white"
                    title={selectedCert.title}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
