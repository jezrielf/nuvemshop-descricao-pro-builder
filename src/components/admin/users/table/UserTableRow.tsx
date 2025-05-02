
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Profile } from '@/types/auth';
import UserRoleBadge from '../UserRoleBadge';
import UserActions from '../actions/UserActions';
import { getRoles } from '@/utils/roleUtils';

interface UserTableRowProps {
  profile: Profile;
  updatingUser: string | null;
  onEdit: (profile: Profile) => void;
  onDelete: (profileId: string) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  profile,
  updatingUser,
  onEdit,
  onDelete,
}) => {
  // Format date to local representation
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };
  
  // Get roles in a consistent format
  const roles = getRoles(profile.role);

  return (
    <TableRow>
      <TableCell className="font-medium">{profile.nome || 'Sem nome'}</TableCell>
      <TableCell>{profile.email || 'N/A'}</TableCell>
      <TableCell className="space-x-1">
        {roles.map(role => (
          <UserRoleBadge key={role} role={role} />
        ))}
      </TableCell>
      <TableCell>{formatDate(profile.criado_em)}</TableCell>
      <TableCell>
        <UserActions
          profile={profile}
          updatingUser={updatingUser}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
