import { supabase } from '@/integrations/supabase/client';

const getAdminToken = () => sessionStorage.getItem('admin_session_token');

export interface CmsResponse<T> {
  data?: T;
  error?: string;
}

async function cmsRequest<T>(
  resource: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any
): Promise<CmsResponse<T>> {
  const token = getAdminToken();
  
  if (!token) {
    return { error: 'Not authenticated' };
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-cms/${resource}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Request failed' };
    }

    return { data: data.data };
  } catch (error) {
    console.error('CMS request error:', error);
    return { error: 'Request failed' };
  }
}

export async function uploadFile(file: File, type: 'resume' | 'profile' | 'project'): Promise<CmsResponse<{ url: string }>> {
  const token = getAdminToken();
  
  if (!token) {
    return { error: 'Not authenticated' };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-upload`,
      {
        method: 'POST',
        headers: {
          'x-admin-token': token,
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Upload failed' };
    }

    return { data: { url: data.url } };
  } catch (error) {
    console.error('Upload error:', error);
    return { error: 'Upload failed' };
  }
}

// Hero Content
export const getHeroContent = () => cmsRequest<any[]>('hero_content', 'GET');
export const updateHeroContent = (data: any) => cmsRequest('hero_content', 'PUT', data);
export const createHeroContent = (data: any) => cmsRequest('hero_content', 'POST', data);

// About Content
export const getAboutContent = () => cmsRequest<any[]>('about_content', 'GET');
export const updateAboutContent = (data: any) => cmsRequest('about_content', 'PUT', data);
export const createAboutContent = (data: any) => cmsRequest('about_content', 'POST', data);

// Skill Categories
export const getSkillCategories = () => cmsRequest<any[]>('skill_categories', 'GET');
export const createSkillCategory = (data: any) => cmsRequest('skill_categories', 'POST', data);
export const updateSkillCategory = (data: any) => cmsRequest('skill_categories', 'PUT', data);
export const deleteSkillCategory = (id: string) => cmsRequest('skill_categories', 'DELETE', { id });

// Skills
export const getSkills = () => cmsRequest<any[]>('skills', 'GET');
export const createSkill = (data: any) => cmsRequest('skills', 'POST', data);
export const updateSkill = (data: any) => cmsRequest('skills', 'PUT', data);
export const deleteSkill = (id: string) => cmsRequest('skills', 'DELETE', { id });

// Project Categories
export const getProjectCategories = () => cmsRequest<any[]>('project_categories', 'GET');
export const createProjectCategory = (data: any) => cmsRequest('project_categories', 'POST', data);
export const updateProjectCategory = (data: any) => cmsRequest('project_categories', 'PUT', data);
export const deleteProjectCategory = (id: string) => cmsRequest('project_categories', 'DELETE', { id });

// Projects
export const getProjects = () => cmsRequest<any[]>('projects', 'GET');
export const createProject = (data: any) => cmsRequest('projects', 'POST', data);
export const updateProject = (data: any) => cmsRequest('projects', 'PUT', data);
export const deleteProject = (id: string) => cmsRequest('projects', 'DELETE', { id });

// Achievements
export const getAchievements = () => cmsRequest<any[]>('achievements', 'GET');
export const createAchievement = (data: any) => cmsRequest('achievements', 'POST', data);
export const updateAchievement = (data: any) => cmsRequest('achievements', 'PUT', data);
export const deleteAchievement = (id: string) => cmsRequest('achievements', 'DELETE', { id });

// Leadership Content
export const getLeadershipContent = () => cmsRequest<any[]>('leadership_content', 'GET');
export const updateLeadershipContent = (data: any) => cmsRequest('leadership_content', 'PUT', data);
export const createLeadershipContent = (data: any) => cmsRequest('leadership_content', 'POST', data);

// Contact Info
export const getContactInfo = () => cmsRequest<any[]>('contact_info', 'GET');
export const updateContactInfo = (data: any) => cmsRequest('contact_info', 'PUT', data);
export const createContactInfo = (data: any) => cmsRequest('contact_info', 'POST', data);

// Site Settings
export const getSiteSettings = () => cmsRequest<any[]>('site_settings', 'GET');
export const updateSiteSettings = (data: any) => cmsRequest('site_settings', 'PUT', data);
export const createSiteSettings = (data: any) => cmsRequest('site_settings', 'POST', data);
