import { ExternalLink, Star, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProjectsWithCategories } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface Project {
  id: string;
  title: string;
  role: string;
  detailed_description: string;
  short_description: string | null;
  tech: string[];
  impact: string | null;
  featured: boolean;
  link: string | null;
  image_url: string | null;
  project_type: string | null;
  status: string | null;
}

interface CategoryWithProjects {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  projects: Project[];
}

// Production projects with real-world impact
const defaultCategories: CategoryWithProjects[] = [
  {
    id: '1',
    name: 'Production Systems',
    slug: 'production',
    description: 'Live systems serving real users with measurable impact',
    projects: [
      {
        id: '1',
        title: 'HRIS SaaS Platform',
        role: 'AI Full Stack Engineer / Team Lead',
        detailed_description: 'Comprehensive Human Resource Information System with 12+ integrated modules and scalable architecture serving 1000+ users. Built with Laravel framework, PHP backend, Inertia.js for SPA-like experience, MySQL database, and REST API architecture. Features employee management, payroll, performance tracking, and email notifications.',
        short_description: 'Production-grade HRIS with Laravel and PHP serving 1000+ users',
        tech: ['Laravel', 'PHP', 'Inertia.js', 'MySQL', 'Laravel Eloquent', 'REST API', 'Laravel Mail', 'Hostinger'],
        impact: 'Scaled from 100 to 1000+ users, reduced manual processing by 60%',
        featured: true,
        link: '#',
        image_url: null,
        project_type: 'SaaS Platform',
        status: 'Live',
      },
      {
        id: '2',
        title: 'GameSchedGo',
        role: 'Full Stack Developer',
        detailed_description: 'Government-deployed sports management system for venue reservations, league scheduling, and athlete management. Built with HTML, CSS, JavaScript, PHP, and MySQL for the City Government of Trece Martires. Features comprehensive administrative dashboard and real-time scheduling.',
        short_description: 'Government sports management platform built with PHP and MySQL',
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        impact: '95% user satisfaction, IEEE manuscript in progress',
        featured: true,
        link: '#',
        image_url: null,
        project_type: 'Government System',
        status: 'Deployed',
      },
    ],
  },
  {
    id: '2',
    name: 'Business Solutions',
    slug: 'business',
    description: 'Enterprise-grade systems for business operations',
    projects: [
      {
        id: '3',
        title: 'Chibis Multi-Branch System',
        role: 'Full Stack Developer',
        detailed_description: 'Comprehensive business management system for 5-branch food store operations. Features inventory management, POS integration, employee scheduling, financial reporting, and real-time analytics across multiple locations.',
        short_description: 'Multi-branch business system serving 5 locations with 10K+ transactions',
        tech: ['Laravel', 'Vue.js', 'MySQL', 'Barcode Systems', 'Payment Gateways'],
        impact: 'Reduced inventory costs by 30%, automated 5-branch operations',
        featured: false,
        link: '#',
        image_url: null,
        project_type: 'Business System',
        status: 'In Development',
      },
    ],
  },
  {
    id: '3',
    name: 'AI & Innovation',
    slug: 'ai-innovation',
    description: 'Cutting-edge AI projects and startup ventures',
    projects: [
      {
        id: '4',
        title: 'Sukey B2B Marketplace',
        role: 'Startup Founder / Lead Developer',
        detailed_description: 'B2B marketplace CMS prototype for Philippine MSMEs, developed for Philippines Startup Challenge 10. Features multi-tenant architecture, scalable CMS, and comprehensive business management tools.',
        short_description: 'National startup competition finalist - B2B marketplace prototype for MSMEs',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'AWS', 'Docker'],
        impact: 'Top 10 national placement, 50+ MSME validations',
        featured: true,
        link: '#',
        image_url: null,
        project_type: 'Startup',
        status: 'Prototype',
      },
      {
        id: '5',
        title: 'AI HR Tools Suite',
        role: 'AI Engineer',
        detailed_description: 'Suite of AI-powered HR tools including resume screening, interview automation, employee sentiment analysis, and predictive analytics for workforce planning. Integrates with existing HRIS platforms.',
        short_description: 'AI-powered HR automation tools with advanced analytics',
        tech: ['Python', 'OpenAI APIs', 'React', 'Node.js', 'TensorFlow', 'FastAPI'],
        impact: '60% reduction in screening time, improved hiring accuracy',
        featured: false,
        link: '#',
        image_url: null,
        project_type: 'AI Tools',
        status: 'Beta',
      },
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border transition-all duration-500 hover:-translate-y-1 ${
        project.featured 
          ? 'bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 border-primary/20' 
          : 'bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30'
      }`}
    >
      <div className="p-6 space-y-4">
        {/* Status and featured badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20">
            <span className="text-sm font-light text-primary capitalize">{project.status || 'Active'}</span>
          </div>
          {project.featured && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20">
              <Star className="w-3 h-3 text-primary" />
              <span className="text-xs text-primary font-light">Featured</span>
            </div>
          )}
        </div>

        {/* Minimalist project header */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Folder className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-foreground mb-1">
                {project.title}
              </h3>
              {project.role && (
                <p className="text-primary text-sm font-light">{project.role}</p>
              )}
            </div>
          </div>
          {project.project_type && (
            <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5 w-fit font-light">
              {project.project_type}
            </Badge>
          )}
        </div>

        {/* Project description */}
        <p className="text-muted-foreground text-sm leading-relaxed font-light">
          {project.short_description || project.detailed_description}
        </p>

        {/* Technologies */}
        <div className="space-y-3">
          <h4 className="text-xs font-light text-foreground/70 uppercase tracking-widest">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 6).map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 text-xs font-light rounded-full bg-secondary/30 border border-border/30 text-foreground"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 6 && (
              <span className="px-3 py-1 text-xs font-light rounded-full bg-muted text-muted-foreground">
                +{project.tech.length - 6}
              </span>
            )}
          </div>
        </div>

        {/* Impact metrics */}
        {project.impact && (
          <div className="space-y-3">
            <h4 className="text-xs font-light text-foreground/70 uppercase tracking-widest">Impact</h4>
            <div className="p-3 rounded-lg bg-secondary/20 border border-border/30">
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {project.impact}
              </p>
            </div>
          </div>
        )}

        {/* Minimalist action buttons */}
        <div className="flex gap-3 pt-4 border-t border-border/30">
          {project.link && project.link !== '#' && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button size="sm" className="w-full gap-2 text-xs font-light bg-primary hover:bg-primary/90">
                <ExternalLink className="w-3 h-3" />
                View Live
              </Button>
            </a>
          )}
          <Button variant="outline" size="sm" className="gap-2 text-xs font-light border-border hover:border-primary hover:bg-primary/5">
            <Star className="w-3 h-3" />
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}

function CategorySection({ category }: { category: CategoryWithProjects }) {
  const displayName = category.name.includes('/') 
    ? `${category.name.split('/')[0].trim()} Projects`
    : category.name;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Folder className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-medium text-foreground">{displayName}</h3>
          {category.description && (
            <p className="text-sm text-muted-foreground font-light mt-1">{category.description}</p>
          )}
        </div>
        <Badge variant="secondary" className="shrink-0 font-light">
          {category.projects.length} {category.projects.length === 1 ? 'project' : 'projects'}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {category.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { data: categoriesWithProjects, isLoading } = useProjectsWithCategories();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();
  
  const displayCategories = categoriesWithProjects && categoriesWithProjects.length > 0 
    ? categoriesWithProjects 
    : defaultCategories;

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-background to-secondary/10 relative">
      <div className="container px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Minimalist Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-20 transition-all duration-1200 ${
              headerVisible ? 'scroll-reveal is-visible' : 'scroll-reveal'
            }`}
          >
            <span className="text-primary text-xs font-light tracking-widest uppercase mb-6 block">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              Featured <span className="text-primary font-light">Projects</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
              Real-world systems built with purpose, demonstrating technical excellence and leadership
            </p>
          </div>

          {/* Projects by Category */}
          <div 
            ref={contentRef}
            className={`transition-all duration-1200 delay-200 ${
              contentVisible ? 'scroll-reveal-scale is-visible' : 'scroll-reveal-scale'
            }`}
          >
            {isLoading ? (
              <div className="space-y-16">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-8">
                    <Skeleton className="h-10 w-64" />
                    <div className="grid md:grid-cols-2 gap-8">
                      {[1, 2].map((j) => (
                        <div key={j} className="p-6 border border-border/30 rounded-lg bg-card/30 space-y-4">
                          <Skeleton className="h-8 w-48" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-20 w-full" />
                          <div className="flex gap-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-20">
                {displayCategories.map((category) => (
                  <CategorySection key={category.id} category={category} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}