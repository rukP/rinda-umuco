create type content_type as enum ('artwork', 'music', 'story');

create table public.content (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  category text not null,
  author text not null,
  type content_type not null,
  image text,
  inspiration text,
  lyrics text,
  media_url text,
  is_dance boolean,
  content text,
  lesson text,
  comments jsonb[] default array[]::jsonb[],
  
  constraint valid_artwork check (
    (type = 'artwork' and image is not null and lyrics is null and media_url is null and is_dance is null and content is null and lesson is null) or
    (type = 'music' and lyrics is not null and is_dance is not null) or
    (type = 'story' and content is not null and lesson is not null)
  )
);

-- Add RLS policies
alter table public.content enable row level security;

create policy "Enable read access for all users" on public.content
  for select using (true);

create policy "Enable insert for authenticated users only" on public.content
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for content owners" on public.content
  for update using (auth.uid()::text = author);