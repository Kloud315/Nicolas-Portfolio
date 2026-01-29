import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { updateHeroContent, createHeroContent } from '@/lib/cms-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminHero() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [heroId, setHeroId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    branding_statement: '',
  });

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setHeroId(data.id);
        setFormData({
          name: data.name || '',
          title: data.title || '',
          branding_statement: data.branding_statement || '',
        });
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
      toast.error('Failed to load hero content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (heroId) {
        const { error } = await updateHeroContent({ id: heroId, ...formData });
        if (error) throw new Error(error);
      } else {
        const result = await createHeroContent(formData);
        if (result.error) throw new Error(result.error);
        if (result.data && typeof result.data === 'object' && 'id' in result.data) {
          setHeroId((result.data as { id: string }).id);
        }
      }
      toast.success('Hero content saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save hero content');
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
        <h1 className="text-3xl font-bold text-foreground">Hero Section</h1>
        <p className="text-muted-foreground mt-1">Edit your main headline and branding statement</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Patrick Nicolas"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="IT Student | Web Developer | Project Leader"
          />
          <p className="text-xs text-muted-foreground">
            Use | to separate different roles
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="branding">Branding Statement</Label>
          <Textarea
            id="branding"
            value={formData.branding_statement}
            onChange={(e) => setFormData({ ...formData, branding_statement: e.target.value })}
            placeholder="A results-driven IT student specializing in..."
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            This appears below your title in the hero section
          </p>
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
