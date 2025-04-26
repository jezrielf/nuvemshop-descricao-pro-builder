
import { Profile } from '@/types/auth';

/**
 * Converts a Profile's role field to a string array for consistent handling
 */
export const getRoleAsString = (role: string | string[] | null): string[] => {
  if (!role) return [];
  if (Array.isArray(role)) return role;
  return role.split(',').map(r => r.trim());
};

/**
 * Converts database data to a Profile object
 */
export const convertToProfile = (data: any): Profile => {
  return {
    id: data.id || '',
    nome: data.nome || null,
    avatar_url: data.avatar_url || null,
    criado_em: data.criado_em || new Date().toISOString(),
    atualizado_em: data.atualizado_em || new Date().toISOString(),
    role: data.role || null,
    email: data.email || null
  };
};
