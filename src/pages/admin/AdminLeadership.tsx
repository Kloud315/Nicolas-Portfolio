import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { updateLeadershipContent, createLeadershipContent } from '@/lib/cms-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Loader2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface LeadershipTrait {
  title: string;
  description: string;
}

export default function AdminLeadership() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: 'Leadership & Mindset',
    description: '',
    traits: [] as LeadershipTrait[],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('leadership_content')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setContentId(data.id);
        setFormData({
          title: data.title || 'Leadership & Mindset',
          description: data.description || '',
          traits: Array.isArray(data.traits) ? (data.traits as unknown as LeadershipTrait[]) : [],
        });
      }
    } catch (error) {
      console.error('Error fetching leadership content:', error);
      toast.error('Failed to load leadership content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTrait = () => {
    setFormData({
      ...formData,
      traits: [...formData.traits, { title: '', description: '' }],
    });
  };

  const handleRemoveTrait = (index: number) => {
    const newTraits = formData.traits.filter((_, i) => i !== index);
    setFormData({ ...formData, traits: newTraits });
  };

  const handleTraitChange = (index: number, field: 'title' | 'description', value: string) => {
    const newTraits = [...formData.traits];
    newTraits[index] = { ...newTraits[index], [field]: value };
    setFormData({ ...formData, traits: newTraits });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const saveData = {
        title: formData.title,
        description: formData.description || null,
        traits: formData.traits,
      };

      if (contentId) {
        const { error } = await updateLeadershipContent({ id: contentId, ...saveData });
        if (error) throw new Error(error);
      } else {
        const result = await createLeadershipContent(saveData);
        if (result.error) throw new Error(result.error);
        if (result.data && typeof result.data === 'object' && 'id' in result.data) {
          setContentId((result.data as { id: string }).id);
        }
      }
      toast.success('Leadership content saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save leadership content');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Leadership & Mindset</h1>
        <p className="text-muted-foreground mt-1">Edit your leadership section and personality traits</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Leadership & Mindset"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Section Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your leadership philosophy..."
            rows={4}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Leadership Traits</Label>
            <Button variant="outline" size="sm" onClick={handleAddTrait}>
              <Plus className="w-4 h-4 mr-1" />
              Add Trait
            </Button>
          </div>

          {formData.traits.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No traits added yet. Click "Add Trait" to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {formData.traits.map((trait, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Trait {index + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveTrait(index)}
                    >
                      <X className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <Input
                    value={trait.title}
                    onChange={(e) => handleTraitChange(index, 'title', e.target.value)}
                    placeholder="Strategic Thinker"
                  />
                  <Textarea
                    value={trait.description}
                    onChange={(e) => handleTraitChange(index, 'description', e.target.value)}
                    placeholder="I approach problems with a long-term perspective..."
                    rows={2}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
