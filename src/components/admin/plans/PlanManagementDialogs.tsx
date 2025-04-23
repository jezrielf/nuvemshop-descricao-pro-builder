
import React from 'react';
import { Plan } from './types';
import DeletePlanDialog from './DeletePlanDialog';
import PlanDetailsDialog from './PlanDetailsDialog';
import PlanFormDialog from './PlanFormDialog';

interface PlanManagementDialogsProps {
  isViewOpen: boolean;
  isDeleteDialogOpen: boolean;
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  selectedPlan: Plan | null;
  onViewOpenChange: (open: boolean) => void;
  onDeleteOpenChange: (open: boolean) => void;
  onCreateOpenChange: (open: boolean) => void;
  onEditOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
  onCreateSubmit: (data: Omit<Plan, 'id'>) => void;
  onUpdateSubmit: (data: Plan) => void;
  isSubmitting: boolean;
}

const PlanManagementDialogs: React.FC<PlanManagementDialogsProps> = ({
  isViewOpen,
  isDeleteDialogOpen,
  isCreateDialogOpen,
  isEditDialogOpen,
  selectedPlan,
  onViewOpenChange,
  onDeleteOpenChange,
  onCreateOpenChange,
  onEditOpenChange,
  onConfirmDelete,
  onCreateSubmit,
  onUpdateSubmit,
  isSubmitting
}) => {
  return (
    <>
      {/* Visualização de detalhes do plano */}
      <PlanDetailsDialog
        open={isViewOpen}
        onOpenChange={onViewOpenChange}
        selectedPlan={selectedPlan}
      />

      {/* Diálogo de confirmação para exclusão */}
      <DeletePlanDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        selectedPlan={selectedPlan}
        onConfirmDelete={onConfirmDelete}
        isSubmitting={isSubmitting}
      />

      {/* Diálogo para criação de novo plano */}
      <PlanFormDialog
        open={isCreateDialogOpen}
        onOpenChange={onCreateOpenChange}
        onSubmit={onCreateSubmit}
        title="Criar Novo Plano"
        initialData={null}
        isSubmitting={isSubmitting}
      />

      {/* Diálogo para edição de plano existente */}
      <PlanFormDialog
        open={isEditDialogOpen}
        onOpenChange={onEditOpenChange}
        onSubmit={onUpdateSubmit}
        title="Editar Plano"
        initialData={selectedPlan}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default PlanManagementDialogs;
