
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Settings, 
  LayoutDashboard, 
  FileText, 
  FileCode, 
  CreditCard, 
  LogOut, 
  Moon, 
  Sun, 
  Menu, 
  X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'users' | 'descriptions' | 'templates' | 'plans' | 'settings';
  onTabChange: (tab: 'dashboard' | 'users' | 'descriptions' | 'templates' | 'plans' | 'settings') => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('adminDarkMode') === 'true');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Apply dark mode class to the document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem('adminDarkMode', darkMode ? 'true' : 'false');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado do painel administrativo',
    });
    navigate('/admin-auth');
  };

  // Tab defintion array for reuse in both desktop and mobile views
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'descriptions', label: 'Descrições', icon: FileText },
    { id: 'templates', label: 'Templates', icon: FileCode },
    { id: 'plans', label: 'Planos', icon: CreditCard },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  return (
    <div className={cn(
      "min-h-screen transition-colors",
      darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    )}>
      {/* Mobile Header */}
      <div className={cn(
        "lg:hidden flex justify-between items-center p-4 border-b",
        darkMode ? "border-gray-700" : "border-gray-200"
      )}>
        <h1 className="text-xl font-bold">Admin</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className={cn(
              "p-4 rounded-t-lg",
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            )}>
              <div className="flex flex-col gap-2 mb-6">
                {tabs.map(tab => (
                  <Button 
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'outline'} 
                    onClick={() => {
                      onTabChange(tab.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-start w-full"
                  >
                    <tab.icon className="mr-2 h-5 w-5" />
                    {tab.label}
                  </Button>
                ))}
                <Button 
                  variant="destructive" 
                  onClick={handleLogout} 
                  className="flex items-center justify-start w-full mt-4"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sair
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      
      {/* Desktop Layout */}
      <div className="flex h-screen lg:overflow-hidden">
        {/* Sidebar */}
        <div className={cn(
          "hidden lg:block w-64 border-r p-4 h-full",
          darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200"
        )}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <nav className="flex flex-col gap-2">
              {tabs.map(tab => (
                <Button 
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'} 
                  onClick={() => onTabChange(tab.id as any)}
                  className="flex items-center justify-start w-full"
                >
                  <tab.icon className="mr-2 h-5 w-5" />
                  {tab.label}
                </Button>
              ))}
            </nav>
          </ScrollArea>
          
          <div className="absolute bottom-4 w-56">
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="flex items-center w-full mt-4"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className={cn(
            "p-6 max-w-7xl mx-auto",
            darkMode ? "bg-gray-900" : "bg-white"
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
