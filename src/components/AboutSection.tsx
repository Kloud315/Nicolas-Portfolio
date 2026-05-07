import { Target, Lightbulb, Users, Rocket, Code, Brain, Cpu, Globe } from 'lucide-react';
import { useAboutContent } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const engineeringTraits = [
  {
    icon: Brain,
    title: 'AI-First Development',
    description: 'Integrating artificial intelligence into production systems for enhanced capabilities',
  },
  {
    icon: Code,
    title: 'Full-Stack Architecture',
    description: 'Building scalable, end-to-end solutions with modern tech stacks and best practices',
  },
  {
    icon: Users,
    title: 'Technical Leadership',
    description: 'Leading development teams with Agile methodologies and strategic technical decisions',
  },
  {
    icon: Cpu,
    title: 'Production-Grade Systems',
    description: 'Deploying and maintaining high-availability systems that scale from 100 to 1000+ users',
  },
];

export function AboutSection() {
  const { data: aboutContent, isLoading } = useAboutContent();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();
  const { ref: traitsRef, isVisible: traitsVisible } = useScrollReveal();

  const engineeringContent = `As an <span class="text-foreground font-medium">AI-enabled BSIT student</span> at 
Lyceum of the Philippines University – Cavite, I'm building the next generation of intelligent software systems. 
As a <span class="text-primary font-medium">DOST-SEI Scholar</span> and 
<span class="text-primary font-medium">Magna Cum Laude candidate (GWA 1.35)</span>, I combine academic excellence 
with <span class="text-foreground font-medium">430+ hours of production engineering experience</span>.

My expertise spans the full development lifecycle—from architecting scalable systems to deploying 
AI-integrated solutions that serve real users. I've led the development of 
<span class="text-foreground font-medium">12+ live HRIS modules</span> and scaled platforms from 
<span class="text-foreground font-medium">100 to 1000+ users</span>, demonstrating my ability to build 
production-grade software that delivers measurable business value.

With a foundation in <span class="text-primary font-medium">Laravel, React, TypeScript, and AI technologies</span>, 
I specialize in creating intelligent SaaS solutions that automate workflows and enhance user experiences. 
My leadership experience includes managing development teams using Agile methodologies and driving technical 
decisions that align with business objectives.

I'm passionate about <span class="text-foreground font-medium">scalable systems architecture</span> and 
<span class="text-foreground font-medium">AI integration</span>, constantly exploring how emerging technologies 
can solve complex business challenges and create competitive advantages.`;

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-background to-secondary/10 relative">
      {/* Minimalist background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      <div className="container relative z-10 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Minimalist Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-20 transition-all duration-1200 ${
              headerVisible ? 'scroll-reveal is-visible' : 'scroll-reveal'
            }`}
          >
            <span className="text-primary text-xs font-light tracking-widest uppercase mb-6 block">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              AI Full Stack Engineer & <span className="text-primary font-light">Technical Leader</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
              Building production-grade systems with AI integration and scalable architecture
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left Content */}
            <div 
              ref={contentRef}
              className={`space-y-8 transition-all duration-1200 delay-200 ${
                contentVisible ? 'scroll-reveal-left is-visible' : 'scroll-reveal-left'
              }`}
            >
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
                  className="text-lg text-muted-foreground leading-relaxed space-y-6 [&>p]:mb-4 font-light"
                  dangerouslySetInnerHTML={{ __html: aboutContent?.content || engineeringContent }}
                />
              )}

              {/* Minimalist Engineering Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-light text-primary">
                    430+
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 font-light">Production Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-light text-primary">12+</div>
                  <div className="text-sm text-muted-foreground mt-2 font-light">Live Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-light text-primary">1K+</div>
                  <div className="text-sm text-muted-foreground mt-2 font-light">Users Served</div>
                </div>
              </div>
            </div>

            {/* Right Content - Engineering Traits */}
            <div 
              ref={traitsRef}
              className={`grid sm:grid-cols-2 gap-6 transition-all duration-1200 delay-400 ${
                traitsVisible ? 'scroll-reveal-right is-visible' : 'scroll-reveal-right'
              }`}
            >
              {engineeringTraits.map((trait, index) => (
                <div
                  key={trait.title}
                  className="p-6 border border-border/30 rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 transition-all duration-500 hover:translate-y-[-2px]"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <trait.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-3">{trait.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{trait.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
