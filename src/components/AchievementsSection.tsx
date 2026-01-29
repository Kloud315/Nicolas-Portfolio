import { Award, GraduationCap, BadgeCheck, Cloud, Network } from 'lucide-react';

interface Achievement {
  icon: React.ElementType;
  title: string;
  organization: string;
  description: string;
  year?: string;
}

const achievements: Achievement[] = [
  {
    icon: GraduationCap,
    title: 'DOST-SEI Scholar',
    organization: 'Department of Science and Technology',
    description: 'RA7687 Science and Technology Scholarship recipient since 2022',
    year: '2022 - Present',
  },
  {
    icon: Award,
    title: 'Magna Cum Laude Candidate',
    organization: 'Lyceum of the Philippines University - Cavite',
    description: 'Maintaining a GWA of 1.35 with consistent academic excellence',
    year: '2022 - Present',
  },
  {
    icon: Award,
    title: "Consistent Dean's Lister",
    organization: 'COECSA Students Awards',
    description: "Recognized on the Dean's List every semester from 1st Year to Present",
    year: 'AY 2022-2024',
  },
  {
    icon: BadgeCheck,
    title: 'IT Specialist - Database',
    organization: 'Certiport',
    description: 'Professional certification in database management and operations',
    year: 'June 2024',
  },
  {
    icon: BadgeCheck,
    title: 'IT Specialist - HTML & CSS',
    organization: 'Certiport',
    description: 'Professional certification in web development fundamentals',
    year: 'May 2025',
  },
  {
    icon: Network,
    title: 'CCNA: Introduction to Networks',
    organization: 'Cisco',
    description: 'Badge certification in networking fundamentals',
    year: 'January 2025',
  },
  {
    icon: Cloud,
    title: 'Certified Cloud System Analyst',
    organization: 'MicroCredentials',
    description: 'Ongoing certification in cloud computing and system analysis',
    year: 'Expected Jan 2026',
  },
];

export function AchievementsSection() {
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className="glass-card p-6 card-hover group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <achievement.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground leading-tight">{achievement.title}</h3>
                    <p className="text-sm text-primary font-medium">{achievement.organization}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.year && (
                      <p className="text-xs text-muted-foreground/70 font-medium">{achievement.year}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
