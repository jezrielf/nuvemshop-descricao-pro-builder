
import { Profile } from "@/types/auth";

export interface UserTableProps {
  profiles: Profile[];
  loading: boolean;
  onRefresh: () => void;
}

export interface UserFormValues {
  nome: string;
  role: string | string[];
}

export interface CreateUserFormValues extends UserFormValues {
  email: string;
  password: string;
}
