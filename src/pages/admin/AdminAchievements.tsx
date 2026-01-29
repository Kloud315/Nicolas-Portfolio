import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { createAchievement, updateAchievement, deleteAchievement } from '@/lib/cms-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Save, Loader2, Trash2, Edit2, Award } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Achievement {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

const iconOptions = [
  'Award', 'Trophy', 'Medal', 'Star', 'Certificate', 'GraduationCap', 
  'BookOpen', 'Briefcase', 'Cloud', 'Shield'
];

export default function AdminAchievements() {
  const [isLoading, setIsLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Award',
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      toast.error('Failed to load achievements');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setIsSaving(true);

    try {
      if (editingItem) {
        const { error } = await updateAchievement({ 
          id: editingItem.id, 
          title: formData.title,
          description: formData.description || null,
          icon: formData.icon,
        });
        if (error) throw new Error(error);
        toast.success('Achievement updated!');
      } else {
        const { error } = await createAchievement({ 
          title: formData.title,
          description: formData.description || null,
          icon: formData.icon,
          sort_order: achievements.length,
        });
        if (error) throw new Error(error);
        toast.success('Achievement created!');
      }
      
      await fetchAchievements();
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save achievement');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this achievement?')) return;
    
    try {
      const { error } = await deleteAchievement(id);
      if (error) throw new Error(error);
      toast.success('Achievement deleted!');
      await fetchAchievements();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete achievement');
    }
  };

  const openEdit = (item: Achievement) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      icon: item.icon || 'Award',
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      icon: 'Award',
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
          <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
          <p className="text-muted-foreground mt-1">Manage certifications and accomplishments</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Achievement' : 'New Achievement'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="DOST-SEI Scholar"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Merit scholarship awarded by the Department of Science and Technology..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} disabled={isSaving} className="w-full">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Achievement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Achievements List */}
      <div className="grid md:grid-cols-2 gap-4">
        {achievements.length === 0 ? (
          <div className="glass-card p-12 text-center md:col-span-2">
            <p className="text-muted-foreground">No achievements yet. Add one to get started!</p>
          </div>
        ) : (
          achievements.map((item) => (
            <div key={item.id} className="glass-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
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
