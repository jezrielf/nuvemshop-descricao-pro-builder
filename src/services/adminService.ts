
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { Plan } from '@/components/admin/plans/types';
import { Template } from '@/types/editor';
import { ProductCategory } from '@/types/editor/products';

export const adminService = {
  // Users related operations
  getUsers: async (): Promise<Profile[]> => {
    try {
      // Get users from auth.users through the admin API
      const { data: authUsers, error: authError } = await supabase.functions.invoke('admin-list-users', {
        body: {}
      });
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
        throw authError;
      }
      
      console.log('Auth users fetched:', authUsers);
      
      // Now get profiles data
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }
      
      // Create a map of profiles by ID for faster lookup
      const profilesMap = new Map<string, Profile>();
      profilesData?.forEach((profile: Profile) => {
        profilesMap.set(profile.id, profile);
      });
      
      // Map auth users to profiles and enrich with email
      const enrichedProfiles: Profile[] = [];
      
      authUsers?.users?.forEach((user: any) => {
        const profile = profilesMap.get(user.id) || {
          id: user.id,
          nome: null,
          avatar_url: null,
          criado_em: user.created_at,
          atualizado_em: user.created_at,
          role: 'user',
        };
        
        // Add email from auth user to profile
        enrichedProfiles.push({
          ...profile,
          email: user.email
        });
      });
      
      return enrichedProfiles;
    } catch (error) {
      console.error('Error in getUsers:', error);
      throw error;
    }
  },
  
  updateUserProfile: async (userId: string, data: Partial<Profile>): Promise<Profile> => {
    try {
      // Filter out non-string roles to fix compatibility with Supabase
      const updateData: any = { ...data };
      if (updateData.role && Array.isArray(updateData.role)) {
        // If role is an array, convert it to a string (we'll use the first role)
        // This is a workaround for the type mismatch
        updateData.role = updateData.role[0] || 'user';
      }
      
      updateData.atualizado_em = new Date().toISOString();
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);
        
      if (error) throw error;
      
      const { data: updatedProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (fetchError) throw fetchError;
      
      return updatedProfile;
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      throw error;
    }
  },
  
  updateUserRole: async (userId: string, role: string | string[]): Promise<void> => {
    try {
      const { error } = await supabase.functions.invoke('admin-update-role', {
        body: { userId, role }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      throw error;
    }
  },
  
  createUser: async (email: string, password: string, userData: any): Promise<any> => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-create-user', {
        body: {
          email,
          password,
          userData
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  },
  
  deleteUser: async (userId: string): Promise<void> => {
    try {
      const { error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  },
  
  // Plans related operations
  getPlans: async (): Promise<Plan[]> => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { method: 'GET', action: 'list-products' }
      });
      
      if (error) throw error;
      
      if (data && !data.success) {
        throw new Error(data.error || "Failed to fetch plans");
      }
      
      // Process retrieved products
      const formattedPlans: Plan[] = data.products.map((product: any) => {
        // Parse features from string to our PlanFeature format
        let features = [];
        try {
          if (Array.isArray(product.features)) {
            features = product.features.map((feature: any, index: number) => {
              if (typeof feature === 'object' && 'name' in feature && 'included' in feature) {
                return {
                  id: `feature-${index}`,
                  name: feature.name,
                  included: feature.included
                };
              } else if (typeof feature === 'string') {
                const [name, includedStr] = feature.split(':');
                return {
                  id: `feature-${index}`,
                  name,
                  included: includedStr === 'true'
                };
              }
              
              return {
                id: `feature-${index}`,
                name: String(feature),
                included: false
              };
            });
          }
        } catch (e) {
          console.error("Error parsing product features:", e);
          features = [];
        }
        
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          priceId: product.priceId,
          features,
          isActive: product.isActive,
          isDefault: product.isDefault
        };
      });
      
      return formattedPlans;
    } catch (error) {
      console.error('Error in getPlans:', error);
      throw error;
    }
  },
  
  createPlan: async (planData: Omit<Plan, 'id'>): Promise<Plan> => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'POST', 
          action: 'create-product',
          productData: planData
        }
      });
      
      if (error) throw error;
      
      if (data && !data.success) {
        throw new Error(data.error || "Failed to create plan");
      }
      
      return data.product;
    } catch (error) {
      console.error('Error in createPlan:', error);
      throw error;
    }
  },
  
  updatePlan: async (planId: string, planData: Partial<Plan>): Promise<Plan> => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'PUT', 
          action: 'update-product',
          productId: planId,
          productData: planData
        }
      });
      
      if (error) throw error;
      
      if (data && !data.success) {
        throw new Error(data.error || "Failed to update plan");
      }
      
      return data.product;
    } catch (error) {
      console.error('Error in updatePlan:', error);
      throw error;
    }
  },
  
  deletePlan: async (planId: string): Promise<void> => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-plans', {
        body: { 
          method: 'DELETE', 
          action: 'delete-product',
          productId: planId
        }
      });
      
      if (error) throw error;
      
      if (data && !data.success) {
        throw new Error(data.error || "Failed to delete plan");
      }
    } catch (error) {
      console.error('Error in deletePlan:', error);
      throw error;
    }
  },
  
  // Dashboard related operations
  getDashboardStats: async (): Promise<any> => {
    try {
      // Get user stats
      const { count: totalUsers, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
        
      if (countError) throw countError;
      
      // Get premium users count
      const { count: premiumUsers, error: premiumError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'premium');
        
      if (premiumError) throw premiumError;
      
      // Get admin users count
      const { count: adminUsers, error: adminError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'admin');
        
      if (adminError) throw adminError;
      
      // Get new users today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { count: newUsersToday, error: newUsersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('criado_em', today.toISOString());
        
      if (newUsersError) throw newUsersError;
      
      // Mock descriptions data since the table doesn't exist
      // Instead of trying to query a non-existent table
      const totalDescriptions = 0;
      const recentDescriptions = 0;
      
      // Get plans
      const plans = await adminService.getPlans();
      
      return {
        userStats: {
          total: totalUsers || 0,
          premium: premiumUsers || 0,
          admin: adminUsers || 0,
          newToday: newUsersToday || 0
        },
        descriptions: {
          total: totalDescriptions || 0,
          recent: recentDescriptions || 0
        },
        plans: {
          total: plans.length,
          active: plans.filter(p => p.isActive).length
        }
      };
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      // Return mock data as fallback
      return {
        userStats: {
          total: 0,
          premium: 0,
          admin: 0,
          newToday: 0
        },
        descriptions: {
          total: 0,
          recent: 0
        },
        plans: {
          total: 0,
          active: 0
        }
      };
    }
  },
  
  // Templates related operations
  getTemplates: async (): Promise<Template[]> => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      // Convert string categories to ProductCategory type
      const templates: Template[] = (data || []).map((template) => {
        // Convert string category to ProductCategory
        let category: ProductCategory = 'other';
        
        // Try to match the string category with a valid ProductCategory
        if (template.category && typeof template.category === 'string') {
          // Check if it's a valid ProductCategory
          const validCategories: ProductCategory[] = [
            'supplements', 'clothing', 'accessories', 'shoes', 
            'electronics', 'energy', 'Casa e decoração', 'other'
          ];
          
          if (validCategories.includes(template.category as ProductCategory)) {
            category = template.category as ProductCategory;
          }
        }
        
        return {
          id: template.id,
          name: template.name,
          category: category,
          blocks: template.blocks || [],
          thumbnail: template.thumbnail || '/placeholder.svg'
        };
      });
      
      return templates;
    } catch (error) {
      console.error('Error in getTemplates:', error);
      throw error;
    }
  },
  
  createTemplate: async (templateData: Omit<Template, 'id'>): Promise<Template> => {
    try {
      // Generate UUID for new template
      const id = crypto.randomUUID();
      
      const { data, error } = await supabase
        .from('templates')
        .insert({
          id,
          name: templateData.name,
          category: templateData.category,
          blocks: templateData.blocks || []
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Convert returned data to Template format
      const template: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory,
        blocks: data.blocks || [],
        thumbnail: data.thumbnail || '/placeholder.svg'
      };
      
      return template;
    } catch (error) {
      console.error('Error in createTemplate:', error);
      throw error;
    }
  },
  
  updateTemplate: async (templateId: string, templateData: Partial<Template>): Promise<Template> => {
    try {
      // Prepare update data
      const updateData: any = {};
      
      if (templateData.name) updateData.name = templateData.name;
      if (templateData.category) updateData.category = templateData.category;
      if (templateData.blocks) updateData.blocks = templateData.blocks;
      
      updateData.updated_at = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('templates')
        .update(updateData)
        .eq('id', templateId)
        .select()
        .single();
      
      if (error) throw error;
      
      // Convert returned data to Template format
      const template: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory,
        blocks: data.blocks || [],
        thumbnail: data.thumbnail || '/placeholder.svg'
      };
      
      return template;
    } catch (error) {
      console.error('Error in updateTemplate:', error);
      throw error;
    }
  },
  
  deleteTemplate: async (templateId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error in deleteTemplate:', error);
      throw error;
    }
  }
};
