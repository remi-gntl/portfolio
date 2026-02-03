import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} <span className="text-blue-400 font-bold">Rémi Gentil</span>. Tous droits réservés.
        </p>

        <div className="flex items-center gap-6">
           <a href="https://github.com/remi-gntl" target="_blank" className="text-gray-500 hover:text-white transition-colors"><Github size={18} /></a>
           <a href="https://www.linkedin.com/in/remi-gentil/" target="_blank" className="text-gray-500 hover:text-blue-400 transition-colors"><Linkedin size={18} /></a>
           <a href="mailto:remi.gentil.33@gmail.com" className="text-gray-500 hover:text-red-400 transition-colors"><Mail size={18} /></a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;