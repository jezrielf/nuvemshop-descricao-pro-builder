
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ShoppingCart, BarChart3, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  stats: any;
}

const DashboardStatsGrid: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Usuários</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">
            {stats?.users?.total || 0}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats?.users?.growth > 0 ? '+' : ''}{stats?.users?.growth || 0}% desde o último mês
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Vendas</h3>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">
            {stats?.sales?.total || 0}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats?.sales?.growth > 0 ? '+' : ''}{stats?.sales?.growth || 0}% desde o último mês
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Receita</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">
            R$ {(stats?.revenue?.total || 0).toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats?.revenue?.growth > 0 ? '+' : ''}{stats?.revenue?.growth || 0}% desde o último mês
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">Conversões</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">
            {stats?.conversions?.rate || 0}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats?.conversions?.growth > 0 ? '+' : ''}{stats?.conversions?.growth || 0}% desde o último mês
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStatsGrid;
