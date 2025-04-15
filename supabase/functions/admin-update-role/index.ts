
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
    // Create a Supabase client with the service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify the requesting user is authenticated as admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Unauthorized access');
    }

    // Check if the user has admin role
    const { data: userRoles } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const userRole = userRoles?.role;
    const isAdmin = Array.isArray(userRole) 
      ? userRole.includes('admin') 
      : userRole === 'admin';

    if (!isAdmin) {
      throw new Error('Admin role required');
    }

    // Parse request body
    const { userId, role } = await req.json();
    
    if (!userId || !role) {
      throw new Error('User ID and role are required');
    }

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
    console.error('Error updating user role:', error.message);
    
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
