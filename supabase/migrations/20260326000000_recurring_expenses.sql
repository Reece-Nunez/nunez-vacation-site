-- Create recurring_expenses table
create table recurring_expenses (
  id uuid default gen_random_uuid() primary key,
  property_slug text not null,
  category text not null,
  amount integer not null,
  description text not null,
  vendor text,
  frequency text not null default 'monthly',
  active boolean not null default true,
  created_at timestamptz default now()
);

alter table recurring_expenses enable row level security;

create policy "Allow all access to recurring_expenses"
  on recurring_expenses for all
  using (true)
  with check (true);

-- Create saved_vendors table
create table saved_vendors (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  created_at timestamptz default now()
);

alter table saved_vendors enable row level security;

create policy "Allow all access to saved_vendors"
  on saved_vendors for all
  using (true)
  with check (true);

-- Saved categories
create table saved_categories (
  id uuid default gen_random_uuid() primary key,
  key text not null unique,
  label text not null,
  created_at timestamptz default now()
);

alter table saved_categories enable row level security;

create policy "Allow all access to saved_categories"
  on saved_categories for all
  using (true)
  with check (true);
