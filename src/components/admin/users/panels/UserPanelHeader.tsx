
import React from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import CreateUserForm from '../CreateUserForm';
import UserSearchBar from './UserSearchBar';

interface UserPanelHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  loading: boolean;
  isCreateUserSheetOpen: boolean;
  setIsCreateUserSheetOpen: (value: boolean) => void;
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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h2 className="text-xl font-semibold">Gerenciar Usuários</h2>
      
      <div className="flex w-full sm:w-auto gap-2">
        <UserSearchBar 
          searchTerm={searchTerm} 
          onSearchChange={onSearchChange} 
        />
        
        <Sheet open={isCreateUserSheetOpen} onOpenChange={setIsCreateUserSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Criar Novo Usuário</SheetTitle>
              <SheetDescription>
                Adicione um novo usuário ao sistema
              </SheetDescription>
            </SheetHeader>
            <CreateUserForm 
              onUserCreated={handleCreateUser} 
              onClose={() => setIsCreateUserSheetOpen(false)}
            />
          </SheetContent>
        </Sheet>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default UserPanelHeader;
