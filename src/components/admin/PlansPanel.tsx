
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Eye, Trash, Edit, Plus, Check, X } from 'lucide-react';

// Mock data for plans
const mockPlans = [
  {
    id: '1',
    name: 'Gratuito',
    price: 0,
    features: [
      { id: '1', name: 'Até 3 descrições', included: true },
      { id: '2', name: 'Templates básicos', included: true },
      { id: '3', name: 'Exportação HTML', included: true },
      { id: '4', name: 'Descrições ilimitadas', included: false },
      { id: '5', name: 'Todos os templates', included: false },
      { id: '6', name: 'Suporte prioritário', included: false },
    ],
    isActive: true,
    isDefault: true
  },
  {
    id: '2',
    name: 'Premium',
    price: 29.90,
    features: [
      { id: '1', name: 'Até 3 descrições', included: true },
      { id: '2', name: 'Templates básicos', included: true },
      { id: '3', name: 'Exportação HTML', included: true },
      { id: '4', name: 'Descrições ilimitadas', included: true },
      { id: '5', name: 'Todos os templates', included: true },
      { id: '6', name: 'Suporte prioritário', included: true },
    ],
    isActive: true,
    isDefault: false
  },
  {
    id: '3',
    name: 'Empresarial',
    price: 99.90,
    features: [
      { id: '1', name: 'Até 3 descrições', included: true },
      { id: '2', name: 'Templates básicos', included: true },
      { id: '3', name: 'Exportação HTML', included: true },
      { id: '4', name: 'Descrições ilimitadas', included: true },
      { id: '5', name: 'Todos os templates', included: true },
      { id: '6', name: 'Suporte prioritário', included: true },
      { id: '7', name: 'API para integração', included: true },
      { id: '8', name: 'White label', included: true },
    ],
    isActive: true,
    isDefault: false
  }
];

interface Plan {
  id: string;
  name: string;
  price: number;
  features: Array<{
    id: string;
    name: string;
    included: boolean;
  }>;
  isActive: boolean;
  isDefault: boolean;
}

const PlansPanel: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedPlan) return;
    
    // Remove the plan from our state
    setPlans(plans.filter(p => p.id !== selectedPlan.id));
    setIsDeleteDialogOpen(false);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Grátis';
    return `R$ ${price.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Planos</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Plano
        </Button>
      </div>
      
      <Card className="p-6">
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
              <TableRow key={plan.id}>
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
                      onClick={() => handleViewPlan(plan)}
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
                      onClick={() => handleDeleteClick(plan)}
                      disabled={plan.isDefault}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* View Plan Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Plano</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <div className="mt-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{selectedPlan.name}</h3>
                  <p className="text-xl font-bold mt-1">{formatPrice(selectedPlan.price)}</p>
                </div>
                <div className="space-y-2">
                  {selectedPlan.isActive ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Ativo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      Inativo
                    </Badge>
                  )}
                  {selectedPlan.isDefault && (
                    <Badge variant="outline" className="block ml-auto">
                      Plano Padrão
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-3">Recursos Incluídos:</h4>
                <ul className="space-y-2">
                  {selectedPlan.features.map(feature => (
                    <li key={feature.id} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                      ) : (
                        <X className="h-4 w-4 text-gray-400 mr-2" />
                      )}
                      <span className={!feature.included ? "text-gray-500" : ""}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o plano "{selectedPlan?.name}"? 
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlansPanel;
