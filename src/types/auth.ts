
export interface Profile {
  id: string;
  email: string;
  name: string; // Keep this as name to maintain proper naming
  role: string | string[];
  avatarUrl?: string | null;
  
  // Add these properties for backward compatibility
  nome?: string;       // Alias for name
  criado_em?: string;  // Created at date
}
