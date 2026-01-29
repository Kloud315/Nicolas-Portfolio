import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { updateSiteSettings, createSiteSettings, uploadFile } from '@/lib/cms-api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Save, Loader2, Upload, FileText, User } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    resume_url: '',
    profile_image_url: '',
  });

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettingsId(data.id);
        setFormData({
          resume_url: data.resume_url || '',
          profile_image_url: data.profile_image_url || '',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      toast.error('Please upload a PDF file');
      return;
    }

    setIsUploadingResume(true);
    try {
      const { data, error } = await uploadFile(file, 'resume');
      if (error) throw new Error(error);
      if (data) {
        setFormData({ ...formData, resume_url: data.url });
        toast.success('Resume uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload resume');
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setIsUploadingProfile(true);
    try {
      const { data, error } = await uploadFile(file, 'profile');
      if (error) throw new Error(error);
      if (data) {
        setFormData({ ...formData, profile_image_url: data.url });
        toast.success('Profile image uploaded!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload profile image');
    } finally {
      setIsUploadingProfile(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const saveData = {
        resume_url: formData.resume_url || null,
        profile_image_url: formData.profile_image_url || null,
      };

      if (settingsId) {
        const { error } = await updateSiteSettings({ id: settingsId, ...saveData });
        if (error) throw new Error(error);
      } else {
        const result = await createSiteSettings(saveData);
        if (result.error) throw new Error(result.error);
        if (result.data && typeof result.data === 'object' && 'id' in result.data) {
          setSettingsId((result.data as { id: string }).id);
        }
      }
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save settings');
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
        <h1 className="text-3xl font-bold text-foreground">Site Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your resume and profile image</p>
      </div>

      <div className="glass-card p-6 space-y-8">
        {/* Resume Upload */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Resume PDF
          </Label>
          
          <div className="p-4 rounded-lg bg-secondary/30 space-y-4">
            {formData.resume_url ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Resume uploaded</p>
                  <a 
                    href={formData.resume_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    View current resume
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No resume uploaded yet</p>
            )}
            
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => resumeInputRef.current?.click()}
              disabled={isUploadingResume}
            >
              {isUploadingResume ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {formData.resume_url ? 'Replace Resume' : 'Upload Resume'}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Profile Image Upload */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Image
          </Label>
          
          <div className="p-4 rounded-lg bg-secondary/30 space-y-4">
            {formData.profile_image_url ? (
              <div className="flex items-center gap-4">
                <img 
                  src={formData.profile_image_url} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Profile image uploaded</p>
                  <p className="text-xs text-muted-foreground">Click below to replace</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">No profile image uploaded yet</p>
              </div>
            )}
            
            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => profileInputRef.current?.click()}
              disabled={isUploadingProfile}
            >
              {isUploadingProfile ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {formData.profile_image_url ? 'Replace Image' : 'Upload Image'}
                </>
              )}
            </Button>
          </div>
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
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
