
export interface Profile {
  id: string;
  email: string;
  name: string;
  role: string | string[];
  avatarUrl?: string | null;
}
