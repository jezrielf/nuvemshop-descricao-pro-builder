
import { useState } from 'react';
import { Plan } from '../types';
import { useDeletePlan } from './useDeletePlan';
import { useCreatePlan } from './useCreatePlan';
import { useUpdatePlan } from './useUpdatePlan';

export const usePlanActions = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  fetchPlans: () => Promise<void>
) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { handleDeleteConfirm, isSubmitting: isDeleting } = useDeletePlan(
    setLoading, 
    setIsDeleteDialogOpen, 
    fetchPlans
  );

  const { handleCreatePlan, isSubmitting: isCreating } = useCreatePlan(
    setLoading,
    setIsCreateDialogOpen,
    fetchPlans
  );

  const { handleUpdatePlan, isSubmitting: isUpdating } = useUpdatePlan(
    setLoading,
    setIsEditDialogOpen,
    fetchPlans
  );

  const handleViewPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsViewOpen(true);
  };

  const handleEditClick = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (plan: Plan) => {
    setSelectedPlan(plan);
    // Store the plan to delete in the global variable
    if (typeof window !== 'undefined') {
      window.selectedPlanToDelete = plan;
    }
    setIsDeleteDialogOpen(true);
  };

  return {
    // State
    selectedPlan,
    isViewOpen,
    isDeleteDialogOpen,
    isCreateDialogOpen,
    isEditDialogOpen,
    isSubmitting: isDeleting || isCreating || isUpdating,
    
    // Setters
    setSelectedPlan,
    setIsViewOpen,
    setIsDeleteDialogOpen,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    
    // Handlers
    handleViewPlan,
    handleEditClick,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCreatePlan,
    handleUpdatePlan,
  };
};
