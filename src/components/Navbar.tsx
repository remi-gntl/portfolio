import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#' },
    { name: 'Projets', href: '#projects' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
          Rémi<span className="text-primary">.dev</span>
        </a>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Liens de navigation */}
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          ))}
          
          {/* Séparateur vertical */}
          <div className="h-6 w-px bg-slate-700 mx-2"></div>

          {/* Icônes Réseaux Sociaux (C'est ici qu'on utilise Linkedin et Mail) */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/remi-gntl" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/remi-gentil/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Linkedin size={20} />
            </a>
            <a href="mailto:remi.gentil.33@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
                <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Menu Mobile (Burger) */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface border-t border-slate-800 p-4 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-gray-300 hover:text-primary block py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          {/* Icônes version Mobile */}
          <div className="flex gap-4 pt-4 border-t border-slate-700">
            <a href="https://github.com/remi-gntl" className="text-gray-400"><Github size={20}/></a>
            <a href="https://www.linkedin.com/in/remi-gentil/" className="text-gray-400"><Linkedin size={20}/></a>
            <a href="mailto:remi.gentil.33@gmail.com" className="text-gray-400"><Mail size={20}/></a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;