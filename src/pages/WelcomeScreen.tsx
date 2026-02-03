import { motion } from 'framer-motion';
import { Terminal, Code2, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

const WelcomeScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [text, setText] = useState("");
  const fullText = "Initialisation du système...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onLoadingComplete();
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-[#0F172A] z-50 flex flex-col items-center justify-center">
      
      {/* Container Icones animées */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative bg-slate-900 p-6 rounded-2xl border border-blue-500/30 flex gap-4">
          <Terminal className="text-blue-400 w-12 h-12 animate-pulse" />
          <Code2 className="text-cyan-400 w-12 h-12" />
          <Shield className="text-purple-400 w-12 h-12" />
        </div>
      </motion.div>

      {/* Texte Machine à écrire */}
      <div className="font-mono text-xl md:text-2xl text-gray-200">
        <span className="text-green-400 mr-2">➜</span>
        {text}
        <span className="animate-blink">_</span>
      </div>

    </div>
  );
};

export default WelcomeScreen;