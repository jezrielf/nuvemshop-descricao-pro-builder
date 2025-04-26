
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import UserSearchBar from './UserSearchBar';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import CreateUserForm from '../CreateUserForm';

interface UserPanelHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  loading: boolean;
  isCreateUserSheetOpen: boolean;
  setIsCreateUserSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateUser: () => Promise<void>;
}

const UserPanelHeader: React.FC<UserPanelHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onRefresh,
  loading,
  isCreateUserSheetOpen,
  setIsCreateUserSheetOpen,
  handleCreateUser,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-6">
      <div className="flex-1">
        <UserSearchBar value={searchTerm} onChange={onSearchChange} />
      </div>
      <div className="flex gap-2">
        <Button onClick={() => setIsCreateUserSheetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
        <Button variant="outline" onClick={onRefresh} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Create User Sheet */}
      <Sheet open={isCreateUserSheetOpen} onOpenChange={setIsCreateUserSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Criar Novo Usuário</SheetTitle>
            <SheetDescription>
              Preencha os dados para criar um novo usuário no sistema.
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6">
            <CreateUserForm onUserCreated={handleCreateUser} />
          </div>
          
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsCreateUserSheetOpen(false)}>
              Cancelar
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UserPanelHeader;
