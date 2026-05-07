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

// Professional achievements showcasing academic and technical excellence
const defaultAchievements = [
  {
    id: '1',
    icon: 'GraduationCap',
    title: 'DOST-SEI Scholar',
    description: 'RA7687 Science and Technology Scholarship recipient since 2022',
    category: 'academic',
    highlight: true,
  },
  {
    id: '2',
    icon: 'Award',
    title: 'Magna Cum Laude Candidate',
    description: 'Maintaining exceptional GWA of 1.35 with consistent academic excellence',
    category: 'academic',
    highlight: true,
  },
  {
    id: '3',
    icon: 'Award',
    title: 'Silver Medal Award',
    description: 'Recognition for outstanding academic performance and leadership',
    category: 'academic',
    highlight: false,
  },
  {
    id: '4',
    icon: 'Award',
    title: "Consistent Dean's Lister",
    description: "Dean's List recognition every semester from 1st Year to Present",
    category: 'academic',
    highlight: false,
  },
  {
    id: '5',
    icon: 'Network',
    title: 'National IT Skills Competition',
    description: 'Represented university at ISITE Inc. national IT competition',
    category: 'competition',
    highlight: false,
  },
  {
    id: '6',
    icon: 'Award',
    title: 'Best Capstone Nominee',
    description: 'Nominated for best capstone project among graduating class',
    category: 'academic',
    highlight: false,
  },
];

export function AchievementsSection() {
  const { data: achievements, isLoading } = useAchievements();
  
  const displayAchievements = achievements && achievements.length > 0 ? achievements : defaultAchievements;

  return (
    <section id="achievements" className="section-padding bg-background relative">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-emerald/10 to-accent-cyan/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-purple/10 to-accent-emerald/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Academic & Professional <span className="text-gradient">Achievements</span>
            </span>
            <h2 className="section-title">
              Achievements & <span className="text-gradient">Recognition</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              Academic honors, certifications, and professional recognition in technology and leadership
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
              {displayAchievements.map((achievement: any, index: number) => {
                const IconComponent = iconMap[achievement.icon || 'Award'] || Award;
                
                return (
                  <div
                    key={achievement.id}
                    className={`group relative overflow-hidden rounded-2xl glass-card p-6 hover:scale-105 transition-all duration-300 ${
                      achievement.highlight 
                        ? 'bg-gradient-to-br from-accent-emerald/5 via-accent-cyan/5 to-accent-purple/5 border border-accent-emerald/30 shadow-lg hover:shadow-xl' 
                        : 'border-border/50'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Highlight badge */}
                    {achievement.highlight && (
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-accent-emerald/20 to-accent-cyan/20 border border-accent-emerald/30 backdrop-blur-sm">
                          <span className="text-xs text-accent-emerald font-semibold">⭐ Featured</span>
                        </div>
                      </div>
                    )}

                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-emerald/5 via-transparent to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:animate-pulse-glow ${
                          achievement.highlight
                            ? 'from-accent-emerald to-accent-cyan'
                            : 'from-primary to-accent-purple'
                        }`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground leading-tight text-lg mb-2 group-hover:text-gradient transition-colors">
                            {achievement.title}
                          </h3>
                          {achievement.description && (
                            <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
                          )}
                          
                          {/* Category badge */}
                          <div className="mt-3">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full capitalize ${
                              achievement.category === 'academic'
                                ? 'bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20'
                                : 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                            }`}>
                              <div className="w-1.5 h-1.5 rounded-full bg-current" />
                              {achievement.category}
                            </span>
                          </div>
                        </div>
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
