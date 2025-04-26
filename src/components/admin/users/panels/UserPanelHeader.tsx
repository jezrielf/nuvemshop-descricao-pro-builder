
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateUserForm, { CreateUserFormProps } from '../CreateUserForm';
import UserSearchBar from './UserSearchBar';
import { useToast } from '@/hooks/use-toast';

interface UserPanelHeaderProps {
  filterUsers: (query: string) => void;
  onRefresh: () => void;
  loading: boolean;
  onUserCreated?: () => Promise<void>;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  isCreateUserSheetOpen?: boolean;
  setIsCreateUserSheetOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateUser?: () => Promise<void>;
}

const UserPanelHeader: React.FC<UserPanelHeaderProps> = ({
  onRefresh,
  loading,
  filterUsers,
  onUserCreated,
  searchTerm = '',
  onSearchChange = (value: string) => filterUsers(value),
  isCreateUserSheetOpen = false,
  setIsCreateUserSheetOpen = () => {},
  handleCreateUser = async () => {}
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      filterUsers(value);
    }
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <UserSearchBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <div className="flex gap-2 w-full sm:w-auto">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          
          {onUserCreated && (
            <CreateUserForm 
              onUserCreated={async () => {
                await onUserCreated();
                setDialogOpen(false);
                toast({
                  title: 'Usuário criado',
                  description: 'O usuário foi criado com sucesso.',
                });
              }}
            />
          )}
        </Dialog>
        <Button
          variant="outline"
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
