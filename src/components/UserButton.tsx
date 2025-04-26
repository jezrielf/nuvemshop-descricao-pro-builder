
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { LogOut, Shield, Settings, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRoles } from '@/utils/roleUtils';

export const UserButton: React.FC = () => {
  const { 
    user, 
    profile, 
    signOut, 
    isAdmin, 
    isPremium, 
    isBusiness, 
    openCustomerPortal,
    refreshProfile,
    subscriptionTier
  } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Debug log para verificar os papéis do usuário
  useEffect(() => {
    if (profile) {
      console.log('UserButton - Perfil:', profile);
      console.log('UserButton - Roles:', profile.role);
      console.log('UserButton - isPremium:', isPremium());
      console.log('UserButton - isAdmin:', isAdmin());
      console.log('UserButton - subscriptionTier:', subscriptionTier);
    }
  }, [profile, isPremium, isAdmin, subscriptionTier]);

  // Handle manual profile refresh
  const handleRefreshProfile = async () => {
    setIsRefreshing(true);
    try {
      await refreshProfile();
    } finally {
      // Add a small delay to show the refresh icon animation
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  if (!user) {
    return (
      <Button variant="outline" asChild size="sm" className="h-8 text-xs sm:text-sm">
        <Link to="/auth">Entrar</Link>
      </Button>
    );
  }

  const userInitial = profile?.name ? profile.name[0].toUpperCase() : user.email?.[0].toUpperCase() || 'U';
  const isSubscribed = isPremium() || isBusiness();
  
  // Display the appropriate roles as badges
  const roles = getRoles(profile?.role);
  const mainRole = roles.includes('admin') ? 'admin' : 
                    roles.includes('premium') ? 'premium' : 
                    'user';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatarUrl || undefined} alt={profile?.name || user.email || ''} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">{profile?.name || 'Usuário'}</p>
              <Badge variant={mainRole === 'admin' ? 'default' : 'secondary'} className="ml-2">
                {mainRole}
              </Badge>
            </div>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            {roles.length > 1 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {roles.filter(r => r !== mainRole).map(role => (
                  <Badge key={role} variant="outline" className="text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleRefreshProfile} disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Atualizar Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isAdmin() && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/admin" className="flex items-center cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>Painel Admin</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {/* Mostrar opção de gestão de conta para usuários premium ou business */}
        {isSubscribed && (
          <>
            <DropdownMenuItem onClick={openCustomerPortal}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Gestão de Conta</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
