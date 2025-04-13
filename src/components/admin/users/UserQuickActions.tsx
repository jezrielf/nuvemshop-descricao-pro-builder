
import React from 'react';
import { Button } from '@/components/ui/button';

interface UserQuickActionsProps {
  profileId: string;
  currentRole: string | null;
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
}

const UserQuickActions: React.FC<UserQuickActionsProps> = ({ 
  profileId, 
  currentRole, 
  onUpdateRole 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={currentRole === 'user' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onUpdateRole(profileId, 'user')}
      >
        Usuário
      </Button>
      <Button 
        variant={currentRole === 'premium' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onUpdateRole(profileId, 'premium')}
      >
        Premium
      </Button>
      <Button 
        variant={currentRole === 'admin' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onUpdateRole(profileId, 'admin')}
      >
        Admin
      </Button>
    </div>
  );
};

export default UserQuickActions;
