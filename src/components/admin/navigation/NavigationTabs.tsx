
import React from 'react';
import { 
  Users, 
  LayoutDashboard, 
  FileText, 
  FileCode, 
  CreditCard
} from 'lucide-react';

export type AdminTab = 'dashboard' | 'users' | 'descriptions' | 'templates' | 'plans';

export const navigationTabs = [
  { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { id: 'users' as AdminTab, label: 'Usuários', icon: Users, path: '/admin' },
  { id: 'descriptions' as AdminTab, label: 'Descrições', icon: FileText, path: '/admin' },
  { id: 'templates' as AdminTab, label: 'Templates', icon: FileCode, path: '/admin-templates' },
  { id: 'plans' as AdminTab, label: 'Planos', icon: CreditCard, path: '/admin' }
];

export const getTabPath = (tab: AdminTab): string => {
  const tabItem = navigationTabs.find(item => item.id === tab);
  return tabItem ? tabItem.path : '/admin';
};
