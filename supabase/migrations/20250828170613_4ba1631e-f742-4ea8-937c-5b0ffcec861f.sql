-- Remove overly permissive templates policies and add secure ones
DROP POLICY IF EXISTS "Allow read access to templates" ON public.templates;
DROP POLICY IF EXISTS "Users can view templates" ON public.templates;

-- Create new secure policy for template viewing
CREATE POLICY "Users can view their own templates or admin templates"
ON public.templates
FOR SELECT
USING (
  auth.uid() = user_id OR 
  is_admin() OR
  user_id IS NULL -- Allow viewing of global/system templates
);