
import { Session, User } from '@supabase/supabase-js';
import { Profile } from './auth';

export interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nome: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  hasRole: (role: string) => boolean;
  isAdmin: () => boolean;
  isPremium: () => boolean;
  descriptionCount: number;
  incrementDescriptionCount: () => void;
  canCreateMoreDescriptions: () => boolean;
}
