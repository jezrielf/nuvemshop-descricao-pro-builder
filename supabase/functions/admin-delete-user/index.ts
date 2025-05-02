
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
    const { userId } = await req.json();
    
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    console.log('Delete user request received for user:', userId);
    
    // Create a Supabase client with the service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // First, delete the profile data to avoid foreign key issues
    console.log('Attempting to delete profile data for user:', userId);
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', userId);
    
    if (profileError) {
      console.error('Error deleting user profile:', profileError);
      // We'll still proceed to delete the user in auth
    } else {
      console.log('User profile data deleted successfully for:', userId);
    }

    // Delete the user from auth
    console.log('Attempting to delete user from auth service:', userId);
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    
    if (deleteError) {
      console.error('Error deleting user from auth service:', deleteError);
      throw deleteError;
    }

    console.log('User deleted successfully from auth service:', userId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User deleted successfully' 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in admin-delete-user function:', error.message);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Error deleting user'
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
