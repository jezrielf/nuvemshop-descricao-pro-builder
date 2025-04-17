
import React from 'react';
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
import { LogOut, Shield, Settings, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserButton: React.FC = () => {
  const { user, profile, signOut, isAdmin, isPremium, isBusiness, openCustomerPortal } = useAuth();

  if (!user) {
    return (
      <Button variant="outline" asChild size="sm" className="h-8 text-xs sm:text-sm">
        <Link to="/auth">Entrar</Link>
      </Button>
    );
  }

  const userInitial = profile?.nome ? profile.nome[0].toUpperCase() : user.email?.[0].toUpperCase() || 'U';
  const isSubscribed = isPremium() || isBusiness();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.nome || user.email || ''} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">{profile?.nome || 'Usuário'}</p>
              {profile?.role && (
                <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'} className="ml-2">
                  {profile.role}
                </Badge>
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Nova opção de Descrições para todos os usuários */}
        <DropdownMenuItem asChild>
          <Link to="/admin?tab=descriptions" className="flex items-center cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>Descrições</span>
          </Link>
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
