import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  createSkillCategory, updateSkillCategory, deleteSkillCategory,
  createSkill, updateSkill, deleteSkill 
} from '@/lib/cms-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, Save, Loader2, Trash2, Edit2, X, GripVertical 
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

interface SkillCategory {
  id: string;
  title: string;
  sort_order: number;
}

interface Skill {
  id: string;
  category_id: string;
  name: string;
  level: number;
  sort_order: number;
}

export default function AdminSkills() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({ title: '' });
  const [skillForm, setSkillForm] = useState({ name: '', level: 50 });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, skillRes] = await Promise.all([
        supabase.from('skill_categories').select('*').order('sort_order'),
        supabase.from('skills').select('*').order('sort_order'),
      ]);

      if (catRes.error) throw catRes.error;
      if (skillRes.error) throw skillRes.error;

      setCategories(catRes.data || []);
      setSkills(skillRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load skills');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCategory = async () => {
    if (!categoryForm.title.trim()) return;
    setIsSaving(true);

    try {
      if (editingCategory) {
        const { error } = await updateSkillCategory({ 
          id: editingCategory.id, 
          title: categoryForm.title 
        });
        if (error) throw new Error(error);
        toast.success('Category updated!');
      } else {
        const { error } = await createSkillCategory({ 
          title: categoryForm.title,
          sort_order: categories.length 
        });
        if (error) throw new Error(error);
        toast.success('Category created!');
      }
      await fetchData();
      setCategoryDialogOpen(false);
      setCategoryForm({ title: '' });
      setEditingCategory(null);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Delete this category and all its skills?')) return;
    
    try {
      const { error } = await deleteSkillCategory(id);
      if (error) throw new Error(error);
      toast.success('Category deleted!');
      await fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleSaveSkill = async () => {
    if (!skillForm.name.trim() || !selectedCategoryId) return;
    setIsSaving(true);

    try {
      if (editingSkill) {
        const { error } = await updateSkill({ 
          id: editingSkill.id, 
          name: skillForm.name,
          level: skillForm.level 
        });
        if (error) throw new Error(error);
        toast.success('Skill updated!');
      } else {
        const categorySkills = skills.filter(s => s.category_id === selectedCategoryId);
        const { error } = await createSkill({ 
          name: skillForm.name,
          level: skillForm.level,
          category_id: selectedCategoryId,
          sort_order: categorySkills.length 
        });
        if (error) throw new Error(error);
        toast.success('Skill created!');
      }
      await fetchData();
      setSkillDialogOpen(false);
      setSkillForm({ name: '', level: 50 });
      setEditingSkill(null);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save skill');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    
    try {
      const { error } = await deleteSkill(id);
      if (error) throw new Error(error);
      toast.success('Skill deleted!');
      await fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete skill');
    }
  };

  const openEditCategory = (category: SkillCategory) => {
    setEditingCategory(category);
    setCategoryForm({ title: category.title });
    setCategoryDialogOpen(true);
  };

  const openEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillForm({ name: skill.name, level: skill.level });
    setSelectedCategoryId(skill.category_id);
    setSkillDialogOpen(true);
  };

  const openNewSkill = (categoryId: string) => {
    setEditingSkill(null);
    setSkillForm({ name: '', level: 50 });
    setSelectedCategoryId(categoryId);
    setSkillDialogOpen(true);
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
          <h1 className="text-3xl font-bold text-foreground">Skills Manager</h1>
          <p className="text-muted-foreground mt-1">Manage skill categories and individual skills</p>
        </div>
        
        <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingCategory(null); setCategoryForm({ title: '' }); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Category' : 'New Category'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Category Title</Label>
                <Input
                  value={categoryForm.title}
                  onChange={(e) => setCategoryForm({ title: e.target.value })}
                  placeholder="Programming & Development"
                />
              </div>
              <Button onClick={handleSaveCategory} disabled={isSaving} className="w-full">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Skill Dialog */}
      <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSkill ? 'Edit Skill' : 'New Skill'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Skill Name</Label>
              <Input
                value={skillForm.name}
                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                placeholder="JavaScript"
              />
            </div>
            <div className="space-y-2">
              <Label>Proficiency Level: {skillForm.level}%</Label>
              <Slider
                value={[skillForm.level]}
                onValueChange={(value) => setSkillForm({ ...skillForm, level: value[0] })}
                max={100}
                step={5}
              />
            </div>
            <Button onClick={handleSaveSkill} disabled={isSaving} className="w-full">
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Skill
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Categories Grid */}
      <div className="space-y-6">
        {categories.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground">No skill categories yet. Create one to get started!</p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => openNewSkill(category.id)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Skill
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openEditCategory(category)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {skills
                  .filter((skill) => skill.category_id === category.id)
                  .map((skill) => (
                    <div 
                      key={skill.id} 
                      className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-primary">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditSkill(skill)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteSkill(skill.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                {skills.filter((s) => s.category_id === category.id).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No skills in this category yet
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
