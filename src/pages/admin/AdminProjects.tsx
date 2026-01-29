import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { createProject, updateProject, deleteProject, uploadFile } from '@/lib/cms-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Save, Loader2, Trash2, Edit2, Star, ExternalLink, Upload } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  impact: string | null;
  featured: boolean;
  link: string | null;
  image_url: string | null;
  sort_order: number;
}

export default function AdminProjects() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    description: '',
    tech: '',
    impact: '',
    featured: false,
    link: '',
    image_url: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
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
    if (!formData.title.trim() || !formData.role.trim() || !formData.description.trim()) {
      toast.error('Please fill in required fields');
      return;
    }
    setIsSaving(true);

    try {
      const projectData = {
        title: formData.title,
        role: formData.role,
        description: formData.description,
        tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
        impact: formData.impact || null,
        featured: formData.featured,
        link: formData.link || null,
        image_url: formData.image_url || null,
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
      
      await fetchProjects();
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
      await fetchProjects();
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
      description: project.description,
      tech: project.tech.join(', '),
      impact: project.impact || '',
      featured: project.featured,
      link: project.link || '',
      image_url: project.image_url || '',
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      role: '',
      description: '',
      tech: '',
      impact: '',
      featured: false,
      link: '',
      image_url: '',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects Manager</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
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
                    placeholder="GameSchedGo"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Lead Developer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A comprehensive sports facility reservation system..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Tech Stack (comma-separated)</Label>
                <Input
                  value={formData.tech}
                  onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                  placeholder="HTML, CSS, JavaScript, PHP, MySQL"
                />
              </div>

              <div className="space-y-2">
                <Label>Impact / Results</Label>
                <Textarea
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                  placeholder="Successfully deployed and serving the local sports community..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Project URL (optional)</Label>
                <Input
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://gameschedgo.com"
                />
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

              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label>Featured Project</Label>
              </div>

              <Button onClick={handleSave} disabled={isSaving} className="w-full">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground">No projects yet. Create one to get started!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="glass-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    {project.featured && (
                      <span className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-primary mb-2">{project.role}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
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
