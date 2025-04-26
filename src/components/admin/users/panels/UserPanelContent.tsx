
import React from 'react';
import { Profile } from '@/types/auth';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';
import UserTable from '../UserTable';

interface UserPanelContentProps {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const UserPanelContent: React.FC<UserPanelContentProps> = ({
  profiles,
  loading,
  error,
  onRefresh
}) => {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-500">
        <p>Nenhum usuário encontrado.</p>
      </Card>
    );
  }

  return (
    <UserTable profiles={profiles} loading={loading} error={error} onRefresh={onRefresh} />
  );
};

export default UserPanelContent;
