
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import PlanItem from './PlanItem';
import { Plan } from './types';
import { Skeleton } from '@/components/ui/skeleton';

interface PlanTableProps {
  plans: Plan[];
  loading?: boolean;
  onViewPlan: (plan: Plan) => void;
  onEditClick: (plan: Plan) => void;
  onDeleteClick: (plan: Plan) => void;
}

const PlanTable: React.FC<PlanTableProps> = ({ 
  plans, 
  loading = false,
  onViewPlan, 
  onEditClick,
  onDeleteClick 
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>Lista de todos os planos disponíveis no sistema</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Padrão</TableHead>
          <TableHead>Recursos</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans.map((plan) => (
          <PlanItem 
            key={plan.id} 
            plan={plan} 
            onViewPlan={onViewPlan} 
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick} 
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default PlanTable;
