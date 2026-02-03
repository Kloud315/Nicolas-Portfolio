-- Create project_categories table
CREATE TABLE public.project_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can view categories
CREATE POLICY "Anyone can view project categories"
ON public.project_categories
FOR SELECT
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_project_categories_updated_at
BEFORE UPDATE ON public.project_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add new columns to projects table
ALTER TABLE public.projects 
ADD COLUMN category_id UUID REFERENCES public.project_categories(id) ON DELETE SET NULL,
ADD COLUMN short_description TEXT,
ADD COLUMN project_type TEXT DEFAULT 'Web App',
ADD COLUMN status TEXT DEFAULT 'Completed' CHECK (status IN ('Completed', 'Ongoing')),
ADD COLUMN is_visible BOOLEAN DEFAULT true;

-- Rename description to detailed_description for clarity
ALTER TABLE public.projects RENAME COLUMN description TO detailed_description;

-- Insert default categories
INSERT INTO public.project_categories (name, slug, description, sort_order) VALUES
('Personal / Hobby Projects', 'personal', 'Personal projects and hobby experiments', 1),
('School / Academic Projects', 'school', 'Academic projects and coursework', 2),
('Client / Real-World Projects', 'client', 'Professional client work and real-world applications', 3);