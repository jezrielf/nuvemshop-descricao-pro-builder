
-- Tabela para salvar descrições por usuário (sincroniza entre dispositivos)
create table if not exists public.saved_descriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  name text not null,
  blocks jsonb not null default '[]'::jsonb,
  product_name text,
  category text,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Habilitar RLS
alter table public.saved_descriptions enable row level security;

-- Políticas: cada usuário somente acessa o que é seu
drop policy if exists "Users can view their own saved_descriptions" on public.saved_descriptions;
create policy "Users can view their own saved_descriptions"
  on public.saved_descriptions
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own saved_descriptions" on public.saved_descriptions;
create policy "Users can insert their own saved_descriptions"
  on public.saved_descriptions
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own saved_descriptions" on public.saved_descriptions;
create policy "Users can update their own saved_descriptions"
  on public.saved_descriptions
  for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own saved_descriptions" on public.saved_descriptions;
create policy "Users can delete their own saved_descriptions"
  on public.saved_descriptions
  for delete
  using (auth.uid() = user_id);

-- Índices para desempenho (listagens por usuário e por data)
create index if not exists saved_descriptions_user_id_idx on public.saved_descriptions (user_id);
create index if not exists saved_descriptions_user_updated_idx on public.saved_descriptions (user_id, updated_at desc);

-- Atualização automática do updated_at
drop trigger if exists set_saved_descriptions_updated_at on public.saved_descriptions;
create trigger set_saved_descriptions_updated_at
  before update on public.saved_descriptions
  for each row
  execute procedure public.update_updated_at_column();
