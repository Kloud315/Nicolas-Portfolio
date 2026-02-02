import { ArrowDown, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeroContent, useSiteSettings } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  const { data: heroContent, isLoading: heroLoading } = useHeroContent();
  const { data: siteSettings } = useSiteSettings();

  const resumeUrl = siteSettings?.resume_url || '/Nicolas_LPU_Cavite_Resume.pdf';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">DOST-SEI Scholar | Magna Cum Laude Candidate</span>
          </div>

          {/* Name */}
          {heroLoading ? (
            <div className="space-y-4 mb-6">
              <Skeleton className="h-16 w-80 mx-auto" />
              <Skeleton className="h-16 w-48 mx-auto" />
            </div>
          ) : (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-delay-1">
              {heroContent?.name ? (
                <>
                  <span className="text-foreground">{heroContent.name.split(' ').slice(0, -1).join(' ')}</span>
                  <br />
                  <span className="text-gradient">{heroContent.name.split(' ').slice(-1)[0]}</span>
                </>
              ) : (
                <>
                  <span className="text-foreground">John Patrick</span>
                  <br />
                  <span className="text-gradient">Nicolas</span>
                </>
              )}
            </h1>
          )}

          {/* Title */}
          {heroLoading ? (
            <Skeleton className="h-8 w-96 mx-auto mb-8" />
          ) : (
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-delay-2">
              {heroContent?.title || 'IT Student • Web Developer • Project Leader • Future Tech Innovator'}
            </p>
          )}

          {/* Description */}
          {heroLoading ? (
            <div className="space-y-2 mb-12">
              <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
            </div>
          ) : (
            <p className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-delay-3">
              {heroContent?.branding_statement || 
                'A results-driven IT student specializing in web development and system design, combining strategic leadership, technical excellence, and entrepreneurial mindset to build real-world digital solutions.'}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-3">
            <a href="#projects">
              <Button variant="hero" size="xl">
                View Projects
              </Button>
            </a>
            <a href={resumeUrl} download>
              <Button variant="heroOutline" size="xl">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </a>
            <a href="#contact">
              <Button variant="ghost" size="xl">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
