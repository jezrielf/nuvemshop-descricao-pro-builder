
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
    // Verify admin authorization
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check if user is admin
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile?.role?.includes('admin')) {
      return new Response(JSON.stringify({ error: 'Insufficient permissions' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse request body
    const { email, password, userData } = await req.json();
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    console.log('User creation request received for:', email);
    
    // Create a Supabase client with the service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create the user
    console.log('Attempting to create new user:', email);
    const { data: { user }, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        nome: userData?.nome || email.split('@')[0]
      }
    });
    
    if (createError) {
      console.error('Error creating user:', createError);
      throw createError;
    }

    if (!user) {
      throw new Error('Failed to create user');
    }

    console.log('User created successfully with ID:', user.id);
    
    // Standardize role format - always use comma-separated string
    let userRole = 'user';
    if (userData?.role) {
      // If role is an array, join it to string
      if (Array.isArray(userData.role)) {
        userRole = userData.role.join(',');
      } else {
        userRole = userData.role;
      }
    }
    
    // Ensure 'user' role is always included
    if (!userRole.includes('user')) {
      userRole = userRole ? `user,${userRole}` : 'user';
    }
    
    console.log('Setting user role to:', userRole);
    
    // Update profile with additional data if provided
    const profileData = {
      nome: userData?.nome || user.email?.split('@')[0] || 'New User',
      role: userRole,
      atualizado_em: new Date().toISOString()
    };
    
    console.log('Updating profile with data:', profileData);
    
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update(profileData)
      .eq('id', user.id);
    
    if (profileError) {
      console.error('Error updating user profile:', profileError);
      // Not throwing here as the user was created, just log the error
    } else {
      console.log('User profile updated successfully for:', user.id);
    }

    return new Response(
      JSON.stringify({ 
        user,
        success: true 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in admin-create-user function:', error.message);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Error creating user'
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
