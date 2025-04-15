
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { userId, role } = await req.json();
    
    if (!userId || !role) {
      throw new Error('User ID and role are required');
    }
    
    console.log('Role update request received for user:', userId);
    
    // Create a Supabase client with the service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Update the user's role
    const { data, error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ 
        role,
        atualizado_em: new Date().toISOString() 
      })
      .eq('id', userId)
      .select();
    
    if (updateError) {
      console.error('Error updating role:', updateError);
      throw updateError;
    }

    console.log('User role updated successfully for user:', userId);

    return new Response(
      JSON.stringify({ 
        data, 
        error: null 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in admin-update-role function:', error.message);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Error updating user role'
      }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
