
export type Profile = {
  id: string;
  nome: string | null;
  avatar_url: string | null;
  criado_em: string;
  atualizado_em: string;
  role: string | string[] | null; // Updated to support an array of roles
};
