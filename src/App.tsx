import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Pages & Components Publics
import WelcomeScreen from "./pages/WelcomeScreen";
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/Background";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

// Admin & Security Components
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import CreateProject from "./pages/admin/CreateProject";
import EditProject from "./pages/admin/EditProject";
import CreateSkill from "./pages/admin/CreateSkill";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Pour remonter en haut de page à chaque changement de route
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <AnimatedBackground />

      {/* 1. ÉCRAN DE CHARGEMENT (Seulement sur le site public) */}
      <AnimatePresence mode="wait">
        {showWelcome && !isAdminRoute && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {/* 2. CONTENU PRINCIPAL */}
      {(!showWelcome || isAdminRoute) && (
        <>
          {/* Navbar : Cachée si on est sur l'admin */}
          {!isAdminRoute && <Navbar />}

          <Routes>
            {/* --- ROUTES PUBLIQUES (Site Vitrine) --- */}
            <Route
              path="/"
              element={
                <main className="relative z-10">
                  {/* AJOUT DES IDs POUR LE SCROLL */}
                  <section id="home">
                    <Home />
                  </section>
                  
                  <section id="about">
                    <About />
                  </section>
                  
                  <section id="portfolio">
                    <Portfolio />
                  </section>
                  
                  <section id="contact">
                    <Contact />
                  </section>
                </main>
              }
            />
            <Route path="/project/:id" element={<ProjectDetails />} />

            {/* --- ROUTES ADMIN (Back Office Sécurisé) --- */}
            
            {/* A. Redirection automatique : /admin -> /admin/login */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

            {/* B. Zone "Invité" : Accessible seulement si NON connecté (Login) */}
            <Route element={<PublicRoute />}>
               <Route path="/admin/login" element={<Login />} />
            </Route>

            {/* C. Zone "Protégée" : Accessible seulement si CONNECTÉ (Dashboard) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/projects/new" element={<CreateProject />} />
              <Route path="/admin/projects/edit/:id" element={<EditProject />} />
              <Route path="/admin/skills/new" element={<CreateSkill />} />
            </Route>

            {/* --- 404 (Doit toujours être à la fin) --- */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Footer : Caché si on est sur l'admin */}
          {!isAdminRoute && <Footer />}
        </>
      )}
    </>
  );
}

export default App;