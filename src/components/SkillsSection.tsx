import { useEffect, useRef, useState } from 'react';
import { useSkillsWithCategories } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

function SkillCard({ skill, inView }: { skill: any; inView: boolean }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm p-4 hover:bg-card/50 hover:border-primary/30 transition-all duration-500">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
          {skill.name}
        </h4>
        <span className="text-sm font-light text-primary">{skill.level}%</span>
      </div>
      
      {/* Minimalist progress bar */}
      <div className="relative h-1.5 bg-secondary/50 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-1200 ease-out"
          style={{
            width: inView ? `${skill.level}%` : '0%',
          }}
        />
      </div>
      
      {/* Category badge */}
      <div className="mt-3">
        <span className="text-xs px-2 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary/80 capitalize font-light">
          {skill.category}
        </span>
      </div>
    </div>
  );
}

// Comprehensive Full Stack Engineer tech stack
const defaultSkillCategories = [
  {
    id: '1',
    title: 'Languages',
    icon: '💻',
    description: 'Programming languages and core technologies',
    skills: [
      { name: 'PHP', level: 90, category: 'language' },
      { name: 'JavaScript', level: 95, category: 'language' },
      { name: 'TypeScript', level: 85, category: 'language' },
      { name: 'Python', level: 80, category: 'language' },
      { name: 'Java', level: 75, category: 'language' },
      { name: 'C#', level: 70, category: 'language' },
      { name: 'HTML', level: 95, category: 'markup' },
      { name: 'CSS', level: 95, category: 'styling' },
    ]
  },
  {
    id: '2',
    title: 'Backend / APIs',
    icon: '⚙️',
    description: 'Server-side technologies and API development',
    skills: [
      { name: 'Node.js', level: 85, category: 'runtime' },
      { name: 'Express.js', level: 80, category: 'framework' },
      { name: 'Laravel', level: 95, category: 'framework' },
      { name: 'REST API', level: 90, category: 'architecture' },
      { name: 'JWT Auth', level: 85, category: 'security' },
      { name: 'Socket.io', level: 75, category: 'realtime' },
      { name: 'Prisma ORM', level: 80, category: 'orm' },
      { name: 'Redis', level: 70, category: 'database' },
    ]
  },
  {
    id: '3',
    title: 'Frontend',
    icon: '🎨',
    description: 'Client-side frameworks and UI libraries',
    skills: [
      { name: 'React', level: 90, category: 'framework' },
      { name: 'Next.js 14', level: 85, category: 'framework' },
      { name: 'Inertia.js', level: 80, category: 'library' },
      { name: 'Vite', level: 85, category: 'build-tool' },
      { name: 'Tailwind CSS', level: 95, category: 'styling' },
      { name: 'shadcn/ui', level: 90, category: 'library' },
      { name: 'Radix UI', level: 85, category: 'library' },
      { name: 'React Query', level: 80, category: 'library' },
      { name: 'Zod', level: 75, category: 'validation' },
      { name: 'Recharts', level: 70, category: 'library' },
    ]
  },
  {
    id: '4',
    title: 'Databases',
    icon: '🗄️',
    description: 'Database systems and data management',
    skills: [
      { name: 'PostgreSQL', level: 85, category: 'database' },
      { name: 'MySQL', level: 90, category: 'database' },
      { name: 'Relational DB Design', level: 85, category: 'design' },
      { name: 'Prisma Migrate', level: 80, category: 'tool' },
      { name: 'phpMyAdmin', level: 75, category: 'tool' },
    ]
  },
  {
    id: '5',
    title: 'DevOps & Cloud',
    icon: '☁️',
    description: 'Deployment, CI/CD, and cloud infrastructure',
    skills: [
      { name: 'GitHub Actions CI/CD', level: 85, category: 'cicd' },
      { name: 'Docker', level: 80, category: 'containerization' },
      { name: 'Hostinger', level: 85, category: 'hosting' },
      { name: 'AWS', level: 75, category: 'cloud' },
      { name: 'Git', level: 90, category: 'version-control' },
      { name: 'Vercel', level: 80, category: 'hosting' },
      { name: 'Railway', level: 75, category: 'hosting' },
      { name: 'Firebase', level: 70, category: 'cloud' },
    ]
  },
  {
    id: '6',
    title: 'Tools',
    icon: '🛠️',
    description: 'Development tools and AI platforms',
    skills: [
      { name: 'Windsurf', level: 85, category: 'ide' },
      { name: 'Antigravity', level: 80, category: 'ide' },
      { name: 'Cursor', level: 85, category: 'ide' },
      { name: 'Lovable.dev', level: 75, category: 'platform' },
      { name: 'Bolt.new', level: 80, category: 'platform' },
      { name: 'NotebookLM', level: 70, category: 'ai-tool' },
      { name: 'Prompt & Context Engineering', level: 85, category: 'ai-skill' },
    ]
  },
  {
    id: '7',
    title: 'Leadership',
    icon: '👥',
    description: 'Project management and team leadership skills',
    skills: [
      { name: 'Scrum Master', level: 85, category: 'methodology' },
      { name: 'Agile Sprint Planning', level: 90, category: 'methodology' },
      { name: 'KPI Tracking', level: 80, category: 'management' },
      { name: 'Design Thinking', level: 85, category: 'methodology' },
    ],
  },
  {
    id: '2',
    title: 'Backend Development',
    icon: '⚙️',
    description: 'Server-side technologies and APIs',
    skills: [
      { name: 'Laravel', level: 90, category: 'framework' },
      { name: 'Node.js', level: 85, category: 'runtime' },
      { name: 'PHP', level: 85, category: 'language' },
      { name: 'Python', level: 80, category: 'language' },
      { name: 'REST APIs', level: 90, category: 'architecture' },
      { name: 'FastAPI', level: 75, category: 'framework' },
      { name: 'Express.js', level: 80, category: 'framework' },
      { name: 'Django', level: 70, category: 'framework' },
      { name: 'Flask', level: 75, category: 'framework' },
      { name: 'GraphQL', level: 75, category: 'api' },
      { name: 'WebSocket', level: 70, category: 'realtime' },
    ],
  },
  {
    id: '3',
    title: 'AI & Machine Learning',
    icon: '🤖',
    description: 'Artificial Intelligence and automation tools',
    skills: [
      { name: 'OpenAI APIs', level: 85, category: 'ai' },
      { name: 'TensorFlow', level: 70, category: 'ml' },
      { name: 'PyTorch', level: 75, category: 'ml' },
      { name: 'Scikit-learn', level: 80, category: 'ml' },
      { name: 'Pandas', level: 75, category: 'data' },
      { name: 'NumPy', level: 80, category: 'data' },
      { name: 'Jupyter', level: 85, category: 'tools' },
      { name: 'LangChain', level: 70, category: 'ai' },
      { name: 'Computer Vision', level: 65, category: 'ai' },
      { name: 'NLP', level: 70, category: 'ai' },
      { name: 'MLflow', level: 75, category: 'ml' },
      { name: 'Hugging Face', level: 70, category: 'ai' },
    ],
  },
  {
    id: '4',
    title: 'Databases & Data',
    icon: '🗄️',
    description: 'Data storage, management, and processing',
    skills: [
      { name: 'PostgreSQL', level: 85, category: 'sql' },
      { name: 'MySQL', level: 90, category: 'sql' },
      { name: 'MongoDB', level: 75, category: 'nosql' },
      { name: 'Redis', level: 75, category: 'cache' },
      { name: 'Elasticsearch', level: 70, category: 'search' },
      { name: 'Data Modeling', level: 80, category: 'design' },
      { name: 'ETL Pipelines', level: 75, category: 'data' },
      { name: 'Apache Kafka', level: 70, category: 'streaming' },
      { name: 'Prisma ORM', level: 80, category: 'orm' },
      { name: 'SQLAlchemy', level: 75, category: 'orm' },
    ],
  },
  {
    id: '5',
    title: 'DevOps & Infrastructure',
    icon: '☁️',
    description: 'Deployment, automation, and infrastructure management',
    skills: [
      { name: 'Docker', level: 80, category: 'containerization' },
      { name: 'Kubernetes', level: 70, category: 'containerization' },
      { name: 'GitHub Actions', level: 85, category: 'cicd' },
      { name: 'AWS', level: 75, category: 'cloud' },
      { name: 'Google Cloud', level: 70, category: 'cloud' },
      { name: 'Azure', level: 65, category: 'cloud' },
      { name: 'CI/CD', level: 85, category: 'cicd' },
      { name: 'Linux', level: 80, category: 'os' },
      { name: 'Bash', level: 85, category: 'scripting' },
      { name: 'Terraform', level: 70, category: 'infrastructure' },
      { name: 'Nginx', level: 75, category: 'server' },
      { name: 'Jenkins', level: 70, category: 'cicd' },
      { name: 'Monitoring', level: 75, category: 'devops' },
    ],
  },
  {
    id: '6',
    title: 'Testing & Quality',
    icon: '🧪',
    description: 'Testing frameworks and quality assurance',
    skills: [
      { name: 'Jest', level: 85, category: 'testing' },
      { name: 'Vitest', level: 80, category: 'testing' },
      { name: 'Cypress', level: 75, category: 'e2e' },
      { name: 'Playwright', level: 70, category: 'e2e' },
      { name: 'Testing Library', level: 75, category: 'testing' },
      { name: 'ESLint', level: 85, category: 'quality' },
      { name: 'Prettier', level: 85, category: 'quality' },
      { name: 'Husky', level: 75, category: 'quality' },
      { name: 'SonarQube', level: 70, category: 'quality' },
    ],
  },
  {
    id: '7',
    title: 'Security & Performance',
    icon: '🔒',
    description: 'Security implementation and performance optimization',
    skills: [
      { name: 'JWT', level: 80, category: 'security' },
      { name: 'OAuth 2.0', level: 75, category: 'security' },
      { name: 'HTTPS', level: 90, category: 'security' },
      { name: 'CORS', level: 85, category: 'security' },
      { name: 'Rate Limiting', level: 75, category: 'security' },
      { name: 'Web Security', level: 70, category: 'security' },
      { name: 'Performance Optimization', level: 75, category: 'performance' },
      { name: 'Caching', level: 80, category: 'performance' },
      { name: 'CDN', level: 70, category: 'performance' },
      { name: 'Load Balancing', level: 75, category: 'performance' },
    ],
  },
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

  const displayCategories = skillCategories && skillCategories.length > 0 
    ? skillCategories 
    : defaultSkillCategories;

  return (
    <section ref={sectionRef} id="skills" className="section-padding bg-gradient-to-b from-background to-secondary/5 relative">
      {/* Minimalist background decoration */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-accent/3 rounded-full blur-3xl" />

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
              Technical Expertise
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              AI Full Stack <span className="text-primary font-light">Tech Stack</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
              Modern technologies and methodologies for building intelligent, scalable systems
            </p>
          </div>

          {/* Minimalist Skills Categories Grid */}
          <div 
            ref={contentRef}
            className={`transition-all duration-1200 delay-200 ${
              contentVisible ? 'scroll-reveal-scale is-visible' : 'scroll-reveal-scale'
            }`}
          >
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
                {displayCategories.map((category, categoryIndex) => (
                  <div
                    key={category.id || category.title}
                    className="p-6 border border-border/30 rounded-lg bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 transition-all duration-500"
                    style={{ transitionDelay: `${categoryIndex * 100}ms` }}
                  >
                    {/* Minimalist Category Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xl">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-foreground">{category.title}</h3>
                        <p className="text-xs text-muted-foreground font-light mt-1">{category.description}</p>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="space-y-4">
                      {category.skills.slice(0, 4).map((skill, skillIndex) => (
                        <SkillCard 
                          key={skill.name} 
                          skill={skill} 
                          inView={inView}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Minimalist Skills Summary */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full border border-border/30 bg-card/30 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground font-light">
                  <span className="font-medium text-foreground">35+</span> Technologies
                </span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-muted-foreground font-light">
                  <span className="font-medium text-foreground">6</span> Categories
                </span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground font-light">
                  <span className="font-medium text-foreground">430+</span> Hours Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
