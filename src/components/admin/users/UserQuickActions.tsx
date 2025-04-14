
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Star, User, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  // Convert current role to array for easier handling
  const roles = Array.isArray(currentRole) ? currentRole : currentRole ? [currentRole] : ['user'];
  
  const handleRoleChange = async (role: string) => {
    try {
      // If the role already exists, remove it (except 'user')
      if (roles.includes(role) && role !== 'user') {
        // Create a new array without the role
        const newRoles = roles.filter(r => r !== role);
        // If there are no roles left, add 'user'
        if (newRoles.length === 0) {
          newRoles.push('user');
        }
        await onUpdateRole(profileId, newRoles.length === 1 ? newRoles[0] : JSON.stringify(newRoles));
      } else if (!roles.includes(role)) {
        // Add the role to the current roles
        const newRoles = [...roles, role];
        await onUpdateRole(profileId, newRoles.length === 1 ? newRoles[0] : JSON.stringify(newRoles));
      }
    } catch (error) {
      console.error(`Erro ao alterar papel para ${role}:`, error);
    }
  };
  
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {roles.map(role => (
          <Badge 
            key={role} 
            variant="outline"
            className="flex items-center gap-1 px-2 py-1"
          >
            {role === 'admin' && <Crown className="w-3 h-3" />}
            {role === 'premium' && <Star className="w-3 h-3" />}
            {role === 'user' && <User className="w-3 h-3" />}
            {role}
            {role !== 'user' && (
              <X 
                className="w-3 h-3 ml-1 cursor-pointer text-gray-500 hover:text-red-500" 
                onClick={() => handleRoleChange(role)}
              />
            )}
          </Badge>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleRoleChange('user')}
          disabled={roles.includes('user')}
        >
          <User className="w-3 h-3 mr-1" />
          Usuário
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleRoleChange('premium')}
          disabled={roles.includes('premium')}
        >
          <Star className="w-3 h-3 mr-1" />
          Premium
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleRoleChange('admin')}
          disabled={roles.includes('admin')}
        >
          <Crown className="w-3 h-3 mr-1" />
          Admin
        </Button>
      </div>
    </div>
  );
};

export default UserQuickActions;
