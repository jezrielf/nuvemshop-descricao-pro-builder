
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash, Edit, Check, X } from 'lucide-react';
import { Plan } from './types';

interface PlanItemProps {
  plan: Plan;
  onViewPlan: (plan: Plan) => void;
  onDeleteClick: (plan: Plan) => void;
}

const PlanItem: React.FC<PlanItemProps> = ({ 
  plan, 
  onViewPlan, 
  onDeleteClick 
}) => {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Grátis';
    return `R$ ${price.toFixed(2)}`;
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{plan.name}</TableCell>
      <TableCell>{formatPrice(plan.price)}</TableCell>
      <TableCell>
        {plan.isActive ? (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Ativo
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Inativo
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {plan.isDefault ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <X className="h-4 w-4 text-gray-400" />
        )}
      </TableCell>
      <TableCell>{plan.features.filter(f => f.included).length}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewPlan(plan)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDeleteClick(plan)}
            disabled={plan.isDefault}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PlanItem;
