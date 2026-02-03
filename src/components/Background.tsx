const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-cyan-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      {/* Grille noise légère */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
    </div>
  );
};

export default AnimatedBackground;