import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Using FormSubmit.co for sending emails without a backend
    fetch("https://formsubmit.co/ajax/kavindu2002nethmina@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: "New Message from Portfolio Website!"
      })
    })
    .then(response => response.json())
    .then(data => {
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' });
    })
    .catch(error => {
      console.log(error);
      alert("Something went wrong. Please try again.");
    });
  };

  return (
    <section id="contact" className="relative w-full bg-white z-20 pt-32 pb-16 overflow-hidden">
      {/* Background decorations - Full width */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-64 w-96 h-96 bg-emerald-100 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 -right-64 w-[30rem] h-[30rem] bg-purple-100 rounded-full blur-[120px]"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Side: Contact Info */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-6 leading-tight">
              Let's build <br />
              something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">extraordinary.</span>
            </h2>
            <p className="text-gray-600 text-lg mb-12 max-w-md leading-relaxed">
              I'm currently available for freelance work and full-time roles. If you have a project that needs some creative magic or just want to say hi, feel free to reach out.
            </p>

            <div className="flex flex-col gap-6">
              <h3 className="text-black font-bold tracking-widest uppercase text-sm">Connect with me</h3>
              <div className="flex gap-4 flex-wrap">
                {[
                  { icon: <Github size={20} />, href: "https://github.com/kavi419", label: "GitHub" },
                  { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <Mail size={20} />, href: "https://mail.google.com/mail/?view=cm&fs=1&to=kavindu2002nethmina@gmail.com", label: "Email" }
                ].map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 interactive group relative overflow-hidden bg-white shadow-sm hover:shadow-md"
                  >
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden group">
              
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold tracking-widest uppercase text-gray-500 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all interactive"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold tracking-widest uppercase text-gray-500 ml-1">Your Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all interactive"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold tracking-widest uppercase text-gray-500 ml-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project..." 
                    className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none interactive"
                  />
                </div>

                <button 
                  type="submit" 
                  className="mt-4 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold tracking-widest uppercase py-4 px-8 rounded-xl transition-all duration-300 interactive group shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
                >
                  Send Message
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Modern Minimal Footer incorporated into Contact */}
        <motion.div variants={itemVariants} className="mt-32 pt-8 border-t border-gray-200 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold text-xl tracking-tighter text-black opacity-80 hover:opacity-100 transition-opacity">
            KAVINDU<span className="text-emerald-500">.</span>
          </div>
          <p className="text-gray-500 text-sm font-mono">
            © {new Date().getFullYear()} Kavindu. All rights reserved.
          </p>
          <div className="text-gray-500 text-sm font-mono flex items-center gap-2">
            Designed with <span className="text-emerald-500">♥</span> in SL
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
