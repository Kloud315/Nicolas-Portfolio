import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  FileText,
  User,
  Code,
  FolderKanban,
  Award,
  Brain,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  projects: number;
  skills: number;
  achievements: number;
  categories: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    achievements: 0,
    categories: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, skillsRes, achievementsRes, categoriesRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('skills').select('id', { count: 'exact' }),
        supabase.from('achievements').select('id', { count: 'exact' }),
        supabase.from('skill_categories').select('id', { count: 'exact' }),
      ]);

      setStats({
        projects: projectsRes.count || 0,
        skills: skillsRes.count || 0,
        achievements: achievementsRes.count || 0,
        categories: categoriesRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLinks = [
    { to: '/admin/hero', icon: FileText, label: 'Edit Hero', description: 'Update headline & branding' },
    { to: '/admin/about', icon: User, label: 'Edit About', description: 'Update biography' },
    { to: '/admin/skills', icon: Code, label: 'Manage Skills', description: 'Add or edit skills' },
    { to: '/admin/projects', icon: FolderKanban, label: 'Manage Projects', description: 'Add or edit projects' },
    { to: '/admin/achievements', icon: Award, label: 'Achievements', description: 'Manage certifications' },
    { to: '/admin/leadership', icon: Brain, label: 'Leadership', description: 'Edit mindset section' },
    { to: '/admin/settings', icon: Settings, label: 'Settings', description: 'Resume & profile image' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio content</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Portfolio
          </Button>
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{isLoading ? '-' : stats.projects}</p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Code className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{isLoading ? '-' : stats.skills}</p>
              <p className="text-sm text-muted-foreground">Skills</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{isLoading ? '-' : stats.achievements}</p>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Code className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{isLoading ? '-' : stats.categories}</p>
              <p className="text-sm text-muted-foreground">Skill Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="glass-card p-6 card-hover flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <link.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{link.label}</h3>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
