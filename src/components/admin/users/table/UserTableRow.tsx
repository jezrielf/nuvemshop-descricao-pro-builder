
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Profile } from '@/types/auth';
import UserRoleBadge from '../UserRoleBadge';
import UserActions from '../actions/UserActions';

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
  return (
    <TableRow>
      <TableCell className="font-medium">{profile.nome || 'Sem nome'}</TableCell>
      <TableCell>{profile.email || 'N/A'}</TableCell>
      <TableCell>
        <UserRoleBadge role={profile.role} />
      </TableCell>
      <TableCell>{new Date(profile.criado_em).toLocaleDateString()}</TableCell>
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
