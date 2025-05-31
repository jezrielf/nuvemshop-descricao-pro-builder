
import React, { useEffect, useState } from 'react';
import PlanManagementHeader from './plans/PlanManagementHeader';
import PlanManagementContent from './plans/PlanManagementContent';
import PlanManagementDialogs from './plans/PlanManagementDialogs';
import { usePlansData } from './plans/hooks/usePlansData';
import { usePlanActions } from './plans/hooks/usePlanActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PlansPanel: React.FC = () => {
  const { plans, loading, setLoading, fetchPlans } = usePlansData();
  const [subscribersStats, setSubscribersStats] = useState({
    total: 0,
    active: 0,
    premium: 0,
    basic: 0
  });
  const { toast } = useToast();
  
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
  
  const fetchSubscribersStats = async () => {
    try {
      console.log('Fetching subscribers stats...');
      
      // Get total subscribers
      const { count: totalSubscribers, error: totalError } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true });
      
      if (totalError) {
        console.error('Error counting total subscribers:', totalError);
      }
      
      // Get active subscribers
      const { count: activeSubscribers, error: activeError } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('subscribed', true);
      
      if (activeError) {
        console.error('Error counting active subscribers:', activeError);
      }
      
      // Get premium subscribers
      const { count: premiumSubscribers, error: premiumError } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('subscribed', true)
        .ilike('subscription_tier', '%premium%');
      
      if (premiumError) {
        console.error('Error counting premium subscribers:', premiumError);
      }
      
      // Get basic subscribers
      const { count: basicSubscribers, error: basicError } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('subscribed', true)
        .ilike('subscription_tier', '%basic%');
      
      if (basicError) {
        console.error('Error counting basic subscribers:', basicError);
      }
      
      setSubscribersStats({
        total: totalSubscribers || 0,
        active: activeSubscribers || 0,
        premium: premiumSubscribers || 0,
        basic: basicSubscribers || 0
      });
      
      console.log('Subscribers stats updated:', {
        total: totalSubscribers || 0,
        active: activeSubscribers || 0,
        premium: premiumSubscribers || 0,
        basic: basicSubscribers || 0
      });
    } catch (error) {
      console.error('Error fetching subscribers stats:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar estatísticas de assinantes',
        variant: 'destructive'
      });
    }
  };
  
  // Load data on component mount
  useEffect(() => {
    fetchPlans();
    fetchSubscribersStats();
  }, []);
  
  // Log plans when they change for debugging
  useEffect(() => {
    console.log("Planos atualizados:", plans.length);
  }, [plans]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Planos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plans.length}</div>
            <p className="text-xs text-muted-foreground">
              {plans.filter(p => p.isActive).length} ativos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Assinantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribersStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {subscribersStats.active} ativos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assinantes Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribersStats.premium}</div>
            <p className="text-xs text-muted-foreground">
              {subscribersStats.total > 0 ? 
                Math.round((subscribersStats.premium / subscribersStats.total) * 100) : 0}% do total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assinantes Básico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribersStats.basic}</div>
            <p className="text-xs text-muted-foreground">
              {subscribersStats.total > 0 ? 
                Math.round((subscribersStats.basic / subscribersStats.total) * 100) : 0}% do total
            </p>
          </CardContent>
        </Card>
      </div>

      <PlanManagementHeader 
        onCreateClick={() => setIsCreateDialogOpen(true)}
        onRefreshClick={() => {
          fetchPlans();
          fetchSubscribersStats();
        }}
        loading={loading || isSubmitting}
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
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default PlansPanel;
