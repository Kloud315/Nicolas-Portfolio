import { Calendar, MapPin, ExternalLink, Users, Code, Rocket, Building, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const experiences = [
  {
    id: 1,
    title: 'AI Full Stack Engineer | Team Lead | Backend Engineer',
    company: 'StartUplab Business Center (HRIS SaaS Platform)',
    location: 'Hybrid',
    duration: 'JAN 2026 – APRIL 2026',
    type: 'full-time',
    description: 'Building and delivering HRIS SaaS Platform at StartUplab Business Center startup incubator. Delivered 12+ production HRIS modules (Attendance, Leave, Payroll workflows, Recruitment, Onboarding, and Workforce) using Laravel, React/TypeScript, and modern UI frameworks on a live SaaS Platform while mentoring startup teams.',
    achievements: [
      'Built and delivered 12+ production HRIS modules using Laravel, React/TypeScript, and modern UI frameworks',
      'Led Agile sprints for 11 weeks as Scrum Master, coordinating directly with CEO and HR Director',
      'Deployed to production with CI/CD GitHub Actions; scaled system from 100 to 1,000 users under stress testing',
      'Developed 5 AI HR tools and 80+ file technical documentation; resolved 60+ backend issues across modules',
      'Mentored multiple startup teams on technical architecture and project development at the business incubator'
    ],
    technologies: ['Laravel', 'React', 'TypeScript', 'PHP', 'GitHub Actions', 'CI/CD', 'Mentoring'],
    metrics: {
      modules: '12+',
      users: '1,000',
      sprint: '11 weeks',
      documentation: '80+'
    },
    links: {
      live: '#',
      github: '#'
    }
  },
  {
    id: 3,
    title: 'GameSchedGo - Sports Facility Reservation System',
    company: 'Government of Trece Martires, Cavite',
    location: 'Trece Martires, Cavite',
    duration: 'JAN – DEC 2025',
    type: 'project',
    description: 'Architected and fully deployed a Sports Facility Reservation & League Management System for a City Government live at GameSchedGo.com (Hostinger). IEEE manuscript submitted for publication.',
    achievements: [
      'Architected and fully deployed Sports Facility Reservation & League Management System',
      'System is live at GameSchedGo.com on Hostinger hosting',
      'IEEE manuscript submitted for publication',
      'Serves City Government of Trece Martires operations'
    ],
    technologies: ['Laravel', 'React', 'MySQL', 'Hostinger'],
    metrics: {
      status: 'Live',
      manuscript: 'Submitted',
      government: 'City Level'
    },
    links: {
      live: 'https://gameschedgo.com',
      github: '#'
    }
  },
  {
    id: 4,
    title: 'Event Manager',
    company: 'Cyber Jump 2025 — LPU Cavite (University Cybersecurity Seminar)',
    location: 'LPU Cavite',
    duration: 'AUG - OCT 2025',
    type: 'project',
    description: 'Led end-to-end event management for having 1 local & 1 foreign cybersecurity expert as keynote speakers.',
    achievements: [
      'Led end-to-end event management for cybersecurity seminar',
      'Coordinated 1 local and 1 foreign cybersecurity expert as keynote speakers',
      'Managed event logistics and speaker coordination',
      'Organized university-level cybersecurity seminar'
    ],
    technologies: ['Event Management', 'Coordination', 'Logistics'],
    metrics: {
      speakers: '2',
      experts: 'International',
      level: 'University'
    },
    links: {
      live: '#',
      github: '#'
    }
  },
  {
    id: 5,
    title: 'Startup Leader',
    company: 'Sukey — Philippines Startup Challenge 10 (DICT, IIDB, DSDAP)',
    location: 'National Competition',
    duration: 'SEPT - OCT 2025',
    type: 'startup',
    description: 'Led national-level startup pitch having sukey as localized B2B Marketplace CMS targeting Philippine MSMEs.',
    achievements: [
      'Led national-level startup pitch competition',
      'Developed Sukey as localized B2B Marketplace CMS',
      'Targeted Philippine MSMEs market',
      'Reached national competition finals'
    ],
    technologies: ['Next.js', 'TypeScript', 'CMS', 'B2B', 'Startup'],
    metrics: {
      competition: 'National Level',
      target: 'MSMEs',
      platform: 'B2B Marketplace',
      result: 'Finalist'
    },
    links: {
      live: '#',
      github: '#'
    }
  },
  {
    id: 6,
    title: 'Operations & Systems Developer',
    company: 'Chibis Food Store — Family Business (5 Branches)',
    location: 'Cavite, Philippines',
    duration: '2022 - PRESENT',
    type: 'full-time',
    description: 'Active in Chibis daily operations, business decisions, and process improvement across 5 branches in Cavite. Developing a full production-grade all-in-one business system using modern stack.',
    achievements: [
      'Active in daily operations across 5 branches',
      'Business decisions and process improvement',
      'Developing production-grade all-in-one business system',
      'Managing multi-branch operations'
    ],
    technologies: ['Laravel', 'React', 'TypeScript', 'Business Systems', 'Multi-branch'],
    metrics: {
      branches: '5',
      duration: '2022-Present',
      system: 'In Development',
      role: 'Operations & Development'
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
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Professional Journey
            </span>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">
              Production <span className="text-gradient">Experience</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4 text-sm sm:text-base">
              Real-world deployment experience building scalable systems that serve thousands of users
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent-cyan to-accent-purple transform md:-translate-x-0.5" />

            {experiences.map((exp, index) => {
              const TypeIcon = typeConfig[exp.type].icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                key={exp.id} 
                className={`relative flex items-start md:items-center mb-8 sm:mb-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-6 md:left-1/2 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-background border-2 sm:border-4 border-primary transform -translate-x-1/2 md:-translate-x-1/2 z-10 mt-2 md:mt-0">
                  <div className="absolute inset-0.5 sm:inset-1 rounded-full bg-gradient-to-r from-primary to-accent-cyan animate-pulse" />
                </div>

                {/* Content card */}
                <div className={`ml-10 sm:ml-14 md:ml-0 ${isLeft ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'} w-full md:w-5/12`}>
                    <div className="glass-card p-6 card-hover group">
                      {/* Header */}
                      <div className={`flex flex-col sm:flex-row items-start gap-3 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${typeConfig[exp.type].color} flex items-center justify-center flex-shrink-0 group-hover:animate-pulse-glow`}>
                          <TypeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className={`flex-1 min-w-0 ${isLeft ? 'md:text-right' : ''}`}>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${typeConfig[exp.type].color} text-white`}>
                              {typeConfig[exp.type].label}
                            </span>
                            <span className="text-xs sm:text-sm text-muted-foreground">{exp.duration}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                          <p className="text-primary font-medium mb-1 text-sm sm:text-base">{exp.company}</p>
                          <div className={`flex items-center gap-1 text-xs sm:text-sm text-muted-foreground ${isLeft ? 'md:justify-end' : ''}`}>
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{exp.location}</span>
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
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
                        {Object.entries(exp.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-2 rounded-lg bg-secondary/50">
                            <div className="text-base sm:text-lg font-bold text-gradient">{value}</div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-foreground mb-2 text-xs sm:text-sm">Technologies</h4>
                        <div className={`flex flex-wrap gap-1 ${isLeft ? 'md:justify-end' : ''}`}>
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 text-[10px] sm:text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
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
