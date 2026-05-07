import { Calendar, MapPin, ExternalLink, Users, Code, Rocket, Building, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const experiences = [
  {
    id: 1,
    title: 'AI Full Stack Engineer / Team Lead',
    company: 'HRIS SaaS Platform',
    location: 'Remote',
    duration: '2023 - Present',
    type: 'full-time',
    description: 'Leading the development of 12+ live HRIS modules, scaling the platform from 100 to 1000+ users.',
    achievements: [
      'Built 12+ production-grade HRIS modules using Laravel + PHP + Inertia.js',
      'Implemented REST API architecture for frontend-backend communication',
      'Led development team using Agile methodologies and Scrum practices',
      'Scaled platform infrastructure to handle 10x user growth',
      'Deployed system on Hostinger cloud hosting infrastructure',
      'Reduced manual processing time by 60% through automation'
    ],
    technologies: ['Laravel', 'PHP', 'Inertia.js', 'MySQL', 'Laravel Eloquent', 'REST API', 'Laravel Mail', 'Hostinger'],
    metrics: {
      users: '1000+',
      modules: '12+',
      growth: '1000%',
      hours: '430+'
    },
    links: {
      live: '#',
      github: '#'
    }
  },
  {
    id: 2,
    title: 'GameSchedGo - Government Sports Platform',
    company: 'City Government of Trece Martires',
    location: 'Trece Martires, Cavite',
    duration: '2023 - 2024',
    type: 'project',
    description: 'Developed and deployed a comprehensive sports management system for government operations, now live and serving real users.',
    achievements: [
      'Built end-to-end sports reservation and league management system',
      'Implemented real-time scheduling and venue management',
      'Created user dashboard for athletes and administrators',
      'Deployed system for government-wide sports operations',
      'Co-authored IEEE manuscript on sports management technology',
      'Achieved 95% user satisfaction in government pilot program'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    metrics: {
      users: '500+',
      venues: '10+',
      events: '100+',
      satisfaction: '95%'
    },
    links: {
      live: '#',
      github: '#'
    }
  },
  {
    id: 3,
    title: 'Chibis Food Store - Multi-Branch System',
    company: 'Family Business Operations',
    location: 'Cavite, Philippines',
    duration: '2022 - Present',
    type: 'project',
    description: 'Developing a comprehensive business management system for multi-branch food store operations with inventory and POS integration.',
    achievements: [
      'Designed scalable architecture for 5-branch business operations',
      'Implemented inventory management across multiple locations',
      'Created POS system with real-time sales analytics',
      'Built employee management and scheduling system',
      'Automated financial reporting and compliance tracking',
      'Reduced inventory costs by 30% through optimized management'
    ],
    technologies: ['Laravel', 'Vue.js', 'MySQL', 'Barcode Systems', 'Payment Gateways'],
    metrics: {
      branches: '5',
      transactions: '10K+',
      inventory: '1000+',
      efficiency: '30%'
    },
    links: {
      live: '#',
      github: '#'
    }
  },
  {
    id: 4,
    title: 'Sukey Startup - B2B Marketplace',
    company: 'Philippines Startup Challenge 10',
    location: 'National Competition',
    duration: '2023',
    type: 'startup',
    description: 'Led a startup team to develop and pitch Sukey, a B2B marketplace CMS prototype for Philippine MSMEs, reaching national competition finals.',
    achievements: [
      'Conceptualized and developed prototype for B2B marketplace platform',
      'Led cross-functional team of 5 developers and designers',
      'Pitched to national judges and secured top 10 placement',
      'Validated business model with 50+ MSME customer interviews',
      'Developed scalable CMS architecture for multi-tenant operations',
      'Created comprehensive business and technical documentation'
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'AWS', 'Docker'],
    metrics: {
      users: '50+',
      interviews: '50+',
      ranking: 'Top 10',
      funding: 'Seed Stage'
    },
    links: {
      live: '#',
      github: '#'
    }
  }
];

const typeConfig = {
  'full-time': {
    color: 'from-accent-emerald to-accent-cyan',
    icon: Building,
    label: 'Full-Time'
  },
  'project': {
    color: 'from-accent-blue to-primary',
    icon: Code,
    label: 'Project'
  },
  'startup': {
    color: 'from-accent-purple to-accent-emerald',
    icon: Rocket,
    label: 'Startup'
  }
};

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-background relative">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-blue/10 to-accent-cyan/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-purple/10 to-accent-emerald/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Professional Journey
            </span>
            <h2 className="section-title">
              Production <span className="text-gradient">Experience</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              Real-world deployment experience building scalable systems that serve thousands of users
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent-cyan to-accent-purple transform md:-translate-x-0.5" />

            {experiences.map((exp, index) => {
              const TypeIcon = typeConfig[exp.type].icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={exp.id} 
                  className={`relative flex items-center mb-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-background border-4 border-primary transform md:-translate-x-1/2 z-10">
                    <div className="absolute inset-1 rounded-full bg-gradient-to-r from-primary to-accent-cyan animate-pulse" />
                  </div>

                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 ${isLeft ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'} md:w-5/12`}>
                    <div className="glass-card p-6 card-hover group">
                      {/* Header */}
                      <div className={`flex items-start gap-3 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${typeConfig[exp.type].color} flex items-center justify-center flex-shrink-0 group-hover:animate-pulse-glow`}>
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`flex-1 ${isLeft ? 'md:text-right' : ''}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${typeConfig[exp.type].color} text-white`}>
                              {typeConfig[exp.type].label}
                            </span>
                            <span className="text-sm text-muted-foreground">{exp.duration}</span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                          <p className="text-primary font-medium mb-1">{exp.company}</p>
                          <div className={`flex items-center gap-1 text-sm text-muted-foreground ${isLeft ? 'md:justify-end' : ''}`}>
                            <MapPin className="w-3 h-3" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Key Achievements</h4>
                        <ul className="space-y-1">
                          {exp.achievements.slice(0, 3).map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {Object.entries(exp.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-2 rounded-lg bg-secondary/50">
                            <div className="text-lg font-bold text-gradient">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Technologies</h4>
                        <div className={`flex flex-wrap gap-1 ${isLeft ? 'md:justify-end' : ''}`}>
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className={`flex gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                        {exp.links.live && (
                          <Button variant="outline" size="sm" className="gap-1">
                            <ExternalLink className="w-3 h-3" />
                            Live Demo
                          </Button>
                        )}
                        {exp.links.github && (
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Code className="w-3 h-3" />
                            Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
