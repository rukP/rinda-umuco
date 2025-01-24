-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the content_type enum first
CREATE TYPE content_type AS ENUM ('artwork', 'music', 'story');

-- Create the profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Create the content table
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type content_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  author TEXT,
  image TEXT,
  media_url TEXT,
  content TEXT,
  lesson TEXT,
  lyrics TEXT,
  is_dance BOOLEAN DEFAULT false,
  comments JSONB DEFAULT '[]'::jsonb,
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Content is viewable by everyone" ON content
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert content" ON content
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content" ON content
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content" ON content
  FOR DELETE USING (auth.uid() = user_id);

-- Insert sample profiles with more detailed information
INSERT INTO profiles (id, full_name, avatar_url, bio, location, website, social_links)
SELECT 
  id,
  'Jean Mugisha',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  'Traditional storyteller from Kigali with over 10 years of experience sharing Rwandan cultural tales.',
  'Kigali, Rwanda',
  'https://jeanmugisha.com',
  '{"twitter": "@jeanmugisha", "instagram": "@jean.stories"}'::jsonb
FROM auth.users
WHERE email = 'jean@example.com'
LIMIT 1;

INSERT INTO profiles (id, full_name, avatar_url, bio, location, website, social_links)
SELECT 
  id,
  'Marie Uwase',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  'Contemporary musician and dancer blending traditional Rwandan rhythms with modern sounds.',
  'Butare, Rwanda',
  'https://marieuwase.com',
  '{"twitter": "@marieuwase", "instagram": "@marie.music", "youtube": "@marieuwasemusic"}'::jsonb
FROM auth.users
WHERE email = 'marie@example.com'
LIMIT 1;

INSERT INTO profiles (id, full_name, avatar_url, bio, location, website, social_links)
SELECT 
  id,
  'Alice Mukamana',
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
  'Visual artist specializing in Imigongo, bringing traditional Rwandan art forms into the contemporary world.',
  'Gisenyi, Rwanda',
  'https://aliceart.com',
  '{"twitter": "@alicemukamana", "instagram": "@alice.art"}'::jsonb
FROM auth.users
WHERE email = 'alice@example.com'
LIMIT 1;

-- Insert sample content with more varied data
INSERT INTO content (
  user_id,
  type,
  title,
  description,
  category,
  author,
  image,
  content,
  lesson
)
SELECT 
  id,
  'story',
  'The Wise Giraffe',
  'A captivating tale about wisdom and patience in the heart of Rwanda',
  'Traditional Stories',
  'Jean Mugisha',
  'https://images.unsplash.com/photo-1547721064-da6cfb341d50',
  'Once upon a time in the rolling hills of Rwanda, there lived a wise giraffe who taught other animals about the importance of patience and understanding...',
  'Through patience and wisdom, we can overcome any challenge and learn from those around us.'
FROM auth.users
WHERE email = 'jean@example.com'
LIMIT 1;

-- Sample music pieces
INSERT INTO content (
  user_id,
  type,
  title,
  description,
  category,
  author,
  media_url,
  image,
  lyrics,
  is_dance
)
SELECT 
  id,
  'music',
  'Rwandan Rhythms',
  'A fusion of traditional Rwandan drums with contemporary beats',
  'Traditional Music',
  'Marie Uwase',
  'https://example.com/sample-music.mp3',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
  'Amahoro yacu (Our peace)\nUbumwe bwacu (Our unity)\nU Rwanda rwacu (Our Rwanda)\n...',
  true
FROM auth.users
WHERE email = 'marie@example.com'
LIMIT 1;

-- Sample artworks
INSERT INTO content (
  user_id,
  type,
  title,
  description,
  category,
  author,
  image
)
SELECT 
  id,
  'artwork',
  'Modern Imigongo Art',
  'A contemporary interpretation of traditional Rwandan geometric patterns',
  'Visual Art',
  'Alice Mukamana',
  'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca'
FROM auth.users
WHERE email = 'alice@example.com'
LIMIT 1;