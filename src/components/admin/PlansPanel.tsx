
import React, { useEffect } from 'react';
import PlanManagementHeader from './plans/PlanManagementHeader';
import PlanManagementContent from './plans/PlanManagementContent';
import PlanManagementDialogs from './plans/PlanManagementDialogs';
import { usePlansData } from './plans/hooks/usePlansData';
import { usePlanActions } from './plans/hooks/usePlanActions';
import { Plan as PlanType } from './plans/types';

const PlansPanel: React.FC = () => {
  const { plans, loading, setLoading, fetchPlans } = usePlansData();
  
  const { 
    selectedPlan,
    isViewOpen,
    isDeleteDialogOpen,
    isCreateDialogOpen,
    isEditDialogOpen,
    isSubmitting,
    setIsViewOpen,
    setIsDeleteDialogOpen,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    handleViewPlan,
    handleEditClick,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCreatePlan,
    handleUpdatePlan
  } = usePlanActions(setLoading, fetchPlans);
  
  // Log plans when they change for debugging
  useEffect(() => {
    console.log("Planos atualizados:", plans.length);
  }, [plans]);

  return (
    <div className="space-y-6">
      <PlanManagementHeader 
        onCreateClick={() => setIsCreateDialogOpen(true)}
        onRefreshClick={fetchPlans}
        loading={loading || isSubmitting}
      />
      
      <PlanManagementContent
        plans={plans as PlanType[]}
        loading={loading}
        onViewPlan={handleViewPlan}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <PlanManagementDialogs
        isViewOpen={isViewOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isCreateDialogOpen={isCreateDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        selectedPlan={selectedPlan as PlanType}
        onViewOpenChange={setIsViewOpen}
        onDeleteOpenChange={setIsDeleteDialogOpen}
        onCreateOpenChange={setIsCreateDialogOpen}
        onEditOpenChange={setIsEditDialogOpen}
        onConfirmDelete={handleDeleteConfirm}
        onCreateSubmit={handleCreatePlan}
        onUpdateSubmit={handleUpdatePlan}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default PlansPanel;
