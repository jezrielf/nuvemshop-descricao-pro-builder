
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface UserRoleBadgeProps {
  role: string | null;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  return (
    <Badge variant={role === 'admin' ? 'default' : role === 'premium' ? 'outline' : 'secondary'}>
      {role || 'user'}
    </Badge>
  );
};

export default UserRoleBadge;
