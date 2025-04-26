
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import CreateUserForm from '../CreateUserForm';
import { UserSearchBar } from './UserSearchBar';

export interface UserPanelHeaderProps {
  filterUsers: (query: string) => void;
  onRefresh: () => void;
  loading: boolean;
  onUserCreated: () => Promise<void>;
}

const UserPanelHeader: React.FC<UserPanelHeaderProps> = ({
  filterUsers,
  onRefresh,
  loading,
  onUserCreated
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <UserSearchBar onChange={filterUsers} />
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Criar Novo Usuário</SheetTitle>
              <SheetDescription>
                Crie um novo usuário com acesso ao sistema.
              </SheetDescription>
            </SheetHeader>
            <CreateUserForm onUserCreated={onUserCreated} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default UserPanelHeader;
