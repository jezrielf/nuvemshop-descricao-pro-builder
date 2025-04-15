
import React from 'react';
import { Profile } from '@/types/auth';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import UserEditForm from '../UserEditForm';
import { UserFormValues } from '../types';

interface UserEditSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingUser: Profile | null;
  onUpdateProfile: (values: UserFormValues) => Promise<void>;
  onUpdateRole: (userId: string, newRole: string | string[]) => Promise<void>;
}

const UserEditSheet: React.FC<UserEditSheetProps> = ({
  isOpen,
  onOpenChange,
  editingUser,
  onUpdateProfile,
  onUpdateRole,
}) => {
  if (!editingUser) return null;
  
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Editar Usuário</SheetTitle>
          <SheetDescription>
            Editar informações para usuário {editingUser.nome || 'Sem nome'}
          </SheetDescription>
        </SheetHeader>
        
        <UserEditForm 
          profile={editingUser}
          onUpdateProfile={onUpdateProfile}
          onUpdateRole={(userId, newRole) => onUpdateRole(userId, newRole)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default UserEditSheet;
