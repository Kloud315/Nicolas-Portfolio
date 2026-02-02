import { Award, GraduationCap, BadgeCheck, Cloud, Network } from 'lucide-react';
import { useAchievements } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: Record<string, React.ElementType> = {
  Award,
  GraduationCap,
  BadgeCheck,
  Cloud,
  Network,
};

interface Achievement {
  id: string;
  icon: string | null;
  title: string;
  description: string | null;
}

// Fallback achievements if database is empty
const defaultAchievements = [
  {
    id: '1',
    icon: 'GraduationCap',
    title: 'DOST-SEI Scholar',
    description: 'RA7687 Science and Technology Scholarship recipient since 2022',
  },
  {
    id: '2',
    icon: 'Award',
    title: 'Magna Cum Laude Candidate',
    description: 'Maintaining a GWA of 1.35 with consistent academic excellence',
  },
  {
    id: '3',
    icon: 'Award',
    title: "Consistent Dean's Lister",
    description: "Recognized on the Dean's List every semester from 1st Year to Present",
  },
  {
    id: '4',
    icon: 'BadgeCheck',
    title: 'IT Specialist - Database',
    description: 'Professional certification in database management and operations',
  },
  {
    id: '5',
    icon: 'BadgeCheck',
    title: 'IT Specialist - HTML & CSS',
    description: 'Professional certification in web development fundamentals',
  },
  {
    id: '6',
    icon: 'Network',
    title: 'CCNA: Introduction to Networks',
    description: 'Badge certification in networking fundamentals',
  },
  {
    id: '7',
    icon: 'Cloud',
    title: 'Certified Cloud System Analyst',
    description: 'Ongoing certification in cloud computing and system analysis',
  },
];

export function AchievementsSection() {
  const { data: achievements, isLoading } = useAchievements();
  
  const displayAchievements = achievements && achievements.length > 0 ? achievements : defaultAchievements;

  return (
    <section id="achievements" className="section-padding bg-card/50 relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Recognition
            </span>
            <h2 className="section-title">
              Achievements & <span className="text-gradient">Certifications</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              Academic honors and professional certifications demonstrating commitment to excellence
            </p>
          </div>

          {/* Achievements Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayAchievements.map((achievement: Achievement, index: number) => {
                const IconComponent = iconMap[achievement.icon || 'Award'] || Award;
                
                return (
                  <div
                    key={achievement.id}
                    className="glass-card p-6 card-hover group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground leading-tight">{achievement.title}</h3>
                        {achievement.description && (
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
