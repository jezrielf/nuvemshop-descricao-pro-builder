-- Remove overly permissive service role policy
DROP POLICY IF EXISTS "service_role_can_manage_subscriptions" ON public.subscribers;

-- Add more restrictive service role policies for specific operations
CREATE POLICY "service_role_can_upsert_subscriptions" 
ON public.subscribers
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "service_role_can_update_subscriptions" 
ON public.subscribers
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Allow service role to read subscriptions (needed for subscription checking)
CREATE POLICY "service_role_can_read_subscriptions" 
ON public.subscribers
FOR SELECT
TO service_role
USING (true);

-- Ensure users can only access their own subscription data
CREATE POLICY "users_can_select_own_subscription_secure" 
ON public.subscribers
FOR SELECT
TO authenticated
USING (user_id = auth.uid());