import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';
import { ArrowLeft, ExternalLink, Github, Star, Layers, Code2 } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      if (!id) return;
      const { data } = await supabase.from('projects').select('*').eq('id', id).single();
      if (data) setProject(data as Project);
    };
    fetchProject();
  }, [id]);

  if (!project) return <div className="min-h-screen bg-[#0F172A]" />;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 pb-20 px-6">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Titre */}
        <div className="mb-12">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-blue-400 mb-6 transition-colors">
            <ArrowLeft size={20} /> Retour
          </button>
          <h1 className="text-4xl md:text-6xl font-black mb-2">{project.Title}</h1>
          <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* COLONNE GAUCHE (Description, Stats, Techs) - 5 colonnes */}
          <div className="lg:col-span-5 space-y-10">
            
            <p className="text-gray-300 text-lg leading-relaxed">
              {project.Description}
            </p>

            {/* Stats Box */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                 <div className="text-gray-400 text-xs mb-1">Technologies</div>
                 <div className="text-2xl font-bold text-white flex items-center gap-2">
                    <Code2 className="text-blue-400" /> {project.TechStack?.length || 0}
                 </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                 <div className="text-gray-400 text-xs mb-1">Fonctionnalités</div>
                 <div className="text-2xl font-bold text-white flex items-center gap-2">
                    <Layers className="text-cyan-400" /> {project.Features?.length || 0}
                 </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4">
              <a href={project.Link} target="_blank" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                <ExternalLink size={20} /> Live Demo
              </a>
              <a href={project.Github} target="_blank" className="flex-1 border border-slate-700 hover:border-white text-white py-3 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2">
                <Github size={20} /> GitHub
              </a>
            </div>

            {/* Liste Techs */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-blue-200">Technologies Utilisées</h3>
              <div className="flex flex-wrap gap-2">
                {project.TechStack?.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-blue-900/20 border border-blue-500/20 rounded-lg text-blue-300 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* COLONNE DROITE (Image & Features) - 7 colonnes */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Image Container */}
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
               {project.Img ? (
                 <img src={project.Img} alt={project.Title} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
               ) : (
                 <div className="h-64 flex items-center justify-center text-gray-500">No Image</div>
               )}
            </div>

            {/* Features Box */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Star className="text-yellow-400 fill-yellow-400" /> Key Features
              </h3>
              <ul className="space-y-4">
                {project.Features?.map((feature, i) => (
                   <li key={i} className="flex items-start gap-3 text-gray-300">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                      {feature}
                   </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;