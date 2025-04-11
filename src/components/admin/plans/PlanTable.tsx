
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

interface PlanTableProps {
  plans: Plan[];
  onViewPlan: (plan: Plan) => void;
  onDeleteClick: (plan: Plan) => void;
}

const PlanTable: React.FC<PlanTableProps> = ({ 
  plans, 
  onViewPlan, 
  onDeleteClick 
}) => {
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
            onDeleteClick={onDeleteClick} 
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default PlanTable;
