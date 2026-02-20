import { useState } from "react";
import Projects from "./Projects";
import TechStack from "./TechStack";
import { Code, Layers } from "lucide-react";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "tech">("projects");

  return (
    <section
      id="portfolio"
      className="py-20 px-6 max-w-7xl mx-auto min-h-screen"
    >
      {/* Header Section */}
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-3xl md:text-5xl font-black">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Projets
          </span>{" "}
          <span className="text-white">&</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Réalisations
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explorez mon parcours à travers mes projets et mon expertise
          technique.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-slate-900/80 p-1.5 rounded-full border border-slate-800 inline-flex relative">
          {/* Bouton Projets */}
          <button
            onClick={() => setActiveTab("projects")}
            className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 ${
              activeTab === "projects"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Code size={18} /> Projets
          </button>

          {/* Bouton Tech Stack */}
          <button
            onClick={() => setActiveTab("tech")}
            className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 ${
              activeTab === "tech"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Layers size={18} /> Compétences
          </button>

          <div
            className={`absolute top-1.5 bottom-1.5 rounded-full bg-blue-600 transition-all duration-300 ease-out ${
              activeTab === "projects"
                ? "left-1.5 w-[140px]"
                : "left-[150px] w-[165px]"
            }`}
          ></div>
        </div>
      </div>

      <div className="min-h-[400px]">
        {activeTab === "projects" ? <Projects /> : <TechStack />}
      </div>
    </section>
  );
};

export default Portfolio;
