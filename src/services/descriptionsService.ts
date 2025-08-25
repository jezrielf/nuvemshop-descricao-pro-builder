
import { supabase } from '@/integrations/supabase/client';
import { ProductDescription, ProductCategory } from '@/types/editor';

export interface SavedDescriptionRow {
  id: string;
  user_id: string;
  name: string;
  blocks: any;
  product_name?: string | null;
  category?: string | null;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

// Convert database row to ProductDescription
const mapRowToDescription = (row: SavedDescriptionRow): ProductDescription => ({
  id: row.id,
  name: row.name,
  blocks: Array.isArray(row.blocks) ? row.blocks : [],
  productName: row.product_name || undefined,
  category: (row.category as ProductCategory) || undefined,
  metadata: row.metadata,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

// Convert ProductDescription to database format
const mapDescriptionToRow = (description: ProductDescription) => ({
  id: description.id,
  name: description.name,
  blocks: description.blocks,
  product_name: description.productName,
  category: description.category,
  metadata: description.metadata
});

export class DescriptionsService {
  // List all descriptions for current user (ordered by updated_at desc)
  static async list(): Promise<ProductDescription[]> {
    try {
      const { data, error } = await supabase
        .from('saved_descriptions')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error loading descriptions from Supabase:', error);
        return [];
      }

      return data.map(mapRowToDescription);
    } catch (error) {
      console.error('Error in DescriptionsService.list:', error);
      return [];
    }
  }

  // Get single description by ID
  static async get(id: string): Promise<ProductDescription | null> {
    try {
      const { data, error } = await supabase
        .from('saved_descriptions')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error getting description from Supabase:', error);
        return null;
      }

      return data ? mapRowToDescription(data) : null;
    } catch (error) {
      console.error('Error in DescriptionsService.get:', error);
      return null;
    }
  }

  // Create or update description
  static async upsert(description: ProductDescription): Promise<boolean> {
    try {
      const rowData = mapDescriptionToRow(description);
      
      const { error } = await supabase
        .from('saved_descriptions')
        .upsert(rowData, {
          onConflict: 'id'
        });

      if (error) {
        console.error('Error upserting description to Supabase:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in DescriptionsService.upsert:', error);
      return false;
    }
  }

  // Delete description by ID
  static async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('saved_descriptions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting description from Supabase:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in DescriptionsService.delete:', error);
      return false;
    }
  }

  // Batch insert for migration (handles duplicates gracefully)
  static async batchUpsert(descriptions: ProductDescription[]): Promise<boolean> {
    try {
      if (descriptions.length === 0) return true;

      const rowsData = descriptions.map(mapDescriptionToRow);
      
      const { error } = await supabase
        .from('saved_descriptions')
        .upsert(rowsData, {
          onConflict: 'id'
        });

      if (error) {
        console.error('Error batch upserting descriptions to Supabase:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in DescriptionsService.batchUpsert:', error);
      return false;
    }
  }
}
