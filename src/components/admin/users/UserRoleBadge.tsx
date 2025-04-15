
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, User } from 'lucide-react';

interface UserRoleBadgeProps {
  role: string | string[] | null;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  // Handle different role formats
  const roles = React.useMemo(() => {
    if (!role) return ['user'];
    if (typeof role === 'string') {
      // If it's a comma-separated string, split it
      if (role.includes(',')) {
        return role.split(',').map(r => r.trim());
      }
      return [role];
    }
    return role;
  }, [role]);
  
  // Check if user has the specific role
  const hasRole = (roleType: string) => roles.includes(roleType);
  
  // Get the primary badge (highest priority role)
  const getPrimaryBadge = () => {
    if (hasRole('admin')) {
      return (
        <Badge variant="default" className="flex items-center gap-1 bg-red-500 text-white">
          <Crown className="w-3 h-3" />
          Admin
        </Badge>
      );
    }
    
    if (hasRole('premium')) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-purple-500 text-white">
          <Star className="w-3 h-3" />
          Premium
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="flex items-center gap-1 bg-gray-100">
        <User className="w-3 h-3" />
        Usuário
      </Badge>
    );
  };
  
  // Show additional role badges if there are multiple roles
  const getAdditionalBadges = () => {
    if (roles.length <= 1) return null;
    
    return (
      <div className="flex gap-1 mt-1">
        {roles.length > 1 && (
          <Badge variant="outline" className="text-xs bg-gray-50">
            {roles.length} papéis
          </Badge>
        )}
      </div>
    );
  };
  
  return (
    <div>
      {getPrimaryBadge()}
      {getAdditionalBadges()}
    </div>
  );
};

export default UserRoleBadge;
