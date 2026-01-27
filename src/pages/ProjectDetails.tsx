import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';
import { 
  ArrowLeft, ExternalLink, Github, Code2, Layers, 
  Star, Globe, Layout, Code, Package, Terminal 
} from 'lucide-react';

// Correction du typage : on dit que ce sont des Composants React
const TECH_ICONS: Record<string, React.ElementType> = {
  React: Globe,
  Laravel: Layout,
  Tailwind: Layout,
  Docker: Package,
  Supabase: DatabaseIcon, 
  PostgreSQL: DatabaseIcon,
  Python: Code,
  TypeScript: Code,
  default: Code2,
};

function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
}

const TechBadge = ({ tech }: { tech: string }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <div className="group relative overflow-hidden px-3 py-2 bg-blue-900/20 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-2">
        <Icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-sm font-medium text-blue-200/80 group-hover:text-white transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const ProjectStats = ({ project }: { project: Project }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-sm relative overflow-hidden">
      <div className="relative z-10 flex items-center space-x-3 bg-slate-800/50 p-3 rounded-xl border border-blue-500/20">
        <div className="bg-blue-500/20 p-2 rounded-lg">
          <Code2 className="text-blue-400 w-5 h-5" />
        </div>
        <div>
          <div className="text-lg font-bold text-white">{project.TechStack?.length || 0}</div>
          <div className="text-xs text-gray-400">Technos</div>
        </div>
      </div>
      
      <div className="relative z-10 flex items-center space-x-3 bg-slate-800/50 p-3 rounded-xl border border-cyan-500/20">
        <div className="bg-cyan-500/20 p-2 rounded-lg">
          <Layers className="text-cyan-400 w-5 h-5" />
        </div>
        <div>
          <div className="text-lg font-bold text-white">{project.Features?.length || 0}</div>
          <div className="text-xs text-gray-400">Fonctionnalités</div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (!error) setProject(data as Project);
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white">
      <h2 className="text-2xl font-bold">Projet introuvable</h2>
      <button onClick={() => navigate(-1)} className="mt-4 text-blue-400 hover:underline">Retour</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-white selection:bg-blue-500/30 overflow-hidden relative">
      
      {/* --- FOND ANIMÉ (Blobs) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-0 -right-20 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />
        {/* Grille subtile */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* HEADER NAVIGATION */}
        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm text-gray-300"
          >
            <ArrowLeft size={16} /> Retour
          </button>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          <span className="text-gray-500 text-sm font-mono">ID: {project.id < 10 ? `0${project.id}` : project.id}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* COLONNE GAUCHE : INFOS */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight">
                {project.Title}
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed border-l-2 border-blue-500/30 pl-6">
                {project.Description}
              </p>
            </div>

            <ProjectStats project={project} />

            <div className="flex flex-wrap gap-4">
              <a
                href={project.Link}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                   project.Link && project.Link !== '#' 
                   ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                   : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ExternalLink size={20} /> Live Demo
              </a>
              <a
                href={project.Github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Github size={20} /> Code Source
              </a>
            </div>

            <div className="pt-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Terminal className="text-blue-400" /> Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.TechStack && Array.isArray(project.TechStack) && project.TechStack.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : IMAGE & FEATURES */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            
            {/* Image avec effet Glow */}
            <div className="relative group rounded-2xl p-2 bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900">
                {project.Img && !project.Img.includes('REPLACE') ? (
                  <img 
                    src={project.Img} 
                    alt={project.Title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    Image non disponible
                  </div>
                )}
              </div>
            </div>

            {/* Features List */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                Fonctionnalités clés
              </h3>
              <ul className="space-y-3">
                {project.Features && Array.isArray(project.Features) && project.Features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-cyan-400 group-hover:scale-150 transition-all"></div>
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