import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  //gestion de navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const sectionId = href.replace('#', '');

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0F172A]/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <a 
          href="/" 
          onClick={handleLogoClick}
          className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hover:from-blue-400 hover:to-cyan-300 transition-all"
        >
          Rémi <span className="text-blue-500">Gentil</span>
        </a>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
          
          <div className="h-6 w-px bg-slate-700 mx-2"></div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/remi-gntl" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/remi-gentil/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Linkedin size={20} />
            </a>
            <a href="mailto:remi.gentil.33@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
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
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-4 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-300 hover:text-blue-400 block py-2 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          {/* Icônes version Mobile */}
          <div className="flex gap-4 pt-4 border-t border-slate-700">
            <a href="https://github.com/remi-gntl" className="text-gray-400 hover:text-white transition-colors"><Github size={20}/></a>
            <a href="https://www.linkedin.com/in/remi-gentil/" className="text-gray-400 hover:text-blue-500 transition-colors"><Linkedin size={20}/></a>
            <a href="mailto:remi.gentil.33@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors"><Mail size={20}/></a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;