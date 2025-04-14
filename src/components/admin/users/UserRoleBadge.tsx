
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

  const getRoleBadge = (roleType: string) => {
    switch (roleType.toLowerCase()) {
      case 'admin':
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Admin
          </Badge>
        );
      case 'premium':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            Premium
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <User className="w-3 h-3" />
            User
          </Badge>
        );
    }
  };
  
  return getRoleBadge(primaryRole);
};

export default UserRoleBadge;
