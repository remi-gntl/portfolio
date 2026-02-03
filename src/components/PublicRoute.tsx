import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const PublicRoute = () => {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });
  }, []);

  if (session === null) return null; // Chargement silencieux

  // Si l'utilisateur EST connecté, on le vire vers le dashboard
  if (session) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Sinon, on le laisse accéder à la page (Login)
  return <Outlet />;
};

export default PublicRoute;