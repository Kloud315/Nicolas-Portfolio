import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { createProject, updateProject, deleteProject, uploadFile } from '@/lib/cms-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Save, Loader2, Trash2, Edit2, Star, ExternalLink, Upload, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
}

interface Project {
  id: string;
  title: string;
  role: string;
  detailed_description: string;
  short_description: string | null;
  tech: string[];
  impact: string | null;
  featured: boolean;
  link: string | null;
  image_url: string | null;
  sort_order: number;
  category_id: string | null;
  project_type: string | null;
  status: string | null;
  is_visible: boolean;
}

const PROJECT_TYPES = ['Web App', 'AI Tool', 'Dashboard', 'Mobile App', 'API', 'Library', 'Other'];
const STATUS_OPTIONS = ['Completed', 'Ongoing'];

export default function AdminProjects() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    short_description: '',
    detailed_description: '',
    tech: '',
    impact: '',
    featured: false,
    link: '',
    image_url: '',
    category_id: '',
    project_type: 'Web App',
    status: 'Completed',
    is_visible: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('project_categories').select('*').order('sort_order'),
      ]);

      if (projectsRes.error) throw projectsRes.error;
      if (categoriesRes.error) throw categoriesRes.error;

      setProjects(projectsRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { data, error } = await uploadFile(file, 'project');
      if (error) throw new Error(error);
      if (data) {
        setFormData({ ...formData, image_url: data.url });
        toast.success('Image uploaded!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.role.trim() || !formData.detailed_description.trim()) {
      toast.error('Please fill in required fields');
      return;
    }
    setIsSaving(true);

    try {
      const projectData = {
        title: formData.title,
        role: formData.role,
        short_description: formData.short_description || null,
        detailed_description: formData.detailed_description,
        tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
        impact: formData.impact || null,
        featured: formData.featured,
        link: formData.link || null,
        image_url: formData.image_url || null,
        category_id: formData.category_id || null,
        project_type: formData.project_type,
        status: formData.status,
        is_visible: formData.is_visible,
      };

      if (editingProject) {
        const { error } = await updateProject({ id: editingProject.id, ...projectData });
        if (error) throw new Error(error);
        toast.success('Project updated!');
      } else {
        const { error } = await createProject({ ...projectData, sort_order: projects.length });
        if (error) throw new Error(error);
        toast.success('Project created!');
      }
      
      await fetchData();
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    
    try {
      const { error } = await deleteProject(id);
      if (error) throw new Error(error);
      toast.success('Project deleted!');
      await fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete project');
    }
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      role: project.role,
      short_description: project.short_description || '',
      detailed_description: project.detailed_description,
      tech: project.tech.join(', '),
      impact: project.impact || '',
      featured: project.featured,
      link: project.link || '',
      image_url: project.image_url || '',
      category_id: project.category_id || '',
      project_type: project.project_type || 'Web App',
      status: project.status || 'Completed',
      is_visible: project.is_visible ?? true,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      role: '',
      short_description: '',
      detailed_description: '',
      tech: '',
      impact: '',
      featured: false,
      link: '',
      image_url: '',
      category_id: '',
      project_type: 'Web App',
      status: 'Completed',
      is_visible: true,
    });
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  const filteredProjects = filterCategory === 'all' 
    ? projects 
    : filterCategory === 'uncategorized'
      ? projects.filter(p => !p.category_id)
      : projects.filter(p => p.category_id === filterCategory);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects Manager</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects by category</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'New Project'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="InternInterview AI"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Creator / Developer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(val) => setFormData({ ...formData, category_id: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <Select
                    value={formData.project_type}
                    onValueChange={(val) => setFormData({ ...formData, project_type: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Short Description</Label>
                <Input
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Brief one-line description for previews"
                />
              </div>

              <div className="space-y-2">
                <Label>Detailed Description *</Label>
                <Textarea
                  value={formData.detailed_description}
                  onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
                  placeholder="Full project description with features and functionality..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Tech Stack (comma-separated)</Label>
                <Input
                  value={formData.tech}
                  onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                  placeholder="React, AI, TypeScript, Lovable"
                />
              </div>

              <div className="space-y-2">
                <Label>Impact / Results</Label>
                <Textarea
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                  placeholder="Key achievements and outcomes..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project URL (optional)</Label>
                  <Input
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://example.lovable.app"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(val) => setFormData({ ...formData, status: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Project Image</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="project-image"
                  />
                  <label htmlFor="project-image">
                    <Button variant="outline" asChild disabled={isUploading}>
                      <span>
                        {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        Upload Image
                      </span>
                    </Button>
                  </label>
                  {formData.image_url && (
                    <img src={formData.image_url} alt="Preview" className="w-16 h-16 object-cover rounded" />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label>Featured Project</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.is_visible}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                  />
                  <Label>Visible on Portfolio</Label>
                </div>
              </div>

              <Button onClick={handleSave} disabled={isSaving} className="w-full">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Button
          variant={filterCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategory('all')}
        >
          All ({projects.length})
        </Button>
        {categories.map((cat) => {
          const count = projects.filter(p => p.category_id === cat.id).length;
          return (
            <Button
              key={cat.id}
              variant={filterCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory(cat.id)}
            >
              {cat.name.split('/')[0].trim()} ({count})
            </Button>
          );
        })}
        <Button
          variant={filterCategory === 'uncategorized' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategory('uncategorized')}
        >
          Uncategorized ({projects.filter(p => !p.category_id).length})
        </Button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground">No projects in this category. Create one to get started!</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="glass-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    {project.featured && (
                      <Badge variant="default" className="gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </Badge>
                    )}
                    {!project.is_visible && (
                      <Badge variant="secondary" className="gap-1">
                        <EyeOff className="w-3 h-3" />
                        Hidden
                      </Badge>
                    )}
                    <Badge variant="outline">{project.project_type || 'Web App'}</Badge>
                    <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                      {project.status || 'Completed'}
                    </Badge>
                  </div>
                  <p className="text-sm text-primary mb-1">{project.role}</p>
                  <p className="text-xs text-muted-foreground mb-2">{getCategoryName(project.category_id)}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.short_description || project.detailed_description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-badge text-xs">{t}</span>
                    ))}
                  </div>
                </div>
                {project.image_url && (
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex items-center gap-2">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => openEdit(project)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}