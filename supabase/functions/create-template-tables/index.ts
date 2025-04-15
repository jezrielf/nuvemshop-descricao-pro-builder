
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create templates table
    const { error: templatesTableError } = await supabaseAdmin.rpc('create_templates_table');
    if (templatesTableError) {
      throw new Error(`Failed to create templates table: ${templatesTableError.message}`);
    }

    // Create template_categories table
    const { error: categoriesTableError } = await supabaseAdmin.rpc('create_template_categories_table');
    if (categoriesTableError) {
      throw new Error(`Failed to create template_categories table: ${categoriesTableError.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Template tables created successfully.' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in create-template-tables function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
