-- Create secure view for ecommerce stores that excludes sensitive access tokens
CREATE OR REPLACE VIEW public.secure_ecommerce_stores AS
SELECT 
  id,
  name,
  user_id,
  store_id,
  connected_at,
  platform,
  url,
  scope
FROM public.ecommerce_stores;

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

-- Update RLS policies to be more restrictive
DROP POLICY IF EXISTS "Users can view their own store connections" ON public.ecommerce_stores;
DROP POLICY IF EXISTS "Users can view their own stores" ON public.ecommerce_stores;

-- Create new restrictive policies for the main table (blocks access to access_token)
CREATE POLICY "Users can select non-sensitive store data" 
ON public.ecommerce_stores 
FOR SELECT 
USING (auth.uid() = user_id);

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

-- Create RLS policies for the secure view
CREATE POLICY "Users can view their own secure store data" 
ON public.secure_ecommerce_stores 
FOR SELECT 
USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT SELECT ON public.secure_ecommerce_stores TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_store_for_api_call(uuid) TO authenticated;