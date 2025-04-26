
import { useState, useEffect } from 'react';
import { convertToProfile } from './useAuthProvider';
import { Profile } from '@/types/auth';

export const useAuthSession = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch and set user function
  const fetchAndSetUser = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate fetching user data from an API
      const userData = {
        id: 'user-123',
        nome: 'Test User',
        email: 'test@example.com',
        role: 'user',
        avatar_url: 'https://i.pravatar.cc/150?img=3',
        criado_em: '2024-01-01',
        atualizado_em: '2024-01-02',
      };

      if (userData) {
        const convertedProfile = convertToProfile(userData);
        setUser(convertedProfile);
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    error,
  };
};
