import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-white p-6 text-center relative z-20">
      
      <div className="bg-blue-500/10 p-6 rounded-full mb-6 animate-pulse">
        <AlertTriangle className="w-16 h-16 text-blue-500" />
      </div>

      <h1 className="text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Introuvable</h2>
      <p className="text-gray-400 max-w-md mb-8">
        Oups ! Cette route n'existe pas ou a été déplacée.
      </p>

      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
      >
        <Home size={20} /> Retour au Portfolio
      </button>

    </div>
  );
};

export default NotFound;