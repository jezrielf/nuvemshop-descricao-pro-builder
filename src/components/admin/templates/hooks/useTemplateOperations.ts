
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
      console.log('Loading templates from database...');
      
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading templates from database:', error);
        throw error;
      }

      console.log('Raw data from database:', data);

      const formattedTemplates: Template[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category as any,
        blocks: Array.isArray(item.blocks) ? item.blocks : [],
        user_id: item.user_id
      }));

      console.log('Formatted templates:', formattedTemplates.map(t => ({ name: t.name, blocks: t.blocks.length })));

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
      console.log('🚀 Starting full template update implementation...');
      console.log('Premium templates to be inserted:', premiumTemplates.length);
      
      // Log dos templates que serão inseridos
      premiumTemplates.forEach((template, index) => {
        console.log(`Template ${index + 1}: ${template.name} (${template.category}) - ${template.blocks.length} blocos`);
      });

      // Primeiro, deletar todos os templates existentes
      console.log('🗑️ Deleting existing templates...');
      const { error: deleteError } = await supabase
        .from('templates')
        .delete()
        .gte('created_at', '1900-01-01'); // Delete all templates

      if (deleteError) {
        console.error('Error deleting existing templates:', deleteError);
        throw deleteError;
      }
      console.log('✅ All existing templates deleted successfully');

      // Preparar os templates para inserção (sem o campo id que será gerado automaticamente)
      const templatesForInsert = premiumTemplates.map(template => {
        const templateData = {
          name: template.name,
          category: template.category,
          blocks: template.blocks || []
        };
        console.log(`Preparing template: ${templateData.name} with ${templateData.blocks.length} blocks`);
        return templateData;
      });

      console.log('📦 Inserting premium templates...');
      console.log('Templates data for insert:', templatesForInsert);

      // Inserir os novos templates premium
      const { data: insertedData, error: insertError } = await supabase
        .from('templates')
        .insert(templatesForInsert)
        .select();

      if (insertError) {
        console.error('Error inserting premium templates:', insertError);
        throw insertError;
      }

      console.log('✅ Premium templates inserted successfully:', insertedData);
      console.log('Inserted templates count:', insertedData?.length || 0);

      // Verificar se os templates foram realmente inseridos
      const { data: verificationData, error: verificationError } = await supabase
        .from('templates')
        .select('*');

      if (verificationError) {
        console.warn('Error verifying template insertion:', verificationError);
      } else {
        console.log('📊 Verification - Templates in database:', verificationData?.length || 0);
        verificationData?.forEach(template => {
          console.log(`- ${template.name} (${template.category}) - ${template.blocks?.length || 0} blocos`);
        });
      }

      toast({
        title: "✨ Atualização Premium Implementada!",
        description: `${premiumTemplates.length} templates premium foram criados com sucesso. Os templates agora aparecem no admin e no editor.`,
      });

      return true;
    } catch (error) {
      console.error('❌ Error implementing full update:', error);
      toast({
        title: "Erro na Atualização",
        description: `Erro ao implementar a atualização: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
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
