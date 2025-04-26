
import { Profile } from '@/types/auth';
import { convertToProfile } from '@/hooks/useAuthProvider';

// Mock API functions for user management
export const fetchUsers = async (): Promise<Profile[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock data
  const mockUsers = [
    {
      id: 'user-1',
      nome: 'João Silva',
      email: 'joao@example.com',
      role: 'admin',
      avatar_url: 'https://i.pravatar.cc/150?img=1',
      criado_em: '2023-01-15',
      atualizado_em: '2023-06-20',
    },
    {
      id: 'user-2',
      nome: 'Maria Oliveira',
      email: 'maria@example.com',
      role: 'premium',
      avatar_url: 'https://i.pravatar.cc/150?img=5',
      criado_em: '2023-02-10',
      atualizado_em: '2023-05-15',
    },
    {
      id: 'user-3',
      nome: 'Carlos Santos',
      email: 'carlos@example.com',
      role: 'user',
      avatar_url: 'https://i.pravatar.cc/150?img=8',
      criado_em: '2023-03-22',
      atualizado_em: '2023-03-22',
    },
  ];
  
  return convertUserProfiles(mockUsers);
};

// Convert user profiles from API format to our application format
export const convertUserProfiles = (users: any[]): Profile[] => {
  return users.map(user => convertToProfile(user));
};

export const updateUserRole = async (userId: string, newRole: string): Promise<Profile> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would update the user in the database
  console.log(`Updated user ${userId} role to ${newRole}`);
  
  // Return mock updated user
  return convertToProfile({
    id: userId,
    nome: 'Updated User',
    email: 'user@example.com',
    role: newRole,
    avatar_url: 'https://i.pravatar.cc/150?img=3',
    criado_em: '2023-01-01',
    atualizado_em: new Date().toISOString(),
  });
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would delete the user from the database
  console.log(`Deleted user ${userId}`);
  
  // Return success
  return true;
};
