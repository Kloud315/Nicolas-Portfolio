import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Trash2, AlertTriangle } from 'lucide-react';

export default function RemoveCertifications() {
  const [isRemoving, setIsRemoving] = useState(false);
  const [done, setDone] = useState(false);

  const certificationsToRemove = [
    'IT Specialist - Database',
    'IT Specialist - HTML & CSS', 
    'CCNA: Introduction to Networks',
    'Certified Cloud System Analyst',
    'Google AI Essentials',
    'Google Prompting Essentials'
  ];

  const handleRemove = async () => {
    if (!confirm('Are you sure you want to remove these 6 certifications from the achievements section? This cannot be undone.')) {
      return;
    }

    setIsRemoving(true);

    try {
      const { data, error } = await supabase
        .from('achievements')
        .delete()
        .in('title', certificationsToRemove);

      if (error) {
        console.error('Error removing certifications:', error);
        toast.error('Failed to remove certifications');
        return;
      }

      console.log('Removed certifications:', data);
      toast.success(`Successfully removed ${data?.length || 0} certifications from achievements!`);
      setDone(true);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsRemoving(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Done!</h1>
          <p className="text-muted-foreground mb-6">
            The certifications have been removed from the Achievements & Recognition section.
          </p>
          <p className="text-sm text-muted-foreground">
            You can now delete this file and navigate back to your portfolio.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-card p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Remove Certifications</h1>
          <p className="text-muted-foreground">
            Remove the 6 certifications from the Achievements & Recognition section
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">These will be removed:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {certificationsToRemove.map((cert) => (
                <li key={cert} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button 
          onClick={handleRemove} 
          disabled={isRemoving}
          className="w-full"
          variant="destructive"
        >
          {isRemoving ? 'Removing...' : 'Remove Certifications'}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          This will only remove them from Achievements & Recognition, not from the Certifications section.
        </p>
      </div>
    </div>
  );
}
