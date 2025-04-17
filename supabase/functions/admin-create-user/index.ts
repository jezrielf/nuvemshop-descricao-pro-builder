
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
    
    // Update profile with additional data if provided
    if (userData) {
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update({
          nome: userData.nome,
          role: userData.role || 'user',
          atualizado_em: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (profileError) {
        console.error('Error updating user profile:', profileError);
        // Not throwing here as the user was created, just log the error
      }
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
