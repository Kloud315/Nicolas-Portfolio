import { ExternalLink, Star, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProjectsWithCategories } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';

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

// Fallback data if database is empty
const defaultCategories: CategoryWithProjects[] = [
  {
    id: '1',
    name: 'Personal / Hobby Projects',
    slug: 'personal',
    description: 'Personal projects and experiments',
    projects: [
      {
        id: '1',
        title: 'InternInterview AI',
        role: 'Creator / Developer',
        detailed_description: 'An AI-powered interview preparation platform designed to help interns and job seekers practice and improve their interview skills.',
        short_description: 'AI interview practice platform for job seekers',
        tech: ['React', 'AI', 'TypeScript', 'Lovable'],
        impact: null,
        featured: true,
        link: 'https://interninterview.lovable.app/',
        image_url: null,
        project_type: 'AI Tool',
        status: 'Completed',
      },
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={`glass-card p-6 lg:p-8 card-hover relative overflow-hidden ${
        project.featured ? 'ring-1 ring-primary/20' : ''
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
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-xl lg:text-2xl font-bold text-foreground">{project.title}</h3>
            {project.project_type && (
              <Badge variant="outline" className="text-xs">{project.project_type}</Badge>
            )}
            {project.status === 'Ongoing' && (
              <Badge variant="secondary" className="text-xs">In Progress</Badge>
            )}
          </div>
          <p className="text-primary text-sm font-medium">{project.role}</p>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {project.short_description || project.detailed_description}
        </p>

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

function CategorySection({ category }: { category: CategoryWithProjects }) {
  // Convert category name to display format (e.g., "Personal / Hobby Projects" -> "Personal Projects")
  const displayName = category.name.includes('/') 
    ? `${category.name.split('/')[0].trim()} Projects`
    : category.name;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Folder className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">{displayName}</h3>
          {category.description && (
            <p className="text-sm text-muted-foreground">{category.description}</p>
          )}
        </div>
        <Badge variant="secondary" className="ml-auto">
          {category.projects.length} {category.projects.length === 1 ? 'project' : 'projects'}
        </Badge>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {category.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { data: categoriesWithProjects, isLoading } = useProjectsWithCategories();
  
  const displayCategories = categoriesWithProjects && categoriesWithProjects.length > 0 
    ? categoriesWithProjects 
    : defaultCategories;

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

          {/* Projects by Category */}
          {isLoading ? (
            <div className="space-y-12">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-6">
                  <Skeleton className="h-10 w-64" />
                  <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {[1, 2].map((j) => (
                      <div key={j} className="glass-card p-6 lg:p-8 space-y-4">
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
            <div className="space-y-16">
              {displayCategories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}