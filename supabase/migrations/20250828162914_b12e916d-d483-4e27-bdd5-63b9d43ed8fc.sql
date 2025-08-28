
-- 1) Tabela para rastrear produtos distintos atualizados por usuário
create table if not exists public.usage_product_updates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  key text not null,
  product_id integer not null,
  store_id integer not null default 0,
  platform text not null default 'nuvemshop',
  created_at timestamptz not null default now(),
  unique (user_id, key, product_id, store_id, platform)
);

-- Habilita RLS
alter table public.usage_product_updates enable row level security;

-- Políticas de RLS
drop policy if exists "Users can view their own updates" on public.usage_product_updates;
create policy "Users can view their own updates"
  on public.usage_product_updates
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own updates" on public.usage_product_updates;
create policy "Users can insert their own updates"
  on public.usage_product_updates
  for insert
  with check (auth.uid() = user_id);

-- 2) Função: registrar atualização de produto (conta apenas se for novo)
create or replace function public.log_product_update(
  _key text,
  _product_id integer,
  _store_id integer default 0,
  _platform text default 'nuvemshop'
)
returns table(total_count integer, inserted boolean)
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  -- Tenta inserir; se já existir, não insere
  with ins as (
    insert into public.usage_product_updates (user_id, key, product_id, store_id, platform)
    values (auth.uid(), _key, _product_id, coalesce(_store_id, 0), _platform)
    on conflict (user_id, key, product_id, store_id, platform) do nothing
    returning 1
  )
  select
    (select count(*)::int
       from public.usage_product_updates
      where user_id = auth.uid()
        and key = _key) as total_count,
    exists(select 1 from ins) as inserted
  into total_count, inserted;

  return next;
end;
$$;

-- 3) Função: obter contagem total de produtos distintos atualizados
create or replace function public.get_product_updates_count(
  _key text
)
returns integer
language sql
security definer
set search_path to 'public'
as $$
  select coalesce(
    (select count(*)::int
       from public.usage_product_updates
      where user_id = auth.uid()
        and key = _key),
    0
  );
$$;

-- 4) Função: obter lista de produtos já contados (para o fluxo em massa)
create or replace function public.get_product_updates(
  _key text
)
returns table(product_id integer, store_id integer)
language sql
security definer
set search_path to 'public'
as $$
  select product_id, store_id
    from public.usage_product_updates
   where user_id = auth.uid()
     and key = _key;
$$;
