
-- 1) Tabela de contadores de uso
create table if not exists public.usage_counters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  key text not null,
  count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, key)
);

-- Índice útil por usuário
create index if not exists usage_counters_user_idx on public.usage_counters (user_id);

-- Habilitar RLS
alter table public.usage_counters enable row level security;

-- Políticas RLS: usuário só pode ver e alterar seus próprios contadores
create policy "Users can view their own usage counters"
  on public.usage_counters
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own usage counters"
  on public.usage_counters
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own usage counters"
  on public.usage_counters
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Opcional: acesso total para service role (útil em rotinas administrativas)
create policy "Service role full access to usage_counters"
  on public.usage_counters
  as permissive
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- 2) Função RPC para incrementar de forma atômica
create or replace function public.increment_usage_counter(_key text)
returns table(count integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  -- Garante que existe a linha e incrementa de forma atômica
  insert into public.usage_counters (user_id, key, count)
  values (auth.uid(), _key, 1)
  on conflict (user_id, key)
  do update set count = public.usage_counters.count + 1, updated_at = now()
  returning public.usage_counters.count into new_count;

  return query select new_count;
end;
$$;

-- 3) (Opcional) Função para obter o contador atual rapidamente
create or replace function public.get_usage_counter(_key text)
returns integer
language sql
security definer
set search_path = public
as $$
  select coalesce(
    (select count from public.usage_counters where user_id = auth.uid() and key = _key),
    0
  );
$$;
