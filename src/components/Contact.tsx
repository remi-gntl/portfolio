import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 max-w-4xl mx-auto text-center">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-surface to-slate-900 border border-slate-700 p-12 rounded-3xl relative overflow-hidden"
      >
        {/* Effet de brillance arrière */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Prêt à <span className="text-primary">collaborer</span> ?
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Je suis actuellement à l'écoute d'opportunités en Freelance ou pour des projets innovants. 
          N'hésitez pas à me contacter pour échanger !
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          <a 
            href="mailto:remi.gentil.33@gmail.com" 
            className="flex items-center gap-3 bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-blue-500/25 w-full md:w-auto justify-center"
          >
            <Mail size={20} />
            remi.gentil.33@gmail.com
          </a>
          
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 hover:text-blue-400 transition-colors border border-slate-700">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com" target="_blank" className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 hover:text-white transition-colors border border-slate-700">
              <Github size={24} />
            </a>
          </div>
        </div>

        {/* Info localisation style badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-gray-400 text-sm">
          <MapPin size={16} className="text-primary" />
          Bayonne (64), France & Remote
        </div>

      </motion.div>

      {/* Copyright simple */}
      <footer className="mt-20 text-gray-600 text-sm">
        <p>© 2026 Rémi Gentil. Construit avec React, Tailwind & Supabase.</p>
      </footer>

    </section>
  );
};

export default Contact;