import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, User } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Titre Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <User className="text-blue-500 w-8 h-8 md:w-10 md:h-10" />
            À Propos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Moi</span>
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* COLONNE GAUCHE : BIO & IMAGE */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Carte Photo / Avatar */}
            <div className="relative group">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
               <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Passionné par l'informatique depuis mes années lycée (STI2D Option SIN), je me suis spécialisé dans le développement et l'administration système.
                    <br/><br/>
                    Aujourd'hui <strong className="text-white">Alternant DevOps & Développeur</strong>, je cherche à construire des ponts entre le code et l'infrastructure. Mon objectif ? Automatiser, sécuriser et optimiser.
                  </p>
                  
                  {/* Soft Skills Badges */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {['Travail en équipe', 'Autonomie', 'Curiosité', 'Résolution de problèmes'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-900/20 text-blue-300 text-sm rounded-lg border border-blue-500/20">
                        {skill}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
          </motion.div>

          {/* COLONNE DROITE : TIMELINE (Expérience & Formation) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Carte Expérience */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                  <Briefcase className="text-blue-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Développeur Full Stack & DevOps</h3>
                  <p className="text-blue-400 font-medium text-sm mb-2">The Gill Corporation • Alternance</p>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">2024 - Présent</span>
                  <p className="text-gray-400 text-sm mt-3">
                    Digitalisation des flux de maintenance, mise en place CI/CD, Dockerisation des applications et administration système.
                  </p>
                </div>
              </div>
            </div>

            {/* Carte Freelance / Projet */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                  <Code2 className="text-cyan-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Développeur Web (Freelance)</h3>
                  <p className="text-cyan-400 font-medium text-sm mb-2">Harmonie Des Énergies</p>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">Juillet - Sept. 2025</span>
                  <p className="text-gray-400 text-sm mt-3">
                    Création d'un site vitrine complet, optimisation SEO et mise en production.
                  </p>
                </div>
              </div>
            </div>

            {/* Carte Formation */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                  <GraduationCap className="text-purple-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">BUT Informatique</h3>
                  <p className="text-purple-400 font-medium text-sm mb-2">IUT de Bayonne</p>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">2022 - 2025</span>
                  <p className="text-gray-400 text-sm mt-3">
                    Spécialisation réalisation d'applications et administration système sécurisée.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;