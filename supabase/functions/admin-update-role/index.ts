
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
    console.log('New role value:', role);
    
    // Create a Supabase client with the service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Standardize role format - always store as string
    let roleValue: string;
    if (Array.isArray(role)) {
      roleValue = role.join(',');
    } else {
      roleValue = String(role);
    }
    
    // Ensure 'user' role is always included
    if (!roleValue.includes('user')) {
      roleValue = `user,${roleValue}`;
    }
    
    console.log('Standardized role value:', roleValue);

    // Update the user's role and last updated timestamp
    const { data, error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ 
        role: roleValue,
        atualizado_em: new Date().toISOString() 
      })
      .eq('id', userId);
    
    if (updateError) {
      console.error('Error updating role:', updateError);
      throw updateError;
    }

    // After update, fetch the updated profile to return
    const { data: profile, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (fetchError) {
      console.error('Error fetching updated profile:', fetchError);
      throw fetchError;
    }

    console.log('User role updated successfully for user:', userId);
    console.log('Updated profile:', profile);

    return new Response(
      JSON.stringify({ 
        data: profile, 
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
        data: null,
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
