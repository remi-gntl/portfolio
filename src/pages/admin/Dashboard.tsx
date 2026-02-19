import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Plus, Trash2, Edit, LogOut, Loader2 } from "lucide-react";
import type { Project, Skill } from "../../types";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  // 1. Charger les données au démarrage
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Récupérer les projets
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      if (projectsData) setProjects(projectsData as Project[]);

      // Récupérer les skills
      const { data: skillsData } = await supabase
        .from("skills")
        .select("*")
        .order("id");
      if (skillsData) setSkills(skillsData as Skill[]);
    } catch (error) {
      console.error("Erreur chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fonction de Déconnexion
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  // 3. Fonction de Suppression Projet
  const handleDeleteProject = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?"))
      return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      alert("Erreur lors de la suppression");
      console.error(error);
    } else {
      // On met à jour la liste locale sans recharger la page
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!window.confirm("Supprimer cette compétence ?")) return;

    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Erreur suppression skill");
    } else {
      setSkills(skills.filter((s) => s.id !== id));
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-3xl font-bold">Tableau de Bord</h1>
            <p className="text-gray-400 mt-1">
              Gérez le contenu de votre portfolio.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-white px-4 py-2 transition-colors"
            >
              Voir le site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 border border-red-500/20 transition-colors"
            >
              <LogOut size={18} /> Déconnexion
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* --- SECTION PROJETS --- */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Mes Projets{" "}
                <span className="text-sm bg-blue-600 px-2 py-0.5 rounded-full">
                  {projects.length}
                </span>
              </h2>
              <button
                onClick={() => navigate("/admin/projects/new")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
              >
                <Plus size={16} /> Ajouter
              </button>
            </div>

            <div className="divide-y divide-slate-800 max-h-[500px] overflow-y-auto">
              {projects.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Aucun projet pour l'instant.
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 flex items-center gap-4 hover:bg-slate-800/30 transition-colors group"
                  >
                    {/* Image miniature */}
                    <div className="w-16 h-16 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
                      {project.Img ? (
                        <img
                          src={project.Img}
                          alt={project.Title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">
                          No img
                        </div>
                      )}
                    </div>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                          N°{project.display_order}
                        </span>
                        <h3 className="font-bold text-white truncate">
                          {project.Title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {project.Description}
                      </p>
                      <div className="flex gap-2 mt-1">
                        {project.TechStack?.slice(0, 3).map((t: string) => (
                          <span
                            key={t}
                            className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 border border-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() =>
                          navigate(`/admin/projects/edit/${project.id}`)
                        } // On créera cette route après
                        className="p-2 bg-slate-800 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                        title="Modifier"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 bg-slate-800 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* --- SECTION SKILLS --- */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Mes Compétences{" "}
                <span className="text-sm bg-blue-600 px-2 py-0.5 rounded-full">
                  {skills.length}
                </span>
              </h2>
              <button
                onClick={() => navigate("/admin/skills/new")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
              >
                <Plus size={16} /> Ajouter
              </button>
            </div>

            <div className="divide-y divide-slate-800 max-h-[500px] overflow-y-auto">
              {skills.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Aucune compétence.
                </div>
              ) : (
                skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Logo Skill */}
                      <div className="w-10 h-10 rounded-lg bg-slate-800 p-2 border border-slate-700 flex items-center justify-center">
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{skill.name}</h3>
                        <span className="text-xs text-blue-300 bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-500/20">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {/* Actions (Edit / Delete) */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-2 bg-slate-800 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
