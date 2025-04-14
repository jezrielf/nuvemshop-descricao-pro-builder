
import { Plan } from '../types';
import { useDialogState } from './useDialogState';
import { useDeletePlan } from './useDeletePlan';
import { useCreatePlan } from './useCreatePlan';
import { useUpdatePlan } from './useUpdatePlan';

export const usePlanActions = (
  plans: Plan[], 
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>, 
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  fetchPlans: () => Promise<void>
) => {
  const dialogState = useDialogState();
  
  const { handleDeleteConfirm } = useDeletePlan(
    plans, 
    setPlans, 
    setLoading, 
    dialogState.setIsDeleteDialogOpen,
    fetchPlans
  );

  const { handleCreatePlan } = useCreatePlan(
    plans,
    setPlans,
    setLoading,
    dialogState.setIsCreateDialogOpen,
    fetchPlans
  );

  const { handleUpdatePlan } = useUpdatePlan(
    plans,
    setPlans,
    setLoading,
    dialogState.setIsEditDialogOpen,
    fetchPlans
  );

  return {
    ...dialogState,
    handleDeleteConfirm: () => handleDeleteConfirm(dialogState.selectedPlan),
    handleCreatePlan,
    handleUpdatePlan
  };
};
