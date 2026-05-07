import { Award, Cloud, Network, Code, Database, Shield, Brain, FileText } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: 'technical' | 'cloud' | 'ai' | 'database' | 'networking';
  credentialId?: string;
  status: 'completed' | 'in-progress';
  icon: string;
}

const certifications: Certification[] = [
  {
    id: '1',
    title: 'Google AI Essentials',
    issuer: 'Google',
    date: '2024',
    description: 'Comprehensive understanding of AI concepts, applications, and ethical considerations in modern technology.',
    category: 'ai',
    status: 'completed',
    icon: 'Brain',
    credentialId: '/Google AI Essentials Coursera.pdf'
  },
  {
    id: '2',
    title: 'Google Prompting Essentials',
    issuer: 'Google',
    date: '2024',
    description: 'Advanced techniques for effective AI prompting and optimization of AI model interactions.',
    category: 'ai',
    status: 'completed',
    icon: 'Brain',
    credentialId: '/Google Prompting Essentials.pdf'
  },
  {
    id: '3',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco',
    date: '2023',
    description: 'Fundamental networking concepts, OSI model, IP addressing, and basic network configuration.',
    category: 'networking',
    status: 'completed',
    icon: 'Network',
    credentialId: '/CCNAv7 Introduction to Networks Certificate.jpeg'
  },
  {
    id: '4',
    title: 'IT Specialist - Database',
    issuer: 'Certiport',
    date: '2023',
    description: 'Professional certification in database management, SQL, and database administration.',
    category: 'database',
    status: 'completed',
    icon: 'Database',
    credentialId: '/IT Specialist - Database.pdf'
  },
  {
    id: '5',
    title: 'IT Specialist - HTML & CSS',
    issuer: 'Certiport',
    date: '2023',
    description: 'Professional certification in web development fundamentals and modern HTML/CSS practices.',
    category: 'technical',
    status: 'completed',
    icon: 'Code',
    credentialId: '/IT Specialist - HTML & CSS.pdf'
  },
  {
    id: '6',
    title: 'Certified Cloud System Analyst',
    issuer: 'Cloud Credential Council',
    date: '2024',
    description: 'Cloud computing fundamentals, system analysis, and cloud architecture principles.',
    category: 'cloud',
    status: 'completed',
    icon: 'Cloud',
    credentialId: '/Certified Cloud System Analyst (CCSA)-certificate.pdf'
  },
    ];

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Cloud,
  Network,
  Code,
  Database,
  Shield,
  Award,
};

const getCategoryConfig = (category: string) => {
  switch (category) {
    case 'ai':
      return {
        color: 'from-accent-emerald to-accent-cyan',
        bgColor: 'bg-accent-emerald/10',
        borderColor: 'border-accent-emerald/30',
        textColor: 'text-accent-emerald',
      };
    case 'cloud':
      return {
        color: 'from-accent-blue to-primary',
        bgColor: 'bg-accent-blue/10',
        borderColor: 'border-accent-blue/30',
        textColor: 'text-accent-blue',
      };
    case 'networking':
      return {
        color: 'from-primary to-accent-purple',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/30',
        textColor: 'text-primary',
      };
    case 'database':
      return {
        color: 'from-accent-purple to-accent-emerald',
        bgColor: 'bg-accent-purple/10',
        borderColor: 'border-accent-purple/30',
        textColor: 'text-accent-purple',
      };
    case 'technical':
    default:
      return {
        color: 'from-accent-cyan to-accent-blue',
        bgColor: 'bg-accent-cyan/10',
        borderColor: 'border-accent-cyan/30',
        textColor: 'text-accent-cyan',
      };
  }
};

function CertificationCard({ certification, index }: { certification: Certification; index: number }) {
  const IconComponent = iconMap[certification.icon] || Award;
  const categoryConfig = getCategoryConfig(certification.category);

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div className="p-6 space-y-4">
        {/* Status and category */}
        <div className="flex items-center justify-between gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
            certification.status === 'completed' 
              ? 'bg-accent-emerald/10 border border-accent-emerald/30' 
              : 'bg-accent-blue/10 border border-accent-blue/30'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              certification.status === 'completed' ? 'bg-accent-emerald' : 'bg-accent-blue'
            }`} />
            <span className={`text-xs font-medium capitalize ${
              certification.status === 'completed' ? 'text-accent-emerald' : 'text-accent-blue'
            }`}>
              {certification.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full capitalize ${categoryConfig.bgColor} ${categoryConfig.borderColor} ${categoryConfig.textColor}`}>
            {certification.category}
          </span>
        </div>

        {/* Header */}
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryConfig.color} flex items-center justify-center flex-shrink-0`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-base mb-1">
              {certification.title}
            </h3>
            <p className={`text-sm font-medium ${categoryConfig.textColor} mb-1`}>
              {certification.issuer}
            </p>
            <p className="text-xs text-muted-foreground">{certification.date}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {certification.description}
        </p>

        {/* Credential Proof */}
        {certification.credentialId && (
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Credential Proof:</span>
              <a 
                href={certification.credentialId} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                <span>View Certificate</span>
                <Award className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CertificationsSection() {
  const completedCertifications = certifications.filter(cert => cert.status === 'completed');
  const inProgressCertifications = certifications.filter(cert => cert.status === 'in-progress');

  return (
    <section id="certifications" className="section-padding bg-background relative">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-blue/10 to-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-accent-purple/10 to-accent-emerald/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Professional Development
            </span>
            <h2 className="section-title">
              Industry <span className="text-gradient">Certifications</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              Professional certifications validating expertise in AI, cloud computing, and modern technologies
            </p>
          </div>

          {/* Completed Certifications */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-emerald to-accent-cyan flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground">Completed Certifications</h3>
                <p className="text-sm text-muted-foreground">Professional certifications earned and validated</p>
              </div>
              <div className="shrink-0">
                <div className="px-4 py-2 rounded-full bg-accent-emerald/10 border border-accent-emerald/30">
                  <span className="text-accent-emerald font-bold">{completedCertifications.length}</span>
                  <span className="text-accent-emerald/70 text-sm ml-1">Earned</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {completedCertifications.map((certification, index) => (
                <CertificationCard 
                  key={certification.id} 
                  certification={certification} 
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* In Progress Certifications */}
          {inProgressCertifications.length > 0 && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-primary flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground">In Progress</h3>
                  <p className="text-sm text-muted-foreground">Currently pursuing additional certifications</p>
                </div>
                <div className="shrink-0">
                  <div className="px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/30">
                    <span className="text-accent-blue font-bold">{inProgressCertifications.length}</span>
                    <span className="text-accent-blue/70 text-sm ml-1">Active</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {inProgressCertifications.map((certification, index) => (
                  <CertificationCard 
                    key={certification.id} 
                    certification={certification} 
                    index={index + completedCertifications.length}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Certification Summary */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full glass-card">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-accent-emerald to-accent-cyan animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">{certifications.length}</span> Total Certifications
                </span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-accent-blue to-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">5</span> Categories
                </span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-accent-purple to-accent-emerald animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">Google</span> + <span className="font-bold text-foreground">Cisco</span> + <span className="font-bold text-foreground">Certiport</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
