
export type Profile = {
  id: string;
  nome: string | null;
  avatar_url: string | null;
  criado_em: string;
  atualizado_em: string;
  role?: string; // Roles can be 'admin', 'premium', 'user', etc.
};
