
import React from 'react';
import PlanDetailsDialog from './PlanDetailsDialog';
import DeletePlanDialog from './DeletePlanDialog';
import PlanFormDialog from './PlanFormDialog';
import { Plan } from './types';

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
  onUpdateSubmit
}) => {
  return (
    <>
      {/* View Plan Dialog */}
      <PlanDetailsDialog
        open={isViewOpen}
        onOpenChange={onViewOpenChange}
        selectedPlan={selectedPlan}
      />

      {/* Create Plan Dialog */}
      <PlanFormDialog
        open={isCreateDialogOpen}
        onOpenChange={onCreateOpenChange}
        onSubmit={onCreateSubmit}
        title="Criar Novo Plano"
      />

      {/* Edit Plan Dialog */}
      <PlanFormDialog
        open={isEditDialogOpen}
        onOpenChange={onEditOpenChange}
        onSubmit={(data) => {
          if (selectedPlan) {
            onUpdateSubmit({ ...data, id: selectedPlan.id, priceId: selectedPlan.priceId });
          }
        }}
        title="Editar Plano"
        initialData={selectedPlan}
      />

      {/* Delete Confirmation Dialog */}
      <DeletePlanDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        selectedPlan={selectedPlan}
        onConfirmDelete={onConfirmDelete}
      />
    </>
  );
};

export default PlanManagementDialogs;
