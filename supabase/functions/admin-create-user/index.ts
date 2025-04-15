
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
    const { email, password, userData } = await req.json();
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    console.log('Create user request received for email:', email);
    console.log('User data:', JSON.stringify(userData));
    
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

    // Create the new user with admin privileges
    console.log('Attempting to create user with createUser method');
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: userData
    });
    
    if (createError) {
      console.error('Error creating user:', createError);
      throw createError;
    }

    if (!newUser?.user) {
      console.error('No user object returned from createUser');
      throw new Error('User creation failed. No user returned.');
    }

    console.log('User created successfully:', newUser.user.id);

    // Update the profiles table with role and other metadata
    console.log('Updating profile data for ID:', newUser.user.id);
    
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: newUser.user.id,
        nome: userData.nome,
        role: userData.role,
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString()
      });
    
    if (profileError) {
      console.error('Error updating profile:', profileError);
      throw profileError;
    }
    
    console.log('Profile updated successfully');
    
    // Return the created user data
    return new Response(
      JSON.stringify({ 
        data: newUser, 
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
