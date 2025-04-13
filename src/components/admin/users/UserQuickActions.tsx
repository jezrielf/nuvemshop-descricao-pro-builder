
import React from 'react';
import { Button } from '@/components/ui/button';

interface UserQuickActionsProps {
  profileId: string;
  currentRole: string | string[] | null;
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
}

const UserQuickActions: React.FC<UserQuickActionsProps> = ({ 
  profileId, 
  currentRole, 
  onUpdateRole 
}) => {
  // Get primary role for comparison
  const primaryRole = Array.isArray(currentRole) ? currentRole[0] : currentRole;
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={primaryRole === 'user' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onUpdateRole(profileId, 'user')}
      >
        Usuário
      </Button>
      <Button 
        variant={primaryRole === 'premium' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onUpdateRole(profileId, 'premium')}
      >
        Premium
      </Button>
      <Button 
        variant={primaryRole === 'admin' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onUpdateRole(profileId, 'admin')}
      >
        Admin
      </Button>
    </div>
  );
};

export default UserQuickActions;
