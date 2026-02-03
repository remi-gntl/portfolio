import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Skill } from '../types';
import { motion } from 'framer-motion';

const TechStack = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from('skills').select('*').order('id');
      if (!error) setSkills(data as Skill[]);
      setLoading(false);
    };
    fetchSkills();
  }, []);

  if (loading) return <div className="text-center text-blue-400">Chargement des compétences...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-fade-in">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="group bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-default"
        >
          {/* Cercle pour le logo */}
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
            <img src={skill.image} alt={skill.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
          </div>
          <span className="font-bold text-gray-300 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default TechStack;