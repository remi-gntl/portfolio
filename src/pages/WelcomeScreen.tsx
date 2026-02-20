import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Rocket, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const WelcomeScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96] as const
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-[#0F172A] z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 blur-3xl animate-pulse" />
          </div>
          <div className="relative flex flex-col items-center gap-8">
            <motion.div 
              className="flex gap-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[
                { Icon: Code2, delay: 0, color: 'text-blue-400' },
                { Icon: Rocket, delay: 0.2, color: 'text-cyan-400' },
                { Icon: Sparkles, delay: 0.4, color: 'text-blue-300' }
              ].map(({ Icon, delay, color }, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay, duration: 0.5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-all" />
                  <div className={`relative p-4 ${color}`}>
                    <Icon className="w-12 h-12" strokeWidth={1.5} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center space-y-2"
            >
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Bienvenue
                </span>
              </h1>
              <p className="text-gray-400 text-lg">
                Portfolio de Rémi Gentil
              </p>
            </motion.div>

            {/* barre de progression */}
            <motion.div
              className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;