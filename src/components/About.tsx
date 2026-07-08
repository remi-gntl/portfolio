import { motion } from "framer-motion";
import { Briefcase, GraduationCap, User, Rocket } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <User className="text-blue-500 w-8 h-8 md:w-10 md:h-10" />
            À Propos de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Moi
            </span>
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Carte Unique */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-[#0F172A] via-[#3b82f6] to-[#06b6d4]"></div>
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <div className="flex flex-col items-center -mt-16 mb-6">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-slate-900 border-4 border-slate-900 overflow-hidden shadow-2xl shadow-blue-500/30">
                      <img
                        src="/favicon.png"
                        alt="Rémi Gentil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mt-4">
                      Rémi Gentil
                    </h3>
                    <p className="text-sm text-blue-400">
                      Développeur Full Stack
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-6">
                    Je pilote des projets de A à Z : conception, développement,
                    déploiement et amélioration continue. <br /> À la rentrée,
                    je rejoins le{" "}
                    <span className="text-blue-400 font-semibold">
                      CNAM Paris
                    </span>{" "}
                    pour un cycle ingénieur.
                  </p>

                  {/* Séparateur */}
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-6"></div>

                  {/* Hobbies */}
                  <div className="space-y-3">
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                      <span className="text-blue-400">→</span>
                      En dehors du code
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { icon: "🏉", label: "Rugby" },
                        { icon: "🌊", label: "BNSSA (Sauveteur en Mer)" },
                      ].map((hobby) => (
                        <span
                          key={hobby.label}
                          className="px-3 py-1.5 bg-blue-900/20 text-blue-300 text-sm rounded-lg border border-blue-500/20 flex items-center gap-1.5 hover:bg-blue-900/30 transition-colors"
                        >
                          <span>{hobby.icon}</span>
                          {hobby.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Prochaine étape */}
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-6 rounded-2xl border border-blue-500/20">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-400" />
                Prochaine étape — Rentrée 2026
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="text-blue-300 font-semibold">CNAM Paris</span>{" "}
                — Cycle ingénieur DICASI, en alternance chez{" "}
                <span className="text-cyan-300 font-semibold">
                  CNP Assurances
                </span>{" "}
                (Unité SI Comptabilité, Fiscalité et Data), pour 3 ans.
              </p>
            </div>

            {/* Alternance actuelle */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                  <Briefcase className="text-blue-400 w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">
                    Développeur Full Stack & DevOps
                  </h3>
                  <p className="text-blue-400 font-medium text-sm mb-2">
                    The Gill Corporation • Alternance
                  </p>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                    2024 - 2026
                  </span>
                  <p className="text-gray-400 text-sm mt-3">
                    Pilotage complet de projets : conception, développement
                    (Laravel, React, Angular), déploiement Docker, reverse proxy
                    Nginx et CI/CD. Gestion de projet agile et amélioration
                    continue.
                  </p>
                </div>
              </div>
            </div>

            {/* Formation */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                  <GraduationCap className="text-blue-400 w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">
                    BUT Informatique
                  </h3>
                  <p className="text-blue-400 font-medium text-sm mb-2">
                    IUT de Bayonne
                  </p>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                    2022 - 2026
                  </span>
                  <p className="text-gray-400 text-sm mt-3">
                    Spécialisation réalisation d'applications et administration
                    système. Projets sur différentes stacks (Angular, Laravel,
                    Docker, SQLServer...).
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