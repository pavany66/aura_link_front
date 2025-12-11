import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async (session) => {
      setSession(session);
      if (session?.user) {
        // Fetch the user's profile based on the new session
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(userProfile || null);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    // Set up real-time listener for auth changes (sign in, sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setData(session);
    });

    // Get the initial session status on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setData(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = { session, user: session?.user, profile, loading };
  
  // FIX: Allow all children to render. 
  // The component-level logic (AuthPage/ProtectedRoute) will use the 'profile' and 'loading' flags.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);