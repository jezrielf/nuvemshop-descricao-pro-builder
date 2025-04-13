
import { Profile } from "@/types/auth";

export interface UserTableProps {
  profiles: Profile[];
  loading: boolean;
  onRefresh: () => void;
}

export interface UserFormValues {
  nome: string;
  role: string; // For form values, we'll still use a single role string
}
