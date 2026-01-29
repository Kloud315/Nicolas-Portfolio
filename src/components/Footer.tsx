import { Linkedin, Mail, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo & Name */}
            <div className="text-center md:text-left">
              <a href="#" className="text-2xl font-bold text-foreground">
                JP<span className="text-primary">.</span>
              </a>
              <p className="text-muted-foreground text-sm mt-2">
                John Patrick Nicolas
              </p>
            </div>

            {/* Quote */}
            <div className="text-center max-w-md">
              <p className="text-muted-foreground italic text-sm">
                "The future belongs to those who build it today."
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/john-patrick-nicolas-29b522388/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:johnpatricknicolas15@gmail.com"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} John Patrick Nicolas. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
