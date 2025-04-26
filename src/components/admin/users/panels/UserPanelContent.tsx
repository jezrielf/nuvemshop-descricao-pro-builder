
import React from 'react';
import { Profile } from '@/types/auth';
import UserTable from '../UserTable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

interface UserPanelContentProps {
  loading: boolean;
  error: string | null;
  profiles: Profile[];
  onRefresh: () => void;
}

const UserPanelContent: React.FC<UserPanelContentProps> = ({
  loading,
  error,
  profiles,
  onRefresh,
}) => {
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro ao carregar usuários</AlertTitle>
        <AlertDescription>
          {error}
          <div className="mt-4">
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="p-6">
      <UserTable
        profiles={profiles}
        loading={loading}
        error={error}
        onRefresh={onRefresh}
      />
    </Card>
  );
};

export default UserPanelContent;
