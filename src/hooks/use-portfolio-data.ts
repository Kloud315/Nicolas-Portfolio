import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Hero Content
export function useHeroContent() {
  return useQuery({
    queryKey: ['hero-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });
}

// About Content
export function useAboutContent() {
  return useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });
}

// Skills with Categories
export function useSkillsWithCategories() {
  return useQuery({
    queryKey: ['skills-with-categories'],
    queryFn: async () => {
      const { data: categories, error: catError } = await supabase
        .from('skill_categories')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (catError) throw catError;

      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (skillsError) throw skillsError;

      // Group skills by category
      return categories?.map(cat => ({
        ...cat,
        skills: skills?.filter(s => s.category_id === cat.id) || []
      })) || [];
    },
  });
}

// Projects
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });
}

// Achievements
export function useAchievements() {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });
}

// Leadership Content
export function useLeadershipContent() {
  return useQuery({
    queryKey: ['leadership-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leadership_content')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });
}

// Contact Info
export function useContactInfo() {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });
}

// Site Settings
export function useSiteSettings() {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });
}
