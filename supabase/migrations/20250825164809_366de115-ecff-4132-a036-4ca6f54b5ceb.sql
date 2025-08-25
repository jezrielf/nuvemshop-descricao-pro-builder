-- Fix the SELECT policy on ecommerce_stores to allow users to view their own stores
-- The current policy has "false" which blocks all access, breaking core functionality

-- Drop the existing overly restrictive SELECT policy
DROP POLICY IF EXISTS "Users can select non-sensitive store data" ON public.ecommerce_stores;

-- Create a new SELECT policy that allows users to view their own stores
-- This enables the get_user_stores() function to work properly
CREATE POLICY "Users can view their own stores" 
ON public.ecommerce_stores 
FOR SELECT 
USING (auth.uid() = user_id);

-- Note: The get_user_stores() function already excludes sensitive access_token data
-- and the get_store_for_api_call() function provides secure access for API calls