import { Github, Star, GitBranch, Code, Users, Calendar, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GitHubStats {
  totalStars: number;
  totalCommits: number;
  totalRepos: number;
  followers: number;
  following: number;
  contributions: number;
  languages: { name: string; percentage: number; color: string }[];
}

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  updatedAt: string;
  url: string;
  isPrivate: boolean;
  topics: string[];
}

// Mock data for GitHub statistics
const gitHubStats: GitHubStats = {
  totalStars: 127,
  totalCommits: 2847,
  totalRepos: 42,
  followers: 89,
  following: 156,
  contributions: 847,
  languages: [
    { name: 'TypeScript', percentage: 35, color: '#3178c6' },
    { name: 'JavaScript', percentage: 25, color: '#f1e05a' },
    { name: 'PHP', percentage: 20, color: '#4f5d95' },
    { name: 'Python', percentage: 12, color: '#3572A5' },
    { name: 'CSS', percentage: 5, color: '#563d7c' },
    { name: 'Other', percentage: 3, color: '#6e7681' },
  ],
};

const featuredRepositories: Repository[] = [
  {
    name: 'hris-saas-platform',
    description: 'Production-grade HRIS SaaS platform with 12+ modules and AI integration serving 1000+ users',
    stars: 45,
    forks: 12,
    language: 'TypeScript',
    languageColor: '#3178c6',
    updatedAt: '2024-01-15',
    url: 'https://github.com/johnpatricknicolas/hris-saas-platform',
    isPrivate: false,
    topics: ['laravel', 'react', 'typescript', 'ai', 'saas'],
  },
  {
    name: 'gameschedgo',
    description: 'Government-deployed sports management system for venue reservations and league scheduling',
    stars: 28,
    forks: 8,
    language: 'JavaScript',
    languageColor: '#f1e05a',
    updatedAt: '2024-01-10',
    url: 'https://github.com/johnpatricknicolas/gameschedgo',
    isPrivate: false,
    topics: ['php', 'javascript', 'mysql', 'html', 'css', 'government', 'sports-management'],
  },
  {
    name: 'ai-hr-tools',
    description: 'AI-powered HR automation tools including resume screening and interview automation',
    stars: 23,
    forks: 6,
    language: 'Python',
    languageColor: '#3572A5',
    updatedAt: '2024-01-08',
    url: 'https://github.com/johnpatricknicolas/ai-hr-tools',
    isPrivate: false,
    topics: ['python', 'openai', 'automation', 'hr-tech', 'machine-learning'],
  },
  {
    name: 'sukey-marketplace',
    description: 'B2B marketplace CMS for Philippine MSMEs - Philippines Startup Challenge finalist',
    stars: 18,
    forks: 4,
    language: 'TypeScript',
    languageColor: '#3178c6',
    updatedAt: '2024-01-05',
    url: 'https://github.com/johnpatricknicolas/sukey-marketplace',
    isPrivate: false,
    topics: ['nextjs', 'typescript', 'marketplace', 'startup', 'msme'],
  },
  {
    name: 'chibis-business-system',
    description: 'Multi-branch business management system for 5-location food store operations',
    stars: 9,
    forks: 3,
    language: 'PHP',
    languageColor: '#4f5d95',
    updatedAt: '2023-12-28',
    url: 'https://github.com/johnpatricknicolas/chibis-business-system',
    isPrivate: false,
    topics: ['laravel', 'php', 'business-system', 'inventory', 'pos'],
  },
];

function StatCard({ icon: Icon, value, label, color }: { 
  icon: React.ElementType; 
  value: string; 
  label: string; 
  color: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl glass-card p-6 hover:scale-105 transition-all duration-300">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:animate-pulse-glow`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gradient">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
}

function RepositoryCard({ repo, index }: { repo: Repository; index: number }) {
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl glass-card p-6 hover:scale-[1.02] transition-all duration-300 border-border/50"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-primary flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground group-hover:text-gradient transition-colors">
                {repo.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: repo.languageColor }}
                />
                <span className="text-sm text-muted-foreground">{repo.language}</span>
              </div>
            </div>
          </div>
          {repo.isPrivate && (
            <div className="px-2 py-1 rounded-full bg-secondary/50 text-xs text-muted-foreground">
              Private
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {repo.description}
        </p>

        {/* Topics */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 3).map((topic) => (
              <span 
                key={topic}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {topic}
              </span>
            ))}
            {repo.topics.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-muted-foreground">
                +{repo.topics.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{repo.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitBranch className="w-4 h-4" />
            <span>{repo.forks}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(repo.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Action button */}
        <a 
          href={repo.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Button variant="outline" size="sm" className="w-full gap-2 border-primary/30 hover:border-primary hover:bg-primary/10">
            <Github className="w-4 h-4" />
            View Repository
          </Button>
        </a>
      </div>
    </div>
  );
}

export function GitHubSection() {
  return (
    <section id="github" className="section-padding bg-background relative">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-blue/10 to-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-purple/10 to-accent-emerald/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Open Source
            </span>
            <h2 className="section-title">
              GitHub <span className="text-gradient">Contributions</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              Active open source contributor with production projects and community engagement
            </p>
          </div>

          {/* GitHub Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            <StatCard 
              icon={Star} 
              value={gitHubStats.totalStars.toString()} 
              label="Total Stars" 
              color="from-accent-emerald to-accent-cyan"
            />
            <StatCard 
              icon={GitBranch} 
              value={gitHubStats.totalCommits.toString()} 
              label="Commits" 
              color="from-accent-blue to-primary"
            />
            <StatCard 
              icon={Package} 
              value={gitHubStats.totalRepos.toString()} 
              label="Repositories" 
              color="from-accent-purple to-accent-emerald"
            />
            <StatCard 
              icon={Users} 
              value={gitHubStats.followers.toString()} 
              label="Followers" 
              color="from-primary to-accent-cyan"
            />
            <StatCard 
              icon={TrendingUp} 
              value={gitHubStats.contributions.toString()} 
              label="Contributions" 
              color="from-accent-cyan to-accent-blue"
            />
            <StatCard 
              icon={Github} 
              value={gitHubStats.following.toString()} 
              label="Following" 
              color="from-accent-emerald to-primary"
            />
          </div>

          {/* Languages Distribution */}
          <div className="mb-16">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-primary" />
                Language Distribution
              </h3>
              <div className="space-y-3">
                {gitHubStats.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium text-foreground">{lang.name}</div>
                    <div className="flex-1 h-3 bg-secondary/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                        }}
                      />
                    </div>
                    <div className="w-12 text-sm text-muted-foreground text-right">{lang.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Repositories */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-primary flex items-center justify-center">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Featured Repositories</h3>
                <p className="text-sm text-muted-foreground">Production projects and open source contributions</p>
              </div>
              <div className="ml-auto">
                <a 
                  href="https://github.com/Kloud315" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10">
                    <Github className="w-4 h-4" />
                    View All Repos
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRepositories.map((repo, index) => (
                <RepositoryCard key={repo.name} repo={repo} index={index} />
              ))}
            </div>
          </div>

          {/* GitHub Profile Link */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass-card">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">@johnpatricknicolas</span>
                </span>
              </div>
              <div className="w-px h-4 bg-border" />
              <a 
                href="https://github.com/Kloud315" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-gradient transition-colors"
              >
                View Full Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
