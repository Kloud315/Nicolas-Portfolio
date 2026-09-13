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
        detailed_description: 'Production HRIS SaaS platform with 12+ live modules covering attendance, leave, overtime, workforce management, requisition, candidate onboarding, and meetings. Built with Laravel, React, TypeScript, Inertia.js, Tailwind CSS, shadcn/ui, and OpenAI API integrations.',
        short_description: 'AI-enabled HRIS SaaS with 12+ live production modules',
        tech: ['Laravel', 'PHP', 'React', 'TypeScript', 'Inertia.js', 'Tailwind CSS', 'shadcn/ui', 'OpenAI API', 'Hostinger'],
        impact: 'Deployed to production and passed a 1,000-user stress test',
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
        detailed_description: 'Sports Facility Reservation & League Management System architected and fully deployed for the City Government of Trece Martires, Cavite. The project has an IEEE manuscript submitted for publication.',
        short_description: 'Government-deployed sports facility and league management system',
        tech: ['Sports Management', 'Reservations', 'League Management', 'Hostinger'],
        impact: 'Live at GameSchedGo.com; IEEE manuscript submitted',
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
        detailed_description: 'Production-grade all-in-one business system in development for Chibis Food Store, covering attendance, payroll, inventory, and POS across 5 locations. Built with Node.js 18, Express.js/TypeScript, Next.js 14, PostgreSQL, Prisma, Redis, Socket.io, shadcn/ui, and Docker.',
        short_description: 'All-in-one operations system for a five-branch food business',
        tech: ['Node.js 18', 'Express.js', 'TypeScript', 'Next.js 14', 'PostgreSQL', 'Prisma', 'Redis', 'Socket.io', 'Docker'],
        impact: 'In development for 5 branches',
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
        detailed_description: 'Localized B2B Marketplace CMS concept targeting Philippine MSMEs, developed and presented for the Philippines Startup Challenge 10.',
        short_description: 'Localized B2B marketplace CMS for Philippine MSMEs',
        tech: ['B2B', 'CMS', 'Startup Product'],
        impact: 'Presented at a national-level startup pitch',
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
        detailed_description: 'A set of rapidly prototyped AI HR tools including an AI Resume Checker, AI Social Media Screener, and AI Interview System, built during the StartupLab engagement.',
        short_description: 'Five AI HR tools prototyped in two days',
        tech: ['OpenAI API', 'AI Prototyping', 'Resume Screening', 'Interview Automation'],
        impact: 'Five tools prototyped in two days',
        featured: false,
        link: '#',
        image_url: null,
        project_type: 'AI Tools',
        status: 'Beta',
      },
      {
        id: '6',
        title: 'InternInterview AI',
        role: 'AI Product Builder',
        detailed_description: 'AI interview practice platform for job seekers with AI-conducted interviews, scoring, and summaries.',
        short_description: 'AI interview practice with scoring and summaries',
        tech: ['AI Interviews', 'Scoring', 'Summaries'],
        impact: 'Live prototype',
        featured: false,
        link: 'https://interninterview.lovable.app',
        image_url: null,
        project_type: 'AI Platform',
        status: 'Live',
      },
      {
        id: '7',
        title: 'Fortune Recruit AI',
        role: 'AI Product Builder',
        detailed_description: 'AI recruitment dashboard with an end-to-end hiring pipeline and candidate evaluation workflow.',
        short_description: 'AI recruitment dashboard for candidate screening',
        tech: ['AI Recruitment', 'Candidate Screening', 'Dashboard'],
        impact: 'Live prototype',
        featured: false,
        link: 'https://fortune-recruit-ai.base44.app',
        image_url: null,
        project_type: 'AI Platform',
        status: 'Live',
      },
      {
        id: '8',
        title: 'Profile Screening Tool',
        role: 'AI Product Builder',
        detailed_description: 'Automated candidate profile analyzer using AI behavior and culture-fit analysis from social media profiles.',
        short_description: 'AI behavior and culture-fit profile analyzer',
        tech: ['AI Analysis', 'Profile Screening', 'Culture Fit'],
        impact: 'Live prototype',
        featured: false,
        link: 'https://nicolasprofilescreening.lovable.app',
        image_url: null,
        project_type: 'AI Tool',
        status: 'Live',
      },
      {
        id: '9',
        title: 'Resume Comparison AI',
        role: 'AI Product Builder',
        detailed_description: 'AI-powered resume comparison and ranking tool with ATS scoring and side-by-side comparison for up to five resumes.',
        short_description: 'ATS scoring and side-by-side resume comparison',
        tech: ['ATS Scoring', 'Resume Ranking', 'AI Comparison'],
        impact: 'Live prototype',
        featured: false,
        link: 'https://nicolascompareresumeai.lovable.app',
        image_url: null,
        project_type: 'AI Tool',
        status: 'Live',
      },
      {
        id: '10',
        title: 'Company Knowledge Management System',
        role: 'AI Product Builder',
        detailed_description: 'AI-powered document Q&A system that lets teams upload company documents and query them through a chatbot.',
        short_description: 'AI document Q&A for company knowledge',
        tech: ['Document Q&A', 'AI Chatbot', 'Knowledge Management'],
        impact: 'Live prototype',
        featured: false,
        link: 'https://knowledgebasedmvp.lovable.app',
        image_url: null,
        project_type: 'AI Platform',
        status: 'Live',
      },
    ],
  },
  {
    id: '4',
    name: 'Academic Systems',
    slug: 'academic',
    description: 'Academic projects focused on practical business and public-service workflows',
    projects: [
      {
        id: '11',
        title: 'Bookstore Management System',
        role: 'System Analyst / Project Leader',
        detailed_description: 'Functional prototype for bookstore inventory and sales management, created as project leader in 2024.',
        short_description: 'Bookstore inventory and sales management prototype',
        tech: ['Inventory', 'Sales Management', 'System Analysis'],
        impact: 'Academic project, 2024',
        featured: false,
        link: '#',
        image_url: null,
        project_type: 'Academic',
        status: 'Prototype',
      },
      {
        id: '12',
        title: 'Pension System',
        role: 'Full Stack Developer',
        detailed_description: 'Pension records and payments management system built with PHP, MySQL, HTML, CSS, and JavaScript in 2024.',
        short_description: 'Pension records and payments management system',
        tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
        impact: 'Academic project, 2024',
        featured: false,
        link: '#',
        image_url: null,
        project_type: 'Academic',
        status: 'Prototype',
      },
      {
        id: '13',
        title: 'QueECSA Queueing System',
        role: 'System Designer',
        detailed_description: 'Proposed digital queueing system for the LPU Cavite Accounting Office, designed to streamline student queues.',
        short_description: 'Digital queueing system for LPU Cavite Accounting Office',
        tech: ['Queueing', 'Process Design', 'Student Services'],
        impact: 'Submitted for school competition',
        featured: false,
        link: '#',
        image_url: null,
        project_type: 'Academic',
        status: 'Proposal',
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