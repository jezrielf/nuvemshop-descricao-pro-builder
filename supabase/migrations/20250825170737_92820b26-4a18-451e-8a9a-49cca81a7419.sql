-- Fix function search path issues for security
-- Update all functions to have proper search_path set

-- Fix the is_admin function
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = user_id 
    AND role = 'admin'
  );
$$;

-- Fix the has_role function (the one with user_role enum)
CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, role user_role)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_roles.user_id = $1
        AND user_roles.role = $2
    );
$$;

-- Fix the get_user_roles function
CREATE OR REPLACE FUNCTION public.get_user_roles(user_id uuid)
RETURNS SETOF user_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
    SELECT role
    FROM public.user_roles
    WHERE user_roles.user_id = $1;
$$;

-- Fix the handle_new_user_role function
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    RETURN NEW;
END;
$$;

-- Fix the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome)
  VALUES (new.id, new.raw_user_meta_data->>'nome');
  RETURN new;
END;
$$;

-- Update the is_current_user_admin function with proper search path
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = auth.uid() 
    AND (role = 'admin' OR role LIKE '%admin%')
  );
$$;

-- Drop duplicate/problematic functions that have conflicting signatures
DROP FUNCTION IF EXISTS public.has_role(role_name text);
DROP FUNCTION IF EXISTS public.has_role(user_id bigint, role_name text);
DROP FUNCTION IF EXISTS public.get_user_roles();