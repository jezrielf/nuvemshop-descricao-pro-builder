
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/editor';
import { usePremiumTemplates } from './usePremiumTemplates';

export const useTemplateOperations = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { premiumTemplates } = usePremiumTemplates();

  const loadTemplates = async (): Promise<Template[]> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTemplates: Template[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category as any,
        blocks: Array.isArray(item.blocks) ? item.blocks : [],
        user_id: item.user_id
      }));

      return formattedTemplates;
    } catch (error) {
      console.error('Error loading templates:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar templates",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const implementFullUpdate = async () => {
    try {
      setLoading(true);
      
      // Primeiro, deletar todos os templates existentes
      const { error: deleteError } = await supabase
        .from('templates')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (deleteError) {
        console.warn('Erro ao deletar templates existentes:', deleteError);
      }

      // Inserir os novos templates premium
      const templatesForInsert = premiumTemplates.map(template => ({
        name: template.name,
        category: template.category,
        blocks: template.blocks
      }));

      // Type assertion to match Supabase expected type (without id field)
      const { error: insertError } = await supabase
        .from('templates')
        .insert(templatesForInsert as any);

      if (insertError) throw insertError;

      toast({
        title: "✨ Atualização Completa Implementada!",
        description: `${premiumTemplates.length} templates premium foram criados com sucesso.`,
      });

      return true;
    } catch (error) {
      console.error('Error implementing full update:', error);
      toast({
        title: "Erro na Atualização",
        description: "Erro ao implementar a atualização completa dos templates",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loadTemplates,
    implementFullUpdate
  };
};
