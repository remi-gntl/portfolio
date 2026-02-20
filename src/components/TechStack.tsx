import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Skill } from '../types';
import { motion } from 'framer-motion';
import { Star, ChevronDown } from 'lucide-react';

// Définition des catégories
const CATEGORIES = [
  'Frontend',
  'Backend',
  'DevOps & Infra',
  'Bases de données',
  'Outils & Productivité',
  'Gestion de projet',
  'Cybersécurité'
];

const TechStack = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('level', { ascending: false });
      
      if (!error) setSkills(data as Skill[]);
      setLoading(false);
    };
    fetchSkills();
  }, []);

  // Grouper les skills par catégorie
  const skillsByCategory = CATEGORIES.map(categoryName => ({
    name: categoryName,
    skills: skills.filter(skill => skill.category === categoryName)
  })).filter(cat => cat.skills.length > 0);

  //pour toggle une catégorie
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  if (loading) return <div className="text-center text-blue-400">Chargement des compétences...</div>;

  return (
    <div className="space-y-12 animate-fade-in">
      {skillsByCategory.map((category, catIndex) => {
        const isExpanded = expandedCategories.includes(category.name);
        const displayedSkills = isExpanded ? category.skills : category.skills.slice(0, 3);
        const hasMore = category.skills.length > 3;

        return (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1 }}
            className="space-y-6"
          >
            {/* Titre de la catégorie */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {category.name}
              </h3>
              <span className="text-sm text-gray-500">({category.skills.length})</span>
            </div>

            {/* Grille des compétences */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {displayedSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-default"
                >
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                    <img 
                      src={skill.image} 
                      alt={skill.name} 
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                    />
                  </div>

                  <span className="font-bold text-gray-300 group-hover:text-white transition-colors text-center">
                    {skill.name}
                  </span>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= skill.level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/*VOIR PLUS PAR CATÉGORIE */}
            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="group flex items-center gap-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 text-gray-400 hover:text-white px-6 py-3 rounded-xl font-medium transition-all text-sm"
                >
                  {isExpanded ? (
                    <>
                      Voir moins
                      <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                    </>
                  ) : (
                    <>
                      Voir {category.skills.length - 3} compétence{category.skills.length - 3 > 1 ? 's' : ''} supplémentaire{category.skills.length - 3 > 1 ? 's' : ''}
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechStack;