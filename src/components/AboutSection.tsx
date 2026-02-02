import { Target, Lightbulb, Users, Rocket } from 'lucide-react';
import { useAboutContent } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';

const defaultTraits = [
  {
    icon: Target,
    title: 'Strategic Thinker',
    description: 'Analytical approach to problem-solving with long-term vision',
  },
  {
    icon: Lightbulb,
    title: 'Results-Oriented',
    description: 'Focused on delivering impactful outcomes and measurable success',
  },
  {
    icon: Users,
    title: 'Collaborative Leader',
    description: 'Building and empowering teams to achieve shared goals',
  },
  {
    icon: Rocket,
    title: 'Growth-Focused',
    description: 'Continuous learner embracing new technologies and challenges',
  },
];

export function AboutSection() {
  const { data: aboutContent, isLoading } = useAboutContent();

  const defaultContent = `I'm a <span class="text-foreground font-semibold">4th-year IT student</span> at 
Lyceum of the Philippines University – Cavite, driven by an unwavering passion for 
technology and leadership. As a <span class="text-primary font-semibold">DOST-SEI Scholar</span> and 
<span class="text-primary font-semibold"> Magna Cum Laude candidate</span>, I've consistently 
demonstrated academic excellence while pursuing real-world impact.

My journey in tech is defined by action—from leading the development of 
<span class="text-foreground font-semibold"> GameSchedGo</span> for the City Government of 
Trece Martires to founding <span class="text-foreground font-semibold">Sukey</span>, a B2B 
marketplace platform for Philippine MSMEs. I believe in building systems that matter.

With an <span class="text-primary font-semibold">ENTJ (Commander)</span> personality, 
I thrive on strategic challenges, decisive action, and leading teams toward ambitious goals. 
My technical skills are matched by a deep commitment to communication, organization, and vision.`;

  return (
    <section id="about" className="section-padding bg-background relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              About Me
            </span>
            <h2 className="section-title">
              Building the Future, <span className="text-gradient">One System at a Time</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              ) : (
                <div 
                  className="text-lg text-muted-foreground leading-relaxed space-y-6 [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: aboutContent?.content || defaultContent }}
                />
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-gradient">
                    {aboutContent?.gwa || '1.35'}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">GWA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-gradient">5+</div>
                  <div className="text-sm text-muted-foreground mt-1">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-gradient">4+</div>
                  <div className="text-sm text-muted-foreground mt-1">Certifications</div>
                </div>
              </div>
            </div>

            {/* Right Content - Traits */}
            <div className="grid sm:grid-cols-2 gap-4">
              {defaultTraits.map((trait, index) => (
                <div
                  key={trait.title}
                  className="glass-card p-6 card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg accent-gradient flex items-center justify-center mb-4">
                    <trait.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{trait.title}</h3>
                  <p className="text-sm text-muted-foreground">{trait.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
