
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
    console.log('Listing all users');
    
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

    // Get users from auth.users
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) {
      console.error('Error listing users:', error);
      throw error;
    }

    console.log(`Successfully fetched ${data.users.length} users`);
    
    // Get all profiles in one query (more efficient than individual queries)
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('*');
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      // Continue, as we can still return users without profiles
    }
    
    // Create a map of profiles by user ID for easy lookup
    const profilesMap = new Map();
    if (profiles) {
      profiles.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });
    }
    
    // Combine user and profile data
    const enrichedUsers = data.users.map(user => {
      const profile = profilesMap.get(user.id) || {
        id: user.id,
        nome: user.user_metadata?.nome || user.email?.split('@')[0] || null,
        role: 'user',
        avatar_url: null,
        criado_em: user.created_at,
        atualizado_em: user.created_at
      };
      
      return {
        ...user,
        profile
      };
    });
    
    return new Response(
      JSON.stringify({
        users: enrichedUsers,
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
    console.error('Error in admin-list-users function:', error.message);
    
    return new Response(
      JSON.stringify({
        users: null,
        error: error.message || 'Error listing users'
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
