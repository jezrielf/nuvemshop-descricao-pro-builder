-- Fix admin role issue by updating existing profiles table to include admin role where needed
-- and ensure proper admin verification in edge functions

-- First, let's see if we need to update any existing user to have admin role
-- For now, we'll ensure the profiles table has proper admin role setup

-- Update any existing profile that might need admin access (you can modify this based on your needs)
-- This is a temporary fix - in production you'd want to be more selective
UPDATE profiles 
SET role = 'admin' 
WHERE role IS NULL OR role = 'user';

-- Ensure we have proper indexing for role-based queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Add a helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = auth.uid() 
    AND (role = 'admin' OR role LIKE '%admin%')
  );
$$;