
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Profile } from '@/types/auth';

export const useAuthProvider = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => fetchProfile(session.user.id), 0);
          // Load description count from localStorage for this user
          const storedCount = localStorage.getItem(`descriptionCount_${session.user.id}`);
          if (storedCount) {
            setDescriptionCount(parseInt(storedCount, 10));
          }
        } else {
          setProfile(null);
          // For anonymous users, use a generic key
          const storedCount = localStorage.getItem('descriptionCount_anonymous');
          if (storedCount) {
            setDescriptionCount(parseInt(storedCount, 10));
          }
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
        // Load description count for logged in user
        const storedCount = localStorage.getItem(`descriptionCount_${session.user.id}`);
        if (storedCount) {
          setDescriptionCount(parseInt(storedCount, 10));
        }
      } else {
        // Load description count for anonymous user
        const storedCount = localStorage.getItem('descriptionCount_anonymous');
        if (storedCount) {
          setDescriptionCount(parseInt(storedCount, 10));
        }
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erro ao buscar perfil:', error);
        return;
      }

      setProfile(data as Profile);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  };

  return {
    session,
    user,
    profile,
    loading,
    descriptionCount,
    setLoading,
    setDescriptionCount,
    fetchProfile,
    toast,
    navigate
  };
};
