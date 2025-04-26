
export interface Profile {
  id: string;
  email: string;
  name: string; // Keep this as name to maintain proper naming
  role: string | string[];
  avatarUrl?: string | null;
  
  // Add these properties for backward compatibility
  nome?: string;       // Alias for name
  criado_em?: string;  // Created at date
  atualizado_em?: string; // Updated at date
  avatar_url?: string; // Alias for avatarUrl
  
  // Add User properties that might be needed for compatibility with storage services
  app_metadata: any;
  user_metadata: any;
  aud: string;
  created_at: string;
}
