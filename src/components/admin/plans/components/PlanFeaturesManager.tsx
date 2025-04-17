
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { PlanFormValues } from '../hooks/usePlanForm';

interface PlanFeaturesManagerProps {
  form: UseFormReturn<PlanFormValues>;
  newFeatureName: string;
  setNewFeatureName: (name: string) => void;
}

export const PlanFeaturesManager: React.FC<PlanFeaturesManagerProps> = ({
  form,
  newFeatureName,
  setNewFeatureName,
}) => {
  const addNewFeature = () => {
    if (newFeatureName.trim() === '') return;
    
    const currentFeatures = form.getValues().features || [];
    const newFeature = {
      id: `feature-${uuidv4()}`,
      name: newFeatureName,
      included: false
    };
    
    form.setValue('features', [...currentFeatures, newFeature]);
    setNewFeatureName('');
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues().features;
    const updatedFeatures = [...currentFeatures];
    updatedFeatures.splice(index, 1);
    form.setValue('features', updatedFeatures);
  };

  return (
    <div className="space-y-2">
      <FormLabel>Recursos Incluídos</FormLabel>
      <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
        {form.watch('features').map((feature, index) => (
          <FormField
            key={feature.id}
            control={form.control}
            name={`features.${index}.included`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="flex-1 mr-2">
                  <FormLabel className="m-0">
                    {form.getValues().features[index].name}
                  </FormLabel>
                </div>
                <div className="flex items-center">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </FormItem>
            )}
          />
        ))}
      </div>
      
      <div className="flex items-center space-x-2 mt-4">
        <Input 
          value={newFeatureName} 
          onChange={(e) => setNewFeatureName(e.target.value)}
          placeholder="Nome do novo recurso" 
          className="flex-1"
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={addNewFeature}
          disabled={!newFeatureName.trim()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar
        </Button>
      </div>
    </div>
  );
};
