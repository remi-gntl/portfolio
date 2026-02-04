import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, ChevronRight, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center z-10">
      
      {/* Plus de blobs ici, on laisse le composant <Background /> de App.tsx faire le travail */}

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* --- CÔTÉ GAUCHE : TEXTE & INFOS --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          
          {/* Badge "Disponible" */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-sm font-medium backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            En recherche d'alternance
          </div>

          {/* Titre Principal & Texte Animé */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white">
              Rémi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Gentil</span>
            </h1>
            
            <div className="text-2xl md:text-4xl font-bold text-gray-300 flex items-center gap-2 h-20 md:h-16">
              <span className="text-blue-400">{'>'}</span>
              <TypeAnimation
                sequence={[
                  'Ingénieur DevOps',
                  2000, 
                  'Spécialiste Cybersécurité',
                  2000,
                  'Développeur Full Stack',
                  2000,
                  'Passionné d\'Automatisation',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200"
              />
            </div>

            <p className="text-lg text-gray-400 max-w-xl leading-relaxed border-l-2 border-blue-500/30 pl-6">
              Étudiant en BUT Informatique à l'IUT de Bayonne et Alternant chez <span className="text-white font-semibold">The Gill Corporation</span>.
              Je conçois et sécurise des infrastructures modernes.
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
              Voir mes projets
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/cv.pdf" target="_blank" download="CV_Remi_Gentil.pdf" className="group px-8 py-3 rounded-xl font-bold transition-all bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white flex items-center gap-2">
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              Télécharger CV
            </a>
          </div>

          {/* Liens Sociaux */}
          <div className="flex items-center gap-4 pt-4">
            <a href="https://github.com/remi-gntl" target="_blank" className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-500/30 hover:text-blue-400 transition-all">
                <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/remi-gentil/" target="_blank" className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-500/30 hover:text-blue-400 transition-all">
                <Linkedin size={22} />
            </a>
            <a href="mailto:remi.gentil.33@gmail.com" className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-500/30 hover:text-blue-400 transition-all">
                <Mail size={22} />
            </a>
          </div>

        </motion.div>

        {/* --- CÔTÉ DROIT : TON ILLUSTRATION ANIMÉE --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center relative"
        >
           {/* Effet de lueur derrière l'image */}
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-[80px] animate-pulse"></div>

           {/* L'image flottante */}
           <motion.img 
             src="/hero-illustration.gif"
             alt="Illustration DevOps"
             className="relative z-10 w-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] drop-shadow-2xl"
             animate={{ 
               y: [0, -20, 0], // Animation de flottement (Haut/Bas)
               rotate: [0, 1, -1, 0] // Légère rotation pour le dynamisme
             }}
             transition={{ 
               duration: 6, 
               repeat: Infinity, 
               ease: "easeInOut" 
             }}
           />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;