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
  likes INTEGER DEFAULT 0
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

-- Create a function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample profiles
INSERT INTO profiles (id, full_name, avatar_url, bio)
VALUES 
  ((SELECT id FROM auth.users LIMIT 1), 'Jean Mugisha', '/placeholder.svg', 'Traditional storyteller from Kigali'),
  ((SELECT id FROM auth.users OFFSET 1 LIMIT 1), 'Marie Uwase', '/placeholder.svg', 'Contemporary musician and dancer'),
  ((SELECT id FROM auth.users OFFSET 2 LIMIT 1), 'Alice Mukamana', '/placeholder.svg', 'Visual artist specializing in Imigongo');

-- Insert sample content
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
VALUES 
  ((SELECT id FROM auth.users LIMIT 1),
   'story',
   'The Wise Giraffe',
   'A story about wisdom and patience',
   'Traditional Stories',
   'Jean Mugisha',
   '/placeholder.svg',
   'Once upon a time, there was a wise giraffe who taught other animals about patience...',
   'Patience and wisdom come to those who wait and observe.');

-- Sample music piece
INSERT INTO content (
  user_id,
  type,
  title,
  description,
  category,
  author,
  media_url,
  lyrics,
  is_dance
)
VALUES
  ((SELECT id FROM auth.users LIMIT 1),
   'music',
   'Rwandan Rhythms',
   'Traditional Rwandan music with a modern twist',
   'Traditional Music',
   'Marie Uwase',
   'https://example.com/sample-music.mp3',
   'Lyrics in Kinyarwanda and English...',
   true);

-- Sample artwork
INSERT INTO content (
  user_id,
  type,
  title,
  description,
  category,
  author,
  image
)
VALUES
  ((SELECT id FROM auth.users LIMIT 1),
   'artwork',
   'Modern Imigongo Art',
   'A contemporary interpretation of traditional Rwandan geometric patterns',
   'Visual Art',
   'Alice Mukamana',
   '/placeholder.svg');
