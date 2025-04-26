
import React from 'react';
import { Profile } from '@/types/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import UserTable from '../UserTable';
import { Button } from '@/components/ui/button';

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
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Erro ao carregar usuários</AlertTitle>
        <AlertDescription>
          <p>{error}</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            className="mt-2"
          >
            Tentar novamente
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {loading ? (
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <UserTable 
          profiles={profiles} 
          loading={loading}
          error={error}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
};

export default UserPanelContent;
