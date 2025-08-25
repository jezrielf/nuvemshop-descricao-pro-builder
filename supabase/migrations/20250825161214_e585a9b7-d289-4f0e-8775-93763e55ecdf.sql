-- Create security definer function to safely use access tokens for API calls
CREATE OR REPLACE FUNCTION public.get_store_for_api_call(store_uuid uuid)
RETURNS TABLE (
  store_id integer,
  access_token text,
  platform text,
  url text
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return store data if the user owns the store
  RETURN QUERY
  SELECT 
    es.store_id,
    es.access_token,
    es.platform,
    es.url
  FROM public.ecommerce_stores es
  WHERE es.id = store_uuid 
    AND es.user_id = auth.uid();
END;
$$;

-- Create security definer function to get stores without access tokens
CREATE OR REPLACE FUNCTION public.get_user_stores()
RETURNS TABLE (
  id uuid,
  name text,
  user_id uuid,
  store_id integer,
  connected_at timestamp with time zone,
  platform text,
  url text,
  scope text
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Return user's stores without sensitive access_token
  RETURN QUERY
  SELECT 
    es.id,
    es.name,
    es.user_id,
    es.store_id,
    es.connected_at,
    es.platform,
    es.url,
    es.scope
  FROM public.ecommerce_stores es
  WHERE es.user_id = auth.uid();
END;
$$;

-- Update RLS policies to be more restrictive
DROP POLICY IF EXISTS "Users can view their own store connections" ON public.ecommerce_stores;
DROP POLICY IF EXISTS "Users can view their own stores" ON public.ecommerce_stores;

-- Create new restrictive policies that prevent direct access to access_token field
CREATE POLICY "Users can select non-sensitive store data" 
ON public.ecommerce_stores 
FOR SELECT 
USING (false); -- Block direct SELECT access, force use of security definer functions

CREATE POLICY "Users can insert their own stores" 
ON public.ecommerce_stores 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stores" 
ON public.ecommerce_stores 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stores" 
ON public.ecommerce_stores 
FOR DELETE 
USING (auth.uid() = user_id);

-- Allow service role full access for internal operations
CREATE POLICY "Service role full access" 
ON public.ecommerce_stores 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.get_store_for_api_call(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_stores() TO authenticated;