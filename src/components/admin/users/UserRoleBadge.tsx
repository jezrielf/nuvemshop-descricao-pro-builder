
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User, Crown, Star } from 'lucide-react';
import { getRoles } from '@/utils/roleUtils';

interface UserRoleBadgeProps {
  role: string | string[] | null;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  // If this is a single role string
  if (typeof role === 'string' && !role.includes(',')) {
    return <SingleRoleBadge role={role} />;
  }
  
  // For arrays or comma-separated strings, display each role
  const roleArray = getRoles(role);
  
  return (
    <>
      {roleArray.map(r => (
        <SingleRoleBadge key={r} role={r} />
      ))}
    </>
  );
};

interface SingleRoleBadgeProps {
  role: string;
}

const SingleRoleBadge: React.FC<SingleRoleBadgeProps> = ({ role }) => {
  // Define styling based on role
  let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
  let icon = null;
  let label = role;
  
  switch (role.toLowerCase()) {
    case 'admin':
      variant = "destructive";
      icon = <Crown className="w-3 h-3 mr-1" />;
      break;
    case 'premium':
      variant = "default";
      icon = <Star className="w-3 h-3 mr-1" />;
      break;
    case 'user':
      variant = "secondary";
      icon = <User className="w-3 h-3 mr-1" />;
      break;
    default:
      variant = "outline";
  }
  
  return (
    <Badge variant={variant} className="inline-flex items-center mr-1">
      {icon}
      {label}
    </Badge>
  );
};

export default UserRoleBadge;
