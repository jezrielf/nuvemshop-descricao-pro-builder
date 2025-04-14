
import { useState } from 'react';
import { Plan } from '../types';

export const useDialogState = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
    setIsDeleteDialogOpen(true);
  };

  return {
    selectedPlan,
    isViewOpen,
    isDeleteDialogOpen,
    isCreateDialogOpen,
    isEditDialogOpen,
    setIsViewOpen,
    setIsDeleteDialogOpen,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    handleViewPlan,
    handleEditClick,
    handleDeleteClick,
  };
};
