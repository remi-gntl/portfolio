import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Project } from "../types";
import { Github, ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les données
  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;

      // On cast les données car TechStack est stocké en JSON
      setProjects((data as Project[]) || []);
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    } finally {
      setLoading(false);
    }
  };

  // On lance la récupération au chargement du composant
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
          <span className="text-primary">/</span> Mes Projets
        </h2>
        <p className="text-gray-400 max-w-2xl">
          Une sélection de mes travaux techniques, du développement web à
          l'infrastructure DevOps.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-primary w-12 h-12" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-surface rounded-xl overflow-hidden border border-slate-700/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 flex flex-col"
            >
              {/* Image (Avec fallback si pas d'image) */}
              <div className="h-48 bg-slate-800 relative overflow-hidden">
                {project.Img && !project.Img.includes("REPLACE") ? (
                  <img
                    src={project.Img}
                    alt={project.Title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
                    <span className="text-sm">Image du projet</span>
                  </div>
                )}

                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                  <a
                    href={project.Github}
                    target="_blank"
                    className="p-2 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.Link}
                    target="_blank"
                    className="p-2 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                  {project.Title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                  {project.Description}
                </p>

                <Link
                  to={`/project/${project.id}`}
                  className="inline-flex items-center gap-2 text-sm text-primary font-bold hover:underline mb-4 w-fit"
                >
                  En savoir plus →
                </Link>

                {/* Tags (Stack) */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.TechStack &&
                    Array.isArray(project.TechStack) &&
                    project.TechStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-blue-300 border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
