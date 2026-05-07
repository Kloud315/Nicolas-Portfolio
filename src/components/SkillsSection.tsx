import { useEffect, useRef, useState } from 'react';
import { useSkillsWithCategories } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';


const defaultSkillCategories = [
  {
    id: '1',
    title: 'Languages',
    skills: ['PHP', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'HTML', 'CSS']
  },
  {
    id: '2',
    title: 'Backend / APIs',
    skills: ['Node.js', 'Express.js', 'Laravel', 'REST API', 'JWT Auth', 'Socket.io', 'Prisma ORM', 'Redis']
  },
  {
    id: '3',
    title: 'Frontend',
    skills: ['React', 'Next.js 14', 'Inertia.js', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Radix UI', 'React Query', 'Zod', 'Recharts']
  },
  {
    id: '4',
    title: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'Relational DB Design', 'Prisma Migrate', 'phpMyAdmin']
  },
  {
    id: '5',
    title: 'DevOps & Cloud',
    skills: ['GitHub Actions CI/CD', 'Docker', 'Hostinger', 'AWS', 'Git', 'Vercel', 'Railway', 'Firebase', 'Supabase']
  },
  {
    id: '6',
    title: 'Tools',
    skills: ['Windsurf', 'Antigravity', 'Cursor', 'Lovable.dev', 'Bolt.new', 'NotebookLM', 'Prompt & Context Engineering']
  },
  {
    id: '7',
    title: 'Leadership',
    skills: ['Scrum Master', 'Agile Sprint Planning', 'KPI Tracking', 'Design Thinking', 'Technical Documentation']
  }
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const { data: skillCategories, isLoading } = useSkillsWithCategories();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const displayCategories = defaultSkillCategories;

  return (
    <section ref={sectionRef} id="skills" className="section-padding bg-gradient-to-b from-background to-secondary/5 relative">
      {/* Minimalist background decoration */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-accent/3 rounded-full blur-3xl" />

      <div className="container relative z-10 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Simple Section Header */}
          <div className="text-center mb-20">
            <span className="text-primary text-xs font-light tracking-widest uppercase mb-6 block">
              Technical Expertise
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              <span className="text-primary font-light">SKILLS</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
              Modern technologies and methodologies for building intelligent, scalable systems
            </p>
          </div>

          {/* Simple Skills Categories Grid */}
          <div>
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="p-6 border border-border/30 rounded-lg bg-card/30 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="space-y-3">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-2 w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayCategories.map((category) => (
                  <div
                    key={category.id || category.title}
                    className="p-6 border border-border/30 rounded-lg bg-card/30"
                  >
                    <h3 className="text-lg font-medium text-foreground mb-4">{category.title}</h3>
                    <div className="text-sm text-muted-foreground">
                      {category.skills.join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Simple Skills Summary */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full border border-border/30 bg-card/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground font-light">
                  <span className="font-medium text-foreground">{displayCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}</span> Technologies
                </span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground font-light">
                  <span className="font-medium text-foreground">{displayCategories.length}</span> Categories
                </span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground font-light">
                  <span className="font-medium text-foreground">&lt; 1</span> Year Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
