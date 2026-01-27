import { motion } from "framer-motion";
import { Monitor, Server, Shield, Code, Terminal } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center overflow-hidden">
      
      {/* Fond décoratif (Gradient subtil) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Côté GAUCHE : Texte */}
        <div className="space-y-8">
          
          {/* Badge animé */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Disponible pour missions Freelance
          </motion.div>

          {/* Titre principal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
              Rémi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Gentil</span>
            </h1>
            <p className="mt-4 text-xl text-gray-400 max-w-lg">
              Étudiant BUT & Alternant chez <span className="text-white font-semibold">The Gill Corporation</span>.
              <br/>Je conçois des solutions <span className="text-blue-400">DevOps</span> sécurisées et performantes.
            </p>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center gap-2">
              <Code size={20} />
              Mes Projets
            </a>
            <a href="#contact" className="border border-slate-700 hover:border-primary text-gray-300 hover:text-white px-8 py-3 rounded-lg font-bold transition-all hover:bg-white/5 flex items-center gap-2">
              <Terminal size={20} />
              Me Contacter
            </a>
          </motion.div>
        </div>

        {/* Côté DROIT : Visuel (Carte Code) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative hidden md:block"
        >
           {/* Carte principale flottante */}
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
             className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-2xl z-10"
           >
              <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <div className="text-xs text-gray-500 font-mono">devops-config.yaml</div>
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                 <div className="flex items-center gap-3 text-gray-300 p-2 hover:bg-white/5 rounded transition-colors">
                    <Server size={20} className="text-blue-400" /> 
                    <div>
                        <p className="text-white font-bold">Infrastructure</p>
                        <p className="text-xs text-gray-500">Docker, Kubernetes, Ansible</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 text-gray-300 p-2 hover:bg-white/5 rounded transition-colors">
                    <Shield size={20} className="text-blue-400" /> 
                    <div>
                        <p className="text-white font-bold">Security</p>
                        <p className="text-xs text-gray-500">Pentesting, SecOps, Hardening</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 text-gray-300 p-2 hover:bg-white/5 rounded transition-colors">
                    <Monitor size={20} className="text-blue-400" /> 
                    <div>
                        <p className="text-white font-bold">Web Stack</p>
                        <p className="text-xs text-gray-500">React, Laravel, Tailwind</p>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Élément décoratif arrière */}
           <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl -z-10"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;