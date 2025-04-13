
export type Profile = {
  id: string;
  nome: string | null;
  avatar_url: string | null;
  criado_em: string;
  atualizado_em: string;
  role: string | null; // Campo role para corresponder ao nosso esquema de banco de dados
};
