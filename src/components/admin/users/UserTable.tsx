
import React, { useState } from 'react';
import { Profile } from '@/types/auth';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserTableProps, UserFormValues } from './types';
import UserRoleBadge from './UserRoleBadge';
import UserEditForm from './UserEditForm';

const UserTable: React.FC<UserTableProps> = ({ profiles, loading, onRefresh }) => {
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<Profile | null>(null);

  const openEditSheet = (profile: Profile) => {
    setEditingUser(profile);
  };

  const updateUserProfile = async (values: UserFormValues) => {
    if (!editingUser) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          nome: values.nome,
          role: values.role,
          atualizado_em: new Date().toISOString()
        })
        .eq('id', editingUser.id);
        
      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'User data has been updated successfully.',
      });
      
      setEditingUser(null);
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          role: newRole,
          atualizado_em: new Date().toISOString()
        })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: 'Role updated',
        description: 'User role has been updated successfully.',
      });
      
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Error updating role',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const deleteUser = async (profileId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profileId);
        
      if (error) throw error;
      
      toast({
        title: 'User deleted',
        description: 'The user has been deleted successfully.',
      });
      
      onRefresh();
    } catch (error: any) {
      toast({
        title: 'Error deleting user',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table>
        <TableCaption>List of all registered users in the system</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell className="font-medium">{profile.nome || 'No name'}</TableCell>
                <TableCell>{profile.email || 'N/A'}</TableCell>
                <TableCell>
                  <UserRoleBadge role={profile.role} />
                </TableCell>
                <TableCell>{new Date(profile.criado_em).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => openEditSheet(profile)}>Edit</Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-md">
                        <SheetHeader>
                          <SheetTitle>Edit User</SheetTitle>
                          <SheetDescription>
                            Edit information for user {profile.nome || 'No name'}
                          </SheetDescription>
                        </SheetHeader>
                        
                        <UserEditForm 
                          profile={profile}
                          onUpdateProfile={updateUserProfile}
                          onUpdateRole={updateUserRole}
                        />
                      </SheetContent>
                    </Sheet>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteUser(profile.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default UserTable;
