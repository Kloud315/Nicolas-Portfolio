import { Compass, Crown, Zap, TrendingUp, Eye, Brain } from 'lucide-react';
import { useLeadershipContent } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Crown,
  Zap,
  TrendingUp,
  Eye,
  Brain,
};

interface LeadershipTrait {
  icon: string;
  title: string;
  subtitle?: string;
  description: string;
}

// Default leadership traits
const defaultLeadershipTraits: LeadershipTrait[] = [
  {
    icon: 'Crown',
    title: 'Commander (ENTJ)',
    subtitle: 'Personality Type',
    description:
      'Natural-born leader with the drive and determination to achieve ambitious goals. Combines strategic vision with decisive action.',
  },
  {
    icon: 'Brain',
    title: 'Strategic Thinker',
    description:
      'Excels at analyzing complex situations and developing long-term plans. Sees patterns and opportunities others might miss.',
  },
  {
    icon: 'Zap',
    title: 'Decisive Leader',
    description:
      'Makes confident decisions under pressure. Takes ownership of outcomes and inspires teams to execute with precision.',
  },
  {
    icon: 'TrendingUp',
    title: 'Results-Oriented',
    description:
      'Laser-focused on achieving measurable outcomes. Sets ambitious targets and drives continuous improvement.',
  },
  {
    icon: 'Eye',
    title: 'Vision-Driven',
    description:
      'Articulates compelling visions that inspire and motivate. Transforms abstract ideas into actionable roadmaps.',
  },
  {
    icon: 'Compass',
    title: 'Growth-Focused',
    description:
      'Committed to personal and professional development. Embraces challenges as opportunities to learn and evolve.',
  },
];

const experiences = [
  {
    title: 'Philippines Startup Challenge 10',
    role: 'Startup Leader - Sukey',
    description: 'Led a team to develop and pitch a B2B marketplace CMS for Philippine MSMEs',
  },
  {
    title: 'Cyber Jump 2025 Seminar',
    role: 'Event Manager',
    description: 'Organized university seminar on cybersecurity career development',
  },
  {
    title: 'Family Food Business',
    role: 'Operations Support',
    description: 'Assisted in digital record-keeping and process improvement across 3 branches',
  },
  {
    title: 'National IT Skills Competition',
    role: 'Participant',
    description: 'Represented university at ISITE Inc. national competition',
  },
];

export function LeadershipSection() {
  const { data: leadershipContent, isLoading } = useLeadershipContent();
  
  const leadershipTraits: LeadershipTrait[] = 
    leadershipContent?.traits && Array.isArray(leadershipContent.traits) && leadershipContent.traits.length > 0
      ? (leadershipContent.traits as unknown as LeadershipTrait[])
      : defaultLeadershipTraits;

  return (
    <section id="leadership" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Personality & Leadership
            </span>
            <h2 className="section-title">
              {leadershipContent?.title || 'Leadership &'} <span className="text-gradient">Mindset</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              {leadershipContent?.description || 'Beyond technical skills – the character traits and leadership philosophy that drive impact'}
            </p>
          </div>

          {/* Leadership Traits Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {leadershipTraits.map((trait, index) => {
                const IconComponent = iconMap[trait.icon] || Crown;
                
                return (
                  <div
                    key={trait.title}
                    className={`glass-card p-6 card-hover ${
                      index === 0 ? 'sm:col-span-2 lg:col-span-1 border-primary/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          index === 0 ? 'accent-gradient' : 'bg-primary/10 border border-primary/30'
                        }`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${index === 0 ? 'text-primary-foreground' : 'text-primary'}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{trait.title}</h3>
                        {trait.subtitle && (
                          <p className="text-xs text-primary font-medium mb-2">{trait.subtitle}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">{trait.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Experience Timeline */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-10">
              Leadership <span className="text-gradient">Experience</span>
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={exp.title} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary glow" />
                    {index !== experiences.length - 1 && (
                      <div className="w-0.5 h-full bg-border min-h-[60px]" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h4 className="font-semibold text-foreground">{exp.title}</h4>
                    <p className="text-sm text-primary font-medium">{exp.role}</p>
                    <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
