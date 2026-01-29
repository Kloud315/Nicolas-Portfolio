import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming & Development',
    skills: [
      { name: 'HTML & CSS', level: 95 },
      { name: 'JavaScript', level: 85 },
      { name: 'PHP', level: 80 },
      { name: 'Python', level: 70 },
      { name: 'Java', level: 65 },
      { name: 'C#', level: 60 },
    ],
  },
  {
    title: 'Database & Cloud',
    skills: [
      { name: 'MySQL', level: 90 },
      { name: 'Database Design', level: 85 },
      { name: 'phpMyAdmin', level: 85 },
      { name: 'Cloud Fundamentals', level: 70 },
      { name: 'AWS Basics', level: 60 },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'XAMPP', level: 90 },
      { name: 'Hostinger', level: 85 },
      { name: 'Bootstrap', level: 80 },
      { name: 'REST API', level: 75 },
    ],
  },
  {
    title: 'Professional Skills',
    skills: [
      { name: 'Leadership', level: 95 },
      { name: 'Decision-Making', level: 90 },
      { name: 'Collaboration', level: 90 },
      { name: 'Adaptability', level: 85 },
      { name: 'Communication', level: 90 },
    ],
  },
];

function SkillBar({ name, level, inView }: { name: string; level: number; inView: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm text-primary font-semibold">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{
            width: inView ? `${level}%` : '0%',
            transition: 'width 1s ease-out',
          }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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

  return (
    <section ref={sectionRef} id="skills" className="section-padding bg-card/50 relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Skills & Expertise
            </span>
            <h2 className="section-title">
              Technical <span className="text-gradient">Arsenal</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              A comprehensive toolkit spanning web development, databases, and leadership capabilities
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="glass-card p-6 lg:p-8"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 accent-gradient rounded-full" />
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} inView={inView} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
