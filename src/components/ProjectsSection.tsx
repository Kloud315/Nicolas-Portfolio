import { ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';

interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  impact: string | null;
  featured: boolean;
  link: string | null;
  image_url: string | null;
}

// Fallback projects if database is empty
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'GameSchedGo',
    role: 'Lead Developer / Project Leader',
    description:
      'A comprehensive sports facility reservation and league management system developed for the City Government of Trece Martires, Cavite. Features include facility booking, league scheduling, team management, and real-time availability tracking.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
    impact: 'Successfully deployed on Hostinger with custom domain. Serving the local sports community with streamlined scheduling operations.',
    featured: true,
    link: 'https://gameschedgo.com',
    image_url: null,
  },
  {
    id: '2',
    title: 'Sukey - B2B Marketplace CMS',
    role: 'Startup Leader',
    description:
      'A localized B2B marketplace CMS designed specifically for MSMEs in the Philippines. Created as part of the Philippines Startup Challenge 10 with DICT Philippines, IIDB, and DSDAP.',
    tech: ['Web Development', 'CMS', 'B2B Platform', 'MSME Solutions'],
    impact: 'National-level startup competition entry showcasing innovative solutions for Philippine businesses.',
    featured: true,
    link: null,
    image_url: null,
  },
  {
    id: '3',
    title: 'Bookstore Management System',
    role: 'System Analyst / Project Leader',
    description:
      'A comprehensive bookstore management solution featuring inventory tracking, sales management, customer records, and reporting capabilities.',
    tech: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    impact: 'Streamlined bookstore operations with automated inventory and sales tracking.',
    featured: false,
    link: null,
    image_url: null,
  },
  {
    id: '4',
    title: 'Pension System',
    role: 'System Analyst / Project Leader',
    description:
      'A pension management system designed to handle beneficiary records, payment schedules, and administrative workflows.',
    tech: ['PHP', 'MySQL', 'Database Design', 'CRUD Operations'],
    impact: 'Demonstrated expertise in complex database design and sensitive data handling.',
    featured: false,
    link: null,
    image_url: null,
  },
  {
    id: '5',
    title: 'QueECSA Queueing System',
    role: 'Developer',
    description:
      'A digital queueing system developed for the LPU Cavite COECSA Accounting Office to streamline student services and reduce wait times.',
    tech: ['Web Development', 'Queue Management', 'Real-time Updates'],
    impact: 'Improved service efficiency for the university accounting department.',
    featured: false,
    link: null,
    image_url: null,
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={`glass-card p-6 lg:p-8 card-hover relative overflow-hidden ${
        project.featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      {project.featured && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span className="text-xs text-primary font-semibold">Featured</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {project.image_url && (
          <div className="aspect-video rounded-lg overflow-hidden mb-4">
            <img 
              src={project.image_url} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-1">{project.title}</h3>
          <p className="text-primary text-sm font-medium">{project.role}</p>
        </div>

        <p className="text-muted-foreground leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        {project.impact && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Impact: </span>
              {project.impact}
            </p>
          </div>
        )}

        {project.link && (
          <div className="pt-2">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { data: projects, isLoading } = useProjects();
  
  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <section id="projects" className="section-padding bg-background relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="section-title">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              Real-world systems built with purpose, demonstrating technical excellence and leadership
            </p>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-card p-6 lg:p-8 space-y-4">
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
          ) : (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {displayProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
