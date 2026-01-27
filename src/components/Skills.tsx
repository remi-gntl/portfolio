import { motion } from "framer-motion";
import { Server, Shield, Globe, Database, Terminal, Cpu } from "lucide-react";

const skillsData = [
  {
    category: "DevOps & Outils",
    icon: <Server className="w-6 h-6 text-blue-400" />,
    skills: ["Docker", "Git / GitHub", "CI/CD", "Virtualisation", "Nginx"],
  },
  {
    category: "Frameworks & Web",
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    skills: ["Laravel", "React", "Angular", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Systèmes & Réseaux",
    icon: <Terminal className="w-6 h-6 text-blue-400" />,
    skills: ["Linux (Debian/Ubuntu)", "Windows Server", "Bash Scripting", "Administration"],
  },
  {
    category: "Bases de données",
    icon: <Database className="w-6 h-6 text-blue-400" />,
    skills: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB"],
  },
  {
    category: "Programmation",
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
    skills: ["PHP", "Java", "Python", "C / C++", "TypeScript"],
  },
  {
    category: "Cybersécurité",
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    skills: ["Cryptanalyse", "Sécurité Web", "Analyses de vulnérabilités", "Bonnes pratiques"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden">
      
      {/* Fond décoratif léger */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Titre de section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mes <span className="text-primary">Compétences</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Une stack technique polyvalente, orientée vers la robustesse et l'automatisation.
          </p>
        </motion.div>

        {/* Grille des compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border border-slate-800 p-6 rounded-2xl hover:border-primary/50 transition-colors group hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-primary/20 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-100">{category.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1 bg-slate-900 text-sm text-gray-300 rounded-md border border-slate-800 group-hover:border-slate-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;