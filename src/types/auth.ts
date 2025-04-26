
// Define the user profile type used in the application
export interface Profile {
  id: string;
  email: string;
  name: string;
  role: string | string[];
  avatarUrl?: string | null;
  
  // Additional properties required for compatibility with User type
  app_metadata: any;
  user_metadata: any;
  aud: string;
  created_at: string;
  
  // Optional properties that might be present
  nome?: string;
  criado_em?: string;
  atualizado_em?: string;
  avatar_url?: string;
}

// Define the auth state type
export interface AuthState {
  user: Profile | null;
  isLoading: boolean;
  error: string | null;
}
