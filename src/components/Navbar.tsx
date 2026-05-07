import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Minimalist Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-3 group"
            onClick={() => handleLinkClick('#home')}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30 flex items-center justify-center group-hover:border-primary/50 transition-all duration-300">
              <span className="text-primary font-light text-lg">JN</span>
            </div>
            <span className="text-xl lg:text-2xl font-light text-foreground group-hover:text-primary transition-colors tracking-tight">
              Nicolas
            </span>
          </a>

          {/* Minimalist Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                    isActive
                      ? 'text-primary bg-primary/5 border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Minimalist CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a 
                href="https://github.com/Kloud315" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all duration-300"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/john-patrick-nicolas-ccsa-29b522388" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <a href="/Nicolas_LPU_Cavite_Resume.pdf" download>
              <Button variant="outline" size="sm" className="gap-2 border-border hover:border-primary hover:bg-primary/5">
                <Download size={16} />
                Resume
              </Button>
            </a>
          </div>

          {/* Minimalist Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2 rounded-lg hover:bg-secondary/30 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Minimalist Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/90 backdrop-blur-xl border-b border-border/30 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="container mx-auto px-6 py-8 flex flex-col gap-2">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`px-4 py-3 rounded-lg text-lg font-light transition-all duration-300 ${
                  isActive
                    ? 'text-primary bg-primary/5 border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          
          <div className="flex items-center gap-4 pt-6 border-t border-border/30">
            <ThemeToggle />
            <a 
              href="https://github.com/Kloud315" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all duration-300"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/john-patrick-nicolas-ccsa-29b522388" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
          </div>
          
          <a href="/Nicolas_LPU_Cavite_Resume.pdf" download className="pt-4">
            <Button variant="outline" className="w-full gap-2 border-border hover:border-primary hover:bg-primary/5">
              <Download size={16} />
              Download Resume
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}
