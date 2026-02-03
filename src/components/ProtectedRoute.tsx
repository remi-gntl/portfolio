import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProtectedRoute = () => {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Vérifie la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });

    // 2. Écoute les changements (ex: déconnexion depuis un autre onglet)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Tant qu'on ne sait pas, on affiche rien (ou un spinner)
  if (session === null) {
    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-blue-500">Chargement...</div>;
  }

  // Si pas connecté -> Hop, direction Login
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  // Si connecté -> C'est bon, on affiche la page demandée (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;