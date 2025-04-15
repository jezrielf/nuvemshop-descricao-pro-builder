
import React from 'react';
import { Button } from '@/components/ui/button';
import { Profile } from '@/types/auth';

interface UserActionsProps {
  profile: Profile;
  updatingUser: string | null;
  onEdit: (profile: Profile) => void;
  onDelete: (profileId: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
  profile,
  updatingUser,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onEdit(profile)}
        disabled={updatingUser === profile.id}
      >
        Editar
      </Button>
      
      <Button 
        variant="destructive" 
        size="sm"
        onClick={() => onDelete(profile.id)}
        disabled={updatingUser === profile.id}
      >
        Excluir
      </Button>
    </div>
  );
};

export default UserActions;
