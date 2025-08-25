-- Fix security vulnerability in subscribers table RLS policies
-- Current policies allow any authenticated user to insert/update any subscription record
-- This allows spammers to harvest emails and manipulate subscription data

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "update_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;

-- Create secure policies that only allow users to manage their own subscriptions
CREATE POLICY "users_can_update_own_subscription" 
ON public.subscribers 
FOR UPDATE 
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_can_insert_own_subscription" 
ON public.subscribers 
FOR INSERT 
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Also create a policy for service role to manage subscriptions (for Stripe webhooks)
CREATE POLICY "service_role_can_manage_subscriptions" 
ON public.subscribers 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);