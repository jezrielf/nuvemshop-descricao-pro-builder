-- Fix security vulnerability in subscribers table RLS policy
-- Remove email-based access to prevent unauthorized data access

-- Drop the current policy that allows access by email
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;

-- Create a new secure policy that only allows access by authenticated user ID
CREATE POLICY "select_own_subscription_secure" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid());

-- Ensure the policy for service role remains for backend operations
-- (The existing service_role_can_manage_subscriptions policy should handle backend needs)