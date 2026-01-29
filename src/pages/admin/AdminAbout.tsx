import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { updateAboutContent, createAboutContent } from '@/lib/cms-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminAbout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [aboutId, setAboutId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    content: '',
    gwa: '',
  });

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setAboutId(data.id);
        setFormData({
          content: data.content || '',
          gwa: data.gwa || '',
        });
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      toast.error('Failed to load about content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (aboutId) {
        const { error } = await updateAboutContent({ id: aboutId, ...formData });
        if (error) throw new Error(error);
      } else {
        const result = await createAboutContent(formData);
        if (result.error) throw new Error(result.error);
        if (result.data && typeof result.data === 'object' && 'id' in result.data) {
          setAboutId((result.data as { id: string }).id);
        }
      }
      toast.success('About content saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save about content');
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
        <h1 className="text-3xl font-bold text-foreground">About Me</h1>
        <p className="text-muted-foreground mt-1">Edit your biography and academic information</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="gwa">GWA (Grade Weighted Average)</Label>
          <Input
            id="gwa"
            value={formData.gwa}
            onChange={(e) => setFormData({ ...formData, gwa: e.target.value })}
            placeholder="1.35"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">About Me Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write about yourself, your journey, skills, and aspirations..."
            rows={12}
          />
          <p className="text-xs text-muted-foreground">
            Write in paragraphs. This content appears in the About section.
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
