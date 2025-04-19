
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
export const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[MANAGE-PLANS] ${step}${detailsStr}`);
};

// Helper function to check if user has a specific role
export const hasRole = (roleString: string | null, roleToCheck: string): boolean => {
  if (!roleString) return false;
  
  // Handle comma-separated roles
  if (roleString.includes(',')) {
    const roles = roleString.split(',').map(r => r.trim());
    return roles.includes(roleToCheck);
  }
  
  // Handle single role
  return roleString === roleToCheck;
};

// Function to compress feature data to fit in Stripe's metadata limits
export const compressFeatures = (features: any[]): string => {
  // Create a minimal representation of features
  const minimalFeatures = features.map(feature => {
    return {
      n: feature.name.substring(0, 30), // Truncate name if needed
      i: feature.included ? 1 : 0       // Use 1/0 instead of true/false
    };
  });
  
  // Stringify and limit total length if needed
  let featuresStr = JSON.stringify(minimalFeatures);
  
  // If still too long, truncate the array
  if (featuresStr.length > 480) { // Leave some buffer
    let i = minimalFeatures.length;
    while (featuresStr.length > 480 && i > 0) {
      i--;
      featuresStr = JSON.stringify(minimalFeatures.slice(0, i));
    }
    // Add indicator that features were truncated
    featuresStr = featuresStr.substring(0, featuresStr.length - 1) + ',{"n":"...","i":0}]';
  }
  
  return featuresStr;
};

export const createSupabaseClient = () => {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );
};
