
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface UserRoleBadgeProps {
  role: string | string[] | null;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  // Handle case when role is an array
  const primaryRole = Array.isArray(role) ? role[0] : role;
  
  // Determine variant based on the primary role
  const getVariant = () => {
    if (primaryRole === 'admin') return 'default';
    if (primaryRole === 'premium') return 'outline';
    return 'secondary';
  };
  
  return (
    <Badge variant={getVariant()}>
      {primaryRole || 'user'}
    </Badge>
  );
};

export default UserRoleBadge;
