
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, User } from 'lucide-react';

interface UserRoleBadgeProps {
  role: string | string[] | null;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  // Get the primary role for display
  const primaryRole = role ? 
    (Array.isArray(role) ? role[0] : role) : 
    'user';
    
  console.log('UserRoleBadge - role recebido:', role);
  console.log('UserRoleBadge - primaryRole:', primaryRole);

  const getRoleBadge = (roleType: string) => {
    switch (roleType.toLowerCase()) {
      case 'admin':
        return (
          <Badge variant="default" className="flex items-center gap-1 bg-red-500 text-white">
            <Crown className="w-3 h-3" />
            Admin
          </Badge>
        );
      case 'premium':
        return (
          <Badge variant="secondary" className="flex items-center gap-1 bg-purple-500 text-white">
            <Star className="w-3 h-3" />
            Premium
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-gray-100">
            <User className="w-3 h-3" />
            Usuário
          </Badge>
        );
    }
  };
  
  return getRoleBadge(primaryRole);
};

export default UserRoleBadge;
