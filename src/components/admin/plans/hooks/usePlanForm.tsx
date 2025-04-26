
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Plan } from '../types';
import { v4 as uuidv4 } from 'uuid';

export interface PlanFormValues {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  isDefault: boolean;
  features: Array<{ id: string; name: string; included: boolean }>;
  interval: string;
  currency: string;
}

export const usePlanForm = (
  initialData: Plan | null,
  onSubmit: (data: Plan | Omit<Plan, 'id'>) => void,
  onClose: (open: boolean) => void
) => {
  const [newFeatureName, setNewFeatureName] = useState('');

  const form = useForm<PlanFormValues>({
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      isActive: initialData ? initialData.isActive : true,
      isDefault: initialData ? initialData.isDefault : false,
      features: initialData?.features || [],
      interval: initialData?.interval || 'month',
      currency: initialData?.currency || 'BRL',
    }
  });

  // Function to handle form submission
  const handleSubmit = form.handleSubmit((data) => {
    console.log("Submitting form data:", data);

    // If we have initialData, this is an edit operation
    if (initialData) {
      // Make sure we're keeping the id when submitting
      onSubmit({
        ...data,
        id: initialData.id,
        priceId: initialData.priceId
      } as Plan);
    } else {
      // For new plans, don't include an id (server will generate one)
      onSubmit(data);
    }
  });

  // Add a new feature to the form
  const addFeature = () => {
    if (!newFeatureName.trim()) return;
    
    const currentFeatures = form.getValues('features') || [];
    form.setValue('features', [
      ...currentFeatures,
      { id: uuidv4(), name: newFeatureName, included: true }
    ]);
    
    setNewFeatureName('');
  };

  // Remove a feature from the form
  const removeFeature = (featureId: string) => {
    const currentFeatures = form.getValues('features');
    form.setValue('features', currentFeatures.filter(f => f.id !== featureId));
  };

  // Toggle a feature's included status
  const toggleFeatureIncluded = (featureId: string) => {
    const currentFeatures = form.getValues('features');
    form.setValue('features', currentFeatures.map(f => 
      f.id === featureId ? { ...f, included: !f.included } : f
    ));
  };

  return {
    form,
    newFeatureName,
    setNewFeatureName,
    addFeature,
    removeFeature,
    toggleFeatureIncluded,
    handleSubmit,
  };
};
