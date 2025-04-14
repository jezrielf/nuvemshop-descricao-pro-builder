
import React from 'react';
import PlanManagementHeader from './plans/PlanManagementHeader';
import PlanManagementContent from './plans/PlanManagementContent';
import PlanManagementDialogs from './plans/PlanManagementDialogs';
import { usePlansData } from './plans/hooks/usePlansData';
import { usePlanActions } from './plans/hooks/usePlanActions';

const PlansPanel: React.FC = () => {
  const { plans, setPlans, loading, setLoading, fetchPlans } = usePlansData();
  
  const { 
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
    handleDeleteConfirm,
    handleCreatePlan,
    handleUpdatePlan
  } = usePlanActions(plans, setPlans, setLoading);

  return (
    <div className="space-y-6">
      <PlanManagementHeader 
        onCreateClick={() => setIsCreateDialogOpen(true)}
        onRefreshClick={fetchPlans}
        loading={loading}
      />
      
      <PlanManagementContent
        plans={plans}
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
        selectedPlan={selectedPlan}
        onViewOpenChange={setIsViewOpen}
        onDeleteOpenChange={setIsDeleteDialogOpen}
        onCreateOpenChange={setIsCreateDialogOpen}
        onEditOpenChange={setIsEditDialogOpen}
        onConfirmDelete={handleDeleteConfirm}
        onCreateSubmit={handleCreatePlan}
        onUpdateSubmit={handleUpdatePlan}
      />
    </div>
  );
};

export default PlansPanel;
