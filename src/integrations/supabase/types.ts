export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics_snapshots: {
        Row: {
          created_at: string | null
          date: string
          id: string
          product_id: number
          revenue: number | null
          sales: number | null
          store_id: number
          user_id: string
          visits: number | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          product_id: number
          revenue?: number | null
          sales?: number | null
          store_id: number
          user_id: string
          visits?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          product_id?: number
          revenue?: number | null
          sales?: number | null
          store_id?: number
          user_id?: string
          visits?: number | null
        }
        Relationships: []
      }
      nuvemshop_stores: {
        Row: {
          access_token: string
          connected_at: string
          id: string
          name: string
          scope: string | null
          store_id: number
          url: string
          user_id: string
        }
        Insert: {
          access_token: string
          connected_at?: string
          id?: string
          name: string
          scope?: string | null
          store_id: number
          url: string
          user_id: string
        }
        Update: {
          access_token?: string
          connected_at?: string
          id?: string
          name?: string
          scope?: string | null
          store_id?: number
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      product_performance: {
        Row: {
          created_at: string | null
          description_updated_at: string | null
          id: string
          product_id: number
          revenue: number | null
          sales: number | null
          store_id: number
          updated_at: string | null
          user_id: string
          visits: number | null
        }
        Insert: {
          created_at?: string | null
          description_updated_at?: string | null
          id?: string
          product_id: number
          revenue?: number | null
          sales?: number | null
          store_id: number
          updated_at?: string | null
          user_id: string
          visits?: number | null
        }
        Update: {
          created_at?: string | null
          description_updated_at?: string | null
          id?: string
          product_id?: number
          revenue?: number | null
          sales?: number | null
          store_id?: number
          updated_at?: string | null
          user_id?: string
          visits?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          atualizado_em: string
          avatar_url: string | null
          criado_em: string
          id: string
          nome: string | null
          role: string | null
        }
        Insert: {
          atualizado_em?: string
          avatar_url?: string | null
          criado_em?: string
          id: string
          nome?: string | null
          role?: string | null
        }
        Update: {
          atualizado_em?: string
          avatar_url?: string | null
          criado_em?: string
          id?: string
          nome?: string | null
          role?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      template_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          blocks: Json
          category: string
          created_at: string
          id: string
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          blocks?: Json
          category: string
          created_at?: string
          id: string
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          blocks?: Json
          category?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_template_categories_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_templates_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_nuvemshop_stores: {
        Args: Record<PropertyKey, never>
        Returns: {
          access_token: string
          connected_at: string
          id: string
          name: string
          scope: string | null
          store_id: number
          url: string
          user_id: string
        }[]
      }
      get_user_roles: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"][]
      }
      has_role: {
        Args: {
          user_id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "user" | "premium" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["user", "premium", "admin"],
    },
  },
} as const
