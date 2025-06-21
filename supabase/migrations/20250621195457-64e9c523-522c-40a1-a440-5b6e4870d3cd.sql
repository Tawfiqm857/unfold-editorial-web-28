
-- Create a table for storing magazine purchases
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  magazine_issue TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for author portfolios
CREATE TABLE public.authors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  website_url TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table linking articles to authors
CREATE TABLE public.article_authors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT NOT NULL,
  author_id UUID REFERENCES public.authors NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) for purchases
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own purchases
CREATE POLICY "Users can view their own purchases" 
  ON public.purchases 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to create their own purchases
CREATE POLICY "Users can create their own purchases" 
  ON public.purchases 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Authors table should be publicly readable but only admins can modify
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read author profiles
CREATE POLICY "Anyone can view author profiles" 
  ON public.authors 
  FOR SELECT 
  TO public 
  USING (true);

-- Article authors should be publicly readable
ALTER TABLE public.article_authors ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read article-author relationships
CREATE POLICY "Anyone can view article authors" 
  ON public.article_authors 
  FOR SELECT 
  TO public 
  USING (true);
