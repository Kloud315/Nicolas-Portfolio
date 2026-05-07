import { ArrowDown, Download, Mail, Github, Linkedin, Code, Users, Rocket, Award, Brain, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeroContent, useSiteSettings, useAboutContent } from '@/hooks/use-portfolio-data';
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

export function HeroSection() {
  const { data: heroContent, isLoading: heroLoading } = useHeroContent();
  const { data: siteSettings } = useSiteSettings();
  const { data: aboutContent, isLoading: aboutLoading } = useAboutContent();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { ref: traitsRef, isVisible: traitsVisible } = useScrollReveal();

  const resumeUrl = siteSettings?.resume_url || '/Nicolas_LPU_Cavite_Resume.pdf';

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

With a foundation in <span class="text-primary font-medium">Laravel, PHP, Inertia.js, and MySQL</span>, 
I specialize in creating intelligent SaaS solutions that automate workflows and enhance user experiences. 
My leadership experience includes managing development teams using Agile methodologies and driving technical 
decisions that align with business objectives.

I'm passionate about <span class="text-foreground font-medium">scalable systems architecture</span> and 
<span class="text-foreground font-medium">AI integration</span>, constantly exploring how emerging technologies 
can solve complex business challenges and create competitive advantages.`;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Premium minimalist background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Subtle animated gradient accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content - Text */}
            <div>
              {/* Premium badges row */}
              <div 
                ref={heroRef}
                className={`flex flex-wrap justify-center lg:justify-start gap-2 mb-12 transition-all duration-1200 ${
                  heroVisible ? 'scroll-reveal is-visible' : 'scroll-reveal'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-primary font-medium">DOST-SEI Scholar</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
                  <Award className="w-3 h-3 text-accent" />
                  <span className="text-xs text-accent font-medium">Magna Cum Laude</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
                  <Rocket className="w-3 h-3 text-primary" />
                  <span className="text-xs text-primary font-medium">430+ Production Hours</span>
                </div>
              </div>

              {/* Name with premium styling */}
              <div className={`transition-all duration-1200 delay-200 ${
                heroVisible ? 'scroll-reveal is-visible' : 'scroll-reveal'
              }`}>
                {heroLoading ? (
                  <div className="space-y-4 mb-12">
                    <Skeleton className="h-16 w-80" />
                    <Skeleton className="h-16 w-48" />
                  </div>
                ) : (
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight mb-12 leading-tight tracking-tight">
                    {heroContent?.name ? (
                      <>
                        <span className="text-foreground font-extralight">{heroContent.name.split(' ').slice(0, -1).join(' ')}</span>
                        <br />
                        <span className="text-primary font-light">{heroContent.name.split(' ').slice(-1)[0]}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-foreground font-extralight">John Patrick</span>
                        <br />
                        <span className="text-primary font-light">Nicolas</span>
                      </>
                    )}
                  </h1>
                )}
              </div>

              {/* Professional title */}
              <div className={`mb-16 transition-all duration-1200 delay-400 ${
                heroVisible ? 'scroll-reveal is-visible' : 'scroll-reveal'
              }`}>
                {heroLoading ? (
                  <Skeleton className="h-8 w-96" />
                ) : (
                  <div>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-4 tracking-tight">
                      AI Full Stack Engineer
                    </p>
                    <p className="text-lg sm:text-xl text-muted-foreground font-light">
                      Team Lead • Software Developer • Startup Builder
                    </p>
                  </div>
                )}
              </div>

              {/* Minimalist metrics */}
              <div className={`grid grid-cols-3 gap-6 mb-20 transition-all duration-1200 delay-600 ${
                heroVisible ? 'scroll-reveal-scale is-visible' : 'scroll-reveal-scale'
              }`}>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-light text-foreground mb-1">12+</div>
                  <div className="text-xs text-muted-foreground font-light">Live HRIS Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-light text-foreground mb-1">100→1000</div>
                  <div className="text-xs text-muted-foreground font-light">Users Scaled</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-light text-foreground mb-1">Gov Deployed</div>
                  <div className="text-xs text-muted-foreground font-light">Platform Live</div>
                </div>
              </div>
            </div>

            {/* Right Content - Photo */}
            <div className={`transition-all duration-1200 delay-300 ${
              heroVisible ? 'scroll-reveal-right is-visible' : 'scroll-reveal-right'
            }`}>
              <div className="relative">
                {/* Photo Container */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl" />
                  
                  {/* Photo Placeholder - Replace with your actual photo */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
                    <img 
                      src="/profile pic.png" 
                      alt="John Patrick Nicolas"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient for better text visibility if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                  </div>
                  
                  {/* Decorative ring */}
                  <div className="absolute -inset-2 rounded-full border border-primary/20" />
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                  <Code className="w-4 h-4 text-primary" />
                </div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '1s' }}>
                  <Brain className="w-4 h-4 text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Comprehensive About Section */}
          <div 
            ref={aboutRef}
            className={`max-w-4xl mx-auto mb-20 transition-all duration-1200 delay-800 ${
              aboutVisible ? 'scroll-reveal is-visible' : 'scroll-reveal'
            }`}
          >
            {aboutLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ) : (
              <div 
                className="text-lg text-muted-foreground leading-relaxed space-y-6 [&>p]:mb-4 font-light"
                dangerouslySetInnerHTML={{ __html: aboutContent?.content || engineeringContent }}
              />
            )}
          </div>

          {/* Engineering Traits */}
          <div 
            ref={traitsRef}
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto transition-all duration-1200 delay-1000 ${
              traitsVisible ? 'scroll-reveal-scale is-visible' : 'scroll-reveal-scale'
            }`}
          >
            {engineeringTraits.map((trait, index) => (
              <div
                key={trait.title}
                className="p-6 text-center border border-border/30 rounded-lg bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <trait.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-3">{trait.title}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">{trait.description}</p>
              </div>
            ))}
          </div>

          {/* Minimalist CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-20 transition-all duration-1200 delay-1200 ${
            heroVisible ? 'scroll-reveal is-visible' : 'scroll-reveal'
          }`}>
            <a href="#experience">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white border-0 transition-all duration-300">
                <Code className="w-4 h-4" />
                View Experience
              </Button>
            </a>
            <a href={resumeUrl} download>
              <Button variant="outline" size="lg" className="gap-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300">
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </a>
            <a href="#projects">
              <Button variant="ghost" size="lg" className="gap-2 hover:bg-secondary/50 transition-all duration-300">
                <Mail className="w-4 h-4" />
                View Projects
              </Button>
            </a>
          </div>

          {/* Minimalist social links */}
          <div className={`flex items-center justify-center lg:justify-start gap-6 mb-12 transition-all duration-1200 delay-1400 ${
            heroVisible ? 'scroll-reveal is-visible' : 'scroll-reveal'
          }`}>
            <a 
              href="https://github.com/Kloud315" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/30 transition-all duration-300 group"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            </a>
            <a 
              href="https://www.linkedin.com/in/john-patrick-nicolas-ccsa-29b522388" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/30 transition-all duration-300 group"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            </a>
            <a 
              href="mailto:johnpatricknicolas15@gmail.com"
              className="p-2 rounded-lg hover:bg-secondary/30 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            </a>
          </div>
        </div>

        {/* Minimalist scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <a href="#experience" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <span className="text-xs font-light tracking-widest uppercase">View Experience</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
